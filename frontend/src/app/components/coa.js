import * as React from "react";
import {BooleanInput , SearchInput,Filter, List, Datagrid, Edit, Create,SimpleList, SimpleForm, DateField, TextField, DeleteButton,EditButton, TextInput, DateInput, CheckboxGroupInput, BooleanField } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { makeStyles, Chip,useMediaQuery } from '@material-ui/core';

export const  CoaIcon = ApartmentIcon;

export const CoaActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const CoaSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
          <SearchInput variant="standard" placeholder="SCode"  source="scode" alwaysOn />
          <SearchInput variant="standard" placeholder="Code"  source="code" alwaysOn />
        </Filter>
      
  );

export const CoaList = props => (
    <List filters={<CoaSearchFilter />} {...props}>
        {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
                 <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.code}`}
                    tertiaryText={record => record.id  }
    
                />
                ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="scode" />
            <TextField source="title" />
            <TextField source="notes" />
            <TextField source="active" />
            <EditButton  variant="contained" color="secondary"/>
            <DeleteButton/>
        </Datagrid>)}
    </List>
);

const CoaTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const CoaEdit = (props) => (
    <Edit  actions={<CoaActions />} title={<CoaTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="iscashbook" />
            <TextInput source="isbankbook" />
            <TextInput source="notes" />
            <TextInput source="obal" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Edit>
);

export const CoaCreate = (props) => (
    <Create actions={<CoaActions />}  title="New Coa" {...props}>
        <SimpleForm variant="standard">
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="iscashbook" />
            <TextInput source="isbankbook" />
            <TextInput source="notes" />
            <TextInput source="obal" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Create>
);