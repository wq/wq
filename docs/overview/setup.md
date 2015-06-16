Getting Started
===============

The easiest way to install wq is via the [Python Package Index].  Any of [wq.app], [wq.db], or [wq.io] can be installed separately, or all three can be installed by simply installing the **wq** metapackage.  Either easy_install or pip should work.

> **Note:** As of version 0.7.0, wq is optimized for Python 3.  Python 2.7 is still supported for the time being but should be considered deprecated.

```bash
pip3 install wq
```

## Using wq.db and wq.app

If you are using wq.app and wq.db together, you may find it useful to take advantage of the [Django wq template] available on GitHub and via the `wq start` command.  You will need a WGSI-capable webserver like [Apache], and a database to host the application.  In theory any Django-supported database will work, but wq.db is optimized for use with [PostgreSQL] and [PostGIS].  You should be able to use something like the following to start a new wq-based Django project.

### On Ubuntu

Tested on Ubuntu 14.04 LTS.

```bash
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
sudo service apache2 restart

# generate htdocs folder via wq build
./deploy.sh 0.0.1
```

### On Windows
wq is used and tested primarily in a Linux environment, but works fine on Windows as well.  Please leave a comment at [wq/wq#11] if you would like the setup process for Windows (or other operating systems) to be documented.

## Using only wq.app
If you are only interested in using wq.app, you can run `pip3 install wq.app` or simply download the [latest release] directly from GitHub.  You will likely want to set up your project with the following layout (inspired by [volo]):
```bash
project/
  js/
    lib -> /path/to/wq.app/js
    myapp/
      main.js
    myapp.js
  css/
    lib -> /path/to/wq.app/css
    myapp.css
  images/
  templates/
  index.html
  wq.yml
```

Note that wq.app currently comes bundled with all of its [JavaScript dependencies] vendored in.  So, for many applications, you should be able to use wq.app's `js` folder directly as your `js/lib/` folder.  The typical workflow is to symbolically link to wq.app's `js` folder from your app's `js/lib` folder and similarly for css (and scss).  If you have other dependencies, or want to use different versions of the vendored apps, create your `js/lib/` folder first, and link to wq.app's [js/wq] folder from your `js/lib/wq`.  In either case, [wq init] can do the linking automatically.  An example wq.yml can be obtained from the [Django wq template].  The full list of options are documented in the [wq build] section.

### On Ubuntu
```bash
sudo pip3 install wq.app
mkdir /path/to/my/project
cd /path/to/my/project
mkdir js
mkdir css
(create wq.yml using your editor of choice)

# Link to wq.app assets
wq init
# ln -s /path/to/wq/app/js /path/to/my/project/js/lib
# ln -s /path/to/wq/app/css /path/to/my/project/css/lib
```

### On Windows
Download and install [Python 3] and [Node] if you don't have them already.  When installing Python, be sure to enable the option to add Python.exe to the system path.  (You might need to log out and back in for the setting to take effect.)  Then run the following from a command prompt:

```bash
pip3 install wq.app
```

Next, create a project folder with js & css subdirectories and a wq.yml configuration file.  Then run the following from a command prompt:

```bash
cd C:\path\to\my\project
wq init
```

If you get an error about `symbolic link privilege not held`, try running the command prompt as administrator.  If you are unable to do this, follow the Python 2 instructions below.

#### Python 2.7

You can also use wq.app with Python 2.7, though this usage is deprecated.  Python 2.7 on Windows does not support symbolic links, so `wq init` will not work.  You can copy the folder wq/app/js into your project's js folder and rename it to "lib".  Similarly, copy wq/app/css into your project's css folder and rename it to "lib".

### Utilizing wq.app
Once you have done this you should be able to reference wq.app's modules from your JavaScript code:
```javascript
// myapp/mymodule.js
define(['wq/chart'], function(chart) {
// do something
});
```
See the [wq.app module list] for available modules, and the [build docs] for information about available build options.

[Python Package Index]: https://pypi.python.org/pypi/wq
[wq.app]: https://wq.io/wq.app
[wq.db]: https://wq.io/wq.db
[wq.io]: https://wq.io/wq.io
[Apache]: http://httpd.apache.org/
[PostgreSQL]: http://www.postgresql.org/
[PostGIS]: http://postgis.net/
[latest release]: https://github.com/wq/wq.app/releases
[js/wq]: https://wq.io/docs/app
[JavaScript dependencies]: https://wq.io/docs/third-party
[wq.app module list]: https://wq.io/docs/app
[Django wq template]: https://github.com/wq/django-wq-template
[wq init]: https://wq.io/docs/build
[wq build]: https://wq.io/docs/build
[near future]: https://github.com/wq/wq.db/issues/2
[volo]: http://volojs.org
[build docs]: https://wq.io/docs/build
[wq/wq#11]: https://github.com/wq/wq/issues/11
[Python 3]: https://www.python.org/downloads/
[Node]: http://nodejs.org
