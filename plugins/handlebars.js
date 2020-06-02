module.exports = (app) => {
    const exphbs  = require('express-handlebars');
    const handlebars = exphbs.create();

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
};
