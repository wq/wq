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
On Ubuntu (including WSL), you may need to install the python3-venv and spatialite packages:

```bash
sudo apt-get update
sudo apt-get python3-venv libsqlite3-mod-spatialite
```

#### Windows
If using Windows (without WSL), install Python 3 from the [Python website][Python].  The venv package is included with the Windows installation.

### Create Project

Once Python is configured, you can create a new wq project using the following commands.  The same commands will work in Bash (Ubuntu/WSL) as well as the CMD prompt (Windows).

```bash
# Create project directory and venv
mkdir myproject
cd myproject

# Install wq within venv
python3 -m venv venv
. venv/bin/activate
pip install --upgrade pip # optional
pip install wq

# Initialize project from wq template
wq start myproject . -d myproject.example.com

# Install database tables & create admin account
cd db/
./manage.py migrate
./manage.py createsuperuser

# generate htdocs folder via wq build
./deploy.sh 0.0.1

# Start local Django server
./manage.py runserver

```

Visit http://localhost:8000/ in a web browser to verify the new installation.  When the application loads, you should see "Hello world! Version 0.0.1", and links to log in and out.  You are now ready to start defining and registering [Django models] which will appear on the home screen after you rebuild the application with deploy.sh.

[install wq]: https://wq.io/docs/setup
[setup-ubuntu]: https://wq.io/docs/setup-ubuntu
[Python]: https://python.org
[Ubuntu]: http://www.ubuntu.com/
[Debian]: https://www.debian.org/
[venv]: https://docs.python.org/3/library/venv.html
[Django models]: https://wq.io/docs/data-model
[WSL]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
