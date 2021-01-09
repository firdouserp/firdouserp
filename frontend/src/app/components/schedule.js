import { Grid, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { Create, Datagrid, DateInput, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

export const ScheduleIcon = StoreIcon;

export const ScheduleActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const ScheduleSearchFilter = (props) => (

  <Filter {...props}>
    <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
    <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>

);

export const ScheduleList = props => (
  <List filters={<ScheduleSearchFilter />} {...props}>
    {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={record => record.title}
        secondaryText={record => `${record.code}`}
        tertiaryText={record => record.id}

      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="contact" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>)}
  </List>
);

const ScheduleTitle = ({ record }) => {
  return <span>Schedule {record ? `"${record.title}"` : ''}</span>;
};

export const ScheduleEdit = (props) => (
  <Edit undoable={false} title={<ScheduleTitle />} {...props}>
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
          <TextInput source="name" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="unit" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="type" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="floor" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="block" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="contact" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="total_cost" fullWidth />
        </Grid> <Grid item xs={12} md={4}>
          <TextInput source="on_booking" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_confirmation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_allocation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_start" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="monthly_installment" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="quaterly_payment" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_excavation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_foundation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_slab" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_block" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_plaster" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_plumbing" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_electric" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_finishing" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_possesion" fullWidth />
        </Grid>


      </Grid>
    </SimpleForm>
  </Edit>
);

export const ScheduleCreate = (props) => (
  <Create undoable={false} title="New Schedule" {...props}>
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
          <TextInput source="name" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="unit" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="type" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="floor" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="block" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="contact" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="total_cost" fullWidth />
        </Grid> <Grid item xs={12} md={4}>
          <TextInput source="on_booking" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_confirmation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_allocation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_start" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="monthly_installment" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="quaterly_payment" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_excavation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_foundation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_slab" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_block" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_plaster" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_plumbing" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_electric" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_finishing" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="on_possesion" fullWidth />
        </Grid>


      </Grid>
    </SimpleForm>
  </Create>
);