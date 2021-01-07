
How To: Set up wq with SQLite
=============================

The following steps should help you [install wq] and get a wq-powered web application running for local development and testing.  These steps are tested on [Ubuntu 20.04 LTS][Ubuntu], but should work with minor changes on any OS that can run Python (Windows, OS X, etc.).  On Windows, we recommend installing the [Windows Subsystem for Linux][WSL] (WSL) if possible.

1. [Install Python](#install-python)
2. [Create Project Directory](#create-project-directory)
3. [Initialize wq Framework](#initialize-wq-framework)
4. [Initialize SQLite](#initialize-sqlite)
5. [Start Django Server](#start-django-server)
6. [Optional: Enable GIS Support](#optional-enable-gis-support)

> Note: If you want to deploy wq on a public-facing webserver, you may want to [set up wq with Apache & PostgreSQL][setup-ubuntu] instead of the process documented here.

## Install Python
The first step in installing wq is to install [Python].  We recommend installing wq in a Python 3 [venv] virtual environment.

### Ubuntu
On Ubuntu (including WSL), you may need to install the python3-venv package:

```bash
sudo apt update
sudo apt python3-venv
```
If you don't already have it install SQLite as well
```bash
sudo apt install sqlite3
```

#### Optional: Install Node

If you plan on using wq's optional npm integration, you will also need to install node and npm. If you do so, we recommend installing from NodeSource. You can also install npm from Ubuntu universe, but (as of this writing) that requires 563MB of dependencies including the deprecated Python 2.

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
```

> Note that the [framework initialization step](#initialize-wq-framework) will take a few minutes when using npm, since it requires installing hundreds of npm packages instead of the prebuilt libraries included with the Python package.  On the other hand, enabling npm makes it easier to integrate additional third-party JavaScript libraries and development tools as needed.

### Windows

If using Windows (without WSL), install Python 3 from the [Python website][Python].  The venv package is included with the Windows installation.  If you plan to use wq's Node.js & npm integration, you should also install [Node.js].

## Create Project Directory

Once Python is configured, you can create a new wq project using the following commands.  The same commands will work in Bash (Ubuntu/WSL) as well as the CMD prompt (Windows).

```bash
mkdir myproject
cd myproject

python3 -m venv venv
. venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install wheel
```

## Initialize wq framework

```bash
python3 -m pip install wq==1.3.0a1

# Note the trailing dot since we are already in the project folder
wq start myproject .

# Answer prompts for:
#  - Web domain:    (Default is fine during development)
#  - Enable GIS?    (Leave default (N), or see below)
#  - Enable npm?    (Leave default unless you plan to use npm)

```

## Initialize SQLite

Run the commands below to create the initial database tables and admin account.

```bash
cd db/
./manage.py migrate
./manage.py createsuperuser
cd ..
```

This should create a sqlite database in the conf/ directory.

## Start Django Server

```bash
# generate htdocs folder via wq build
./deploy.sh 0.0.1

# Start local Django server
cd db/
./manage.py runserver
```

Visit http://localhost:8000/ in a web browser to verify the new installation.  When the application loads, you should see the default wq-themed app template with links to log in and out.  You are now ready to start defining and registering [Django models] which will appear on the home screen after you rebuild the application with deploy.sh.

## Optional: Enable GIS Support

The instructions above make use of the `--without-gis` flag.  If you would like to support geospatial input (e.g. map-drawn Polygons and Lines), you will need to enable GIS support via GeoDjango.  To do this, you can specify `wq start --with-gis` or answer Y at the "Enable GIS?" prompt.  You can also enable GIS for an existing project by uncommenting the lines referencing `django.contrib.gis` in each of the files under db/myprojects/settings/.

If you only need to support GPS coordinates, you can probably get by with numeric latitude and longitude fields and forgo the GeoDjango requirement.

Note that you will probably need to install the additional system libraries below to get GeoDjango to work.

### Ubuntu

On Ubuntu, (including WSL), install the following libraries:

```bash
sudo apt install libsqlite3-mod-spatialite gdal-bin
```

In addition, ensure that the `SPATIALITE_LIBRARY_PATH` line in db/myproject/settings/dev.py is uncommented.

### Windows

Installing GDAL and other GeoDjango requirements on Windows somewhat more involved.  See the [GeoDjango documentation] for more information.  Also, note that you will need to remove the `.so` extension from `SPATIALITE_LIBRARY_PATH`.

[install wq]: ../overview/setup.md
[setup-ubuntu]: ./setup-wq-with-apache-postgresql.md
[Python]: https://python.org
[Node.js]: https://nodejs.org
[Ubuntu]: http://www.ubuntu.com/
[Debian]: https://www.debian.org/
[venv]: https://docs.python.org/3/library/venv.html
[Django models]: ../overview/data-model.md
[WSL]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[GeoDjango documentation]: https://docs.djangoproject.com/en/3.1/ref/contrib/gis/install/#windows
