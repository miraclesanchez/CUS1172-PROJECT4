var express = require('express');
var router = express.Router();

const fs = require('fs');
let rawData = fs.readFileSync('./Database/videoDB.json');
let videos = JSON.parse(rawData);

db_conn = "/Users/miraclesanchez/cus1172/CUS1172-PROJECT4/Database/videoDB.json"

db_schema = {
    videos: []
}

global.db = require("../Database/fsdb")(db_conn, db_schema);

router.get('/dashboard', (req, res) => {
    res.render('dashboard.pug', {
        title: 'SoccerWorld',
        videos: videos,
    });
});

router.get('/new_video', (req,res)=>{
    //verify if the user is logged in
    //then 
    res.render('newVideoForm.pug', {
        title: "SoccerWorld"
    });
})

router.post('/new_video', (req,res)=>{
    res.render('newVideoForm.pug',{
    title: "SoccerWorld"});

    const {URL, title} = req.body;

    new_video = {
        url : URL,
        title: title
    }

    db.model.videos.push(new_video);
    db.update();
 });   

router.get('/database', (req, res) =>{
    res.json({videos: db.model.videos});
})


module.exports = router