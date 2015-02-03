jQuery Mobile SCSS Themes
=========================
[jquery-mobile.scss]

[wq.app] provides the ability to generate custom jQuery Mobile Themes via `jquery-mobile.scss`, which defines some useful SCSS mixins based on the [Compass] framework. 
These mixins can be compiled into CSS via the [scss] option in the [wq build] process.

`jquery-mobile.scss` can be used to define additional theme swatches (e.g. 'c', 'd', and so on) for use together with the default swatches ('a' & 'b') provided in `jquery.mobile.css`.  It can also be used to define a fully custom theme, in which case the resulting CSS file should be used together with the included `jquery.mobile.structure.css` and `jquery.mobile.icons.css` to provide a complete custom alternative to the default `jquery.mobile.css`.

The file `jquery-mobile.scss` provides two mixins:

  - `jquery-mobile-theme()` sets the colors and fonts for each theme swatch.
     It should be called once for each swatch.
  - `jquery-mobile-global()` configures global settings and should be called once.

The `jquery-mobile-icons()` mixin available in older versions of wq.app is now available as a plain CSS file.

If you are only adding additional swatches to the default themes, you will only need to use `jquery-mobile-theme()`.  If you are creating a full custom theme, you will want to use all three as in the example below.

Most of the arguments for the theme mixins are optional,
with defaults that mostly correspond to the default 'a' swatch and the generic theme created by opening the jQuery Mobile [theme roller].
In the example below, all of the options are shown with their default values.  In an actual project options with default values can be omitted.  (For an example of an actual project, you may be interested in viewing the [themes.scss] for this website.)

**New in 0.7.0:** In keeping with current design trends an jQuery Mobile 1.4 styles, support for gradient backgrounds has been removed.  This simplifies both the implementation and usage of jquery-mobile.scss.

Note that the generated theme CSS should be loaded *before* jQuery Mobile's structure.css for correct rule ordering.

### `myproject.css`
```css
@import url(themes.css);
@import url(lib/jquery.mobile.icons.css);
@import url(lib/jquery.mobile.structure.css);
@import url(myproject/base.css);
```

### `themes.scss`

```scss
@import "lib/wq/jquery-mobile";

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
  $active-border: #38c
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

[jquery-mobile.scss]: https://github.com/wq/wq.app/blob/master/scss/wq/jquery-mobile.scss
[wq.app]: http://wq.io/wq.app
[scss]: http://wq.io/docs/scss
[Compass]: http://compass-style.org/
[theme roller]: http://jquerymobile.com/themeroller/
[wq build]: http://wq.io/docs/build
[themes.scss]: https://github.com/wq/wq-site/blob/master/app/scss/themes.scss
