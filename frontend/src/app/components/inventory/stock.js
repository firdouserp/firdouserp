import { Grid, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';
import FirdousSelect from '../accounts/FirdousSelect';
export const StockIcon = StoreIcon;

export const StockActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const StockSearchFilter = (props) => (

  <Filter {...props}>
    <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
    <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>

);

export const StockList = props => (
  <List filters={<StockSearchFilter />} {...props}>
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
          <TextField source = "coa"/>
          <TextField source="active" />
          <EditButton variant="contained" color="secondary" />
          
          <DeleteButton />
        </Datagrid>)}
  </List>
);

const StockTitle = ({ record }) => {
  return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const StockEdit = (props) => (
  <Edit undoable={false} title={<StockTitle />} {...props}>
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
          <TextInput source="uom" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="qty" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="avg_rate" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="avg_cost" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
        <FirdousSelect
          variant="standard"
          label="Coa"
          source="coa"
          optionText="title"
          list="coa"
          sort="title"
          fullWidth
          Required
          />
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

export const StockCreate = (props) => (
  <Create undoable={false} title="New Stock" {...props}>
    
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
          <TextInput source="uom" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="qty" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="avg_rate" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="adv_cost" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
        <FirdousSelect
          variant="standard"
          label="Coa"
          source="coa"
          optionText="title"
          list="coa"
          sort="title"
          fullWidth
          />
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