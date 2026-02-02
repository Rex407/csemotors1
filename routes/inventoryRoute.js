const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const invValidation = require("../utilities/inventory-validation")

// Management view
router.get("/", invController.buildManagementView)

/* ***************************
 * Add Classification
 * *************************** */
router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  invValidation.classificationRules(),
  invValidation.checkClassification,
  invController.addClassification
)

/* ***************************
 * Add Inventory
 * *************************** */
router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  invValidation.inventoryRules(),
  invValidation.checkInventory,
  invController.addInventory
)

/* ***************************
 * Edit Inventory
 * *************************** */
router.get("/edit/:id", invController.buildEditInventory)
router.post(
  "/edit/:id",
  invValidation.inventoryRules(),
  invValidation.checkInventory,
  invController.updateInventory
)

/* ***************************
 * View Inventory by Classification
 * *************************** */
router.get("/type/:classificationId", invController.buildByClassificationId)

/* ***************************
 * View Vehicle Detail
 * *************************** */
router.get("/detail/:id", invController.buildDetail)

/* ***************************
 * Test Error Route
 * *************************** */
router.get("/error", invController.throwError)

module.exports = router
