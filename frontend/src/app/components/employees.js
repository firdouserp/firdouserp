import { useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

export const EmployeesIcon = StoreIcon;

export const EmployeesActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const EmployeesSearchFilter = (props) => (

    <Filter {...props}>
        <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
        <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
        <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    </Filter>

);

export const EmployeesList = props => (
    <List filters={<EmployeesSearchFilter />} {...props}>
        {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
            <SimpleList
                primaryText={record => record.title}
                secondaryText={record => `${record.code}`}
                tertiaryText={record => record.id}

            />
        ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="code" />
                    <TextField source="scode" />
                    <TextField source="title" />
                    <TextField source="remarks" />
                    <EditButton variant="contained" color="secondary" />
                    <DeleteButton />
                </Datagrid>)}
    </List>
);

const EmployeesTitle = ({ record }) => {
    return <span>Employees {record ? `"${record.title}"` : ''}</span>;
};

export const EmployeesEdit = (props) => (
    <Edit undoable={false} actions={<EmployeesActions />} title={<EmployeesTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="designation" />
            <TextInput source="grade" />
            <TextInput source="department" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="cnic" />
            <TextInput source="remarks" />
            <BooleanInput source="active" />
        </SimpleForm>
    </Edit>
);

export const EmployeesCreate = (props) => (
    <Create undoable={false} actions={<EmployeesActions />} title="New Employee" {...props}>
        <SimpleForm variant="standard">
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="designation" />
            <TextInput source="grade" />
            <TextInput source="department" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="cnic" />
            <TextInput source="remarks" />
            <BooleanInput source="active" />
        </SimpleForm>
    </Create>
);