const express = require ('express');
const router = express.Router();


router.get('/dashboard', function(req,res){
    res.send();
});

module.exports = router;