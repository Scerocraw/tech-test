#/bin/bash
echo "Thanks for using the installer script. The installation script was tested and optimised for Linux Debian and Ubuntu Environments"

echo "Step 1: CURL on nodesource for receiving node.js Version 5.x"
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -

echo "Step 2: Installing nodejs"
apt-get install -y nodejs

echo "Step 3: Installing npm additions"
npm install express
npm install body-parser
npm install validator

