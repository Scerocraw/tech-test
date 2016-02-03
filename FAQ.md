# FAQ 

#### Q: I am to lazy to install your application in the manual way, do you have a script for that?
#### A: Actually i do! In your project directory you can find the "install.sh". You can execute the script with the following command in your terminal:
    sh ./install.sh
    
The installation script was tested and optimised for Debian and Ubuntu Systems.

---

#### Q: Can i use nodejs version 4 as well?
#### A: Yes, but for the best performance and user experience you should use nodejs 5.

---

#### Q: My "apt-get install nodejs" responds, that apt-get install was not found?
#### A: Then you probably have another system than Debian and Ubuntu. Please check the [official site](https://nodejs.org/en/download/package-manager/). You will find a way for your system.

---

#### Q: Can i change the template?
#### A: Yes, you can pick one of two different templates
In the "node/server.js" (Line 22) you can choose between 2 different Template Views!
* markup.html
* betterOverview.html

For that option change 

	templateFile:  __dirname + "/../markup.html",

to

	templateFile:  __dirname + "/../betterOverview.html",

The markup.html is the current default template. Please do not forget to restart the node server after changing the template. 

---

#### Q: I can't see any differences, but i've changed the template?
#### A: Make sure, that you have restarted the node process! Without restarting, no changes will affect on the site.


