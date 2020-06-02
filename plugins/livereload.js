module.exports = (app) => {
    const path = require('path');
    const express = require('express');
    const livereload = require("livereload");
    const connectLivereload = require("connect-livereload");
    const publicDirectory = path.join(__dirname, 'public');
    const liveReloadServer = livereload.createServer();

    liveReloadServer.watch(publicDirectory);
    liveReloadServer.server.once("connection", () => {                           // Listening the connection event just once to avoid entering in loop.
        setTimeout(() => {                                                       // Execute on future time.
            liveReloadServer.refresh("/");
        }, 50);
    });

    app.use(connectLivereload());
    app.use(express.static(publicDirectory));
};
