const axios = require('axios');
const {getHashedPassword, validateEmail, getUserIdAndEmail, validateUserEmail, createUser, insertUserRating} = require('../db/model');
const moviescontroller = {

    /*
    Display HomePage Page
    */
    getHomePage: (req, res) => {
        console.log("USER LOGGED in getHomePage :" + req.userID);
        var user_active = true;
        if(req.userID == undefined)
            user_active = false;
        axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=018c2d9e388d0d660de2ccf185361556')
        .then(response => {
            console.log(response);
            res.render('home', {
                title: 'Cinema',
                user_active,
                response:response.data.results,
                responselength:response.data.results.length > 0
            });
        })
        .catch(error => {
            console.log(error);
        });
    },

    /*
    Search the content by name
    */
    searchMovie: (req, res) => {
        console.log("USER LOGGED in getHomePage :"+req.userID);
        var user_active = true;
        if(req.userID == undefined)
            user_active=false;
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=018c2d9e388d0d660de2ccf185361556&query=${req.query.title}`)
        .then(response => {
            console.log(response);
            res.render('partials/movies', {
                layout: false,
                response: response.data.results,
                responselength: response.data.results.length > 0
            });
        })
        .catch(error => {
            console.log(error);
        });
    },


    /*
    Display Login Page
    */
    getLoginPage:(req, res) => {
        res.render('login');
    },
    /*Display MoviesHome Page*/
   /*  getMoviesHomePage:(req, res)=> {
        console.log("USER LOGGED with login :"+req.userID);
        axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=018c2d9e388d0d660de2ccf185361556')
        //axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=1a4537ef')
        .then(response => {
            //console.log(response.data.Poster);
            console.log(response);
            res.render('index', {
                title: 'Cinema',
                active:true,
                 resposter:response.data.Poster,
                resmovietitlle:response.data.Title,
                rescommunityscore:response.data.imdbRating,
                resuserscount:response.data.imdbVotes
                response:response.data.results,
                responselength:response.data.results.length > 0

            });
        })
        .catch(error => {
            console.log(error);
        });


    }, */
    /*
    Verify User Details
    */
    verifyLogin :(req, res,next)=> {
        const {email,password}=req.body;
        const hashedPassword = getHashedPassword(password);
        console.log("Email and pwd :" + email + " "+ password)
        validateEmail(email,userdetails=>{
            if(JSON.stringify(userdetails)==='[]'){
                console.log("Account doesnot exists"+userdetails)
                res.render('login', {
                    message: 'Account doesnot exist!!Please register your account.',
                    messageClass: 'alert-danger'
                });
            }else{
                console.log("Account exists"+JSON.stringify(userdetails))
                if(hashedPassword == userdetails[0].password){
                    res.status('200');
                    console.log("********VALID USER")
                    const userIdValue=Object.values(userdetails[0]);
                    req.userID=userIdValue;
                    next();
                }else{
                    res.render('login', {
                    message: 'Password Mismatch!Please enter valid password.',
                    messageClass: 'alert-danger'
                });
                }
            }
        })
    },

    /*
    Display MoviePage
    */
    getMoviePage:(req,res)=> {
        const {id}=req.params;
        console.log("USER LOGGED in getMoviePage:"+req.id);
        console.log("MOVIE ID in getMoviePage:"+req.params.id);

        var user_active = true;
        if(req.id == undefined)
            user_active=false;
        console.log("Id value is:"+id)
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=018c2d9e388d0d660de2ccf185361556`)
        .then(response => {
            console.log(response);
            const movieIDValue=req.params.id;
            req.movieID=movieIDValue;

            res.render('details', {
                title: 'Movie Details',
                user_active,
                response:response.data,

            });
        })
        .catch(error => {
            console.log(error);
        });
    },

    /*
    Display Register Form
    */
    getRegisterPage:(req, res)=> {
        res.render('registration');
    },

    /*
    Register User details
    */
    submitUserRegistration:(req, res) => {
        const { email, firstName,lastName, password, confirmPassword } = req.body;
       //Validations for User account
       const emailPattern="^[a-zA-Z0-9.!#$%£&'*+/=?^_`{|}~-]+@[a-zA-Z]+(\.)+([a-zA-Z]+)*$";
       const namePattern="^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$";
       const passwordPattern="^[A-Za-z0-9].{6,}"

       console.log("Firstname "+firstName);
       console.log("Lastname "+lastName);
       console.log("Email "+email);
       console.log("password "+password);
         if(!firstName.match(namePattern))
        {
            res.render('register', {
                message: 'Please enter Valid firstName',
                messageClass: 'alert-danger'
            });

        }else if(!lastName.match(namePattern)){
            res.render('register', {
                message: 'Please enter Valid lastname',
                messageClass: 'alert-danger'
            });

        }else if(!email.match(emailPattern))
        {
            res.render('register', {
                message: 'Please enter Valid Email',
                messageClass: 'alert-danger'
            });

        }else if(!password.match(passwordPattern))
        {
            res.render('register', {
                message: 'Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters!',
                messageClass: 'alert-danger'
            });

        }else{
            //Check if password and conform password matches
            if (password === confirmPassword) {
                // Check if user with the same email is also registered
                validateUserEmail([email],(result) =>{
                    console.log("result:"+result);
                    if (result > '0'){
                        res.render('register', {
                            message: 'User already registered.',
                            messageClass: 'alert-danger'
                        });
                    }
                    else{
                        const hashedPassword = getHashedPassword(password);
                        // Store user into the database
                        createUser([lastName,firstName,email,hashedPassword],(result)=> {
                            console.log("After inserting no of Rows inserted into table successfully is : " +result.affectedRows);
                            res.render('login', {
                                message: 'Registration Complete. Please login to continue.',
                                messageClass: 'alert-success'
                            });
                        });
                    }
                });
            }else {
                res.render('register', {
                    message: 'Password does not match.',
                    messageClass: 'alert-danger'
                });
            }
        }
    },

    /*
    Register User details
    */
    submitUserRating:(req, res) => {
        const {rating,RatedMovie}= req.body;
           const activeuserid= req.id[0];
        console.log("USER RATING IS :"+rating+RatedMovie);

        if (rating == undefined){
            res.render('details',{
                message:'Please provide userrating for the movie.',
                messageClass:'alert-danger'
            });
        }
        console.log("USER LOGGED in submitUserRating:"+req.id[0]);
        insertUserRating([activeuserid,rating,RatedMovie],(result)=> {
            console.log("After inserting no of Rows inserted into table successfully is : " +result.affectedRows);
            const ratebutton = false;
            res.render('details',{
                ratebutton,
                message:'Thanks for providing userrating!',
                messageClass:'alert-success'
            });
        });
    }
};

module.exports=moviescontroller;
