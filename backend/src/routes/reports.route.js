const express = require("express");
const router = express.Router();
const ReportsController = require("../controllers/reports.controller");
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get(
  "/accbal",
  auth(),
  awaitHandlerFactory(ReportsController.getAccountBalances)
); // localhost:3000/api/v1/users/whoami

module.exports = router;
