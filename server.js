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
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")
const baseController = require("./controllers/baseController") // ← ADD THIS

/* ***********************
 * View Engines and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route - USING THE HANDLEERRORS MIDDLEWARE
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)

// Vehicle type routes - Update these too
app.get("/custom", utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.render("custom", {
        title: "Custom",
        nav
    })
}))

app.get("/sedan", utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.render("sedan", {
        title: "Sedan",
        nav
    })
}))

app.get("/suv", utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.render("suv", {
        title: "SUV",
        nav
    })
}))

app.get("/truck", utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.render("truck", {
        title: "Truck",
        nav
    })
}))

/* ***********************
 * File Not Found Route - must be last route in list
 *************************/
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 * REVISED VERSION WITH GENERIC MESSAGES
 *************************/
app.use(async (err, req, res, next) => {
    let nav = await utilities.getNav()
    console.error(`Error at: "${req.originalUrl}": ${err.message}`)
    
    let message
    if(err.status == 404) { 
        message = err.message 
    } else { 
        message = 'Oh no! There was a crash. Maybe try a different route?' 
    }
    
    res.render("errors/error", {
        title: err.status || 'Server Error',
        message,
        nav
    })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

/* ***********************
 * Log statement
 *************************/
app.listen(port, () => {
    console.log(`app listening on ${host}:${port}`)
})