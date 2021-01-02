import * as React from "react";
import { Route } from 'react-router-dom';
import Accounts from './accounts/Accounts';
import {VoucherEntry} from './accounts/VoucherEntry';
import {Userform} from './react_form/Userform';
import BookingFormWizard from './booking/BookingFormWizard';


export default [

    <Route exact path="/accounts" component={Accounts} />,
    <Route exact path="/accounts/voucherentry" component={VoucherEntry} />,
    <Route exact path="/userform" component={Userform} />,
    <Route exact path="/bookingform" component={BookingFormWizard} />,

];