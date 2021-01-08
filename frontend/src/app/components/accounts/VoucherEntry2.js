import { Box, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import {
  ArrayInput,
  Create,
  DateInput,
  Edit,
  FormWithRedirect,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useAuthenticated,
} from "react-admin";
import { useFormState } from "react-final-form";
import { useLocation } from "react-router";
import FirdousSelect from "./FirdousSelect";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  inlineBlock: { display: "inline-flex", marginRight: "1em", width: "40%" },
  iteratorinput: { marginRight: "0.5em", width: "100%" },
  iteratorinput50: { marginRight: "0.5em", width: "50%" },
  maxFixedWidth: { maxWidth: "180px", boxSizing: "border-box" },
  fixedWidth: { width: "180px" },
});

export const useQuery = (queryParam) => {
  const search = new URLSearchParams(useLocation().search);
  return search.get(queryParam);
};
export const VoucherEntry = (props) => {
  useAuthenticated();
  const vou_type = useQuery("vou_type");
  return (
    <div>
      <Create basePath="vouchers" resource="vouchers">
        <VoucherEntryForm vou_type={vou_type} {...props} />
      </Create>
    </div>
  );
};
export const VoucherEdit = (props) => {
  useAuthenticated();
  const vou_type = useQuery("vou_type");
  return (
    <div>
      <Edit {...props}>
        <VoucherEntryForm vou_type={vou_type} {...props} />
      </Edit>
    </div>
  );
};

const validateVoucherCreation = (values) => {
  const errors = {};
  console.log("values:" + JSON.stringify(values));
  if (values.vou_type == 5 && !values.employee) {
    errors.employee = ["The Employee is required"];
  }

  if (!values.transactions || values.transactions.length == 0) {
    errors.total_debit = ["Please Enter the Transactions"];
  } else {
    values.transactions.map((transaction) => {
      (!transaction &&
        (errors.total_debit = ["Please Enter the Transactions"])) ||
        (!transaction.coa &&
          (errors.total_debit = ["Please select transaction account"])) ||
        ((!transaction.dr || transaction.dr === 0) &&
          (!transaction.cr || transaction.cr === 0) &&
          (errors.total_debit = [
            "Debit and Credit of a transaction cant be Zero",
          ]));
    });
  }

  // if (values.total_debit == 0 || values.total_credit == 0 || (values.total_debit != values.total_credit)) {
  //   errors.total_debit = [
  //     "Debit and Credit must be equal!",
  //   ]
  // }
  return errors;
};

