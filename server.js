// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Require cors and body-parser
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//GET Route
app.get("/all", (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

// POST Route 
app.post("/add", (req, res) => {
    newEntry = {
        date: req.body.date,
        city: req.body.city,
        temp: req.body.temp,
        description: req.body.description,
        content: req.body.content
    };
    projectData = newEntry;
    console.log(projectData);
    res.end();
});
