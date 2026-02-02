const { body, validationResult } = require("express-validator")
const utilities = require("./index")

/* ************************
 * Classification Validation Rules
 ************************ */
const classificationRules = () => [
  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a classification name.")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Classification name must not contain spaces or special characters."),
]

/* ************************
 * Inventory Validation Rules
 ************************ */
const inventoryRules = () => [
  body("inv_make")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a make."),
  body("inv_model")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a model."),
  body("inv_year")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Please provide a valid year."),
  body("inv_price")
    .isFloat({ min: 0 })
    .withMessage("Please provide a valid price."),
  body("inv_miles")
    .isInt({ min: 0 })
    .withMessage("Please provide valid mileage."),
  body("inv_color")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a color."),
  body("classification_id")
    .isInt()
    .withMessage("Please choose a classification."),
]

/* ************************
 * Check Classification Validation Results
 ************************ */
const checkClassification = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    return res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      messages: req.flash(),
      errors: errors.array(),
      classification_name: req.body.classification_name // sticky value
    })
  }
  next()
}

/* ************************
 * Check Inventory Validation Results
 ************************ */
const checkInventory = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(req.body.classification_id)
    return res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      messages: req.flash(),
      errors: errors.array(),
      ...req.body // sticky values
    })
  }
  next()
}

module.exports = {
  classificationRules,
  inventoryRules,
  checkClassification,
  checkInventory
}
