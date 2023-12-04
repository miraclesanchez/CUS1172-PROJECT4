var express = require('express');
var router = express.Router();

router.get('/dashboard', (req,res)=>{
    res.send(`hello`);
})

module.exports = router