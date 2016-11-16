---
order: 3
indent: true
---

Installing wq on Ubuntu 16.04 LTS
=================================

The following steps should help you [install wq] and get a wq-powered web application running on [Ubuntu], [Debian], or other similar Linux distributions.   These steps are tested on Ubuntu 16.04 LTS.

As of wq 1.0, we recommend installing wq in a [venv] virtual environment.  This makes it easier to run multiple wq-powered applications on the same server.  The old way of using system-wide packages should still work.

## Using both wq.db and wq.app

```bash
# Install system libraries
sudo apt-get update
sudo apt-get install apache2 libapache2-mod-wsgi-py3 postgresql-9.5-postgis-2.2 python3-venv
sudo apt-get install nodejs-legacy

# Start a new project
export PROJECTSDIR=/path/to/projects #e.g. /var/www
export PROJECTNAME=myproject

cd $PROJECTSDIR
mkdir $PROJECTNAME
cd $PROJECTNAME
python3 -m venv venv
. venv/bin/activate

# Install wq 1.0.0b2 within venv
pip install wq --pre
wq start $PROJECTNAME .
sudo chown www-data media/ # give Apache user permission to save uploads

# Create database
# (edit /etc/postgresql/9.5/main/pg_hba.conf and/or pg_ident.conf to set permissions)
sudo service postgresql restart
createuser -Upostgres $PROJECTNAME
createdb -Upostgres -O$PROJECTNAME $PROJECTNAME
psql -Upostgres $PROJECTNAME -c "CREATE EXTENSION postgis;"
pip install psycopg2

# Install database tables & create admin account
# (edit db/$PROJECTNAME/local_settings.py with database info, if different than above)
cd db/
./manage.py migrate
./manage.py createsuperuser

# Configure and restart Apache
# (edit conf/$PROJECTNAME.conf with correct domain name)
# (edit conf/$PROJECTNAME.conf to ensure the venv is included in the WSGIDaemonProcess line)
# WSGIDaemonProcess $PROJECTNAME display-name=%{GROUP} python-home=$PROJECTSDIR/$PROJECTNAME/venv python-path=$PROJECTSDIR/$PROJECTNAME/db

sudo ln -s $PROJECTSDIR/$PROJECTNAME/conf/$PROJECTNAME.conf /etc/apache2/sites-available/
sudo a2ensite $PROJECTNAME
sudo a2dissite 000-default # optional - will make $PROJECTNAME the default site
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

Visit the site in a web browser to verify the new installation.  You'll probably need to type in the server's IP address instead of the project name until your DNS is configured.  When the application loads, you should see "Hello world! Version 0.0.1", and a couple of button-styled links to a login screen and a list view.  

## Using only wq.app

If you are only interested in using wq.app, you can run `pip3 install wq.app` or simply download the [latest release] directly from GitHub.  You will likely want to set up your project with the following layout (inspired by [volo]):
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
sudo pip3 install wq.app
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
[Ubuntu]: http://www.ubuntu.com/
[Debian]: https://www.debian.org/
[venv]: https://docs.python.org/3/library/venv.html
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
