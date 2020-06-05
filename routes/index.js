module.exports = (app) => {
const axios = require('axios');
var express = require('express');

const {getHomePage,
        searchMovie,
        filterMovie,
        getLoginPage,
        submitUserRating,
        verifyLogin,
        getMoviePage,
        getRegisterPage,
        submitUserRegistration} = require('../controllers/moviescontroller');
const {verifyAuthToken,
        setAuthToken,
        unsetAuthToken} = require('../routes/auth');

/*
GET home page.
*/
app.get('/',verifyAuthToken, getHomePage);

/*
Display search by genre
*/
app.get('/filtermovie',verifyAuthToken, filterMovie);

/*
Display Home page
*/
app.get('/login', getLoginPage);

/*
Display MoviesHome page
*/
app.post('/login',[verifyLogin,setAuthToken],getHomePage);

/*
Log out user and display login page.
*/
app.get('/logout', verifyAuthToken,unsetAuthToken);

/*
Display respective Movie Page
*/
app.get('/movie/:id', verifyAuthToken,getMoviePage);

/*
Display Register page
*/
app.get('/register',getRegisterPage);

/*
Submits User details
*/
app.post('/register',submitUserRegistration);

/*
Display search by title
*/
app.get('/searchmovie',verifyAuthToken, searchMovie);

/*
Display respective Movie Page
*/
app.post('/userrating',verifyAuthToken,submitUserRating);
};
