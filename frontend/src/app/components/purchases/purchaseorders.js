import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import PrintIcon from "@material-ui/icons/Print";
import StoreIcon from "@material-ui/icons/Store";
import * as React from "react";
import {
  ArrayInput,
  Button,
  Create,
  Datagrid,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  Filter,
  FormDataConsumer,
  FormTab,
  List,
  ListButton,
  NumberInput,
  ReferenceField,
  required,
  SaveButton,
  SearchInput,
  SimpleForm,
  SimpleFormIterator,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  useLocale,
} from "react-admin";
import { useFormState } from "react-final-form";
import ReactToPrint from "react-to-print";
import FirdousSelect from "../accounts/FirdousSelect";
import PrintVoucherComponent from "./PrintPOComponent";
export const Purchase_orderIcon = StoreIcon;
const useStyles = makeStyles({
  mr1: { marginRight: "1em" },
  iteratorinput: {
    "@media (min-width: 600px)": { marginRight: "1em", width: "18%" },
  },
  iteratorinput50: {
    "@media (min-width: 600px)": { marginRight: "1em", width: "15%" },
  },
  iteratorinputdc: {
    "@media (min-width: 600px)": { marginRight: "1em", width: "50%" },
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
      placeholder="PO No"
      source="po_no"
      alwaysOn
    />
    <DateInput
      variant="standard"
      placeholder="Purchase Date"
      source="purchase_date"
      alwaysOn
    />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    <FirdousSelect
      variant="standard"
      label="Project"
      source="project_id"
      optionText="title"
      list="projects"
      sort="title"
      resettable
      alwaysOn
    />
    <FirdousSelect
      variant="standard"
      label="Vendor"
      source="supplier_id"
      optionText="title"
      list="suppliers"
      sort="title"
      resettable
    />
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
        <TextField source="po_no" />
        <TextField source="purchase_date" />
        <ReferenceField
          label="Project"
          source="project_id"
          reference="Projects"
        >
          <TextField source="title" />
        </ReferenceField>
        <ReferenceField
          label="Supplier"
          source="supplier_id"
          reference="suppliers"
        >
          <TextField source="title" />
        </ReferenceField>
        <ReferenceField label="Status" source="status" reference="fprop">
          <TextField source="value" />
        </ReferenceField>
        <TextField source="created_on" />
        <EditButton variant="contained" color="secondary" />
        <DeleteButton />
      </Datagrid>
    )}
  </List>
);
const dateParser = (v) => {
  // v is a string of "YYYY-MM-DD" format
  const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (match === null) return;
  const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
  if (isNaN(d)) return;
  return d;
};

const dateFormatter = (v) => {
  // v is a `Date` object
  if (!(v instanceof Date) || isNaN(v)) return;
  const pad = "00";
  const yy = v.getFullYear().toString();
  const mm = (v.getMonth() + 1).toString();
  const dd = v.getDate().toString();
  return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};
const Purchase_orderTitle = ({ record }) => {
  return <span>Order {record ? `"${record.po_no}"` : ""}</span>;
};

export const Purchase_orderEdit = (props) => (
  <Edit undoable={false} title={<Purchase_orderTitle />} {...props}>
    <TabbedForm
      toolbar={<CustomToolbar />}
      initialValues={{}}
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <FormTab label="Purchase Order">
        <PO_FORM />
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
const calcSubTotal = (scopedFormData) => {
  if (scopedFormData) {
    const total =
      parseFloat(scopedFormData.unit_price || 0) *
      parseFloat(scopedFormData.qty || 0);
    console.log("scope data:" + JSON.stringify(scopedFormData));
    scopedFormData.subtotal = total;
  }
};
export const Purchase_orderCreate = (props) => {
  return (
    <Create undoable="false" title="New Purchase Order" {...props}>
      <SimpleForm
        //variant={"outlined"}
        variant="standard"
        //sanitizeEmptyValues={false}
        margin="none"
        fullWidth
      >
        <PO_FORM />
      </SimpleForm>
    </Create>
  );
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
            basePath={props.basePath}
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
            <PrintVoucherComponent ref={componentRef} {...props} />
          </div>
        </Grid>
      </Grid>
      <DeleteButton undoable={false} />
    </Toolbar>
  );
};

const toCurrency = (number) => {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  console.log("format" + formatter.format(number));
  return formatter.format(number);
};

const fromCurrency = (number) => {
  return parseFloat(number);
};
const PO_FORM = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("jwtToken"));
  const locale = useLocale();
  return (
    <div>
      <Grid container display="flex" spacing={1}>
        <Grid item xs={12} md={3}>
          <TextInput
            variant="outlined"
            fullWidth
            className={classes.mr1}
            disabled
            source="id"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInput
            variant="outlined"
            fullWidth
            className={classes.mr1}
            disabled
            source="po_no"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateInput
            variant="outlined"
            fullWidth
            initialValue={new Date().toISOString().substring(0, 10)}
            disabled
            className={classes.mr1}
            source="created_on"
            locales={locale}
            // parse={dateParser}
            // format={dateFormatter}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInput
            variant="outlined"
            fullWidth
            className={classes.mr1}
            initialValue={user && user.username}
            disabled
            source="created_by"
          />
        </Grid>
      </Grid>
      <Grid container fullWidth spacing={1}>
        <Grid item xs={12} md={4}>
          <DateInput margin="none" source="purchase_date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <FirdousSelect
            margin="none"
            label="Supplier"
            source="supplier_id"
            optionText="title"
            list="suppliers"
            sort="title"
            validate={ra_required}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <TextInput source="delivery_address" fullWidth />
        </Grid>

        <Grid item xs={12} md={4}>
          <FirdousSelect
            defaultValue="1"
            label="Status"
            source="status"
            optionText="value"
            list="fprop"
            sort="oid"
            validate={ra_required}
            fullWidth
            filter={{ type: "purchaseorder" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput multiline source="description" fullWidth />
        </Grid>
      </Grid>

      <div className={classes.po_item}>
        <ArrayInput
          //initialValue={initial}
          variant="standard"
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

            <FormDataConsumer
              subscription={{ values: true }}
              className={classes.iteratorinputdc}
            >
              {({
                formData, // The whole form data
                scopedFormData, // The data for this item of the ArrayInput
                getSource, // A function to get the valid source inside an ArrayInput
                ...rest
              }) => (
                <NumberInput
                  {...rest}
                  label="Unit Price"
                  source={getSource("unit_price")}
                  //validate={ra_required}
                  onChange={calcSubTotal(scopedFormData)}
                  // format={toCurrency}
                  //parse={fromCurrency}
                  formClassName={classes.iteratorinput50}
                  //className={classes.iteratorinput}
                />
              )}
            </FormDataConsumer>
            <TextInput
              disabled
              label="Sub Total"
              source="subtotal"
              //validate={ra_required}
              // value={scopedFormData &&  parseFloat((scopedFormData.unit_price || 0) * (scopedFormData.quantity || 0))}
              formClassName={classes.iteratorinput}
              fullWidth
            />
          </SimpleFormIterator>
        </ArrayInput>
      </div>
    </div>
  );
};
