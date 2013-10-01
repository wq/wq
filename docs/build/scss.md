SCSS
====

[wq.app.util.compilers.scss]

The [wq build] process provides a simple configuration-based way to utilize SCSS, based on the [pyScss] Python library. SCSS (a form of [SASS]) is a superset of CSS that helps streamline common CSS patterns.

To utilize the `scss` feature of wq build, add the following to your [build configuration] file.

```javascript
{
   // ...
   
   'scss': {
       'indir': 'scss',
       'outdir': 'css'
   }
}
```
This will cause all `.scss` files in the `scss/` folder to be processed into `.css` files in the `css/` folder (both relative to your build configuration). This will overwrite any existing files so be sure to use different file names for any CSS files you create directly!  If you are using a version control system like Git or Subversion, you may also want to use `.gitignore` or `svn:ignore` to avoid checking in the compiled css versions of your SCSS files.

The [Compass] framework provides a number of useful functions for generating cross-browser CSS3 styles including gradients and rounded corners.  wq.app includes a Compass-based SCSS stylesheet for generating [custom jQuery mobile themes].  To utilize these features, you may need to link or copy the assets from Compass and from wq.app's scss folder into your project's scss folder to ensure the build process can find them. The [scss source for this website] may be useful as example.

[wq.app.util.compilers.scss]: https://github.com/wq/wq.app/blob/master/util/compilers.py#L26-L46
[SASS]: http://sass-lang.com/
[pyScss]: https://github.com/Kronuz/pyScss
[wq build]: http://wq.io/docs/build
[build configuration]: http://wq.io/docs/build
[custom jQuery mobile themes]: http://wq.io/docs/jquery-mobile-scss-themes
[Compass]: http://compass-style.org/
[scss source for this website]: https://github.com/wq/wq-site/tree/master/app/scss
