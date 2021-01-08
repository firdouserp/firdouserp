import * as React from "react";
import { Route } from "react-router-dom";
import Accounts from "./accounts/Accounts";
import { Userform } from "./react_form/Userform";

export default [
  <Route exact path="/accounts" component={Accounts} />,
  //<Route exact path="/accounts/vouchers/create" component={VoucherEntry} />,
  //<Route exact path="/accounts/voucherentry/:id" component={VoucherEdit} />,
  <Route exact path="/userform" component={Userform} />,
  //<Route exact path="/bookingform" component={BookingFormWizard} />,
];
