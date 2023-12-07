var express = require('express');
const router = express.Router();
const session = require('express-session')

const fs = require('fs');
let rawData = fs.readFileSync('./Database/database.json');
let user = JSON.parse(rawData);

db_conn = __dirname + "/../Database/database.json"

db_schema = {
    users: []
}
global.db = require("../Database/fsdb")(db_conn, db_schema);

//-------------------------------------------------------------------------------//
                                //login routes
router.get('/login', (req,res) =>{
    model_view = {
        action_url : '/login',
    }
    res.render('login.pug', {
        title: "SoccerWorld"
    })
});

router.post('/login', (req,res)=>{
    const {username, password}=req.body;
    console.log(user);
    console.log("hell0")
    console.log(req.body);
    const userInfo = user["users"].find(user => user.Username === username && user.Password === password)
        if(userInfo){
            console.log("User found");
            console.log(userInfo);
            // req.session.userID = userInfo.Name;
            // req.session.userEmail = userInfo.Email;
            // req.session.isAthenticated = true;
            console.log('session recorded');
            res.redirect('/video/new_video');
        }else{
            console.log("User not found");
                    res.redirect('/auth/login?error=InvalidCredentials');

        }
        
    })

    router.get('/logout', (req,res) =>{
        req.session.destroy((err)=>{
            if(err){
                res.send(err)
            }else{
                res.send("You are logged out!")
            }
        })
    })
    
    //verify against database -- DONE
    //create a new Session object -- NOT WORKING. WILL COME BACK LATER
    //then redirect to dashboard page

//-------------------------------------------------------------------------------//
                            //registration routes


router.get('/register', function(req,res){
    res.render('register.pug', {
        title: "Register"
    });
});

router.post('/register', (req,res)=>{
    const {email, name, username, password} = req.body;
    res.redirect(`/add/${email}/${name}/${username}/${password}`)
});

router.post('/add', (req,res) =>{
    const {email, name, username, password} = req.body;

    new_user = {
        Email: email,
        Name: name,
        Username: username,
        Password: password
    }

    db.model.users.push(new_user);
    console.log(db.model.users);
    db.update();
    res.render('accountCreated.pug');
})
//-------------------------------------------------------------------------------//

module.exports = router;