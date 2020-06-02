const express = require('express');
const app = express();
const port = 3000;

require('./plugins/handlebars')(app);
require('./plugins/express')(app);
require('./plugins/livereload')(app);
require('./routes')(app);

// const Router = require("./routes/index");
// const db = require("./db/init_db");
// db();

/*
Testing if start server
*/
console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
