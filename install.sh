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
npm install supertest
npm install should
npm install -g mocha

# Checking installation
## Make sure, that nodeJS is installed
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' nodejs|grep "install ok installed")

echo "Checking for nodejs": $PKG_OK

## Print
if [ "" eq "$PKG_OK" ] ; then
  echo "No nodejs found!"
fi

echo "You can now start this project by executing the following command"
echo "node node/server.js"