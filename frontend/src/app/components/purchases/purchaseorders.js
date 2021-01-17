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
  FormDataConsumer,
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
  useLocale
} from "react-admin";
import { useFormState } from "react-final-form";
import FirdousSelect from "../accounts/FirdousSelect";
export const Purchase_orderIcon = StoreIcon;
const useStyles = makeStyles({
  iteratorinput: { marginRight: "1em", width: "18%" },
  iteratorinput50: { marginRight: "1em", width: "15%" },
  iteratorinputdc: { marginRight: "1em", width: "50%" },
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
    const total = parseFloat(scopedFormData.unit_price || 0) * parseFloat(scopedFormData.qty || 0);
    console.log("scope data:" + JSON.stringify(scopedFormData));
    scopedFormData.subtotal = total
  }
}
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

const PO_FORM = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("jwtToken"));
  const locale = useLocale()
  return (
    <div>
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
              label="Supplier"
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
              initialValue={new Date().toISOString().substring(0, 10)}
              disabled
              source="created_on"
              fullWidth
              locales={locale}
            // parse={dateParser}
            // format={dateFormatter}
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


            <FormDataConsumer className={classes.iteratorinputdc}>
              {({
                formData, // The whole form data
                scopedFormData, // The data for this item of the ArrayInput
                getSource, // A function to get the valid source inside an ArrayInput
                ...rest
              }) =>
                <NumberInput
                  {...rest}
                  label="Unit Price"
                  source={getSource("unit_price")}
                  //validate={ra_required}
                  onChange={calcSubTotal(scopedFormData)}

                  formClassName={classes.iteratorinput50}
                //className={classes.iteratorinput}

                />

              }
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
  )
};


