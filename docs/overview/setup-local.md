---
order: 3
indent: true
---

Installing wq for local development
===================================

The following steps should help you [install wq] and get a wq-powered web application running for local development and testing.  These steps are tested on [Ubuntu 16.04 LTS][Ubuntu], but should work with minor changes on any OS that can run Python (Windows, OS X, etc.).  On Windows, we recommend installing the [Windows Subsystem for Linux][WSL] (WSL) if possible.

> Note: If you want to deploy wq on a public-facing webserver, you may want to [Install wq and Apache on Ubuntu][setup-ubuntu] instead of the process documented here.

### Configure Python
The first step in installing wq is to install [Python].  We recommend installing wq in a Python 3 [venv] virtual environment.

#### Ubuntu
On Ubuntu (including WSL), you may need to install the python3-venv package:

```bash
sudo apt-get update
sudo apt-get python3-venv
```
If you don't already have it install SQLite as well
```bash
sudo apt-get install sqlite3
```

If you plan to use wq's Node.js & npm integration, install the relevant package:

```bash
sudo apt-get install nodejs
```

Note that the initial setup process takes a few minutes when using npm, since it requires installing hundreds of npm packages instead of the prebuilt libraries included with the Python package.  On the other hand, enabling npm makes it easier to integrate additional third-party JavaScript libraries and development tools as needed.

#### Windows
If using Windows (without WSL), install Python 3 from the [Python website][Python].  The venv package is included with the Windows installation.  If you plan to use wq's Node.js & npm integration, you should also install [Node.js].

### Create Project

Once Python is configured, you can create a new wq project using the following commands.  The same commands will work in Bash (Ubuntu/WSL) as well as the CMD prompt (Windows).

```bash
# Create project directory and venv
mkdir myproject
cd myproject

# Install wq within venv
python3 -m venv venv
. venv/bin/activate
python3 -m pip install --upgrade pip # optional
python3 -m pip install wq

# Initialize project from wq template
wq start myproject .
# Answer prompts for:
#  - Web domain:    (Default is fine during development)
#  - Enable GIS?    (Leave default (N), or see below)
#  - Enable npm?    (Leave default unless you plan to use npm)
#  - Enable PGB?    (Leave default unless you plan to use PhoneGap Build)
#  - App Bundle ID: (Only required for PGB)

# Install database tables & create admin account
cd db/
./manage.py migrate
./manage.py createsuperuser
cd ..

# generate htdocs folder via wq build
./deploy.sh 0.0.1

# Start local Django server
cd db/
./manage.py runserver

```

Visit http://localhost:8000/ in a web browser to verify the new installation.  When the application loads, you should see "Hello world! Version 0.0.1", and links to log in and out.  You are now ready to start defining and registering [Django models] which will appear on the home screen after you rebuild the application with deploy.sh.

### Enable GIS Support (Optional)

The instructions above make use of the `--without-gis` flag (which was added to wq.start in 1.1.1, and became the default in wq.start 1.2.0).  If you would like to support geospatial input (e.g. map-drawn Polygons and Lines), you will need to enable GIS support via GeoDjango.  To do this, you can specify `wq start --with-gis` or answer Y at the "Enable GIS?" prompt.  You can also enable GIS for an existing project by uncommenting the lines referencing `django.contrib.gis` in each of the files under db/myprojects/settings/.

If you only need to support GPS coordinates, you can probably get by with numeric latitude and longitude fields and forgo the GeoDjango requirement.

Note that you will probably need to install the additional system libraries below to get GeoDjango to work.

#### Ubuntu

On Ubuntu, (including WSL), install the following libraries:

```bash
sudo apt-get install libsqlite3-mod-spatialite gdal-bin
```

In addition, ensure that the `SPATIALITE_LIBRARY_PATH` line in db/myproject/settings/dev.py is uncommented.

### Windows

Installing GDAL and other GeoDjango requirements on Windows somewhat more involved.  See the [GeoDjango documentation] for more information.

[install wq]: https://wq.io/docs/setup
[setup-ubuntu]: https://wq.io/docs/setup-ubuntu
[Python]: https://python.org
[Node.js]: https://nodejs.org
[Ubuntu]: http://www.ubuntu.com/
[Debian]: https://www.debian.org/
[venv]: https://docs.python.org/3/library/venv.html
[Django models]: https://wq.io/docs/data-model
[WSL]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[GeoDjango documentation]: https://docs.djangoproject.com/en/2.1/ref/contrib/gis/install/#windows
