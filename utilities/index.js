const invModel = require("../models/inventory-model")

const Util = {}

/* ************************
 * Build navigation
 ************************ */
Util.getNav = async function () {
  const data = await invModel.getClassifications() // returns rows array
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  if (data && data.length > 0) {
    data.forEach((row) => {
      list += "<li>"
      list += `<a href="/inv/type/${row.classification_id}"
        title="See our inventory of ${row.classification_name} vehicles">
        ${row.classification_name}</a>`
      list += "</li>"
    })
  } else {
    list += "<li>No classifications found</li>"
  }

  list += "</ul>"
  return list
}

/* ************************
 * Classification grid
 ************************ */
Util.buildClassificationGrid = async function (data) {
  let grid = ""
  if (data && data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += `<li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}"
          alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <hr>
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`
    })
    grid += "</ul>"
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles found.</p>'
  }
  return grid
}

/* ************************
 * Vehicle detail
 ************************ */
Util.buildSingleVehicleDisplay = async function (vehicle) {
  return `
  <section id="vehicle-display">
    <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
    <div>
      <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
      <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      <p><strong>Miles:</strong> ${vehicle.inv_miles}</p>
    </div>
  </section>`
}

/* ************************
 * REQUIRED BY ASSIGNMENT 4
 * Classification dropdown
 ************************ */
Util.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications() // returns rows array
  let list = `<select name="classification_id" required>`
  list += `<option value="">Choose a Classification</option>`

  if (data && data.length > 0) {
    data.forEach(row => {
      list += `<option value="${row.classification_id}"`
      if (classification_id == row.classification_id) {
        list += " selected"
      }
      list += `>${row.classification_name}</option>`
    })
  }

  list += "</select>"
  return list
}

/* ************************
 * Error wrapper
 ************************ */
Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
