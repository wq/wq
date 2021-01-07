# How To: Set up wq with Apache & PostgreSQL

The [wq framework] is designed to create fully custom applications, so most wq-powered projects eventually require running a public web server and installing a number of software packages.  If you are planning to self-host, you can follow the process below to get an application up and running.

To run wq on a public website, you will need a WGSI-capable webserver like [Apache], and a database to host the application.  You will also need to obtain or configure a DNS record pointing a domain or subdomain to your server.  wq.db is generally used with [PostgreSQL] and [PostGIS], but any Django-supported database will work.  These instructions assume you will be using Apache and PostGIS.  These steps are tested on [Ubuntu 20.04 LTS][Ubuntu].

1. [Install System Libraries](#install-system-libraries)
2. [Create Project Directory](#create-project-directory)
3. [Initialize wq Framework](#initialize-wq-framework)
4. [Configure PostgreSQL](#configure-postgresql)
5. [Configure Apache](#configure-apache)

> Note: If you are only experimenting with wq on your local machine, you may want to [set up wq with SQLite][setup-local] instead of the more complex process documented here.

## Install System Libraries

On Ubuntu 20.04, the default PostgreSQL version is 12 and the PostGIS version is 3.  On a different Ubuntu version, you may need to find the corresponding PostGIS package.  The names of the other libraries will generally be the same. 

```bash
sudo apt update
sudo apt install apache2 libapache2-mod-wsgi-py3 postgresql-12-postgis-3 python3-venv
```

### Optional: Install Node

If you plan on using wq's optional npm integration, you will also need to install node and npm.  If you do so, we recommend installing from NodeSource.  You can also install npm from Ubuntu universe, but (as of this writing) that requires 563MB of dependencies including the deprecated Python 2.

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
```


## Create Project Directory

We recommend installing wq in a [venv] virtual environment.  This isolates the project dependencies and makes it easier to run multiple wq-powered applications on the same server.

```bash
export PROJECTNAME=myproject

cd /var/www/
sudo mkdir $PROJECTNAME
sudo chown `whoami` $PROJECTNAME
cd $PROJECTNAME
python3 -m venv venv
. venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install wheel
```

## Initialize wq Framework

```bash
python3 -m pip install wq==1.3.0a1

# Note the trailing dot since we are already in the project folder
wq start $PROJECTNAME .

# Answer prompts for:
#  - Web domain:    (Change to match DNS)
#  - Enable GIS?    (Default is N, change to Y)
#  - Enable npm?    (Leave default as N unless you plan to use npm)

sudo chown www-data media/ # give Apache user permission to save uploads
```

## Configure PostgreSQL

```bash
# (edit /etc/postgresql/12/main/pg_hba.conf and/or pg_ident.conf to set permissions)
sudo systemctl reload postgresql
createuser -Upostgres $PROJECTNAME
createdb -Upostgres -O$PROJECTNAME $PROJECTNAME
psql -Upostgres $PROJECTNAME -c "CREATE EXTENSION postgis;"

# (edit db/$PROJECTNAME/settings/prod.py with database info, if different than above)

# Make sure manage.py points to PostgreSQL, not SQLite
rm db/$PROJECTNAME/settings/dev.py
# (edit manage.py and replace '.dev' with '.prod')

# Install database tables & create admin account
cd db/
./manage.py migrate
./manage.py createsuperuser
```

## Configure Apache

```bash
# (edit conf/$PROJECTNAME.conf and verify settings)
sudo ln -s /var/www/$PROJECTNAME/conf/$PROJECTNAME.conf /etc/apache2/sites-available/
sudo a2ensite $PROJECTNAME
# optional: disable existing default site and make $PROJECTNAME the server default
# sudo a2dissite 000-default
sudo systemctl apache2 restart

# generate htdocs folder via wq build
./deploy.sh 0.0.1

# To Enable HTTPS:
# (edit conf/$PROJECTNAME.conf, comment out WSGIDaemonProcess line)
# (see https://github.com/certbot/certbot/issues/1820)
sudo apt install certbot
sudo a2enmod ssl
sudo certbot --apache
# (edit /etc/apache2/sites-enabled/$PROJECTNAME-le-ssl.conf, uncomment WSGIDaemonProcess line)
```

Visit the site in a web browser to verify the new installation.  You'll probably need to type in the server's IP address instead of the project name until your DNS is configured.  When the application loads, you should see the default wq-themed app template with links to log in and out.  You are now ready to start defining and registering [Django models] which will appear on the home screen after you rebuild the application with deploy.sh.

[install wq]: ../overview/setup.md
[setup-local]: ./setup-wq-with-sqlite.md
[Ubuntu]: http://www.ubuntu.com/
[venv]: https://docs.python.org/3/library/venv.html
[Django models]: ../overview/data-model.md

[wq framework]: ../overview/intro.md
[Apache]: http://httpd.apache.org/
[PostgreSQL]: http://www.postgresql.org/
[PostGIS]: http://postgis.net/
[projects]: https://wq.io/projects/
[contact]: https://wq.io/community
