import { Grid, useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import StoreIcon from "@material-ui/icons/Store";
import * as React from "react";
import {
  Create,
  Datagrid,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  Filter,
  FormTab,
  List,
  ListButton,
  required,
  SearchInput,
  SimpleForm,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  TopToolbar
} from "react-admin";
import FirdousSelect from "../accounts/FirdousSelect";
export const Purchase_orderIcon = StoreIcon;

export const Purchase_orderActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);
const ra_required = [required()];
const Purchase_orderSearchFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      variant="standard"
      placeholder="Title"
      source="title"
      alwaysOn
    />
    <SearchInput
      variant="standard"
      placeholder="SCode"
      source="scode"
      alwaysOn
    />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>
);

export const Purchase_orderList = (props) => (
  <List filters={<Purchase_orderSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="code" />
          <TextField source="scode" />
          <TextField source="title" />
          <TextField source="remarks" />
          <TextField source="active" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>
      )}
  </List>
);

const Purchase_orderTitle = ({ record }) => {
  return <span>Order {record ? `"${record.title}"` : ""}</span>;
};

export const Purchase_orderEdit = (props) => (
  <Edit undoable={false} title={<Purchase_orderTitle />} {...props}>
    <TabbedForm initialValues={{}}
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <FormTab label="Purchase Order">
        <Grid container display="flex" fullWidth spacing={1}>
          <Grid item xs={12} md={4}>
            <TextInput disabled source="purchase_id" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <DateInput source="purchase_date" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput source="supplier_id" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput disabled source="order_id" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput source="delivery_address" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <DateInput source="created_on" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput source="created_by" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput source="status" fullWidth />
          </Grid>
        </Grid>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const Purchase_orderCreate = (props) => (
  <Create undoable={false} title="New Purchase Order" {...props}>
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
          <DateInput source="purchase_date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <FirdousSelect
            margin="none"
            label="suppliers"
            source="supplier_id"
            optionText="title"
            list="suppliers"
            sort="title"
            validate={ra_required}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="delivery_address" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput disabled source="created_on" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput disabled source="created_by" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="status" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
