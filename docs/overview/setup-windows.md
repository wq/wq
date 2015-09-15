---
order: 4
indent: true
---

Installing wq on Windows 8.1
============================

The following steps should help you [install wq] and get a wq-powered web application running on [Windows 8.1], [Windows 10], or [Windows Server 2012].  These steps are tested on Windows 8.1.

## Using both wq.db and wq.app

FIXME: This section is a WIP.

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

[install wq]: https://wq.io/docs/setup
[Windows 8.1]: http://windows.microsoft.com/
[Windows 10]: https://www.microsoft.com/windows/
[Windows Server 2012]: http://www.microsoft.com/en-us/server-cloud/products/windows-server-2012-r2/
[latest release]: https://github.com/wq/wq.app/releases
[js/wq]: https://wq.io/docs/app
[JavaScript dependencies]: https://wq.io/docs/third-party
[wq.app module list]: https://wq.io/docs/app
[Django wq template]: https://github.com/wq/django-wq-template
[wq init]: https://wq.io/docs/build
[wq build]: https://wq.io/docs/build
[optimize]: https://wq.io/docs/build
[near future]: https://github.com/wq/wq.db/issues/2
[volo]: http://volojs.org
[build docs]: https://wq.io/docs/build
[wq/wq#11]: https://github.com/wq/wq/issues/11
[Python 3]: https://www.python.org/downloads/
[Node]: http://nodejs.org
