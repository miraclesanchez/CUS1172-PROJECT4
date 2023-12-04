//initialize the use of the express library
var express = require('express');
//create an instance of the express library
var app = express();

var session = require('express-session')

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
                       //code for handling form information

//registers the middleware to process header information and form data
app.use(express.json());

//for parsing the application
app.use(express.urlencoded({extended:true}));

db_conn = __dirname + "/Database/database.json"

db_schema = {
    users: []
}

global.db = require("./Database/fsdb")(db_conn, db_schema);

//------------------------------------------------------------------//
                //routes
 var api_routes = require('./Components/Routes');
 app.use('/auth', api_routes);

 var video_route = require('./Components/DashboardRoute');
 app.use('/video',video_route);

//------------------------------------------------------------------//
            //Session Middleware
app.use(session({
    secret: 'Some screte code',
    saveUninitialized: true,
    resave: false,
    cookie: {}

}))
//------------------------------------------------------------------//
app.listen(3000, function () {
    console.log('Service running on port 3000!');
});

//------------------------------------------------------------------//