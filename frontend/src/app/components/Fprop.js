import { Grid, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

export const FpropIcon = StoreIcon;

export const FpropActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

export const FpropSearchFilter = (props) => (

  <Filter {...props}>
    <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
    <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>

);

export const FpropList = props => (
  <List filters={<FpropSearchFilter />} {...props}>
    {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={record => record.title}
        secondaryText={record => `${record.code}`}
        tertiaryText={record => record.id}

      />
    ) : (
        <Datagrid rowClick="edit">
         <TextField  source="id" />
          <TextField source="type" />
          <TextField source="oid" />
          <TextField source="value" />
         
         
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>)}
  </List>
);

const FpropTitle = ({ record }) => {
  return <span>Fprop {record ? `"${record.title}"` : ''}</span>;
};

export const FpropEdit = (props) => (
  <Edit undoable={false} title={<FpropTitle />} {...props}>
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
          <TextInput  source="type" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="oid" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput multiline source="value" fullWidth />
        </Grid>

      </Grid>
    </SimpleForm>
  </Edit>
);

export const FpropCreate = (props) => (
  <Create undoable={false} title="New Fprop" {...props}>
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
          <TextInput  source="type" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="oid" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput multiline source="value" fullWidth />
        </Grid>

      </Grid>
    </SimpleForm>
  </Create>
);

