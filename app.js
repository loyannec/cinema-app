const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const publicDirectory = path.join(__dirname, 'public');

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);
liveReloadServer.server.once("connection", () => {        // Listening the connection event just once to avoid entering in loop.
    setTimeout(() => {                                    // Execute on future time.
        liveReloadServer.refresh("/");
    }, 50);
});

const app = express();
const port = 3000;

app.use(connectLivereload());

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
