# Thanks for reviewing my tech-test

#### What you should know for an optimal user experience:
- Install the application. You will find everything you need in the [`INSTALLATION.md`](INSTALLATION.md)
- For a improved template, please change the following line inside [`node/server.js`](node/server.js)
-       templateFile:  __dirname + "/../markup.html", // Replace markup with betterOverview (Heads up! CamelCase)
- You can change the port from default `8080` to every port you want in [`node/server.js`](node/server.js) as well
-       app.listen(8080, function() { // Replace 8080 with any other port
- A small covering note, where i consider different languages and also briefly explain my decision for the technologies: [`TECHNOLOGIES.md`](TECHNOLOGIES.md)
- You can find the original README.MD in this file: [`README_ORIGINAL.md`](README_ORIGINAL.md)
- Also a little [`FAQ.md`](FAQ.md) - just in case
- Instruction for testing the application: [`TEST.md`](TEST.md) (based on mocha)
