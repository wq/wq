---
order: 4
indent: true
---

Installing wq and Apache on Ubuntu 16.04 LTS
============================================

The [wq framework] is designed to create fully custom applications, so most wq-powered projects eventually require running a public web server and installing a number of software packages.  If you are planning to self-host, you can follow the process below to get an application up and running.  (Be sure to use the referral link above to get a discount on hosting fees!)

> Note: If you are only experimenting with wq on your local machine, you may want to try [Installing wq locally][setup-local] instead of the more complex process documented here.

> Another Note: If you would rather not run a wq-powered server yourself, you may want to reach out to any of the [existing subscription-based projects and "campaign builder" apps][projects] to explore potential collaboration.  Our partners also provide [flexible support plans][contact] ranging from a couple of hours of installation support to full-service bespoke design, software development, and application hosting.

To run wq on a pulbic domain, you will need a WGSI-capable webserver like [Apache], and a database to host the application.  wq.db is generally used with [PostgreSQL] and [PostGIS], but any Django-supported database will work.  These instructions assume you will be using Apache and PostGIS.  These steps are tested on [Ubuntu 16.04 LTS][Ubuntu].

We recommend installing wq in a [venv] virtual environment.  This makes it easier to run multiple wq-powered applications on the same server.

```bash
# Install system libraries
sudo apt-get update
sudo apt-get install apache2 libapache2-mod-wsgi-py3 postgresql-9.5-postgis-2.2 python3-venv
sudo apt-get install nodejs-legacy

# Create project directory and venv
export PROJECTSDIR=/path/to/projects #e.g. /var/www
export PROJECTNAME=myproject
export DOMAINNAME=myproject.example.com

cd $PROJECTSDIR
sudo mkdir $PROJECTNAME
sudo chown `whoami` $PROJECTNAME
cd $PROJECTNAME
python3 -m venv venv
. venv/bin/activate
pip install --upgrade pip # optional

# Install wq within venv
pip install wq
wq start $PROJECTNAME . -d $DOMAINNAME
sudo chown www-data media/ # give Apache user permission to save uploads

# Create database
# (edit /etc/postgresql/9.5/main/pg_hba.conf and/or pg_ident.conf to set permissions)
sudo service postgresql restart
createuser -Upostgres $PROJECTNAME
createdb -Upostgres -O$PROJECTNAME $PROJECTNAME
psql -Upostgres $PROJECTNAME -c "CREATE EXTENSION postgis;"

# Install database tables & create admin account
# (edit db/$PROJECTNAME/local_settings.py with database info, if different than above)
cd db/
./manage.py migrate
./manage.py createsuperuser

# Configure and restart Apache
# (edit conf/$PROJECTNAME.conf and verify settings)
sudo ln -s $PROJECTSDIR/$PROJECTNAME/conf/$PROJECTNAME.conf /etc/apache2/sites-available/
sudo a2ensite $PROJECTNAME
# optional: disable existing default site and make $PROJECTNAME the server default
# sudo a2dissite 000-default
sudo a2enmod expires
sudo service apache2 restart

# generate htdocs folder via wq build
./deploy.sh 0.0.1

# To Enable HTTPS:
# (edit conf/$PROJECTNAME.conf, comment out WSGIDaemonProcess line)
# (see https://github.com/certbot/certbot/issues/1820)
sudo apt-get install python-letsencrypt-apache
sudo a2enmod ssl
sudo letsencrypt
# (edit /etc/apache2/sites-enabled/$PROECTNAME-le-ssl.conf, uncomment WSGIDaemonProcess line)
```

Visit the site in a web browser to verify the new installation.  You'll probably need to type in the server's IP address instead of the project name until your DNS is configured.  When the application loads, you should see "Hello world! Version 0.0.1", and links to log in and out.  You are now ready to start defining and registering [Django models] which will appear on the home screen after you rebuild the application with deploy.sh.

[install wq]: https://wq.io/docs/setup
[setup-local]: https://wq.io/docs/setup-local
[Ubuntu]: http://www.ubuntu.com/
[Debian]: https://www.debian.org/
[venv]: https://docs.python.org/3/library/venv.html
[Django models]: https://wq.io/docs/data-model
