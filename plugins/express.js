module.exports = (app) => {
    const express = require('express');

    app.use(express.json());
    app.use(express.urlencoded());                             // Define how form data should be encode.
    app.use(express.static("Ajax"));
};
