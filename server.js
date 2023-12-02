//initialize the use of the express library
var express = require('express');
//create an instance of the express library
var app = express();

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

app.use('/videos', dashboard);
//------------------------------------------------------------------//
app.listen(3000, function () {
    console.log('Service running on port 3000!');
});




