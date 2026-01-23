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

// Define the navigation links
const navLinks = [
    { name: "Home", path: "/", active: true },
    { name: "Custom", path: "/custom", active: false },
    { name: "Sedan", path: "/sedan", active: false },
    { name: "SUV", path: "/suv", active: false },
    { name: "Truck", path: "/truck", active: false }
];

// Function to generate navigation HTML
function buildNavigation(currentPath) {
    return `
        <ul>
            ${navLinks.map(link => `
                <li>
                    <a href="${link.path}" class="${currentPath === link.path ? 'active' : ''}">
                        ${link.name}
                    </a>
                </li>
            `).join('')}
        </ul>
    `;
}

// Index route
app.get("/", function(req, res){
    res.render("index", {
        title: "Home",
        nav: buildNavigation("/") // Pass the navigation HTML
    })
})

// Inventory routes
app.use("/inv", inventoryRoute)

// Other routes would look similar
app.get("/custom", function(req, res){
    res.render("custom", {
        title: "Custom",
        nav: buildNavigation("/custom")
    })
})

app.get("/sedan", function(req, res){
    res.render("sedan", {
        title: "Sedan",
        nav: buildNavigation("/sedan")
    })
})

app.get("/suv", function(req, res){
    res.render("suv", {
        title: "SUV",
        nav: buildNavigation("/suv")
    })
})

app.get("/truck", function(req, res){
    res.render("truck", {
        title: "Truck",
        nav: buildNavigation("/truck")
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