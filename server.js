const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({
    defaultLayout: "main"
}))

app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', function(req, res,){
    res.status(200).render('./partials/home');
});

app.get('/read_admin', (req, res) => {
    fs.readFile('./public/admindb.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        // Send the JSON data to the browser
        res.send(data);
    });
});

app.get('/read_user', (req, res) => {
    fs.readFile('./public/userdb.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        // Send the JSON data to the browser
        res.send(data);
    });
});

app.post('/write_user', (req,res) => {
    const inputData = {
        userEmail: req.body.userEmail,
        code: req.body.code
    };

    fs.readFile('./public/userdb.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
    
        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Internal Server Error');
            return;
        }
    
        if (!Array.isArray(jsonData)) {
            console.error('Existing data is not an array');
            res.status(500).send('Internal Server Error');
            return;
        }
    
        jsonData.push(inputData);
    
        const jsonString = JSON.stringify(jsonData, null, 2);
    
        fs.writeFile('./public/userdb.json', jsonString, 'utf-8', (err) =>{
            if (err) {
                console.error('Error writing to JSON file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }


            res.send('JSON file written successfully!');
        });
    });
});

app.get('/admin', function(req, res,){
    res.status(200).render('./partials/admin');
});

app.post('/write_db', (req,res) => {
    const inputData = {
        itemName: req.body.itemName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        available: req.body.available,
    };

    fs.readFile('./public/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
    
        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Internal Server Error');
            return;
        }
    
        if (!Array.isArray(jsonData)) {
            console.error('Existing data is not an array');
            res.status(500).send('Internal Server Error');
            return;
        }
    
        jsonData.push(inputData);
    
        const jsonString = JSON.stringify(jsonData, null, 2);
    
        fs.writeFile('./public/db.json', jsonString, 'utf-8', (err) =>{
            if (err) {
                console.error('Error writing to JSON file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }


            res.send('JSON file written successfully!');
        });
    });
});

app.get('/calendar', function(req, res,){
    res.status(200).render('./partials/calendar');
});

app.get('/timeslots', function(req, res,){
    res.status(200).render('./partials/timeslots');
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});