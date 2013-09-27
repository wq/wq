Getting Started
===============

The easiest way to install wq is via the [Python Package Index].  Any of [wq.app], [wq.db], or [wq.io] can be installed separately, or all three can be installed by simply installing the **wq** metapackage.  Either easy_install or pip should work.  wq currently only supports Python 2.7, though it will support Python 3 in the [near future].

```bash
pip install wq
```

## Creating a Simple HTML5 Application

If you are only interested in using wq.app, you can run `pip install wq.app` or simply download the [latest release] directly from Github.  The typical workflow is to copy or link to wq.app's js folder from your app's js folder and similarly for css.  [wq init] can do this automatically.

### On Ubuntu
```bash
ln -s /path/to/wq/app/js /path/to/my/project/js/wq
ln -s /path/to/wq/app/css /path/to/my/project/css/wq
```
### On Windows
Copy the folder wq/app/js into your project's js folder and rename it to "wq".  Similarly, copy wq/app/css into your project's css folder and rename it to "wq".

### Utilizing wq.app
Once you have done this you should be able to reference [wq.app's modules] from your JavaScript code:
```javascript
// mymodule.js
define(['wq/chart'], function(chart) {
// do something
});
```

## Creating a Django Project

If you are using wq.app and wq.db together, you may find it useful to take advantage of the [Django wq template] available on GitHub.  After you have installed wq, you should be able to use something like the following to start a new wq-based Django project.

### On Ubuntu
```bash
export PROJECTSDIR=/path/to/projects
export PROJECTNAME=myproject

# Create project directory from wq template
cd $PROJECTSDIR
django-admin.py startproject $PROJECTNAME --template https://github.com/wq/django-wq-template/archive/master.zip --extension py,json,conf,html,sh
cd $PROJECTNAME
chmod +x deploy.sh db/manage.py
./deploy.sh 0.0.1 # generates htdocs folder via wq build

# Install database tables
(edit db/$PROJECTNAME/local_settings.py with database information)
cd db/
./manage.py syncdb
./manage.py migrate

# Configure and restart Apache
(edit conf/httpd.conf with correct domain name)
sudo ln -s $PROJECTSDIR/$PROJECTNAME/conf/httpd.conf /etc/apache2/sites-available/$PROJECTNAME
sudo a2ensite $PROJECTNAME
sudo service apache2 reload
```
[Python Package Index]: https://pypi.python.org/pypi/wq
[wq.app]: http://wq.io/wq.app
[wq.db]: http://wq.io/wq.db
[wq.io]: http://wq.io/wq.io
[latest release]: https://github.com/wq/wq.app/releases
[wq.app's modules]: http://wq.io/docs/app
[Django wq template]: https://github.com/wq/django-wq-template
[wq init]: http://wq.io/docs/build
[wq build]: http://wq.io/docs/build
[near future]: https://github.com/wq/wq.db/issues/2