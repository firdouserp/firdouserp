const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const supplierRouter = require('./routes/supplier.route');
const projectsRouter = require('./routes/projects.route');
const unitsRouter = require('./routes/units.route');
const stockRouter = require('./routes/stock.route');
const coaRouter = require('./routes/coa.route');
const coa_typeRouter = require('./routes/coa_type.route');
const ledgerRouter = require('./routes/ledger.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/suppliers`, supplierRouter);
app.use(`/api/v1/projects`, projectsRouter);
app.use(`/api/v1/units`, unitsRouter);
app.use(`/api/v1/stock`, stockRouter);
app.use(`/api/v1/coa`, coaRouter);
app.use(`/api/v1/coa_type`, coa_typeRouter);
app.use(`/api/v1/ledger`, ledgerRouter);


// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
