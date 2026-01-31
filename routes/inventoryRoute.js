// Needed Resources
const express = require("express");
const router = new express.Router();

const invController = require("../controllers/invController");
const utilities = require("../utilities");

const { body, validationResult } = require("express-validator");

/* ****************************************
 *  EXISTING ROUTES
 * **************************************** */

// Build inventory by classification
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Inventory detail view
router.get(
  "/detail/:id",
  utilities.handleErrors(invController.buildDetail)
);

// Test error route
router.get(
  "/broken",
  utilities.handleErrors(invController.throwError)
);

// Inventory management view (Admin only)
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkAdmin,
  utilities.handleErrors(invController.buildManagementView)
);

/* ****************************************
 *  ADD CLASSIFICATION ROUTES
 * **************************************** */

// Validation rules
const validateClassificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty().withMessage("Classification name is required.")
      .isLength({ min: 1, max: 25 }).withMessage("Name must be 1–25 characters.")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("Only letters and numbers allowed (no spaces or special characters).")
      .escape(),
  ];
};

// Validation check
const checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    req.flash("error", errors.array().map(e => e.msg).join(" "));

    return res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      messages: req.flash(),
      classification_name: req.body.classification_name || "",
    });
  }
  next();
};

// Show add-classification form
router.get(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAdmin,
  utilities.handleErrors(invController.buildAddClassification)
);

// Handle add-classification POST
router.post(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAdmin,
  validateClassificationRules(),
  checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

/* ****************************************
 *  ADD INVENTORY ROUTES
 * **************************************** */

// Show add-inventory form
router.get(
  "/add-inventory",
  utilities.checkLogin,
  utilities.checkAdmin,
  utilities.handleErrors(invController.buildAddInventory)
);

// Handle add-inventory POST
router.post(
  "/add-inventory",
  utilities.checkLogin,
  utilities.checkAdmin,
  utilities.handleErrors(invController.addInventory)
);

module.exports = router;
