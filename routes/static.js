/* ******************************************
 * Static Routes
 ****************************************** */
const express = require("express")
const router = express.Router()
const baseController = require("../controllers/baseController")
const utilities = require("../utilities")

// Home route
router.get("/",
  utilities.handleErrors(baseController.buildHome)
)

module.exports = router
