module.exports = (app) => {
    const express = require('express');
    var cookieParser = require('cookie-parser');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));  
    app.use(cookieParser());                           // Define how form data should be encode.
    app.use(express.static("Ajax"));
};
