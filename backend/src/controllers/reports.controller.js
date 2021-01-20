const ReportsModel = require("../models/reports.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ReportsController {
  getAccountBalances = async (req, res, next) => {
    let accountBalanceList = await ReportsModel.accountbalances();
    if (!accountBalanceList.length) {
      throw new HttpException(404, "Users not found");
    }

    let content_range =
      "1-" + accountBalanceList.length + "/" + accountBalanceList.length;

    res.set("Content-Range", content_range);

    res.send(accountBalanceList);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ReportsController();
