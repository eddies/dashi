# dashi: data made delicious
Dashi is dashboard for data visualizations.

## Getting Started
Presumably you've arrived at this point after having run the [Dashi generator](https://github.com/eddies/generator-dashi) (`yo dashi`).

You might start with running
```bash
grunt serve
```

which will fire up your Dashi app and let you view it in your browser.

Next, you'll probably want to start editing `app/index.html` and `app/main.js`.

If you're using GitHub for your Dashi app, Dashi can publish your app to GitHub pages.
Just use
```bash
grunt gh-pages
```

Enjoy!

## What's underneath the hood?
The dashboard template comes courtesy of [AdminLTE](https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html). AdminLTE is a MIT-licensed, responsive HTML template, which is itself based on the [Bootstrap 3](http://getbootstrap.com/) framework.

The multidimensional charting comes courtesy of [dc.js](https://dc-js.github.io/dc.js/), an Apache 2.0 licensed JavaScript charting library built on [Crossfilter](https://square.github.io/crossfilter/) and [D3](http://d3js.org/).

 