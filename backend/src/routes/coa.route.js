const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const coaController = require("../controllers/coa.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createCoaSchema,
  updateCoaSchema,
} = require("../middleware/validators/coaValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(coaController.getAllCoa)); //localhost:3000/api/v1/coa
router.get(
  "/autocomplete",
  auth(),
  awaitHandlerFactory(coaController.autocomplete)
); //localhost:3000/api/v1/coa/id/1
router.get("/:id", auth(), awaitHandlerFactory(coaController.getCoaById)); //localhost:3000/api/v1/coa/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(coaController.getCoaBycode)
); //localhost:3000/api/v1/coa/coacode/julia
router.post(
  "/",
  auth(),
  createCoaSchema,
  awaitHandlerFactory(coaController.createCoa)
); // localhost:3000/api/v1/coa
router.put(
  "/:id",
  auth(),
  updateCoaSchema,
  awaitHandlerFactory(coaController.updateCoa)
); //localhost:3000/api/v1/coa/id/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(coaController.deleteCoa)
); //localhost:3000/api/v1/coa/id/1

module.exports = router;
