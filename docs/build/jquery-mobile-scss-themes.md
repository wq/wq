jQuery Mobile SCSS Themes
=========================
[jquery-mobile.scss]

[wq.app] provides the ability to generate custom jQuery Mobile Themes via `jquery-mobile.scss`, which defines some useful SCSS mixins based on the [Compass] framework.
These mixins can be compiled into CSS via the [scss] option in the [wq build] process.

`jquery-mobile.scss` can be used to define additional theme swatches (e.g. 'f', 'g', and so on) for use together with the default swatches (a to e) provided in `jquery.mobile.css`.  It can also be used to define a fully custom theme, in which case the resulting CSS file should be used together with `jquery.mobile.structure.css` to provide a complete custom alternative to the default `jquery.mobile.css`.

The file `jquery-mobile.scss` provides three mixins:

  - `jquery-mobile-theme()` sets the colors and fonts for each theme swatch.
     It should be called once for each swatch.
  - `jquery-mobile-global()` configures global settings (in particular the highlight colors) and should be called once.
  - `jquery-mobile-icons()` sets up the default icon sprites.

If you are only adding additional swatches to the default themes, you will only need to use `jquery-mobile-theme()`.  If you are creating a full custom theme, you will want to use all three as in the example below.

Most of the arguments for the theme mixins are optional,
with defaults that mostly correspond to the generic theme created by opening the jQuery Mobile [theme roller].
In the example below, all of the options are shown with their default values.  In an actual project options with default values can be ommitted.  (For an example of an actual project, you may be interested in viewing the [themes.scss] for this website.)

### `themes.scss`

```scss
@import "wq/jquery-mobile";

@include jquery-mobile-theme(
  $theme:        a,
  $font:         Helvetica, Arial, sans-serif,  

  /* Title colors */
  $bar-border:   #b3b3b3, /* Outline color */
  $bar-bg:       #eee,    /* Solid color for browsers without gradient support */
  $bar-bg1:      #f0f0f0, /* Gradient start color */
  $bar-bg2:      #ddd,    /* Gradient end color */
  $bar-text:     #3e3e3e, /* Font color */
  $bar-shadow:   #fff,    /* Font shadow color (set to false for no shadow) */
  $bar-link:     #7cc4e7, /* Font hyperlink color */
  $bar-link-alt: #2489ce, /* Color for visited/active/hover links */

  /* Content colors */
  $body-border:  #aaa,
  $body-bg:      #f9f9f9,
  $body-bg1:     false, /* will match $body-bg*/,
  $body-bg2:     #eee,
  $body-text:    #333,
  $body-shadow:  #fff,
  $body-link:    #2489ce,

  /* Button colors (normal) */
  $up-border:    #ccc,
  $up-bg:        #eee,
  $up-bg1:       #fff,
  $up-bg2:       #f1f1f1,
  $up-text:      #2f3e46,
  $up-shadow:    #fff,
  
  /* Button colors (pressed) */
  $down-border:  #bbb,
  $down-bg:      #d6d6d6,
  $down-bg1:     #d0d0d0,
  $down-bg2:     #dfdfdf,
  $down-text:    #2f3e46,
  $down-shadow:  #fff,

  /* Button colors (hover) */
  $hover-border: #bbb,
  $hover-bg:     #dfdfdf,
  $hover-bg1:    #f6f6f6,
  $hover-bg2:    #e0e0e0,
  $hover-text:   #2f3e46,
  $hover-shadow: #fff

);

@include jquery-mobile-theme(
    $theme: 'b'

...

@include jquery-mobile-global(
  $font:      false,
  $round:     .6em,
  $btn-round: 1em,
  $inner:     #fff,

  $active-border: #2373a5,
  $active-bg:     #387bbe,
  $active-bg1:    #5393c5,
  $active-bg2:    #6facd5,
  $active-text:   #fff,
  $active-shadow: #3373a5
)

@include jquery-mobile-icons(
    /* This option should be set to wherever the sprite images are located in your project. */
    $url: "wq/lib/images" 
);

```

[jquery-mobile.scss]: https://github.com/wq/wq.app/blob/master/scss/wq/jquery-mobile.scss
[wq.app]: http://wq.io/wq.app
[scss]: http://wq.io/docs/scss
[Compass]: http://compass-style.org/
[theme roller]: http://jquerymobile.com/themeroller/
[wq build]: http://wq.io/docs/build
[themes.scss]: https://github.com/wq/wq-site/blob/master/app/scss/themes.scss
