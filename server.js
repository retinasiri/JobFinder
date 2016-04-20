/**
 * Created by jeefer on 3/29/16.
 */

var express = require('express');
var jobModels = require('./models/Job');
var jobsData = require("./jobs-data.js");

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function (req, res) {
    jobsData.findJobs().then(function (error, collection) {
        res.send(collection);
    });
});

app.get('*', function (req, res) {
    res.render('index');
});

//app.get('/', function(req, res){
//    res.render('index');
//});

//jobsData.connect("mongodb://localhost/jobfinder")
jobsData.connect("mongodb://dev:devops123@93.188.161.44:27017/test")
    .then(function () {
        console.log('connect to mongodb successfully!');
        jobModels.seedJobs();
    });

console.log("PORT: " + process.env.PORT + "\nIP: " + process.env.IP);

app.listen(process.env.PORT || 3000, process.env.IP);
