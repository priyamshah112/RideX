hogan-middleware
================

Middleware component to use Hogan.js mustache templates as views in an Express server

Usage
=====

    var app = express();

    app.configure(function () {
      app.set('views', __dirname + '/views'); // tell express which directory your views are in
      app.set('view engine', 'mustache');     // name your templates
      app.engine('mustache', require('hogan-middleware').__express); // register the engine
    });

Once registered, your routing in express can use a mustache file name as the view to be rendered:

    app.get('/', req, res, next) {
      res.render('home', { SiteName: 'My Website' });
    }

In this case there is a file named `home.mustache` in the `views` directory that may have content as:

    <!doctype html>
    <html>
      <head><title>Hello World</title></head>
      <body>
        <h1>{{SiteName}}</h1>
      </body>
    </html>
    
Configuration
=============

Optional functionality in the middleware can be set before passing it into express:

```
var hoganMiddleware = require('hogan-middleware');
hoganMiddleware({
   filter: ['**.mustache'],   // override the default file extension searched for
                              // default is just the mustache file extension

   flatten: true,             // make all partials available with just their file name
                              // rather than the slash delimited path. default is enabled

   watch: true                // set to false to remove the live updating watchers -
                              // can be useful for running in production where files
                              // will not be regularly changing.
});

app.engine('mustache', hoganMiddleware.__express);
```

Partial Templates
=================

Mustache allows the use of partial templates, this is supported by the middleware component by making all templates
available as partial templates when rendering a template.

When `home.mustache` is being used as the name of the template to be rendered, that can include `a.mustache` from the
views directory by adding `{{>a}}`. As `a.mustache` is rendered as a partial, that also has all templates available
to it for use as partials, so could in turn have `{{>b}}` to include a nested partial.

To allow for a tidy source tree, templates can be in any number of sub-directories under the main views directory,
they are all made available for use as partials without any path identifier.

Note - multiple templates with the same name but in different directories will overwrite each other. Set the
`flatten` configuration option to false to always use the relative path as the name of the partials
(ie: `{{>app/header}}` instead of just `{{>header}}`). Whether the `flatten` option is enabled or not, the relative
path name will always be available.

Note - don't include the same template as a partial inside itself.

Live Updating
=============

As express uses the the render engine for the first time, a series of watches are added to any sub-directory of the
views directory so that any changes are automatically reloaded for you while the server is still running.

