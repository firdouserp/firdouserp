import { Grid, useMediaQuery } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import * as React from "react";
import { Create, Datagrid, DateInput, DeleteButton, Edit, EditButton, Filter, List, ListButton, NumberInput, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar, useNotify, useRedirect, useRefresh } from 'react-admin';

export const GrnIcon = ApartmentIcon;

export const GrnActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);


const GrnSearchFilter = (props) => (

  <Filter {...props}>
    <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
    <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>

);

export const GrnList = props => (
  <List filters={<GrnSearchFilter />} {...props}>
    {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={record => record.title}
        secondaryText={record => `${record.code}`}
        tertiaryText={record => record.id}

      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="grn_no" />
          <TextField source="grn_date" />
          <TextField source="po_id" />
          <TextField source="created_on" />
          <TextField source="created_by" />
          <TextField source="ref_no" />
          <TextField source="remarks" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>)}
  </List>
);

const GrnTitle = ({ record }) => {
  return <span>Grn {record ? `"${record.title}"` : ''}</span>;
};

export const GrnEdit = (props) => (
  <Edit undoable={false} title={<GrnTitle />} {...props}>

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
          <TextInput  source="grn_no" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="grn_date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput multiline source="po_id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="created_on" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="created by" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="ref_no" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="remarks" fullWidth />
        </Grid>



      </Grid>
    </SimpleForm>

  </Edit>
);

export const GrnCreate = (props) => {

  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onFailure = (error) => {


    notify(`Could not edit post: ${error}`)
  };

  return (
    <Create title="New Grn" {...props}>
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
          <TextInput  source="grn_no" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="grn_date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput multiline source="po_id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="created_on" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="created by" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="ref_no" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="remarks" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="status" fullWidth />
        </Grid>

        </Grid>
      </SimpleForm>
    </Create>
  )
};