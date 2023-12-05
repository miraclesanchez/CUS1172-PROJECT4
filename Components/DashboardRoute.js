var express = require('express');
var router = express.Router();

const fs = require('fs');
let rawData = fs.readFileSync('./Database/videoDB.json');
let videos = JSON.parse(rawData);
console.log(videos);

db_conn = "/Users/miraclesanchez/cus1172/CUS1172-PROJECT4/Database/videoDB.json"

db_schema = {
    videos: []
}

global.db = require("../Database/fsdb")(db_conn, db_schema);

router.get('/dashboard', (req,res)=>{
    res.send(`hello`);
})

router.get('/new_video', (req,res)=>{
    //verify if the user is logged in
    //then 
    res.render('newVideoForm.pug');
})

router.post('/new_video', (req,res)=>{
    res.render('newVideoForm.pug', {
        recieved: "Video Submitted"
    });

    const {URL, title} = req.body;

    new_video = {
        url : URL,
        title: title
    }

    db.model.videos.push(new_video);
    console.log(db.model.users);
    db.update();
 })   
module.exports = router