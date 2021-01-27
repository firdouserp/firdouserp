import * as React from "react";
import { Route } from "react-router-dom";
import Accounts from "../accounts/Accounts";
import { InvalidVouchersList } from "../accounts/vouchers";
import Purchases from "../purchases/Purchases";
import AccountBalancePrintable from "../reports/Accountbalances";
import ProjectLedgerPrintable from "../reports/ProjectLedger";
import Reports from "../reports/Reports";
import Sales from "../sales/Sales";
import { SettingList } from "../settings/setting";

export default [
  <Route exact path="/accounts" component={Accounts} />,
  <Route exact path="/purchases" component={Purchases} />,
  <Route exact path="/sales" component={Sales} />,
  <Route exact path="/reports" component={Reports} />,
  <Route exact path="/accbal" component={AccountBalancePrintable} />,
  <Route exact path="/projectledger" component={ProjectLedgerPrintable} />,
  <Route exact path="/invalidvou" component={InvalidVouchersList} />,

  //<Route exact path="/accounts/vouchers/create" component={VoucherEntry} />,
  //<Route exact path="/accounts/voucherentry/:id" component={VoucherEdit} />,
  //<Route exact path="/userform" component={Userform} />,
  //<Route exact path="/bookingform" component={BookingFormWizard} />,
];
