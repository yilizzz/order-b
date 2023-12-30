const express = require("express");
const router = express.Router();
const servicesCtrl = require("../controllers/services");
const accountsCtrl = require("../controllers/accounts");
const auth = require("../middleware/auth");
const saveImage = require("../middleware/save_image");

router.post("/login", accountsCtrl.logIn);
router.post("/services", auth, saveImage, servicesCtrl.addService);
router.put("/services/:id", auth, saveImage, servicesCtrl.updateServiceById);
router.get("/services/:id", servicesCtrl.getServiceById);
router.delete("/services/:id", auth, servicesCtrl.deleteServiceById);
module.exports = router;
