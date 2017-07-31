---
order: 5
indent: true
---

Installing wq on CentOS 7
=========================

The following steps should help you [install wq] and get a wq-powered web application running on [RHEL], [CentOS], or other similar Linux distributions.   These steps are tested on CentOS 7.

> Note: These instructions use Python 2, which is easier to get running on RHEL and CentOS than Python 3.  If you are a regular user of RHEL or CentOS, feel free to [update this file] with instructions for Python 3.

```bash
# Install system libraries
# See yum.postgresql.org for the URL for your distro
sudo yum install http://yum.postgresql.org/9.4/redhat/rhel-7-x86_64/pgdg-centos94-9.4-1.noarch.rpm

sudo yum install epel_release
sudo yum install httpd mod_wsgi postgresql94-server postgis2_94 python-pip
sudo yum install nodejs
sudo pip install wq

# Create project directory from wq template
export PROJECTSDIR=/path/to/projects #e.g. /var/www
export PROJECTNAME=myproject
export DOMAINNAME=myproject.example.com

cd $PROJECTSDIR
sudo mkdir $PROJECTNAME
sudo chown `whoami` $PROJECTNAME
cd $PROJECTNAME
wq start $PROJECTNAME . -d $DOMAINNAME

# give Apache user permission to save uploads
sudo chown apache media/
sudo chcon -R --type httpd_sys_rw_content_t media/

# Create database
# See https://wiki.postgresql.org/wiki/YUM_Installation
sudo /usr/pgsql-9.4/bin/postgresql94-setup initdb
sudo chkconfig postgresql-9.4 on
# (edit /var/lib/pgsql/9.4/data/pg_hba.conf and/or pg_ident.conf to set permissions)
sudo service postgresql-9.4 restart
createuser -Upostgres $PROJECTNAME
createdb -Upostgres -O$PROJECTNAME $PROJECTNAME
psql -Upostgres $PROJECTNAME -c "CREATE EXTENSION postgis;"

# Install database tables & create admin account
# (edit db/$PROJECTNAME/local_settings.py with database info, if different than above)
# (edit db/manage.py and remove the '3' from the first line unless using python 3)
cd db/
./manage.py migrate
./manage.py createsuperuser

# Configure and restart Apache
# (edit conf/$PROJECTNAME.conf with correct domain name)
sudo chckconfig httpd on
sudo ln -s $PROJECTSDIR/$PROJECTNAME/conf/$PROJECTNAME.conf /etc/httpd/conf.d/
(edit conf/$PROJECTNAME.conf, replace "${APACHE_LOG_DIR}/" with "logs/")
(edit conf/$PROJECTNAME.conf, remove "python-home=/.../venv" from WSGIDaemonProcess)
sudo setsebool -P httpd_tmp_exec on
sudo service httpd restart

# generate htdocs folder via wq build
./deploy.sh 0.0.1
```

Visit the site in a web browser to verify the new installation.  You'll probably need to type in the server's IP address instead of the project name until your DNS is configured.  When the application loads, you should see "Hello world! Version 0.0.1", and links to log in and out.  You are now ready to start defining and registering [Django models] which will appear on the home screen after you rebuild the application with deploy.sh.

[install wq]: https://wq.io/docs/setup
[RHEL]: http://www.redhat.com/en/technologies/linux-platforms/enterprise-linux
[CentOS]: http://www.centos.org/
[update this file]: https://github.com/wq/wq/edit/master/docs/overview/setup-redhat.md
[Django models]: https://wq.io/docs/data-model
