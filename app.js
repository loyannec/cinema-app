const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const livereload = require("livereload");

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

var connectLivereload = require("connect-livereload");

var app = express();

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 50);
});

const app = express();
const port = 3000;

/*
Global functions that are used by templates.
*/
const handlebars = exphbs.create();

/*
View engine setup
*/
app.use(express.urlencoded({ extended: false }));                             // Define how form data should be encode.
app.use(express.static(publicDirectory));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


/*
Testing if start server
*/
console.log("Starting server");

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));