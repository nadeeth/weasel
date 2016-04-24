# Weasel
A NodeJs REST API / Web Application Framework.

This is a minimal and easy to extend framework developed with ExpressJs for REST APIs and Web Applications. 

## Installation

1. Clone this [repository](https://github.com/nadeeth/weasel.git) or download the [latest build](https://github.com/nadeeth/weasel/archive/master.zip).
2. Run the command "npm install" to install all the dependencies.
3. Edit "config.js" and set Database connection string.
4. Run the command "npm start" to start server.

To run the server in development mode "DEBUG=weasel:* npm run-script devstart" or in Windows "set DEBUG=weasel:* & npm run-script devstart". Development mode uses Nodemon to run the server (Nodemon restarts the server when you edit and save files).

## Example routes, models and tests.

There are few example routes (Actions) in the routes directory for user authentication, populate some test data, etc.

And test directory has sample API level test and the test config file. In the test config file you can have different configuration for testing (ex: A separate database for testing etc.). You can run this sample test with this command.

    mocha test/api.test.js


