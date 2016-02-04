// A small nodeJS Framework
var express     = require('express');

// A middleware for handling JSON / RAW / Text / URL encoded form data
var bodyParser  = require('body-parser');

// To resolve paths in general
var path        = require('path');

// For I/O operations on your hard disk drive
var filesystem  = require('fs');

// Validator - prevent against XSS, invalid input fields
var validator   = require('validator');

// Declare express, the framework
var app         = express();

// Config Object - contains important options (read more in the "INSTALLATION.md")
var config      = {
    // The path to the "index" template
    templateFile:  __dirname + "/../markup.html",

    // The path to the storage.json file - our "database"
    storageFile: __dirname + "/../storage.json",

    // The path to the tableStructure.json - contains the table header structure
    tableStructureFile: __dirname + "/../tableStructure.json",

    // The path to the error log - leave it empty for no log file
    errorLogFile: __dirname + "/../log/error.log",

    // The path to all assets
    assetDirectory: __dirname + '/../assets'
};

// "App.use" is like a middle layer and makes it possible to "redirect" every request on "/assets" to the config.assetDirectory
app.use('/assets', express.static(path.resolve(config.assetDirectory)));

// Internal helper functions to make our life easier
var internalHelper  = {

    /**
     * Function to append a message inside the error.log
     * @param message
     */
    addErrorLog: function(message) {
        // Check if the path is given and not empty
        if(config.errorLogFile) {
            // Append the error log file
            filesystem.appendFile( path.resolve(config.errorLogFile) , message + "\r\n\r\n", (errorWriteErrorFile) => {
                // Check if we have an error writing the error log (how ironic)
                if(errorWriteErrorFile) {
                    // Write into the terminal instead
                    console.log("Can not write error.log", errorWriteErrorFile, "Original message: ", message + "\r\n\r\n");
                }
            });
        } else {
            // Log inside the consle
            console.log("Error Log: " + message);
        }

    },

    tempStatus: false,

    /**
     * Fallback / default layout
     */
    internalTableStructure: {"0":{"label":"First name","name":"firstname","type":"text"},"1":{"label":"Last name","name":"surname","type":"text"}},

    /**
     * Set the table structure into the internalTable structure
     */
    setTableStructure: function(dataContent) {
        // Contains the person - sanitized, and in a well structured level
        var tempContainer = {};

        for(var nameOfField in dataContent) {
            // Iterate all given field selections (In standard it's "label" and "type")
            for(var currentElement in dataContent[nameOfField]) {
                // Also make sure to declare the currentElement to avoid undefined properties in strict mode
                if(typeof tempContainer[currentElement] === "undefined") {
                    tempContainer[currentElement] = {};
                }

                // Add the current element into the Object (sanitized!)
                tempContainer[currentElement][nameOfField] = validator.escape(dataContent[nameOfField][currentElement]);
            }
        }

        // Stringify the object
        internalHelper.internalTableStructure = tempContainer;

        // Return save
        return internalHelper.saveTableStructure();
    },

    /**
     * Returns the current table header structure
     */
    getTableStructure: function() {
        return internalHelper.internalTableStructure;
    },
    /**
     * Saves the table structure into a file
     */
    saveTableStructure: function() {
        // Try to add a new "tableStructure.json" file
        filesystem.writeFile( path.resolve(config.tableStructureFile) , JSON.stringify(internalHelper.internalTableStructure), (errorWriteTableStructureFile) => {
            if(!errorWriteTableStructureFile) {
                return true;
            }
            // Can not save, see the error message for better info
            internalHelper.addErrorLog("Can not save tableStructure.json: " +  errorWriteTableStructureFile);
            return false;
        });
    },

    /**
     * Contains the internal storage
     */
    internalStorage: {"0":{"firstname":"Jeff","surname":"Stelling"},"1":{"firstname":"Chris","surname":"Kamara"},"2":{"firstname":"Alex","surname":"Hammond"},"3":{"firstname":"Jim","surname":"White"},"4":{"firstname":"Natalie","surname":"Sawyer"}},

    /**
     * Write the storage into the file and in the internalStorage property as well
     * @param dataContent
     * @return internalHelper.saveStorage()
     */
     setStorage: function(dataContent) {
        // Contains the person - sanitized, and in a well structured level
        var tempContainer = {};

        // Iterate the first people layer, because we are pushing everything into the first
        // We do not directly iterating "firstname" and "surname", because it would kill the expandability for new fields (e.g. AGE)
        for(var nameOfField in dataContent) {
            // Iterate all given field selections (In standard it's "firstname" and "surname")
            for(var currentElement in dataContent[nameOfField]) {
                // Also make sure to declare the currentElement to avoid undefined properties in strict mode
                if(typeof tempContainer[currentElement] === "undefined") {
                    tempContainer[currentElement] = {};
                }

                // Add the current element into the Object (sanitized!)
                tempContainer[currentElement][nameOfField] = validator.escape(dataContent[nameOfField][currentElement]);
            }
        }

        // Stringify the object
        internalHelper.internalStorage = tempContainer;

        // Return save
        return internalHelper.saveStorage();
    },

    /**
     * Get the of the internalStorage - if empty fallback on the storage file
     * @return mixed (string|bool)
     */
    getStorage: function() {
        // Check if we have the internalStorage
        if(internalHelper.internalStorage) {
            // Return the content as JSON
            return internalHelper.internalStorage;
        }

        // Read file
        var tempStorage = JSON.parse(filesystem.readFile(path.resolve(config.storageFile)));

        // Check if the tempStorage is given
        if(tempStorage) {
            // Return the content as JSON
            return tempStorage;
        }

        // Neither
        return false;
    },

    /**
     * Save the storage content into a file
     * @return bool
     */
    saveStorage: function() {
        // Try to add a new "storage.json" file
        filesystem.writeFile( path.resolve(config.storageFile) , JSON.stringify(internalHelper.internalStorage), (errorWriteStorageFile) => {
            if(!errorWriteStorageFile) {
                //internalHelper.addErrorLog("Successfully saved the storage.");
                return true;
            }
            // Can not save, see the error message for better info
            internalHelper.addErrorLog("Can not save storage.json: " +  errorWriteStorageFile);
            return false;
        });
    },

    /**
     * Delete the storage file
     * @return bool
     */
    deleteStorage: function() {
        // Try to delete "storage.json" file
        filesystem.unlink( path.resolve(config.storageFile) , (errorDeleteStorageFile) => {
            if(!errorDeleteStorageFile) {
                //internalHelper.addErrorLog("Successfully deleted the storage.");
                return true;
            }

            // Can not delete, see the error message for better info
            internalHelper.addErrorLog("Can not delete storage.json: " +  errorDeleteStorageFile);
            return false;
        });
    },

    /**
     * Starting App
     * - Show some useful Information
     * - Checking config files
     * - Check for creating default files (tableStructure.json - required for the table header)
     * - Read the "storage.json" and copy the content into the property "internalStorage"
     */
    loadApp: function() {
        // "Welcome Message"
        console.log("Starting App..");
        console.log("Checking config properties..");

        // Check if the file already exists on startup
        filesystem.readFile(path.resolve(config.templateFile), 'utf8', function(error) {
            // This means, that the file does not exists
            if(!error) {
                // Calling saveTableStructure to saving the default structure into a file
                console.log("TemplateFile seems to be okay.")
            }
        });

        // Check if the file already exists on startup
        filesystem.readFile(path.resolve(config.storageFile), 'utf8', function(error) {
            // This means, that the file does not exists
            if(!error) {
                // Get the content again
                var tempStorage = filesystem.readFileSync(path.resolve(config.storageFile), 'utf8');

                if(tempStorage) {
                    // Write into internal property
                    internalHelper.internalStorage = tempStorage;
                }
                // Calling saveTableStructure to saving the default structure into a file
                console.log("StorageFile seems to be okay.")
            } else {
                console.log("Can not read StorageFile (" + path.resolve(config.storageFile) + "), but it's not critical.")
            }
        });

        // Check if the file already exists on startup
        filesystem.readFile(path.resolve(config.errorLogFile), 'utf8', function(error) {
            // This means, that the file does not exists
            if(!error) {
                // Calling saveTableStructure to saving the default structure into a file
                console.log("ErrorLogFile seems to be okay.")
            } else {
                console.log("Can not read ErrorLogFile (" + path.resolve(config.errorLogFile) + "), but it's not critical.")
            }
        });

        // Check if the file already exists on startup
        filesystem.readFile(path.resolve(config.tableStructureFile), 'utf8', function(error) {
            // This means, that the file does not exists
            if(error) {
                // Calling saveTableStructure to saving the default structure into a file
                internalHelper.saveTableStructure();
                console.log("Creating tableStructure..")
            }
        });

        console.log("Checks done.. Visit http://127.0.0.1:8080 for your application");
    },
}

// Note that in version 4 of express, express.bodyParser() was
// deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

// Index "Alias"
app.get('/', function (request, response) {
    // Return the template as the response
    response.sendFile( path.resolve(config.templateFile) );
});

// Save action
app.post('/save', function (request, response) {
    // Save the storage
    internalHelper.setStorage(request.body.people[0]);

    // Return the template as the response
    response.sendFile( path.resolve(config.templateFile) );
});

app.post('/saveTableStructure', function(request, response) {
    // Save the table structure
    internalHelper.setTableStructure(request.body.options[0]);

    // Return the template as the response
    response.sendFile( path.resolve(config.templateFile) );
});

// Getter for the current storage
app.get('/listContent', function(request, response) {
    // Return the storage
    response.send(internalHelper.getStorage());
});

// Getter for the current structure for the table
app.get('/listStructure', function(request, response) {
    // Return the storage
    response.send(internalHelper.getTableStructure());
});

// Define the listener
app.listen(8080, function() {
    // Output to introduce the user
    internalHelper.loadApp();
});