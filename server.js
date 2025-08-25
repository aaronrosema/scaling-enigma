// Import the express, path, and express-rate-limit modules
var express = require('express');
var path = require('path');
var rateLimit = require('express-rate-limit');
var escape = require('escape-html');

// Create an express application
var app = express();

// Trust proxy to handle X-Forwarded-For header correctly
app.set('trust proxy', 'loopback');

// Import the body-parser module
var bodyParser = require('body-parser');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files only from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a rate limiter middleware
var limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply the rate limiter to the POST route
app.post('/', limiter, function(req, res) {
    // Send a welcome message to the user
    res.send('<h1 class="welcome-message">Welcome, ' + escape(req.body.username) + 
    '!</h1><p class="refresh-message">Refresh the page to go back</p>');
});

// Start the server and listen on port 3000
app.listen(3000, function() {
    // Log a message when the server starts successfully
    console.log('App listening on port 3000');
});

// Enjoying this callenge? We have 10 more challenges for you in the Secure Code Game. Play at gh.io/securecodegame