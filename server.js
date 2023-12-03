//initialize the use of the express library
var express = require('express');
//create an instance of the express library
var app = express();

//path allows you to build paths to your files
const path = require('path');

//------------------------------------------------------------------//

            //these two are configuration settings//

//setting the view engine to pug allows you to later use res.render() without having to specify that it is a pug file
// and it lets the app know that you will be using Pug to render all views
app.set('view engine', 'pug');

//dirname ensures that the correct path is set
//allows the express engine to know where to look for your pug files
app.set('views', path.join(__dirname, 'Views'));

//------------------------------------------------------------------//
                    //static resources (css, images)

app.use('/resource', express.static('Resources'));

//------------------------------------------------------------------//
                        //login module
var loginPage = require('./Components/login');
app.use('/', loginPage);

//------------------------------------------------------------------//
                //registration modules

//require the module
var registration = require ('./Components/registration');

//both the login and registration routes will be available here
// /register/login/
// /register/registration/
app.use('/register', registration);

//------------------------------------------------------------------//
                        //dashboard module
var dashboard = require ('./Components/videoDashboard')

app.use('/dashboard', dashboard);
//------------------------------------------------------------------//
            //code for handling form information

//registers the middleware to process header information and form data
app.use(express.json());

//for parsing the application
app.use(express.urlencoded({extended:true}));

//here "username" and "password" are the names of the form fields from the login.pug
app.post ('/', (req,res)=>{
    const {username, password} = req.body;

    ///here we would verify the credentials

    res.redirect('/dashboard');
});

//------------------------------------------------------------------//
app.listen(3000, function () {
    console.log('Service running on port 3000!');
});

//------------------------------------------------------------------//