import { useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ListAltIcon from '@material-ui/icons/ListAlt';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';
import FirdousSelect from './accounts/FirdousSelect';
export const CoaIcon = ListAltIcon;

export const CoaActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const CoaSearchFilter = (props) => (

    <Filter {...props}>
        <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
        <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
        <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    </Filter>

);

export const CoaList = props => (
    <List filters={<CoaSearchFilter />} {...props}>
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
                    <TextField source="notes" />
                    <TextField source="active" />
                    <EditButton variant="contained" color="secondary" />
                    <DeleteButton />
                </Datagrid>)}
    </List>
);

const CoaTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const CoaEdit = (props) => (
    <Edit undoable={false} actions={<CoaActions />} title={<CoaTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="iscashbook" />
            <TextInput source="isbankbook" />
            <FirdousSelect source="notes" list="notes/list" sort="value" optionText="value" />
            <TextInput source="obal" />
            <BooleanInput source="active" />
        </SimpleForm>
    </Edit>
);

export const CoaCreate = (props) => {
    return (
        <Create actions={<CoaActions />} title="New Coa" {...props}>
            <SimpleForm variant="standard">
                <TextInput source="code" />
                <TextInput multiline source="title" />
                <TextInput source="iscashbook" />
                <TextInput source="isbankbook" />
                <FirdousSelect source="notes" list="notes/list" sort="value" optionText="value" />
                <BooleanInput source="iscashbook" />
                <BooleanInput source="isbankbook" />
                {/* < ReferenceInput label="notes" source="notes" reference="notes" validate={[required()]}>
            <SelectInput optionText="code" />
            </ReferenceInput> */}
                <TextInput source="obal" />
                <BooleanInput source="active" />
            </SimpleForm>
        </Create>
    )
};