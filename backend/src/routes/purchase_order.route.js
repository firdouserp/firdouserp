const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const purchase_orderController = require("../controllers/purchase_order.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createPurchase_orderSchema,
  updatePurchase_orderSchema,
} = require("../middleware/validators/purchase_orderValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(purchase_orderController.getAllPurchase_order)); //localhost:3000/api/v1/purchase_order
router.get(
  "/autocomplete",
  auth(),
  awaitHandlerFactory(purchase_orderController.autocomplete)
); //localhost:3000/api/v1/coa/id/1
router.get("/:id", auth(), awaitHandlerFactory(purchase_orderController.getPurchase_orderById)); //localhost:3000/api/v1/purchase_order/id/purchase_order
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(purchase_orderController.getPurchase_orderBycode)
); //localhost:3000/api/v1/purchase_order/purchase_ordercode/julia
router.post(
  "/",
  auth(),
  createPurchase_orderSchema,
  awaitHandlerFactory(purchase_orderController.createPurchase_order)
); // localhost:3000/api/v1/purchase_order
router.put(
  "/:id",
  auth(),
  updatePurchase_orderSchema,
  awaitHandlerFactory(purchase_orderController.updatePurchase_order)
); //localhost:3000/api/v1/purchase_order/id/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(purchase_orderController.deletePurchase_order)
); //localhost:3000/api/v1/purchase_order/id/1

module.exports = router;
