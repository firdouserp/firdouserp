import * as React from "react";
import {BooleanInput , SearchInput,Filter, List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, CheckboxGroupInput, BooleanField } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { makeStyles, Chip } from '@material-ui/core';

export const SupplierActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const SupplierSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput  placeholder="Title" source="title" alwaysOn />
          <SearchInput placeholder="SCode"  source="scode" alwaysOn />
          <SearchInput placeholder="Code"  source="code" alwaysOn />
        </Filter>
      
  );

export const SupplierList = (props) => (
    <List filters={<SupplierSearchFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="scode" />
            <TextField source="title" />
            <BooleanField source="active" />
            <TextField source="nature" />
            <EditButton  variant="contained" color="secondary"/>
        </Datagrid>
    </List>
);

const SupplierTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const SupplierEdit = (props) => (
    <Edit  undoable={false} actions={<SupplierActions />} title={<SupplierTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="person" />
            <TextInput source="contact" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="country" />
            <TextInput source="email" />
            <TextInput source="fax" />
            <TextInput source="ntn" />
            <TextInput source="stn" />
            <TextInput source="cnic" />
            <TextInput source="businesstitle" />
            <TextInput source="nature" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Edit>
);

export const SupplierCreate = (props) => (
    <Create actions={<SupplierActions />}  title="New Suppier" {...props}>
        <SimpleForm>
            <TextInput source="code" />
            <TextInput source="scode" />
            <TextInput multiline source="title" />
            <TextInput source="person" />
            <TextInput source="contact" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="country" />
            <TextInput source="email" />
            <TextInput source="fax" />
            <TextInput source="ntn" />
            <TextInput source="stn" />
            <TextInput source="cnic" />
            <TextInput source="businesstitle" />
            <TextInput source="nature" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Create>
);