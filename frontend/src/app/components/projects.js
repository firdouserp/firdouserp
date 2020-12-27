import * as React from "react";
import {BooleanInput , SearchInput,Filter, List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, CheckboxGroupInput, BooleanField } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

export const ProjectActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const ProjectSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput  placeholder="Title" source="title" alwaysOn />
          <SearchInput placeholder="SCode"  source="scode" alwaysOn />
          <SearchInput placeholder="Code"  source="code" alwaysOn />
        </Filter>
      
  );

export const ProjectList = props => (
    <List filters={<ProjectSearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="scode" />
            <TextField source="title" />
            <TextField source="location" />
            <TextField source="city" />
            <TextField source="client" />
            <TextField source="cost" />
            <TextField source="nature" />
            <TextField source="remarks" />
            <TextField source="active" />
            <EditButton  variant="contained" color="secondary"/>
        </Datagrid>
    </List>
);

const ProjectTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const ProjectEdit = (props) => (
    <Edit  actions={<ProjectActions />} title={<ProjectTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="location" />
            <TextInput source="city" />
            <TextInput source="client" />
            <TextInput source="cost" />
            <TextInput source="country" />
            <TextInput source="nature" />
            <TextInput source="remarks" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Edit>
);

export const ProjectCreate = (props) => (
    <Create actions={<ProjectActions />}  title="New Project" {...props}>
        <SimpleForm>
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="location" />
            <TextInput source="city" />
            <TextInput source="client" />
            <TextInput source="cost" />
            <TextInput source="country" />
            <TextInput source="nature" />
            <TextInput source="remarks" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Create>
);