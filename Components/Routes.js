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


//registration routes
router.get('/register', function(req,res){
    res.render('register.pug');
});

// router.post ('/register', (req,res)=>{
//     const {email, name, username, password} = req.body;
//     console.log(req.body);
//     ///here we would verify the credentials

//     res.send(`Thank you for logging in ${username}`)
// });

router.post('/register', (req,res)=>{
    const {contactInfo, name, username, password} = req.body;

    console.log(req.body);
    // if(!contactInfo || !name || !username || !password){
    //     return res.render('register.pug', {errorMessage: 'All fields must be filled in'});
    // }

    res.render('accountCreated.pug');

});

module.exports = router;