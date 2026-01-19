/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

/* ***********************
 * View Engines and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Define the Delorean data
const featuredVehicle = {
    make: 'DMC',
    model: 'Delorean',
    description: '3 Cup holders\nSuperman doors\nFuzzy dice!',
    image: '/images/delorean.jpg',
    upgrades: [
        'Flux Capacitor',
        'Flame Decals',
        'Bumper Stickers',
        'Hub Caps'
    ],
    reviews: [
        { text: 'So fast it\'s almost like traveling in time.', rating: 4 },
        { text: 'Coolest ride on the road.', rating: 4 },
        { text: 'I\'m feeling McFly!', rating: 5 },
        { text: 'The most futuristic ride of our day.', rating: 4.5 },
        { text: '80\'s livin\' and I love it!', rating: 5 }
    ]
};

// Index route
app.get("/", function(req, res){
    res.render("index", {
        title: "Home",
        pageTitle: "CSE Motors",
        featuredVehicle: featuredVehicle
    })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
    console.log(`app listening on ${host}:${port}`)
})