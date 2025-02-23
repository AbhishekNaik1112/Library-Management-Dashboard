const express = require("express");
const router = express.Router();
const issuanceController = require("../controllers/issuanceController");

router.get("/", issuanceController.getIssuances);
router.post("/", issuanceController.createIssuance);
router.get("/outstanding", issuanceController.getOutstandingIssuances);
router.get("/:id", issuanceController.getIssuanceById);
router.put("/:id", issuanceController.updateIssuance);

module.exports = router;
