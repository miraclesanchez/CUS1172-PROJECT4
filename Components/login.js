const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    model_view = {
        action_url : '/login',
    }
    res.render('login.pug', {
        title: "Video Community"
    })
});


module.exports = router;