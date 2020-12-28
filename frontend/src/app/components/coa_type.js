import * as React from "react";
import {BooleanInput , SearchInput,Filter, List, Datagrid, Edit, Create,SimpleList, SimpleForm, DateField, TextField, DeleteButton,EditButton, TextInput, DateInput, CheckboxGroupInput, BooleanField } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { makeStyles, Chip,useMediaQuery } from '@material-ui/core';

export const  Coa_typeIcon = ApartmentIcon;

export const Coa_typeActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const Coa_typeSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
          <SearchInput variant="standard" placeholder="SCode"  source="scode" alwaysOn />
          <SearchInput variant="standard" placeholder="Code"  source="code" alwaysOn />
        </Filter>
      
  );

export const Coa_typeList = props => (
    <List filters={<Coa_typeSearchFilter />} {...props}>
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
            <TextField source="title" />
            <EditButton  variant="contained" color="secondary"/>
            <DeleteButton/>
        </Datagrid>)}
    </List>
);

const Coa_typeTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const Coa_typeEdit = (props) => (
    <Edit  undoable={false} actions={<Coa_typeActions />} title={<Coa_typeTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput multiline source="title" />
        </SimpleForm>
    </Edit>
);

export const Coa_typeCreate = (props) => (
    <Create actions={<Coa_typeActions />}  title="New Coa_type" {...props}>
        <SimpleForm variant="standard">
        <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput multiline source="title" />
        </SimpleForm>
    </Create>
);