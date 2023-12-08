var express = require('express');
var router = express.Router();

const fs = require('fs');
let rawData = fs.readFileSync('./Database/videoDB.json');
let videos = JSON.parse(rawData);

const path = require('path');
const db_conn = path.join(process.env.PWD, 'Database', 'videoDB.json');

db_schema = {
    videos: []
}

global.db = require("../Database/fsdb")(db_conn, db_schema);

router.get('/dashboard', (req, res) => {
    if (!req.session.isAuthenticated) {
        res.send('<script>alert("You must login to access this content"); window.location.href = "/auth/login";</script>');
    } else {
        // Render dashboard for authenticated user
        res.render('dashboard.pug', {
            title: 'SoccerWorld',
            videos: videos,
            isAuthenticated: req.session.isAuthenticated || false,
            username: req.session.userID
        });
    }
    
});

router.get('/new_video', (req,res)=>{
    if (!req.session.isAuthenticated) {
        res.send('<script>alert("You must login to access this content"); window.location.href = "/auth/login";</script>');
    } else { 
    res.render('newVideoForm.pug', {
        title: "SoccerWorld"
    });
}
})

router.post('/new_video', (req,res)=>{
    res.render('newVideoForm.pug',{
    title: "SoccerWorld"});

    const {URL, title} = req.body;

    new_video = {
        url : URL,
        title: title,
        username: req.session.userID,
    }

    db.model.videos.push(new_video);
    db.update();
 });   

router.get('/database', (req, res) =>{
    res.json({videos: db.model.videos});
})


module.exports = router