import { makeStyles, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import * as React from "react";
import { BooleanField, BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';


const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

export const SupplierActions = ({ basePath, data }) => (
    <TopToolbar variant="contained" >
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} variant="contained" color="secondary" />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

export const SupplierIcon = TransferWithinAStationIcon;

const SupplierSearchFilter = (props) => (

    <Filter {...props}>
        <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
        <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
        <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    </Filter>

);

export const SupplierList = (props) => (
    <List undoable={false} filters={<SupplierSearchFilter />} {...props} >

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
                    <BooleanField source="active" />
                    <TextField source="nature" />
                    <EditButton variant="contained" color="secondary" />
                    <DeleteButton />
                </Datagrid>)}
    </List>
);

const SupplierTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const SupplierEdit = props => {
    const classes = useStyles();
    return (

        <Edit undoable={false} actions={<SupplierActions />} title={<SupplierTitle />} {...props}>

            <SimpleForm variant="standard" margin="none">

                <TextInput disabled source="id" />
                <TextInput source="code" formClassName={classes.inlineBlock} />
                <TextInput source="scode" formClassName={classes.inlineBlock}/*options={{ multiLine: true }}*/ />
                <TextInput multiline source="title" />
                <TextInput source="person" formClassName={classes.inlineBlock} />
                <TextInput source="contact" formClassName={classes.inlineBlock} />
                <TextInput source="address" fullWidth />
                <TextInput source="city" formClassName={classes.inlineBlock} />
                <TextInput source="country" formClassName={classes.inlineBlock} />

                <TextInput source="email" formClassName={classes.inlineBlock} />
                <TextInput source="fax" formClassName={classes.inlineBlock} />
                <TextInput source="cnic" formClassName={classes.inlineBlock} />
                <TextInput source="ntn" formClassName={classes.inlineBlock} />
                <TextInput source="stn" formClassName={classes.inlineBlock} />

                <TextInput source="businesstitle" />
                <TextInput source="nature" />
                <BooleanInput source="active" />

            </SimpleForm >
        </Edit>
    )
};

export const SupplierCreate = (props) => (
    <Create actions={<SupplierActions />} title="New Suppier" {...props}>
        <SimpleForm variant="standard">
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
            <BooleanInput source="active" />
        </SimpleForm>
    </Create>
);