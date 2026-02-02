const pool = require("../database/")

/* ***************************
 * Get all classifications
 * *************************** */
async function getClassifications() {
  const sql = `
    SELECT classification_id, classification_name
    FROM classification
    ORDER BY classification_name`
  const result = await pool.query(sql)
  return result.rows
}

/* ***************************
 * Insert classification
 * *************************** */
async function addClassification(classification_name) {
  const sql = `
    INSERT INTO classification (classification_name)
    VALUES ($1)
    RETURNING *`
  const result = await pool.query(sql, [classification_name])
  return result.rows[0] // return single row
}

/* ***************************
 * Insert inventory
 * *************************** */
async function addInventory(data) {
  const sql = `
    INSERT INTO inventory (
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`
  const result = await pool.query(sql, [
    data.inv_make,
    data.inv_model,
    data.inv_year,
    data.inv_description,
    data.inv_image,
    data.inv_thumbnail,
    data.inv_price,
    data.inv_miles,
    data.inv_color,
    data.classification_id
  ])
  return result.rows[0] // return single row
}

/* ***************************
 * Update inventory
 * *************************** */
async function updateInventory(inv_id, data) {
  const sql = `
    UPDATE inventory
    SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4,
        inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8,
        inv_color = $9, classification_id = $10
    WHERE inv_id = $11
    RETURNING *`
  const result = await pool.query(sql, [
    data.inv_make,
    data.inv_model,
    data.inv_year,
    data.inv_description,
    data.inv_image,
    data.inv_thumbnail,
    data.inv_price,
    data.inv_miles,
    data.inv_color,
    data.classification_id,
    inv_id
  ])
  return result.rows[0] // return updated row
}

/* ***************************
 * Get inventory by classification id
 * *************************** */
async function getInventoryByClassificationId(classification_id) {
  const sql = `
    SELECT i.*, c.classification_name
    FROM inventory i
    JOIN classification c
      ON i.classification_id = c.classification_id
    WHERE i.classification_id = $1`
  const result = await pool.query(sql, [classification_id])
  return result.rows
}

/* ***************************
 * Get inventory item by id
 * *************************** */
async function getInventoryById(inv_id) {
  const sql = `
    SELECT * FROM inventory
    WHERE inv_id = $1`
  const result = await pool.query(sql, [inv_id])
  return result.rows[0]
}

module.exports = {
  getClassifications,
  addClassification,
  addInventory,
  updateInventory,              // ✅ added export
  getInventoryByClassificationId,
  getInventoryById
}
