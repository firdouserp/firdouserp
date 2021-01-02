import { useMediaQuery } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar, useNotify, useRedirect, useRefresh } from 'react-admin';

export const  ProjectIcon = ApartmentIcon;

export const ProjectActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);


const ProjectSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn  />
          <SearchInput variant="standard" placeholder="SCode"  source="scode" alwaysOn/>
          <SearchInput variant="standard" placeholder="Code"  source="code" alwaysOn/>
        </Filter>
      
  );

export const ProjectList = props => (
    <List filters={<ProjectSearchFilter />} {...props}>
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
            <TextField source="location" />
            <TextField source="nature" />
            <TextField source="remarks" />
            <TextField source="active" />
            <EditButton  variant="contained" color="secondary"/>
            <DeleteButton/>
        </Datagrid>)}
    </List>
);

const ProjectTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const ProjectEdit = (props) => (
    <Edit  undoable={false} actions={<ProjectActions />} title={<ProjectTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
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

export const ProjectCreate = (props) => {

const notify = useNotify();
const refresh = useRefresh();
const redirect = useRedirect();
const onFailure = (error) => {

  
    notify(`Could not edit post: ${error}`)
};

return(
    <Create  actions={<ProjectActions />}  title="New Project" {...props}>
        <SimpleForm variant="standard">
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
)};