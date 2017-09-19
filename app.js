// requires and setup
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());

// render the home page
app.get("/", function (req, res) {
    res.render("index");
});

// get request and response
app.get("/:dateStamp", function(req, res) {
    // grab data from request
    var dateInput = req.params.dateStamp;

    // locale date format options: 
    var dateFormat = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    // if dateInput is not a number, set naturalDate to dateInput
    if (isNaN(dateInput)) {
        var naturalDate = new Date(dateInput);
        var unixDate;

        // check if naturalDate is valid user input. If not, return null.
        if (naturalDate == "Invalid Date") {
            naturalDate = null;
            unixDate = null;
        } else {
            naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
        
            // convert dateInput to seconds/unix
            unixDate = new Date(dateInput).getTime() / 1000;
        }
    
    // if date is a number (unix), set unixDate to dateInput
    } else {
        unixDate = dateInput;
        
        // convert dateInput to human readable format.
        naturalDate = new Date(dateInput * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
    }
    // response = unix and natrual dates
    res.json({unix: unixDate, natural: naturalDate});
});

// set port based on environment (local or live?)
var port = process.env.PORT || 3000;

// app.listen(process.env.PORT, function () {
    app.listen(port, function() {
    console.log('Server started...');
  });
  