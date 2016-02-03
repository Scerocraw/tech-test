# Installation Guide

#### The installation may requires sudo permissions


## Automatic installation:
For the automatic installation just execute the "install.sh" 

        sh ./install.sh


## Manual installation:

##### Requirements:

`curl` for the nodesource mirror

	apt-get install curl


##### Step 1. CURL the nodesource 
        curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -

##### Step 2. Install nodejs (on Ubuntu and Debian)
        apt-get install -y nodejs

##### Step 2. Install nodejs (on Fedora)
        yum install -y nodejs

##### Step 2. Install nodejs (on Arch Linux)
	pacman -S nodejs npm

##### Step 2. Install nodejs on [something else](https://nodejs.org/en/download/package-manager/)

##### Step 3. Install "express" - a nodejs framework, "body-parser" - a middleware for handling JSON / RAW / Text / URL encoded form data, and "validator" to sanitize the users input
        npm install express 
        npm install body-parser
        npm install validator

##### Step 4. Start the server (Please make sure, that you replaced "YOUR_PROJECT_PATH" with your Project Path
        node YOUR_PROJECT_PATH/node/server.js


##### Configuration Informations

In `node/server.js` you have different config properties.

```javascript
// Please make sure, that all files are readable and writeable
var config = {
    // This is the template that will show up, when you load the site. The markup.html is the default template, and was minimal modified. 
    // Then there is a file, called betterOverview.html - with integrated bootstrap responsive design
    templateFile:  __dirname + "/../markup.html",

    // This paths shows you, to the "storage.json". Inside the storage.json you will find the database entries (people you have saved). 
    // Before you haven't run the app, it's not existing. The default fallback value is inside the "node/server.js" 
    // and contains all default informations from the "markup.html"
    storageFile: __dirname + "/../storage.json",

    // The tableStructure contains the table header as a json structure.
    // This file doesn't exists, too, until you have started and modified the table structure. The default value is saved inside the "node/server.js", as well.
    tableStructureFile: __dirname + "/../tableStructure.json",

    //  Contains the path, where the error log will go
    errorLogFile: __dirname + "/../log/error.log",

    // In this directory you can create new css files, js files, and images.
    // (Also something else, if you need!)
    assetDirectory: __dirname + '/../assets'
};
```

