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

    let content_range =
      "1-" + accountBalanceList.length + "/" + accountBalanceList.length;

    res.set("Content-Range", content_range);

    res.send(accountBalanceList);
  };
  getProjectLedger = async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let projectledgerList = await ReportsModel.projectledger(filter);

    let content_range =
      "1-" + projectledgerList.length + "/" + projectledgerList.length;

    res.set("Content-Range", content_range);

    res.send(projectledgerList);
  };

  getProjectLedgerByAccount = async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let projectledgerList = await ReportsModel.projectledgerByAccount(
      req.params.id
    );

    let content_range =
      "1-" + projectledgerList.length + "/" + projectledgerList.length;

    res.set("Content-Range", content_range);

    res.send(projectledgerList);
  };

  getTrialBalanceByPeriod = async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let TrialBalanc = await ReportsModel.trialBalanceByPeriod(filter);

    let content_range = "1-" + TrialBalanc.length + "/" + TrialBalanc.length;

    res.set("Content-Range", content_range);

    res.send(TrialBalanc);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ReportsController();
