SCSS
====

[wq.app.build.compilers.scss]

The [wq build] process provides a simple configuration-based way to utilize SCSS, based on the [pyScss] Python library. SCSS (a form of [SASS]) is a superset of CSS that helps streamline common CSS patterns.

The default behavior of `wq scss` is to process all `.scss` files in the `scss/` folder into `.css` files in the `css/` folder (both relative to the current directory). This will overwrite any existing files, so be sure to use different file names for any CSS files you create directly!  If you are using a version control system like Git or Subversion, you may also want to use `.gitignore` or `svn:ignore` to avoid checking in the compiled css versions of your SCSS files.

You can override the directory paths by specifying an `indir` and `outdir` configuration in your [wq.yml] or (as of wq.app 0.8.0) via the command line.  For more information, run `wq scss --help`.

The [Compass] framework provides a number of useful functions for generating cross-browser CSS3 styles including gradients and rounded corners.  wq.app includes a Compass-based SCSS stylesheet for generating [custom jQuery mobile themes].  To utilize these features, you can use [wq init] to link the assets from Compass and from wq.app's scss folder into your project's scss folder.

[wq.app.build.compilers.scss]: https://github.com/wq/wq.app/blob/v0.8.0/build/compilers.py#L45-L81
[SASS]: http://sass-lang.com/
[pyScss]: https://github.com/Kronuz/pyScss
[wq build]: https://wq.io/docs/build
[build configuration]: https://wq.io/docs/build
[wq.yml]: https://github.com/wq/wq-django-template/blob/master/django_project/app/wq.yml
[custom jQuery mobile themes]: https://wq.io/docs/jquery-mobile-scss-themes
[Compass]: http://compass-style.org/
[wq init]: https://wq.io/docs/setup
