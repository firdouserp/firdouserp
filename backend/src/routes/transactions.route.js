const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const transactionsController = require("../controllers/transactions.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createVouchersSchema,
  updateVouchersSchema,
} = require("../middleware/validators/vouchersValidator.middleware");

router.get(
  "/",
  auth(),
  awaitHandlerFactory(transactionsController.getAllVouchers)
); //localhost:3000/api/v1/vouchers
router.get(
  "/monthly",
  auth(),
  awaitHandlerFactory(transactionsController.getVouchersThisMonth)
); //localhost:3000/api/v1/notes/id/1
router.get(
  "/voudetail",
  auth(),
  awaitHandlerFactory(transactionsController.getVoucherDetail)
); //localhost:3000/api/v1/notes/id/1
router.get(
  "/invalidvou",
  auth(),
  awaitHandlerFactory(transactionsController.getInvalidVouchers)
);
router.get(
  "/:id",
  auth(),
  awaitHandlerFactory(transactionsController.getVouchersById)
); //localhost:3000/api/v1/notes/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(transactionsController.getVouchersBycode)
); //localhost:3000/api/v1/notes/notescode/julia
router.post(
  "/",
  auth(),
  createVouchersSchema,
  awaitHandlerFactory(transactionsController.createVouchers)
); // localhost:3000/api/v1/vouchers
router.put(
  "/:id",
  auth(),
  updateVouchersSchema,
  awaitHandlerFactory(transactionsController.updateVouchers)
); //localhost:3000/api/v1/vouchers/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(transactionsController.deleteVouchers)
); //localhost:3000/api/v1/vouchers/1

module.exports = router;
