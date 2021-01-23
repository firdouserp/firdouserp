const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const vouchersController = require("../controllers/vouchers.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createVouchersSchema,
  updateVouchersSchema,
} = require("../middleware/validators/vouchersValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(vouchersController.getAllVouchers)); //localhost:3000/api/v1/vouchers
router.get(
  "/monthly",
  auth(),
  awaitHandlerFactory(vouchersController.getVouchersThisMonth)
); //localhost:3000/api/v1/notes/id/1
router.get(
  "/voudetail",
  auth(),
  awaitHandlerFactory(vouchersController.getVoucherDetail)
); //localhost:3000/api/v1/notes/id/1
router.get(
  "/invalidvou",
  auth(),
  awaitHandlerFactory(vouchersController.getInvalidVouchers)
);
router.get(
  "/:id",
  auth(),
  awaitHandlerFactory(vouchersController.getVouchersById)
); //localhost:3000/api/v1/notes/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(vouchersController.getVouchersBycode)
); //localhost:3000/api/v1/notes/notescode/julia
router.post(
  "/",
  auth(),
  createVouchersSchema,
  awaitHandlerFactory(vouchersController.createVouchers)
); // localhost:3000/api/v1/vouchers
router.put(
  "/:id",
  auth(),
  updateVouchersSchema,
  awaitHandlerFactory(vouchersController.updateVouchers)
); //localhost:3000/api/v1/vouchers/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(vouchersController.deleteVouchers)
); //localhost:3000/api/v1/vouchers/1

module.exports = router;
