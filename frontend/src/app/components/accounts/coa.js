import { Grid, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ListAltIcon from '@material-ui/icons/ListAlt';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';
import FirdousSelect from './FirdousSelect';
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
    <Edit undoable={false}  title={<CoaTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
        <Grid container display="flex" fullWidth spacing={1}>
          <Grid item xs={12} md={4}>
            <TextInput disabled source="code" fullWidth />           
            <FirdousSelect source="notes" list="notes/list" sort="value" optionText="value"  fullWidth/>
            <TextInput  source="obal" fullWidth />
            <BooleanInput  source="iscashbook" fullWidth />
            <BooleanInput  source="isbankbook" fullWidth />
            <BooleanInput source="active" fullWidth />
       
               </Grid> 
               </Grid>
        </SimpleForm>
    </Edit>
);

export const CoaCreate = (props) => {
    return (
        <Create  title="New Coa" {...props}>
            <SimpleForm variant="standard">
            <Grid container display="flex" fullWidth spacing={1}>
          <Grid item xs={12} md={4}>
            <TextInput disabled source="code" fullWidth />           
            <FirdousSelect source="notes" list="notes/list" sort="value" optionText="value"  fullWidth/>
            <TextInput  source="obal" fullWidth />
            <BooleanInput  source="iscashbook" fullWidth />
            <BooleanInput  source="isbankbook" fullWidth />
            <BooleanInput source="active" fullWidth />
       
               </Grid> 
               </Grid>
            </SimpleForm>
        </Create>
    )
};