import * as React from "react";
import {BooleanInput , SearchInput,Filter, List, Datagrid, Edit, Create,SimpleList, SimpleForm, DateField, TextField, DeleteButton,EditButton, TextInput, DateInput, CheckboxGroupInput, BooleanField } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store'
import { makeStyles, Chip,useMediaQuery } from '@material-ui/core';

export const  VouchersIcon = StoreIcon;

export const VouchersActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const VouchersSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
          <SearchInput variant="standard" placeholder="SCode"  source="scode" alwaysOn />
          <SearchInput variant="standard" placeholder="Code"  source="code" alwaysOn />
        </Filter>
      
  );

export const VouchersList = props => (
    <List filters={<VouchersSearchFilter />} {...props}>
        {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
                 <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.code}`}
                    tertiaryText={record => record.id  }
    
                />
                ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="voucher_no" />
            <TextField source="project_id" />
            <TextField source="created_by" />
            <TextField source="chq_no" />
            <TextField source="chq_date" />
            <EditButton  variant="contained" color="secondary"/>
            <DeleteButton/>
        </Datagrid>)}
    </List>
);

const VouchersTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const VouchersEdit = (props) => (
    <Edit undoable={false} actions={<VouchersActions />} title={<VouchersTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="voucher_no" />
            <DateInput format={dateFormatter} parse={dateParser}  source="voucher_date" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="voucher_type" />
            <TextInput source="amount" />
            <TextInput source="remarks" />
            <TextInput source="prepared_by" />
            <TextInput source="project_id" />
            <TextInput source="created_by" />
            <TextInput source="chq_no" />
            <DateInput format={dateFormatter} parse={dateParser}  source="chq_date" />
            <BooleanInput source="approved" />
        </SimpleForm>
    </Edit>
);

export const VouchersCreate = (props) => (
    <Create undoable={false} actions={<VouchersActions />}  title="New Voucher" {...props}>
        <SimpleForm variant="standard">
        <TextInput disabled source="id" />
            <TextInput source="voucher_no" />
            <DateInput format={dateFormatter} parse={dateParser}  source="voucher_date" /*options={{ multiLine: true }}*/ /> 
            <TextInput multiline source="voucher_type" />
            <TextInput source="amount" />
            <TextInput source="remarks" />
            <TextInput source="prepared_by" />
            <TextInput source="project_id" />
            <TextInput source="created_by" />
            <TextInput source="chq_no" />
            <DateInput format={dateFormatter} parse={dateParser}  source="chq_date" />
            <BooleanInput source="approved" />
        </SimpleForm>
    </Create>
);
const dateFormatter = v => {
    // v is a `Date` object
    if (!(v instanceof Date) || isNaN(v)) return;
    const pad = '00';
    const yy = v.getFullYear().toString();
    const mm = (v.getMonth() + 1).toString();
    const dd = v.getDate().toString();
    return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
  };
  
  const dateParser = v => {
    // v is a string of "YYYY-MM-DD" format
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
    if (match === null) return;
    const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
    if (isNaN(d)) return;
    return d;
  };
  
  <DateInput source="isodate" format={dateFormatter} parse={dateParser} />