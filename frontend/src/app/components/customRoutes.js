import * as React from "react";
import { Route } from 'react-router-dom';
import Accounts from './accounts/Accounts';
import {VoucherEntry} from './accounts/VoucherEntry';

export default [
    <Route exact path="/accounts" component={Accounts} />,
    <Route exact path="/accounts/voucherentry" component={VoucherEntry} />,
];