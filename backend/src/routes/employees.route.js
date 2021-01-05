const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const employeesController = require("../controllers/employees.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createEmployeesSchema,
  updateEmployeesSchema,
} = require("../middleware/validators/employeesValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(employeesController.getAllEmployees)); //localhost:3000/api/v1/employees
router.get(
  "/autocomplete",
  auth(),
  awaitHandlerFactory(employeesController.autocomplete)
); //localhost:3000/api/v1/employees/id/1
router.get("/:id", auth(), awaitHandlerFactory(employeesController.getEmployeesById)); //localhost:3000/api/v1/coa/id/1
router.get(
  "/code/:code",
  auth(),
  awaitHandlerFactory(employeesController.getEmployeesByemployees)
); //localhost:3000/api/v1/employees/employeescode/julia
router.post(
  "/",
  auth(),
  createEmployeesSchema,
  awaitHandlerFactory(employeesController.createEmployees)
); // localhost:3000/api/v1/coa
router.put(
  "/:id",
  auth(),
  updateEmployeesSchema,
  awaitHandlerFactory(employeesController.updateEmployees)
); //localhost:3000/api/v1/employees/id/1 , using patch for partial update
router.delete(
  "/:id",
  auth(Role.Admin),
  awaitHandlerFactory(employeesController.deleteEmployees)
); //localhost:3000/api/v1/employees/id/1

module.exports = router;
