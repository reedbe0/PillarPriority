/*
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile('index.html', {root:__dirname});
});

app.listen(port, () => {
    console.log('Now listening on port ', port);
})
*/
var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res){
    if(req.url === "/" || req.url.match("index.html")){
        fs.readFile("./index.html", "utf-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }
    else if(req.url === "/calender.html" || req.url.match("calendar.html")){
        fs.readFile("./calender.html", "utf-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }
    else if(req.url === "/timeslots.html" || req.url.match("timeslots.html")){
        fs.readFile("./timeslots.html", "utf-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }
    else if(req.url === "/admin.html" || req.url.match("admin.html")){
        fs.readFile("./admin.html", "utf-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }
    else if(req.url.match("\.css$")){
        fs.readFile("./style.css", "utf-8", function(err, css){
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(css);
        })
    }
    else if(req.url.match("\.js$")){
        fs.readFile("./index.js", function(err, javascript){
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(javascript);
        })
    }
    else if(req.url.match("\.js$")){
        fs.readFile("./main.js", function(err, javascript){
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(javascript);
        })
    }
    else if(req.url.match("\.js$")){
        fs.readFile("./timeslots.js", function(err, javascript){
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(javascript);
        })
    }
    else if(req.url.match("\.js$")){
        fs.readFile("./verifylogin.js", function(err, javascript){
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(javascript);
        })
    }
    else if(req.url.match("\.js$")){
        fs.readFile("./admin.js", function(err, javascript){
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(javascript);
        })
    }
    else if(req.url.match("\.js$")){
        fs.readFile("./calendar.js", function(err, javascript){
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(javascript);
        })
    }
    else if(req.url.match("\.png$")){
        fs.readFile("./images/admin.png", function(err, image){
            res.writeHead(200, {"Content-Type": "image/png"});
            res.end(image);
        })
    }
    else if(req.url.match("\.png$")){
        fs.readFile("./images/user.png", function(err, image){
            res.writeHead(200, {"Content-Type": "image/png"});
            res.end(image);
        });
    }
}).listen(3000);