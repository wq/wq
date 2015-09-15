---
order: 5
indent: true
---

Installing wq on CentOS 7
=========================

The following steps should help you [install wq] and get a wq-powered web application running on [RHEL], [CentOS], or other similar Linux distributions.   These steps are tested on CentOS 7.

> Note: These instructions use Python 2, which is easier to get running on RHEL and CentOS than Python 3.  If you are a regular user of RHEL or CentOS, feel free to [update this file] with instructions for Python 3.

## Using both wq.db and wq.app

```bash

# See yum.postgresql.org for the URL for your distro
sudo yum install http://yum.postgresql.org/9.4/redhat/rhel-7-x86_64/pgdg-centos94-9.4-1.noarch.rpm

sudo yum install epel_release
sudo yum install httpd mod_wsgi postgresql94-server postgis2_94 python-pip python-psycopg2
sudo pip install wq

# For wq.app build process (see https://github.com/wq/wq.app/issues/14)
sudo yum install nodejs

export PROJECTSDIR=/path/to/projects #e.g. /var/www
export PROJECTNAME=myproject

# Create project directory from wq template
cd $PROJECTSDIR
wq start $PROJECTNAME
cd $PROJECTNAME
sudo chown apache media/ # give Apache user permission to save uploads

# Create database
# See https://wiki.postgresql.org/wiki/YUM_Installation
sudo /usr/pgsql-9.4/bin/postgresql94-setup initdb
sudo chkconfig postgresql-9.4 on
# (edit /var/lib/pgsql/9.4/data/pg_hba.conf and/or pg_ident.conf to set permissions)
sudo service postgresql-9.4 restart
createuser -Upostgres $PROJECTNAME
createdb -Upostgres -O$PROJECTNAME $PROJECTNAME
psql -Upostgres $PROJECTNAME -c "CREATE EXTENSION postgis;"

# Install database tables
# (edit db/$PROJECTNAME/local_settings.py with database info, if different than above)
# (edit db/manage.py and remove the '3' from the first line unless using python 3)
cd db/
./manage.py migrate

# Configure and restart Apache
# (edit conf/$PROJECTNAME.conf with correct domain name)
sudo chckconfig httpd on
sudo ln -s $PROJECTSDIR/$PROJECTNAME/conf/$PROJECTNAME.conf /etc/httpd/conf.d/
(edit conf/$PROJECTNAME.conf, replace "${APACHE_LOG_DIR}/" with "logs/")
sudo service httpd restart

# generate htdocs folder via wq build
./deploy.sh 0.0.1
```

## Using only wq.app

If you are only interested in using wq.app, you can run `pip install wq.app` or simply download the [latest release] directly from GitHub.  You will likely want to set up your project with the following layout (inspired by [volo]):
```bash
project/
  js/
    lib/ -> /path/to/wq.app/js/
    myapp/
      main.js
    myapp.js
  css/
    lib/ -> /path/to/wq.app/css/
    myapp.css
  scss/
    lib/
      wq/ -> /path/to/wq.app/scss/wq
      compass/ -> /path/to/compass_stylesheets/stylesheets/compass/
    themes.scss
  images/
  templates/
  index.html
  wq.yml
```

Note that wq.app currently comes bundled with all of its [JavaScript dependencies] vendored in.  So, for many applications, you should be able to use wq.app's `js/` folder directly as your `js/lib/` folder.  The typical workflow is to symbolically link to wq.app's `js/` folder from your app's `js/lib/` folder and similarly for css and scss.  If you have other dependencies, or want to use different versions of the vendored apps, create your `js/lib/` folder first, and link to wq.app's [js/wq] folder from `js/lib/wq/`.

In either case, [wq init] can do the linking automatically.  If you use the default `js/`, `css/`, and/or `scss/` folder names, `wq init` will work without any configuration required.  That said, you'll likely want to create a configuration file called `wq.yml` with an [optimize] section (which is required to run the build process).  An example `wq.yml` can be obtained from the [Django wq template](https://github.com/wq/wq-django-template/blob/master/django_project/app/wq.yml).  The full list of options are documented in the [wq build] section.

```bash
sudo pip install wq.app
mkdir /path/to/my/project
cd /path/to/my/project
mkdir js
mkdir css
mkdir scss
# (create wq.yml using your editor of choice)

# Link to wq.app assets
wq init

# Equivalent:
# ln -s /path/to/wq/app/js /path/to/my/project/js/lib
# ln -s /path/to/wq/app/css /path/to/my/project/css/lib
# mkdir scss/lib
# ln -s /path/to/wq/app/scss/wq /path/to/my/project/scss/lib/wq
# ln -s /path/to/compass_stylesheets/stylesheets/compass/ /path/to/my/project/scss/lib/compass/
```

### Utilizing wq.app
Once you have done this you should be able to reference wq.app's modules from your JavaScript code:
```javascript
// myapp/mymodule.js
define(['wq/chart'], function(chart) {
// do something
});
```
See the [wq.app module list] for available modules, and the [build docs] for information about available build options.

[install wq]: https://wq.io/docs/setup
[RHEL]: http://www.redhat.com/en/technologies/linux-platforms/enterprise-linux
[CentOS]: http://www.centos.org/
[update this file]: https://github.com/wq/wq/edit/master/docs/overview/setup-redhat.md
[latest release]: https://github.com/wq/wq.app/releases
[js/wq]: https://wq.io/docs/app
[JavaScript dependencies]: https://wq.io/docs/third-party
[wq.app module list]: https://wq.io/docs/app
[Django wq template]: https://github.com/wq/django-wq-template
[wq init]: https://wq.io/docs/build
[wq build]: https://wq.io/docs/build
[optimize]: https://wq.io/docs/build
[volo]: http://volojs.org
[build docs]: https://wq.io/docs/build
