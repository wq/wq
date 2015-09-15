---
order: 3
indent: true
---

Installing wq on Ubuntu 14.04 LTS
=================================

The following steps should help you [install wq] and get a wq-powered web application running on [Ubuntu], [Debian], or other similar Linux distributions.   These steps are tested on Ubuntu 14.04 LTS.

## Using both wq.db and wq.app

```bash
sudo apt-get update
sudo apt-get install apache2 libapache2-mod-wsgi-py3 postgresql-9.3-postgis-2.1 python3-pip python3-psycopg2
sudo pip3 install wq

# For wq.app build process (see https://github.com/wq/wq.app/issues/14)
sudo apt-get install nodejs-legacy

export PROJECTSDIR=/path/to/projects #e.g. /var/www
export PROJECTNAME=myproject

# Create project directory from wq template
cd $PROJECTSDIR
wq start $PROJECTNAME
cd $PROJECTNAME
sudo chown www-data media/ # give Apache user permission to save uploads

# Create database
# (edit /etc/postgresql/9.3/main/pg_hba.conf and/or pg_ident.conf to set permissions)
sudo service postgresql restart
createuser -Upostgres $PROJECTNAME
createdb -Upostgres -O$PROJECTNAME $PROJECTNAME
psql -Upostgres $PROJECTNAME -c "CREATE EXTENSION postgis;"

# Install database tables
# (edit db/$PROJECTNAME/local_settings.py with database info, if different than above)
cd db/
./manage.py migrate

# Configure and restart Apache
# (edit conf/$PROJECTNAME.conf with correct domain name)
sudo ln -s $PROJECTSDIR/$PROJECTNAME/conf/$PROJECTNAME.conf /etc/apache2/sites-available/
sudo a2ensite $PROJECTNAME
sudo a2dissite 000-default # optional - will make $PROJECTNAME the default site
sudo service apache2 restart

# generate htdocs folder via wq build
./deploy.sh 0.0.1
```

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
