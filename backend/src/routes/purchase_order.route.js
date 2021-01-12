const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const purchase_orderController = require("../controllers/purchase_order.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createPurchase_orderSchema,
  updatePurchaseSchema,
} = require("../middleware/validators/purchase_orderValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(purchase_orderController.getAllPurchase_order)); //localhost:3000/api/v1/coa
router.get(
  "/autocomplete",
  auth(),
  awaitHandlerFactory(purchase_orderController.autocomplete)
); //localhost:3000/api/v1/coa/id/1
router.get("/:id", auth(), awaitHandlerFactory(purchase_orderController.getPurchase_orderById)); //localhost:3000/api/v1/coa/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(purchase_orderController.getPurchase_orderBycode)
); //localhost:3000/api/v1/coa/coacode/julia
router.post(
  "/",
  auth(),
  createPurchase_orderSchema,
  awaitHandlerFactory(purchase_orderController.createPurchase)
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
