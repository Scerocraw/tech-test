# Technologies

#### NodeJS
    NodeJS is a serverside network event-driven environment for web applications. Basically the applications are written in JavaScript. One of the big advantage is, that NodeJS can run on variety of operating systems, has a big community, and as i said earlier - it is event-driven and not multi threaded! That sounds pretty cool, mh? The most annoying thing about NodeJS is, that you always have to restart NodeJS, when you made a change in the NodeJS script that is currently running. The clientside loaded Javascript loads every change as usual - after a simple refresh, as long as we have no caching for these files. The entire HTTP Server is already integrated, so you do not have to care about comparing between different webservers, their advantages and disadvantages. And the HTTP Server in NodeJS is fast! Also you have the advantage of "RealTime Communication" which means, you can use streams and sockets to communicate in real time with the client - useful for polls, chats, and gaming. With NodeJSs `npm` it is pretty easy to install third-party-libraries such as `express`, the most common framework.
    
#### Express - a NodeJS Framework
    There are many different frameworks for NodeJS - and it was not easy to pick one. For the application `Sky Bet - Tech Test` it was important to find a framework, that is not overloaded with more or less useful functionallities that we would never use to keep it in a minimalistic way. It also has a great website, documentation and tutorials.

#### Why not PHP?
    That's maybe the most important question. And i would like to list some points to convince you, that NodeJS was the right decision. But before that: I've made PHP Projects since 2009. From blogs, mini games, neuronal networks, realtime analysis, over early warning systems and many more. From low performance up to high performance sites with balancing, and so on. Also using SOLR, Redis, MemCache, and some NoSQL is nothing new for me. I'm experienced in developing very odd PHP Projects with different technologies. I am lazy in writing code. I try to avoid duplicated content, designing methods just with the most important to increase their reusability. But after reading the specs it was so clear to use NodeJS for that project. The advantage of php is the big community, you don't have to restart the php process (cgi / fpm) if you made a change (that would be horrible), it's pretty fast with PHP7 HHVM, and it has many useful functions in the core - without a framework. The most frameworks in PHP are overloaded with functions that you may will never need. The memory_usage after calling the website is in the most cases higher in PHP than NodeJS - this can affect the loading time minimal (or critical in worst case). NodeJS is ideal for applications with many database requests - because it is faster than PHP and PDO for the most time. One point for PHP: Mostly you have to code less lines than in NodeJS to have the same result. PHP is a script language - in the runtime the code gets compiled to maschine language / byte code - compared with NodeJS which uses the V8-Engine it compiles the code into byte code as well, but: This happens only once, when the node server starts. As i mentioned earlier, PHP has a very mighty core. In the native you don't have to integrate third-party-libs to create a new database connection. PDO and MySQL(i) is in the native integrated. But for this application we have to write a simple file, where we can read and write our things. NodeJS is very strong in JSON. So i've decided to use for the user-input thingies JSON format. It's very easy to select specific properties from the object, compared to PHP, where you can serialize and unserialze whole objects to a string in JSON format, as well. In the point of security, both languages are kind of similar. In general, you have to sanitize everything, that the user could modify. From a simple PostData over Get Parameter and XSS. When it comes down to the readability it surely depends on the developer. NodeJS was pretty new to me and i guess, that i could do the same application in maybe less line, than in the current NodeJS script. But the current readability is given, because it is well structured, we have no useles names for functions, objects and variables. The testability is very hard in NodeJS. You can write tests, but in PHP you have more options and different Test-Frameworks, because the community is very big, and there are many different ways to test your code (from PHPUnit as Unit Test up to Selenium). With both languages you can scale your application, but i would say, that it is much easier with NodeJS than in PHP. You can easily integrate a loadbalancer script into your NodeJS script and balance all your requests between your servers. The NodeJS application can delegate processes internal as well by automatic.