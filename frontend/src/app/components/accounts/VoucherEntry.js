
import * as React from "react";
import {BooleanInput ,TabbedForm , SearchInput,Filter, List, Datagrid, Edit, Create, SimpleList,SimpleForm, DateField, TextField, EditButton,DeleteButton, TextInput, DateInput, CheckboxGroupInput, BooleanField, FormTab } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { makeStyles, Chip,useMediaQuery } from '@material-ui/core';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { useAuthenticated ,useAuthState, Loading } from 'react-admin';

const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});


export const VoucherEntry = (props) => {
    useAuthenticated();
    return(
    
        <div variant="standard">
            Voucher Entry Form goes here
        </div>
 
    )};