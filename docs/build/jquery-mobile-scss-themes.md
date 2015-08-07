jQuery Mobile SCSS Themes
=========================
[wq/jquery-mobile.scss]

[wq.app] provides the ability to generate custom jQuery Mobile Themes via [wq/jquery-mobile.scss] and [wq/swatches.scss], which define some useful SCSS mixins based on the [Compass] framework. 
If you're using wq.app, these mixins can be compiled into CSS via the [scss] option in the [wq build] process.
They can also be used independently by downloading the files and placing them with your other SCSS/SASS code.

[wq/jquery-mobile.scss] can be used to define additional theme swatches (e.g. 'c', 'd', and so on) for use together with the default swatches ('a' & 'b') provided in `jquery.mobile.css`.  It can also be used to define a fully custom theme, in which case the resulting CSS file should be used together with the included `jquery.mobile.structure.css` and `jquery.mobile.icons.css` to provide a complete custom alternative to the default `jquery.mobile.css`.  Note that the generated theme CSS should be loaded *before* jQuery Mobile's structure.css for correct rule ordering (see the example `myproject.css` below).

The file `wq/jquery-mobile.scss` provides two mixins:

  - `jquery-mobile-theme()` sets the colors and fonts for each theme swatch.
     It should be called once for each swatch.
  - `jquery-mobile-global()` configures global settings and should be called once.

If you are only adding additional swatches to the default themes, you will only need to use `jquery-mobile-theme()`.  If you are creating a full custom theme, you will want to use both mixins as in the example below.

Most of the arguments for the theme mixins are optional,
with defaults that correspond to the default 'a' swatch and the generic theme created by opening the jQuery Mobile [theme roller].
In the example below, all of the options are set with their default values, which is somewhat redundant.  For an example of an actual project, you may be interested in viewing the [themes.scss] for this website.

[wq/swatches.scss] provides a number of predefined jQuery Mobile swatches for common use cases, including a yellow/"alert" swatch and a backwards-compatible theme that mimics jQuery Mobile 1.3 (and earlier) styles.

 - `jquery-mobile-gray-theme()`: a swatch that matches the default "a" swatch.
 - `jquery-mobile-black-theme()`: a swatch matches the default "b" swatch.
 - `jquery-mobile-classic-b-theme()`: a swatch that matches the default "b" swatch from older versions of jQuery Mobile (blue bars, gray content)
 - `jquery-mobile-yellow-theme()`: A yellow / "alert" swatch
 - `jquery-mobile-blue-theme()`: An experimental blue swatch
 - `jquery-mobile-default-themes()`: generates a gray ("a") and black ("b") swatch to match the default themes.
 - `jquery-mobile-classic-themes()`: generates five swatches ("a" through "e") that roughly correspond to the jQuery Mobile 1.3 (and earlier) default theme.

<a href="https://wq.io/wq.app/tests/swatches.html" rel="external" target="_blank" data-role="button" data-inline="true">
  Swatch Preview Tool
</a>

### `myproject.css`
```css
@import url(themes.css);  /* generated via `wq scss` */
@import url(lib/jquery.mobile.icons.css); /* included in wq.app */
@import url(lib/jquery.mobile.structure.css); /* included in wq.app */
@import url(myproject/base.css); /* non-SCSS project-specific styles */
```

### `themes.scss`

```scss
@import "wq/jquery-mobile";

@include jquery-mobile-theme(
  $theme:        a,
  $font:         Helvetica, Arial, sans-serif,  

  /* Page colors */
  $page-text:    #333,    /* Font color */
  $page-shadow:  #f3f3f3, /* Font shadow color (set to false for no shadow) */
  $page-bg:      #f9f9f9, /* Background color */
  $page-border:  #bbb,    /* Outline color */

  /* Title bar colors */
  $bar-text:     #333,
  $bar-shadow:   #eee,
  $bar-bg:       #e9e9e9,
  $bar-border:   #ddd,

  /* Content colors */
  $body-text:    #333,
  $body-shadow:  #f3f3f3,
  $body-bg:      #fff,
  $body-border:  #ddd,

  /* Hyperlink colors */
  $link:         #38c,
  $link-visited: #38c,
  $link-hover:   #059,
  $link-active:  #059,

  /* Button colors (normal) */
  $up-text:      #333,
  $up-shadow:    #f3f3f3,
  $up-bg:        #f6f6f6,
  $up-border:    #ddd,
  
  /* Button colors (pressed) */
  $down-text:    #333,
  $down-shadow:  #f3f3f3,
  $down-bg:      #e8e8e8,
  $down-border:  #ddd,

  /* Button colors (hover) */
  $hover-text:   #333,
  $hover-shadow: #f3f3f3,
  $hover-bg:     #ededed,
  $hover-border: #ddd,

  /* Active styles */
  $active-text:   #fff,
  $active-shadow: #059,
  $active-bg:     #38c,
  $active-border: #1c4a70
);

@include jquery-mobile-theme(
  $theme: b

...

@include jquery-mobile-global(
  $font:      sans-serif,
  $round:     .6em,
  $btn-round: .3125em,
);

```

[wq/jquery-mobile.scss]: https://github.com/wq/wq.app/blob/master/scss/wq/jquery-mobile.scss
[wq/swatches.scss]: https://github.com/wq/wq.app/blob/master/scss/wq/swatches.scss
[wq.app]: https://wq.io/wq.app
[scss]: https://wq.io/docs/scss
[Compass]: http://compass-style.org/
[theme roller]: http://jquerymobile.com/themeroller/
[wq build]: https://wq.io/docs/build
[themes.scss]: https://github.com/powered-by-wq/wq.io/blob/master/app/scss/themes.scss
