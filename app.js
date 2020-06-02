const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const Router = require("./routes/index")
;
const publicDirectory = path.join(__dirname, 'public');

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);
liveReloadServer.server.once("connection", () => {        // Listening the connection event just once to avoid entering in loop.
    setTimeout(() => {                                    // Execute on future time.
        liveReloadServer.refresh("/");
    }, 50);
});

// const db = require("./db/init_db");
const app = express();
const port = 3000;

app.use(connectLivereload());

// db();

/*
Global functions that are used by templates.
*/
const handlebars = exphbs.create();

/*
View engine setup
*/
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));                             // Define how form data should be encode.
app.use(express.static("Ajax"));
app.use(express.static(publicDirectory));




/*
Testing if start server
*/
console.log("Starting server");

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
