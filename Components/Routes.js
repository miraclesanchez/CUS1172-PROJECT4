var express = require('express');
const router = express.Router();


//login routes
router.get('/login', (req,res) =>{
    model_view = {
        action_url : '/login',
    }
    res.render('login.pug', {
        title: "Video Community"
    })
});

router.post('/login', (req,res)=>{
    const {username, password}=req.body;

    //verify against database
    //create a new Session object
    //then redirect to dashboard page
})


//registration routes
router.get('/register', function(req,res){
    res.render('register.pug');
});

router.post('/register', (req,res)=>{
    const {email, name, username, password} = req.body;

    console.log(req.body);
    
    // if(!contactInfo || !name || !username || !password){
    //     return res.render('register.pug', {errorMessage: 'All fields must be filled in'});
    // }

    res.redirect(`/add/${email}/${name}/${username}/${password}`)
    // res.render('accountCreated.pug');

});

db_conn = __dirname + "/../Database/database.json"

db_schema = {
    users: []
}
global.db = require("../Database/fsdb")(db_conn, db_schema);

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

module.exports = router;