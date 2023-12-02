const express = require ('express');
const router = express.Router();

router.get('/registration', function(req,res){
    res.send();
});

router.get('/login', function(req,res){
    res.send();
});

module.exports = router;