// const required = (message = 'Required') =>
//   value => value ? undefined : message;
const ra_required = [required()];
const dateFormatter = (v) => {
  // v is a `Date` object
  if (!(v instanceof Date) || isNaN(v)) return;
  const pad = "00";
  const yy = v.getFullYear().toString();
  const mm = (v.getMonth() + 1).toString();
  const dd = v.getDate().toString();
  return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateParser = (v) => {
  // v is a string of "YYYY-MM-DD" format
  const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (match === null) return;
  const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
  if (isNaN(d)) return;
  return d;
};
const VoucherEntryForm = (props) => {
  const classes = useStyles();
  const initial = [
    { coa: "", dr: 0, cr: 0 },
    { coa: "", dr: 0, cr: 0 },
  ];
  const vou_types = [
    { id: 1, title: "Journal Voucher" },
    { id: 2, title: "Payment Voucher" },
    { id: 3, title: "Reciept Voucher" },
    { id: 4, title: "Sales Voucher" },
    { id: 5, title: "Salary Voucher" },
    { id: 6, title: "Inventory Voucher" },
  ];
  const optionRenderer = (choice) => {
    return choice && `${choice.scode || ""} ${choice.code} ${choice.title}`;
  };
  const redirect = (basePath, id, data) => `/vouchers/${data.vou_id}/show`;
  const calculateSum = (values, source, field) => {
    let sum = 0;
    if (values && values.transactions) {
      values.transactions.map(
        (transaction) =>
          transaction &&
          (sum = parseFloat(sum) + parseFloat(transaction[field]))
      );
      values[source] = parseFloat(sum);
    }
    return sum;
  };

  const TotalInput = (props) => {
    const { values } = useFormState();
    return (
      <NumberInput
        disabled
        variant="standard"
        source={parseFloat(props.source)}
        value={calculateSum(values, props.source, props.field)}
        {...props}
      />
    );
  };

  return (
    <FormWithRedirect
      fullWidth
      warnWhenUnsavedChanges
      redirect={redirect}
      display="flex"
      sanitizeEmptyValues
      validate={validateVoucherCreation}
      subscription={{ submitting: true, valid: true, invalid: true }}
      {...props}
      render={(formProps) => (
        // here starts the custom form layout
        <form>
          <Box p="1em" style={{ border: "1px solid #e0e0e3" }}>
            <Typography variant="h6" gutterBottom>
              Voucher Entry {props.vou_type}
            </Typography>

            <Grid container fullWidth spacing={2} display="flex">
              <Grid item xs={12} sm={4} md={3}>
                <SelectInput
                  margin="none"
                  label="Voucher Type"
                  source="vou_type"
                  initialValue={props.vou_type}
                  optionText="title"
                  optionValue="id"
                  choices={vou_types}
                  validate={ra_required}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextInput
                  margin="none"
                  disabled
                  source="vou_no"
                  resource="vouchers"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <DateInput
                  //initialValue={new Date().toLocaleDateString()}
                  margin="none"
                  source="vou_date"
                  resource="vouchers"
                  validate={ra_required}
                  autoFocus
                  pattern="\d{4}-\d{2}-\d{2}"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FirdousSelect
                  margin="none"
                  label="Project"
                  source="project"
                  optionText="title"
                  list="projects"
                  sort="title"
                  validate={ra_required}
                  fullWidth
                  initialValue={1}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FirdousSelect
                  margin="none"
                  allowEmpty
                  label="Vendor"
                  list="suppliers"
                  sort="title"
                  source="supplier"
                  optionText="title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FirdousSelect
                  margin="none"
                  allowEmpty
                  label="Unit"
                  source="unit"
                  optionText="title"
                  list="units"
                  sort="title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FirdousSelect
                  margin="none"
                  allowEmpty
                  label="Stock"
                  source="stock"
                  optionText="title"
                  list="stock"
                  sort="title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FirdousSelect
                  margin="none"
                  allowEmpty
                  label="Employee"
                  source="employee"
                  optionText="title"
                  list="employees"
                  sort="title"
                  fullWidth
                  //className={classes.maxFixedWidth}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  margin="none"
                  source="description"
                  resource="vouchers"
                  validate={ra_required}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  margin="none"
                  label="Remarks"
                  source="remarks"
                  resource="vouchers"
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" flexGrow={2} minWidth="800px" width="100%">
                  <ArrayInput
                    initialValue={initial}
                    //variant="standard"
                    source="transactions"
                    label="Transactions"
                    fullWidth
                  >
                    <SimpleFormIterator fullWidth>
                      <FirdousSelect
                        resettable
                        label="Account"
                        list="coa"
                        source="coa"
                        sort="title"
                        optionText={optionRenderer}
                        //validate={ra_required}
                        initialValue={1}
                        fullWidth
                        formClassName={classes.iteratorinput}
                      />
                      <TextInput
                        margin="none"
                        label="Ref.no"
                        source="refno"
                        fullWidth
                        formClassName={classes.iteratorinput50}
                      />

                      <TextInput
                        margin="none"
                        label="Chq.no"
                        source="chq_no"
                        resource="vouchers"
                        fullWidth
                        formClassName={classes.iteratorinput50}
                      />

                      <DateInput
                        margin="none"
                        label="Chq.date"
                        source="chq_date"
                        resource="vouchers"
                        fullWidth
                        formClassName={classes.iteratorinput50}
                      />

                      <NumberInput
                        formClassName={classes.iteratorinput50}
                        label="Debit"
                        source="dr"
                        resource="vouchers"
                        //validate={ra_required}
                        fullWidth
                      />

                      <NumberInput
                        formClassName={classes.iteratorinput50}
                        label="Credit"
                        source="cr"
                        resource="vouchers"
                        //validate={ra_required}
                        fullWidth
                      />

                      {/* <TextInput formClassName={classes.inlineBlock} label ="Description" source="description" resource="vouchers" multiline fullWidth margin="none"/> */}
                    </SimpleFormIterator>
                  </ArrayInput>
                </Box>
                <Grid item xs="12" align="right">
                  <TotalInput source="total_debit" field="dr" />
                  <TotalInput source="total_credit" field="cr" />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Toolbar>
            <Box display="flex" justifyContent="left" width="100%">
              <Box mr="1em">
                <SaveButton
                  saving={formProps.saving}
                  redirect={"show"}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
              </Box>
              <Box mr="1em">
                <SaveButton
                  label="Save and Add"
                  saving={formProps.saving}
                  redirect={"create"}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
              </Box>
            </Box>
          </Toolbar>
        </form>
      )}
    />
  );
};

// the parent component (Edit or Create) injects these props to their child
// const VisitorForm = ({ basePath, record, save, saving, version }) => {
//     const submit = values => {
//         // React-final-form removes empty values from the form state.
//         // To allow users to *delete* values, this must be taken into account
//         save(sanitizeEmptyValues(record, values));
//     };
//     return (
//         <Form
//             initialValues={record}
//             onSubmit={submit}
//             mutators={{ ...arrayMutators }} // necessary for ArrayInput
//             subscription={defaultSubscription} // don't redraw entire form each time one field changes
//             key={version} // support for refresh button
//             keepDirtyOnReinitialize
//             render={formProps => (

//                 <TextInput source="id"></TextInput>
//             )}
//         />
//     );
// };
// const defaultSubscription = {
//     submitting: true,
//     pristine: true,
//     valid: true,
//     invalid: true,
// };
