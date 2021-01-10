import { Box, Grid, makeStyles } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import PrintIcon from '@material-ui/icons/Print';
import * as React from "react";
import {
  ArrayInput,

  Button,

  DateInput,

  DeleteButton,

  ListButton,

  NumberInput,
  required,
  SaveButton,
  SelectInput,



  SimpleForm,
  SimpleFormIterator,
  TextInput,
  Toolbar
} from "react-admin";
import { useFormState } from "react-final-form";
import ReactToPrint from "react-to-print";
import FirdousSelect from "./FirdousSelect";
import PrintVoucherComponent from "./PrintVoucherComponent";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  inlineBlock: { display: "inline-flex", marginRight: "1em", width: "40%" },
  iteratorinput: { marginRight: "0.5em", width: "40%" },
  iteratorinput50: { marginRight: "0.5em", width: "20%" },
  maxFixedWidth: { maxWidth: "180px", boxSizing: "border-box" },
  fixedWidth: { width: "180px" },
  BorderandBackgroundIter: {
    border: "1px solid #ccc",
    padding: "1em"
  },
  VoucherEntry: {
    border: "1px solid #ccc"
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  BorderandBackground: {
    border: "1px solid #ccc",
    backgroundColor: "#1976d20f",
    margin: "2px",
    fontWeight: "bold",
    MuiFormHelperText: {
      contained: {
        display: "none"
      }
    },
    MuiFormControl: {
      root: { border: "1px solid #ccc" }
    },

    MuiFilledInput: {
      root: { backgroundColor: "#1976d20f" }

    },
  }
});

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
  return errors;
};

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
export const VoucherEntryForm = ({ ...props }) => {
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
    return choice && `${choice.scode || ""} | ${choice.code} | ${choice.title}`;
  };

  const calculateSum = (values, source, field) => {
    let sum = 0;
    if (values && values.transactions) {
      values.transactions.map(
        (transaction) =>
          transaction &&
          (sum = parseFloat(sum || 0) + parseFloat(transaction[field] || 0))
      );
      values[source] = parseFloat(sum || 0);
    }
    return sum;
  };

  const TotalInput = (props) => {
    const { values } = useFormState();
    return (
      <NumberInput
        disabled
        variant="standard"
        source={parseFloat(props.source || 0)}
        value={calculateSum(values, props.source, props.field)}
        {...props}
      />
    );
  };


  const CustomToolbar = props => {
    const componentRef = React.useRef();
    return (

      <Toolbar alwaysEnableSaveButton {...props} classes={useStyles()}>

        <Grid container spacing={2}>
          <Grid item>
            <SaveButton undoable={false} {...props} />
          </Grid>
          <Grid item>
            <ListButton basePath={props.basePath} label="Back" variant="contained" color="primary" size="medium" icon={<ChevronLeft />} />
          </Grid>
          <Grid item>

            <ReactToPrint
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return <Button disabled={!props.record.id} color="primary" variant="contained" label="Print" size="medium" icon={<PrintIcon />} />

              }}
              content={() => componentRef.current}
            />
            <div style={{ display: 'none' }}>
              {console.log(props)}
              <PrintVoucherComponent ref={componentRef} {...props} />
            </div>
          </Grid>
        </Grid>
        <DeleteButton undoable={false} />
      </Toolbar>
    )
  };
  return (

    <SimpleForm toolbar={<CustomToolbar />} className={classes.VoucherEntry}
      // toolbar={<Toolbar alwaysEnableSaveButton />}
      /*warnWhenUnsavedChanges*/ validate={validateVoucherCreation} fullWidth redirect="show" {...props}>
      {/* <Box display="flex" mb="1em" fullWidth justifyContent="space-between">
        <Typography
          variant="h6"
          gutterBottom
          align="center"
        >
          Voucher Entry {props.vou_type}
        </Typography>


      </Box> */}
      <Grid container fullWidth spacing={1} display="flex">
        <Grid pr={8} item xs={12} sm={4} md={3}>
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
            className={classes.BorderandBackground}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextInput
            margin="none"
            disabled
            source="vou_no"
            //    resource="vouchers"
            fullWidth
            className={classes.BorderandBackground}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <DateInput
            //initialValue={new Date().toLocaleDateString()}
            margin="none"
            source="vou_date"
            //resource="vouchers"
            validate={ra_required}
            autoFocus
            pattern="\d{4}-\d{2}-\d{2}"
            fullWidth
            className={classes.BorderandBackground}
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
            className={classes.BorderandBackground}

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
            className={classes.BorderandBackground}
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
            className={classes.BorderandBackground}
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
            className={classes.BorderandBackground}
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
            className={classes.BorderandBackground}
          //className={classes.maxFixedWidth}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextInput
            margin="none"
            label="Chq.no"
            source="chq_no"
            //resource="vouchers"
            fullWidth
            className={classes.BorderandBackground}

          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <DateInput
            margin="none"
            label="Chq.date"
            source="chq_date"
            resource="vouchers"
            fullWidth
            className={classes.BorderandBackground}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            margin="none"
            source="description"
            //resource="vouchers"
            validate={ra_required}
            multiline
            fullWidth
            className={classes.BorderandBackground}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" flexGrow={2} minWidth="600px" width="100%">
            <ArrayInput
              initialValue={initial}
              //variant="standard"
              source="transactions"
              label="Transactions"
              fullWidth
              className={classes.BorderandBackgroundIter}
              marginTop="none"

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
                  //initialValue={1}
                  //resource="vouchers"
                  fullWidth
                  formClassName={classes.iteratorinput}
                  className={classes.BorderandBackground}
                  margin="none"
                />
                <TextInput
                  margin="none"
                  label="RefNo."
                  source="refno"
                  //resource="vouchers"
                  fullWidth
                  formClassName={classes.iteratorinput50}
                  className={classes.BorderandBackground}
                />
                <NumberInput
                  formClassName={classes.iteratorinput50}
                  className={classes.BorderandBackground}
                  label="Debit"
                  source="dr"
                  // resource="vouchers"
                  //validate={ra_required}
                  fullWidth
                />

                <NumberInput
                  formClassName={classes.iteratorinput50}
                  className={classes.BorderandBackground}
                  label="Credit"
                  source="cr"
                  //resource="vouchers"
                  //validate={ra_required}
                  fullWidth
                />

                {/* <TextInput formClassName={classes.inlineBlock} label ="Description" source="description" resource="vouchers" multiline fullWidth margin="none"/> */}
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
          <Grid container display="flex" fullWidth>
            <Grid item xs="6" align="right">
              <TextInput
                margin="none"
                label="Remarks"
                source="remarks"
                //resource="vouchers"
                multiline
                fullWidth
                className={classes.BorderandBackground}

              /></Grid>
            <Grid item xs="6" align="right" >
              <TotalInput margin="none" source="total_debit" field="dr" />
              <TotalInput margin="none" source="total_credit" field="cr" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SimpleForm>
  );
};