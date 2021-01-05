import { Box, makeStyles, Toolbar, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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
  useAuthenticated
} from "react-admin";
import { useLocation } from "react-router";
import FirdousSelect from "./FirdousSelect";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  inlineBlock: { display: "inline-flex", marginRight: "1em", width: "40%" },
  smallwidth: { display: "inline-flex", marginRight: "0.2em", width: "25%" },
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
  return (
    <FormWithRedirect
      redirect={redirect}
      display="flex"
      {...props}
      render={(formProps) => (
        // here starts the custom form layout
        <form>
          <Box p="1em" style={{ border: "1px solid #e0e0e3" }}>
            <Box display="flex">
              <Box flex={1} mr="1em" style={{ minWidth: "370px" }}>
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
                      className={classes.fixedWidth}
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
                      className={classes.maxFixedWidth}
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
                      className={classes.maxFixedWidth}
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
                      className={classes.maxFixedWidth}
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
                      className={classes.maxFixedWidth}
                    />
                  </Box>
                </Box>
                <Box flex={1}>
                  <FirdousSelect
                    margin="none"
                    allowEmpty
                    label="Employee"
                    source="employee"
                    optionText="value"
                    list="suppliers"
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
                      className={classes.fixedWidth}
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
              <Box
                display="flex"
                flexGrow={1}
                ml="1em"
                minWidth="370px"
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

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
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
                          formClassName={classes.fixedWidth}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <NumberInput
                          //formClassName={classes.smallwidth}
                          label="Debit"
                          source="dr"
                          resource="vouchers"
                          //validate={ra_required}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <NumberInput
                          // formClassName={classes.smallwidth}
                          label="Credit"
                          source="cr"
                          resource="vouchers"
                          //validate={ra_required}
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    {/* <TextInput formClassName={classes.inlineBlock} label ="Description" source="description" resource="vouchers" multiline fullWidth margin="none"/> */}
                  </SimpleFormIterator>
                </ArrayInput>
              </Box>
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
