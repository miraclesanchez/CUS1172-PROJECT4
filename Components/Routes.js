var express = require('express');
const router = express.Router();

const fs = require('fs');
let rawData = fs.readFileSync('./Database/database.json');
let user = JSON.parse(rawData);

console.log('videos',user)

// db_conn = "/Users/miraclesanchez/cus1172/CUS1172-PROJECT4/Database/database.json"
const path = require('path');
const db_conn = path.join(process.env.PWD, 'Database', 'database.json');
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
    const userInfo = user["users"].find(user => user.Username === username && user.Password === password)
        if(userInfo){
            console.log("User found");
            console.log(userInfo);
            req.session = req.session || {};  // Ensure session is initialized
            req.session.userID = userInfo.Name;
            req.session.userEmail = userInfo.Email;
            req.session.isAuthenticated = true;
            console.log('session recorded');
            res.redirect('/video/dashboard');
            console.log('session ID: ',req.sessionID);
        }else{
            console.log("User not found");
                    res.redirect('/auth/login?error=InvalidCredentials');

        }
        
    })

    router.get('/login', (req,res)=>{
        const {username, password}=req.session.loginInfo;
    res.render('loin.pug',{
        title: "SoccerWorld",
        username,
        password,
    });
    });

    router.get('/logout', (req, res) => {
        if (req.session.isAuthenticated) {
            req.session.destroy((err) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log("session closed");
                    res.send('<script>alert("You are logged out!"); window.location.href = "/auth/login";</script>');
                }
            });
        }
    });
    


//-------------------------------------------------------------------------------//
                            //registration routes


router.get('/register', function(req,res){
    res.render('register.pug', {
        title: "Register"
    });
});

router.post('/register', (req,res)=>{

    const {email, name, username, password} = req.body;
    // res.redirect(`/add/${email}/${name}/${username}/${password}`)

});

router.post('/add', (req,res) =>{

    let rawData = fs.readFileSync('./Database/database.json');
let videos = JSON.parse(rawData);

console.log('videos',videos)

const db_conn1 = path.join(process.env.PWD, 'Database', 'database.json');
    db_schema = {
        users: []
    }

    global.db = require("../Database/fsdb")(db_conn1, db_schema);

    const { email, name, username, password } = req.body;

    new_user = {
        Email: email,
        Name: name,
        Username: username,
        Password: password
    }
    console.log('DB', videos)

    //Use the 'db' object to access the user database
    db.model.users.push(new_user);
    console.log(db.model.users);
    db.update();
    res.render('accountCreated.pug');
});
//-------------------------------------------------------------------------------//

module.exports = router;