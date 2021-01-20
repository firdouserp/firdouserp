import { Grid, makeStyles, Toolbar, useMediaQuery } from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import PrintIcon from "@material-ui/icons/Print";
import * as React from "react";
import {
  ArrayInput,
  BooleanInput,
  Button,
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
  SaveButton,
  SearchInput,
  SimpleForm,
  SimpleFormIterator,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  TopToolbar,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import FirdousSelect from "../accounts/FirdousSelect";
import PrintPOComponent from "./PrintPOComponent";

export const GrnIcon = ApartmentIcon;
const useStyles = makeStyles({
  iteratorinput50: {
    "@media (min-width: 600px)": {
      marginRight: "1em",
      width: "12%",
      MuiSwitch: { root: { top: "1em" } },
    },
  },

  po_item: {
    "@media (min-width: 600px)": {
      border: "1px solid #ccc",
      width: "95%",
      padding: "1em",
      marginTop: "2em",
    },
  },
});
export const GrnActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const GrnSearchFilter = (props) => (
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

export const GrnList = (props) => (
  <List empty={false} filters={<GrnSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
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
      </Datagrid>
    )}
  </List>
);

const GrnTitle = ({ record }) => {
  return <span>Grn {record ? `"${record.title}"` : ""}</span>;
};

const CustomToolbar = (props) => {
  const componentRef = React.useRef();
  return (
    <Toolbar alwaysEnableSaveButton {...props} classes={useStyles()}>
      <Grid container spacing={2}>
        <Grid item>
          <SaveButton undoable={false} {...props} />
        </Grid>
        <Grid item>
          <ListButton
            basePath={
              props.record.po_id
                ? "/purchaseorder/" + props.record.po_id
                : props.basePath
            }
            label="Back"
            variant="contained"
            color="primary"
            size="medium"
            icon={<ChevronLeft />}
          />
        </Grid>
        <Grid item>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <Button
                  disabled={!props.record.id}
                  color="primary"
                  variant="contained"
                  label="Print"
                  size="medium"
                  icon={<PrintIcon />}
                />
              );
            }}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            {console.log(props)}
            <PrintPOComponent ref={componentRef} {...props} />
          </div>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to={{
              pathname: "/bill/create",
              state: {
                record: {
                  po_no: props.record.po_no,
                  po_id: props.record.po_id,
                  grn_details: props.record.purchase_details,
                },
              },
            }}
            label="Add Bills"
            variant="contained"
            color="primary"
            size="medium"
            icon={<ChevronLeft />}
          />
        </Grid>
      </Grid>
      <DeleteButton undoable={false} />
    </Toolbar>
  );
};

export const GrnEdit = (props) => (
  <Edit undoable={false} title={<GrnTitle />} {...props}>
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <GRN_FORM />
    </SimpleForm>
  </Edit>
);

export const GrnCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onFailure = (error) => {
    notify(`Could not edit post: ${error}`);
  };

  console.log(JSON.stringify(props));
  return (
    <Create title="New Goods Reciept" {...props}>
      <TabbedForm
        toolbar={<CustomToolbar />}
        initialValues={{}}
        variant={"standard"}
        sanitizeEmptyValues={false}
        margin="none"
        fullWidth
        {...props}
      >
        <FormTab label="Goods Receipt">
          <GRN_FORM {...props} />
        </FormTab>
        <FormTab label="Bills"></FormTab>
      </TabbedForm>
    </Create>
  );
};

export const GRN_FORM = (props) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("jwtToken"));

  return (
    <div>
      <Grid container display="flex" fullWidth spacing={1}>
        <Grid item xs={12} md={3}>
          <TextInput disabled variant="outlined" source="id" fullWidth />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateInput
            disabled
            variant="outlined"
            source="created_on"
            initialValue={new Date().toISOString().substring(0, 10)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInput
            disabled
            initialValue={user && user.username}
            variant="outlined"
            source="created by"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInput disabled variant="outlined" source="grn_no" fullWidth />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateInput
            initialValue={new Date().toISOString().substring(0, 10)}
            variant="outlined"
            source="grn_date"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInput
            variant="outlined"
            defaultValue={props.po_no}
            source="po_no"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FirdousSelect
            variant="outlined"
            label="Supplier"
            list="suppliers"
            source="supplier_id"
            sort="title"
            optionText={"title"}
            //validate={ra_required}
            initialValue={1}
            fullWidth
            formClassName={classes.iteratorinput50}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextInput variant="outlined" source="ref_no" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextInput multiline source="remarks" fullWidth />
        </Grid>
      </Grid>
      <div className={classes.po_item}>
        <ArrayInput
          //initialValue={initial}

          variant="standard"
          source="grn_details"
          label="Items"
          fullWidth
        >
          <SimpleFormIterator fullWidth>
            <BooleanInput
              label=""
              width="10px"
              source="complete"
              formClassName={classes.iteratorinput50}
              fullWidth
            />
            <FirdousSelect
              label="Item"
              list="stock"
              source="stock_id"
              sort="title"
              optionText={"title"}
              //validate={ra_required}
              initialValue={1}
              fullWidth
              formClassName={classes.iteratorinput50}
            />

            <TextInput
              label="Unit"
              source="unit"
              //validate={ra_required}
              formClassName={classes.iteratorinput50}
              fullWidth
            />
            <NumberInput
              label="Quantity"
              source="qty"
              //validate={ra_required}
              formClassName={classes.iteratorinput50}
              fullWidth
            />
            <NumberInput
              label="Unit Price"
              source="unit_price"
              formClassName={classes.iteratorinput50}
              fullWidth
            />
            <TextInput
              label="Sub Total"
              source="subtotal"
              //validate={ra_required}
              // value={scopedFormData &&  parseFloat((scopedFormData.unit_price || 0) * (scopedFormData.quantity || 0))}
              formClassName={classes.iteratorinput50}
              fullWidth
            />

            <TextInput
              disabled
              label="Qty Received"
              source="qty_rec"
              //validate={ra_required}
              // value={scopedFormData &&  parseFloat((scopedFormData.unit_price || 0) * (scopedFormData.quantity || 0))}
              formClassName={classes.iteratorinput50}
              fullWidth
            />
          </SimpleFormIterator>
        </ArrayInput>
      </div>
    </div>
  );
};
