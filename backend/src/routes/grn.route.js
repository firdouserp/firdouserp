const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const grnController = require("../controllers/grn.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createGrnSchema,
  updateGrnSchema,
} = require("../middleware/validators/grnValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(grnController.getAllGrn)); //localhost:3000/api/v1/coa
router.get(
  "/autocomplete",
  auth(),
  awaitHandlerFactory(grnController.autocomplete)
); //localhost:3000/api/v1/grn/id/1
router.get("/:id", auth(), awaitHandlerFactory(grnController.getGrnById)); //localhost:3000/api/v1/coa/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(grnController.getGrnBycode)
); //localhost:3000/api/v1/coa/coacode/julia
router.post(
  "/",
  auth(),
  createGrnSchema,
  awaitHandlerFactory(grnController.createGrn)
); // localhost:3000/api/v1/coa
router.put(
  "/:id",
  auth(),
  updateGrnSchema,
  awaitHandlerFactory(grnController.updateGrn)
); //localhost:3000/api/v1/coa/id/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(grnController.deleteGrn)
); //localhost:3000/api/v1/coa/id/1

module.exports = router;
