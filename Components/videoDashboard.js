const express = require ('express');
const router = express.Router();


router.get('/', (req,res) =>{
    res.render('dashboard.pug', {
        title: "Video Community"
    })
});

module.exports = router;