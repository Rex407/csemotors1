const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

/* ***************************
 *  Build inventory by classification view
 * *************************** */
async function buildByClassificationId(req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();
    const className = data[0]?.classification_name || "Unknown";

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    });
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Build inventory detail view
 * *************************** */
async function buildDetail(req, res, next) {
  try {
    const invId = req.params.id;
    const vehicle = await invModel.getInventoryById(invId);

    if (!vehicle) {
      req.flash("notice", "Vehicle not found.");
      return res.redirect("/inv/");
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle);
    const nav = await utilities.getNav();
    const vehicleTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`;

    res.render("inventory/detail", {
      title: vehicleTitle,
      nav,
      message: null,
      htmlData,
    });
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Throw test error
 * *************************** */
async function throwError(req, res) {
  throw new Error("I made this error on purpose");
}

/* ***************************
 *  Build management view
 * *************************** */
async function buildManagementView(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      messages: req.flash(),
    });
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Build add classification view
 * *************************** */
async function buildAddClassification(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      messages: req.flash(),
    });
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Build add inventory view
 * *************************** */
async function buildAddInventory(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList();

    res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      messages: req.flash(),
    });
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Add classification (POST)
 * *************************** */
async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body;
    const result = await invModel.addClassification(classification_name);

    if (result) {
      req.flash("success", "Classification added successfully.");
      return res.redirect("/inv/");
    }

    throw new Error("Failed to add classification");
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Add inventory (POST)
 * *************************** */
async function addInventory(req, res, next) {
  try {
    const result = await invModel.addInventory(req.body);

    if (result) {
      req.flash("success", "Vehicle added successfully.");
      return res.redirect("/inv/");
    }

    throw new Error("Failed to add inventory");
  } catch (err) {
    next(err);
  }
}

/* ***************************
 *  Module exports
 * *************************** */
module.exports = {
  buildByClassificationId,
  buildDetail,
  throwError,
  buildManagementView,
  buildAddClassification,
  buildAddInventory,
  addClassification,
  addInventory,
};
