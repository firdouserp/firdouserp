import { Grid, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, ReferenceInput, SearchInput, SelectInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';
import FirdousSelect from '../accounts/FirdousSelect';
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
  <Edit undoable={false} title={<EmployeesTitle />} {...props}>

    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
        <Grid item xs={12} md={4}>
          <TextInput disabled source="id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput disabled source="code" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="scode" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput multiline source="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="designation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="grade" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="department" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="address" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="city" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="cnic" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
        <FirdousSelect source="coa" list="coa" sort="title" optionText="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="remarks" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <BooleanInput source="active" fullWidth />
        </Grid>


      </Grid>
     
        
    </SimpleForm>

  </Edit>
);

export const EmployeesCreate = (props) => (
  <Create undoable={false} title="New Employee" {...props}>
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
        <Grid item xs={12} md={4}>
          <TextInput disabled source="id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput  source="code" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="scode" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput multiline source="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="designation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="grade" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="department" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="address" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="city" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="cnic" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
        <FirdousSelect source="coa" list="coa" sort="title" optionText="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="remarks" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <BooleanInput source="active" fullWidth />
        </Grid>


      </Grid>
    </SimpleForm>
  </Create>
);