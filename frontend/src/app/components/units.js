import { useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

export const UnitsIcon = HomeWorkIcon;

export const UnitsActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const UnitsSearchFilter = (props) => (

    <Filter {...props}>
        <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
        <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
        <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    </Filter>

);

export const UnitsList = props => (
    <List filters={<UnitsSearchFilter />} {...props}>
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
                    <TextField source="ulocation" />
                    <TextField source="utype" />
                    <TextField source="remarks" />
                    <TextField source="active" />
                    <EditButton variant="contained" color="secondary" />
                    <DeleteButton />
                </Datagrid>)}
    </List>
);

const UnitsTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const UnitsEdit = (props) => (
    <Edit undoable={false} actions={<UnitsActions />} title={<UnitsTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="ulocation" />
            <TextInput source="utype" />
            <TextInput source="usize" />
            <TextInput source="remarks" />
            <BooleanInput source="active" />
        </SimpleForm>
    </Edit>
);

export const UnitsCreate = (props) => (
    <Create actions={<UnitsActions />} title="New Unit" {...props}>
        <SimpleForm variant="standard">
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="ulocation" />
            <TextInput source="utype" />
            <TextInput source="usize" />
            <TextInput source="remarks" />
            <BooleanInput source="active" />
        </SimpleForm>
    </Create>
);