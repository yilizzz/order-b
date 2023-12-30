const express = require("express");
const router = express.Router();
const servicesCtrl = require("../controllers/services");

router.get("/services", servicesCtrl.getAllServices);
module.exports = router;
