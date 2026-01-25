const utilities = require("../utilities/")

const invController = {}

invController.buildByClassificationId = async function(req, res){
    const classificationId = req.params.classificationId
    const nav = await utilities.getNav()
    
    // Your logic here
    res.render("./inventory/classification", {
        title: `Inventory - ${classificationId}`,
        nav,
        classificationId
    })
}

module.exports = invController