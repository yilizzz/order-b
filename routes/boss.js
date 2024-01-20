const express = require("express");
const router = express.Router();
const servicesCtrl = require("../controllers/services");
const accountsCtrl = require("../controllers/accounts");
const auth = require("../middleware/auth");
const saveImage = require("../middleware/save_image");

router.post("/login", accountsCtrl.logIn);

router.post("/services/:lang", auth, saveImage, servicesCtrl.addService);
router.put(
  "/services/:id/:lang",
  auth,
  saveImage,
  servicesCtrl.updateServiceById
);

router.get("/services/:id/:lang", servicesCtrl.getServiceById);

router.delete("/services/:id/:lang", auth, servicesCtrl.deleteServiceById);
module.exports = router;
