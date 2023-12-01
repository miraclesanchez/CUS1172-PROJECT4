var express = require('express');
var app = express();


//registration modules

//require the module
var registration = require ('./Components/registration');

app.use('registeration', registration);




