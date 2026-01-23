const express = require('express');
const router = express.Router();
const path = require('path'); // ← ADD THIS

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(path.join(__dirname, "../public/css"))); // ← FIXED
router.use("/js", express.static(path.join(__dirname, "../public/js"))); // ← FIXED
router.use("/images", express.static(path.join(__dirname, "../public/images"))); // ← FIXED

module.exports = router;