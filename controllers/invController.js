const utilities = require("../utilities/")

const invController = {}

invController.buildByClassificationId = async function(req, res, next){
    try {
        const nav = await utilities.getNav()
        // Add  inventory logic here
        res.render("inventory/classification", {
            title: "Inventory",
            nav
        })
    } catch (error) {
        throw error
    }
}

module.exports = invController