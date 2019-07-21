Thank you for using Turbo!
https://www.turbo360.co

Think of this file as quick-guide when you need to look something up or get stuck. Reading the entire page from top-to-bottom (though not a bad thing) is probably not necessary - just know that this file is here whenever you have questions.


- - - - - - - - - - - - - - - - - - SCAFFOLDING PROJECTS - - - - - - - - - - - - - - - - - - 

Turbo scaffolds projects in three ways:

VERTEX PROJECTS | $ turbo new <MY_PROJECT_NAME>
- After creating, cd into the project directory and run $ npm install
- Vertex projects are full stack apps that closely follow Node/Express architecture.

REACT/REDUX PROJECTS | $ turbo new <MY_PROJECT_NAME> --react
- After creating, cd into the project directory and run $ npm install
- This scaffolds a project with REACT/REDUX configured
- The REACT/REDUX source code is in the 'src' directory
- A webpack.config.js file is included with some basic webpack configuration. Feel free to adjust as needed.

- - - - - - - - - - - - - - - - - - GENERAL COMMANDS - - - - - - - - - - - - - - - - - - 

RUN DEV SERVER | $ turbo devserver
- This runs a simple Express server and renders the main index.html from http://localhost:3000
- We recommend running the dev server throughout development because it accurately reflects the behavior of your site in deployment.
- We also recommend running "gulp" in a separate tab. This invokes the build process whenever you make changes to JS or CSS files.
- The dev server supports relative links for anchor tags. For example, <a href="/blog">Blog</a> works fine with the dev server running.

BUILD THE PROJECT - ALL PROJECTS | $ npm run build
- This packages the project assets and concatenates/minifies the imports into the 'dist' directory.
** This command should be executed before every deployment because the 'dist' directory gets deployed, NOT the assets
- The gulpfile.js is where the configuration for the build process is defined. Register your custom assets here to include them in the build sequence.

LINK TO TURBO PROJECT - ALL PROJECTS | $ turbo app <APP_ID>
- This links your local project to the Turbo platform which is necessary for deployment
- To create a Turbo project, see here: https://www.turbo360.co/create
- You can get the <APP_ID> from your app dashboard on turbo360.co

DEPLOY TO STAGING - ALL PROJECTS | $ turbo deploy
-- Deploys your site to the Turbo staging environment. The staging URL is accessible on the internet and can be viewed by anyone.
-- When deploying updates, it may take a minute or two for the changes to take effect as we propagate your site to multiple servers
** To deploy, your app must be linked to a  Turbo project. To create a Turbo project, see here: https://www.turbo360.co/create
** It is best practice to run "$ npm run build" before deploying in order to package assets and minify imports.


- - - - - - - - - - - - - - - - - - TURBO SDK COMMANDS - - - - - - - - - - - - - - - - - - 

