import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import StoreIcon from "@material-ui/icons/Store";
import * as React from "react";
import {
  ArrayInput,
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
  NumberInput,
  required,
  SearchInput,
  SimpleForm,
  SimpleFormIterator,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { useFormState } from "react-final-form";
import FirdousSelect from "../accounts/FirdousSelect";
export const Purchase_orderIcon = StoreIcon;
const useStyles = makeStyles({
  iteratorinput: { marginRight: "1em", width: "18%" },
  po_item: {
    border: "1px solid #ccc",
    width: "90%",
    padding: "1em",
    marginTop: "2em",
  },
});
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
  <List empty={false} filters={<Purchase_orderSearchFilter />} {...props}>
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
    <TabbedForm
      initialValues={{}}
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
const UnitInput = (props) => {
  const { values } = useFormState();
  return (
    <TextInput value={values.stock_id ? values.stock_id : ""} {...props} />
  );
};
export const Purchase_orderCreate = (props) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("jwtToken"));

  return (
    <Create undoable="false" title="New Purchase Order" {...props}>
      <SimpleForm
        //variant={"outlined"}
        variant="standard"
        //sanitizeEmptyValues={false}
        margin="none"
        fullWidth
      >
        <Grid container fullWidth spacing={1}>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <TextInput disabled source="id" fullWidth />
            </Grid>
            <Grid item xs={12} md={8}>
              <DateInput source="purchase_date" fullWidth />
            </Grid>
            <Grid item xs={12} md={8}>
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
            <Grid item xs={12} md={8}>
              <FirdousSelect
                margin="none"
                label="Project"
                source="project_id"
                optionText="title"
                list="projects"
                sort="title"
                validate={ra_required}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextInput source="delivery_address" fullWidth />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextInput source="status" fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={6}>
              <DateInput
                initialValue={new Date().toDateString()}
                disabled
                source="created_on"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                initialValue={user && user.username}
                disabled
                source="created_by"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.po_item}>
          <ArrayInput
            //initialValue={initial}
            //variant="standard"
            source="purchase_details"
            label="Items"
            fullWidth
          >
            <SimpleFormIterator fullWidth>
              <FirdousSelect
                resettable
                label="Item"
                list="stock"
                source="stock_id"
                sort="title"
                optionText={"title"}
                //validate={ra_required}
                initialValue={1}
                fullWidth
                formClassName={classes.iteratorinput}
              />

              <UnitInput
                label="Unit"
                source="unit"
                //validate={ra_required}
                formClassName={classes.iteratorinput}
                fullWidth
              />
              <NumberInput
                label="Quantity"
                source="quantity"
                //validate={ra_required}
                formClassName={classes.iteratorinput}
                fullWidth
              />

              <NumberInput
                label="Unit Price"
                source="unit_price"
                //validate={ra_required}
                formClassName={classes.iteratorinput}
                fullWidth
              />
              <TextInput
                label="Sub Total"
                source="subtotal"
                //validate={ra_required}
                formClassName={classes.iteratorinput}
                fullWidth
              />
            </SimpleFormIterator>
          </ArrayInput>
        </div>
      </SimpleForm>
    </Create>
  );
};
