module.exports = (app) => {
    const express = require('express');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));                           // Define how form data should be encode.
};
