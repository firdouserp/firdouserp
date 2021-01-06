import { Box, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import {
  ArrayInput,
  Create,
  DateInput,
  DeleteButton,
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
        (errors.total_debit = [
          "Debit and Credit of a transaction cant be Zero",
        ])) ||
        ((!transaction.dr || transaction.dr === 0) &&
          (!transaction.cr || transaction.cr === 0) &&
          (errors.total_debit = [
            "Debit and Credit of a transaction cant be Zero",
          ]));
    });
  }
  return errors;
};

// const required = (message = 'Required') =>
//   value => value ? undefined : message;
const ra_required = [required()];
const segments = [
  { id: "compulsive", name: "Compulsive" },
  { id: "collector", name: "Collector" },
  { id: "ordered_once", name: "Ordered Once" },
  { id: "regular", name: "Regular" },
  { id: "returns", name: "Returns" },
  { id: "reviewer", name: "Reviewer" },
];

const VoucherEntryForm = (props) => {
  const classes = useStyles();
  const initial = [
    { coa: "1", dr: 0, cr: 0 },
    { coa: "1", dr: 0, cr: 0 },
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
  const redirect = (basePath, id, data) => `/author/${data.author_id}/show`;
  const calculateSum = (values, source, field) => {
    let sum = 0;
    if (values && values.transactions) {
      values.transactions.map(
        (transaction) => transaction && (sum = sum + transaction[field])
      );
      values[source] = sum;
    }
    return sum;
  };

  const TotalInput = (props) => {
    const { values } = useFormState();
    return (
      <TextInput
        disabled
        variant="standard"
        source={props.source}
        value={calculateSum(values, props.source, props.field)}
        {...props}
      />
    );
  };

  return (
    <FormWithRedirect
      warnWhenUnsavedChanges
      redirect={redirect}
      display="flex"
      sanitizeEmptyValues
      validate={validateVoucherCreation}
      subscription={{ submitting: true }}
      {...props}
      render={(formProps) => (
        // here starts the custom form layout
        <form>
          <Box p="1em" style={{ border: "1px solid #e0e0e3" }}>
            <Box display="flex">
              <Grid container display="flex">
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Grid item xs={12}>
                    <Box flex={1} mr="1em" style={{ minWidth: "360px" }}>
                      <Typography variant="h6" gutterBottom>
                        Voucher Entry {props.vou_type}
                      </Typography>
                      <Box flex={1}>
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
                      </Box>
                      <Box display="flex">
                        <Box flex={1} mr="0.5em">
                          <TextInput
                            margin="none"
                            disabled
                            source="vou_no"
                            resource="vouchers"
                            fullWidth
                          />
                        </Box>
                        <Box flex={1} ml="0.5em">
                          <DateInput
                            initialValue={new Date()}
                            margin="none"
                            source="vou_date"
                            resource="vouchers"
                            validate={ra_required}
                            autoFocus
                            fullWidth
                          />
                        </Box>
                      </Box>
                      <Box display="flex">
                        <Box flex={1} mr="0.5em">
                          <FirdousSelect
                            allowEmpty
                            label="Vendor"
                            list="suppliers"
                            sort="title"
                            source="supplier"
                            optionText="title"
                            fullWidth
                          />
                        </Box>
                        <Box flex={1} ml="0.5em">
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
                        </Box>
                      </Box>
                      <Box display="flex">
                        <Box flex={1} mr="0.5em">
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
                        </Box>
                        <Box flex={1} ml="0.5em">
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
                        </Box>
                      </Box>
                      <Box flex={1}>
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
                      </Box>
                      <Box display="flex">
                        <Box flex={1} mr="0.5em">
                          <TextInput
                            margin="none"
                            label="cheque no"
                            source="chq_no"
                            resource="vouchers"
                            fullWidth
                          />
                        </Box>
                        <Box flex={1} ml="0.5em">
                          <DateInput
                            margin="none"
                            label="Cheque Date"
                            source="chq_date"
                            resource="vouchers"
                            fullWidth
                          />
                        </Box>
                      </Box>

                      <TextInput
                        source="description"
                        resource="vouchers"
                        multiline
                        fullWidth
                      />
                      <TextInput
                        margin="none"
                        label="Remarks"
                        source="remarks"
                        resource="vouchers"
                        multiline
                        fullWidth
                      />
                      <Box mt="1em" />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box
                    display="flex"
                    flexGrow={1}
                    minWidth="360px"
                    width="100%"
                  >
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
                          validate={ra_required}
                          initialValue={1}
                          fullWidth
                          formClassName={classes.iteratorinput}
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
          </Box>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <SaveButton
                saving={formProps.saving}
                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
              />
              <DeleteButton record={formProps.record} />
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
