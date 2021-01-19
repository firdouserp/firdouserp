const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const fpropController = require("../controllers/fprop.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createFpropSchema,
  updateFpropSchema,
} = require("../middleware/validators/fpropValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(fpropController.getAllFprop)); //localhost:3000/api/v1/fprops
router.get(
  "/autocomplete",
  auth(),
  awaitHandlerFactory(fpropController.autocomplete)
); //localhost:3000/api/v1/fprop/id/1
router.get("/:id", auth(), awaitHandlerFactory(fpropController.getfpropById)); //localhost:3000/api/v1/fprop/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(fpropController.getfpropBycode)
); //localhost:3000/api/v1/fprop/fpropcode/julia
router.post('/', auth(),createFpropSchema, awaitHandlerFactory(fpropController.createfprop));  // localhost:3000/api/v1/notes
router.put(
  "/:id",
  auth(),
  updateFpropSchema,
  awaitHandlerFactory(fpropController.updatefprop)
); //localhost:3000/api/v1/fprop/id/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(fpropController.deletefprop)
); //localhost:3000/api/v1/fprop/id/1

module.exports = router;
