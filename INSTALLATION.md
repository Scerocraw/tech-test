### Installation Guide

#### The installation may requires sudo permissions

##### Step 1. CURL the nodesource 
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -

##### Step 2. Install nodejs
apt-get install -y nodejs

##### Step 3. Install "express" - a nodejs framework, "body-parser" - a middleware for handling JSON / RAW / Text / URL encoded form data, and "validator" to sanitize the users input
npm install express 

npm install body-parser

npm install validator

##### Step 4. Start the server (Please make sure, that you replaced "YOUR_PROJECT_PATH" with your Project Path
node YOUR_PROJECT_PATH/node/server.js
