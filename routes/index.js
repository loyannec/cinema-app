module.exports = (app) => {
const axios = require('axios');
var express = require('express');
 
//var router = express.Router();
const {getHomePage,getLoginPage,submitUserRating,retrieveMovieListFromApi,verifyLogin,getMoviePage,getRegisterPage,submitUserRegistration}= require('../controllers/moviescontroller');
const {verifyAuthToken,setAuthToken,unsetAuthToken}= require('../routes/auth');

/* GET home page. */
app.get('/',verifyAuthToken, getHomePage); 
//router.get('/',getHomePage);

app.get('/searchmovie',verifyAuthToken, retrieveMovieListFromApi); 
/*Display Home page*/
app.get('/login', getLoginPage); 
//router.get('/login', getLoginPage);

/*Display MoviesHome page*/
app.post('/login',[verifyLogin,setAuthToken],getHomePage); 
//router.post('/login',[verifyLogin,setAuthToken],getHomePage);

/*Display respective Movie Page*/
app.get('/movie/:id', verifyAuthToken,getMoviePage); 
//router.get('/movie/:id',verifyAuthToken,getMoviePage);

//app.get('/userrating/:id', verifyAuthToken,getMoviePage); 
/*Display respective Movie Page*/
app.post('/userrating/',verifyAuthToken,submitUserRating); 
//router.post('/userrating',submitUserRating);

/*Display Register page*/
app.get('/register',getRegisterPage);
//router.get('/register',getRegisterPage);

/*Submits User details*/
app.post('/register',submitUserRegistration); 
//router.post('/register',submitUserRegistration);

/* Log out user and display login page. */  
app.get('/logout', verifyAuthToken,unsetAuthToken);

};