The Turbo library SDK comes in two forms: 
1. CDN: <script src="https://cdn.turbo360-dev.com/dist/turbo.min.js" type="text/javascript"></script>
2. NPM: $ npm install turbo360
* In order to leverage the Turbo SDK, your project must be linked to an app on Turbo (https://www.turbo360.co/create). See "LINK TO TURBO PROJECT" above for instructions.

The CDN is suited for conventional HTML/CSS with Javascript and jQuery. The NPM is best for robust client-side frameworks like React and Angular. Both come packaged with every scaffolded Turbo project and they provide the functionality for leveraging the Turbo platform.

DEFAULT RESOURCES
- By default, Turbo supports the following resources: USER, POST (blog posts), COMMENT
- Each resource comes with built-in attributes but you can add your own. For example, every USER entity has a 'username' attribute but if you want to add a 'nickname' field, you can do so by simply adding it as a parameter (with corresponding value) when creating new users. To see the built-in attributes, click on the resource name from the list above.

- To create a USER:
-- CDN: Turbo({site_id:<MY_APP_ID>}).createUser(params, function(err, data){})
-- NPM: turbo({site_id:<MY_APP_ID>}).create('user', params).then(data => {}).catch(err => {})
-- See here for full example: https://www.turbo360.co/docs

Turbo also includes a full suite of User-based operations for user management:

CDN
import <script src="https://cdn.turbo360-dev.com/dist/turbo.min.js" type="text/javascript"></script>
- Turbo({site_id:<MY_APP_ID>}).login(credentials, function(err, data){})
- Turbo({site_id:<MY_APP_ID>}).logout(function(err, data){})
- Turbo({site_id:<MY_APP_ID>}).currentUser(function(err, data){})

NPM
import turbo from 'turbo360'
turbo({site_id:<MY_APP_ID>}).login(credentials).then(data => {}).catch(err => {})
turbo({site_id:<MY_APP_ID>}).logout().then(data => {}).catch(err => {})
turbo({site_id:<MY_APP_ID>}).currentUser().then(data => {}).catch(err => {})

CUSTOM RESOURCES
Turbo supports custom resources as easily as the default ones. By simply specifying the resource name and its parameters when creating entities via the SDK, you can create as many resource types that your project requires.

- To create a custom resource called TEAM:
- CDN: Turbo({site_id:<MY_APP_ID>}).create('team', params, function(err, data){})
- NPM: turbo({site_id:<MY_APP_ID>}).create('team', params).then(data => {}).catch(err => {})
- See here for full example: https://www.turbo360.co/docs

CRUD OPERATIONS
Turbo supports the standard CRUD operations as you would expect from an API. The following are the primary operations:
CDN: import <script src="https://cdn.turbo360-dev.com/dist/turbo.min.js" type="text/javascript"></script>
- Turbo({site_id:<MY_APP_ID>}).create(resourceName, params, function(err, data){})
- Turbo({site_id:<MY_APP_ID>}).fetch(resourceName, params, function(err, data){})
- Turbo({site_id:<MY_APP_ID>}).fetchOne(resourceName, id, function(err, data){})
- Turbo({site_id:<MY_APP_ID>}).updateEntity(resource, entityId, updatedParams, function(err, data){})
- Turbo({site_id:<MY_APP_ID>}).removeEntity(resourceName, entityId, function(err, data){})

NPM: import turbo from 'turbo360'
- turbo({site_id:<MY_APP_ID>}).create(resourceName, params).then(data => {}).catch(err => {})
- turbo({site_id:<MY_APP_ID>}).fetch(resourceName, params).then(data => {}).catch(err => {})
- turbo({site_id:<MY_APP_ID>}).fetchOne(resourceName, id).then(data => {}).catch(err => {})
- turbo({site_id:<MY_APP_ID>}).updateEntity(resource, entityId, updatedParams).then(data => {}).catch(err => {})
- turbo({site_id:<MY_APP_ID>}).removeEntity(resourceName, entityId).then(data => {}).catch(err => {})


- - - - - - - - - - - - - - - - FILE STORAGE (https://www.turbo360.co/service/storage) - - - - - - - - - - - - - 

CDN: import <script src="https://cdn.turbo360-dev.com/dist/turbo.min.js" type="text/javascript"></script>
- Turbo({site_id:<MY_APP_ID>}).uploadFile(params)
	-> The 'params' argument requires 2 keys: 'apiKey' and 'completion'
	-> 'apiKey' is the API key for the current project on Turbo 360
	-> 'completion' is a function which takes 'err' and 'data' arguments. 'data' is returned from Turbo 360 upon successful file upload. 'err' is returned in error cases.
	-> The 'params' argument can take 2 more optional keys: 'onUploadStart' and 'onProgressUpdate'
	-> 'onUploadStart' is a function that is called when file begins uploading
	-> 'onProgressUpdate' is a function that is called continously as file uploads and takes a number argument between 0-100, e.g. "37.67389454804663"

- Turbo({site_id:<MY_APP_ID>}).getFiles(params, function(err, data){})


- - - - - - - - - - - - - - - - THEMES (https://www.turbo360.co/service/theme) - - - - - - - - - - - - - 

To view available themes: $ turbo themes
To change the theme of your project: $ turbo theme THEME_NAME
