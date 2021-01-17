import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import * as React from "react";
import { BooleanField, BooleanInput, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, Filter, FormTab, List, ListButton, ReferenceManyField, SearchInput, SimpleForm, SimpleList, TabbedForm, TextField, TextInput, TopToolbar } from 'react-admin';


const useStyles = makeStyles({
  inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

export const SupplierActions = ({ basePath, data }) => (
  <TopToolbar variant="contained" >
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} variant="contained" color="secondary" />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

export const SupplierIcon = TransferWithinAStationIcon;

const SupplierSearchFilter = (props) => (

  <Filter {...props}>
    <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
    <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>

);

export const SupplierList = (props) => (
  <List undoable={false} filters={<SupplierSearchFilter />} {...props} >

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
          <BooleanField source="active" />
          <TextField source="nature" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>)}
  </List>
);

const SupplierTitle = ({ record }) => {
  return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const SupplierEdit = props => {
  return (
    <Edit undoable={false} title={<SupplierTitle />} {...props}>


      <TabbedForm initialValues={{}}
        variant={"standard"}
        sanitizeEmptyValues={false}
        margin="none"
        fullWidth
      >
        <FormTab label="Supplier Detail">
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
              <TextInput source="person" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="contact" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="address" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="country" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="city" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="email" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="fax" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="cnic" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="ntn" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="stn" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="businesstitle" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="nature" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <BooleanInput source="active" fullWidth />
            </Grid>


          </Grid>
        </FormTab>
        <FormTab label="Purchase Orders">
          <ReferenceManyField
            reference="purchaseorder"
            target="supplier_id"
            addLabel={false}
            fullWidth
          >
            <Datagrid>
              <TextField source="po_no" />
              <DateField source="purchase_date" />
              <TextField source="project_id" />
              <TextField source="status" />
              <DateField source="created_on" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
      </TabbedForm>



    </Edit>
  )
};

export const SupplierCreate = (props) => (
  <Create title="New Suppier" {...props}>
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
          <TextInput source="person" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="contact" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="address" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="country" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="city" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="email" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="fax" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="cnic" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="ntn" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="stn" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="businesstitle" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="nature" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <BooleanInput source="active" fullWidth />
        </Grid>


      </Grid>
    </SimpleForm>
  </Create>

);