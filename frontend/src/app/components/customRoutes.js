import * as React from "react";
import { Route } from 'react-router-dom';
import Accounts from './accounts/Accounts';

export default [
    <Route exact path="/accounts" component={Accounts} />,
];