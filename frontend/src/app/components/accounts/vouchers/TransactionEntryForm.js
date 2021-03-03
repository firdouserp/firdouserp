import { Box, Grid, makeStyles } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import PrintIcon from "@material-ui/icons/Print";
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
  Toolbar,
} from "react-admin";
import { useFormState } from "react-final-form";
import ReactToPrint from "react-to-print";
import FirdousSelect from "../FirdousSelect";
import PrintVoucherComponent from "../PrintVoucherComponent";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  inlineBlock: { display: "inline-flex", marginRight: "1em", width: "40%" },
  iteratorinput: { marginRight: "0.5em", width: "30%" },

  width20: {
    "@media (min-width: 600px)": {
      marginRight: "0.5em",
      width: "20%",
    },
  },
  width25: { marginRight: "0.5em", width: "25%" },
  width30: { marginRight: "0.5em", width: "30%" },
  width35: {
    "@media (min-width: 600px)": {
      marginRight: "0.5em",
      width: "35%",
    },
  },
  formBox: {
    display: "flex",
    //flexGrow: "2",
    width: "100%",
  },
  width40: { marginRight: "0.5em", width: "40%" },
  width50: { marginRight: "0.5em", width: "62%" },
  alightRight: { marginRight: "0.5em", width: "20%" },

  maxFixedWidth: { maxWidth: "180px", boxSizing: "border-box" },
  fixedWidth: { width: "180px" },
  BorderandBackgroundIter: {
    border: "1px solid #ccc",
    padding: "1em",
  },
  VoucherEntry: {
    border: "1px solid #ccc",
    minWidth: "870px",
    maxWidth: "1000px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  BorderandBackground: {
    //border: "1px solid #ccc",
    //backgroundColor: "#1976d20f",
    margin: "2px",
    fontWeight: "bold",
    MuiFormHelperText: {
      contained: {
        display: "none",
      },
      marginDense: {
        display: "none",
      },
    },
    MuiFormControl: {
      root: { border: "1px solid #ccc" },
    },

    MuiFilledInput: {
      root: { backgroundColor: "#1976d20f" },
    },
  },
});

const validateVoucherCreation = (values) => {
  const errors = {};
  console.log("values:" + JSON.stringify(values));
  if (values.total_debit != values.total_credit) {
    errors.total_debit = ["debit != credit"];
    errors.total_credit = ["debit != credit"];
    console.log("debit!=credit");
  }

  if (!values.transactions || values.transactions.length < 2) {
    errors.total_debit = ["Please Enter the Transactions"];
    errors.total_credit = ["Please Enter the Transactions"];
    console.log("transactions less then required");
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
  console.log(JSON.stringify(errors));
  return errors;
};

const ra_required = [required()];

export const TransactionEntryForm = ({ ...props }) => {
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
    return choice && ` ${choice.title} ${choice.scode || ""}  ${choice.code}`;
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
  const user = JSON.parse(localStorage.getItem("jwtToken"));
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
  return (
    <SimpleForm
      toolbar={<CustomToolbar />}
      className={classes.VoucherEntry}
      validate={validateVoucherCreation}
      fullWidth
      subscription={{}}
      {...props}
    >
      <Grid container fullWidth spacing={1} display="flex">
        <Grid pr={8} item xs={12} sm={4} md={3}>
          <SelectInput
            variant="outlined"
            margin="none"
            label="Voucher Type"
            source="vou_type"
            initialValue={props.vou_type || 1}
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
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <DateInput
            //initialValue={new Date().toLocaleDateString()}
            initialValue={new Date().toISOString().substring(0, 10)}
            margin="none"
            variant="outlined"
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
            initialValue={47}
            formClassName={classes.width20}
            className={classes.BorderandBackground}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            variant="outlined"
            margin="none"
            source="description"
            //resource="vouchers"
            label="Description"
            validate={ra_required}
            multiline
            fullWidth
            formClassName={classes.width50}
            className={classes.BorderandBackground}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextInput
            variant="outlined"
            margin="none"
            label="Chq.no"
            source="chq_no"
            //resource="vouchers"
            fullWidth
            className={classes.BorderandBackground}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateInput
            variant="outlined"
            margin="none"
            label="Chq.date"
            source="chq_date"
            resource="vouchers"
            fullWidth
            className={classes.BorderandBackground}
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
        {/*    <Grid item xs={12} sm={8}>
          <TextInput
            variant="outlined"
            margin="none"
            source="remarks"
            //resource="vouchers"
            //validate={ra_required}
            multiline
            fullWidth
            className={classes.BorderandBackground}
          />
        </Grid> */}

        <Grid item xs={12}>
          <Box className={classes.formBox}>
            <ArrayInput
              initialValue={initial}
              variant="outlined"
              source="transactions"
              label="Transactions"
              fullWidth
              className={classes.BorderandBackgroundIter}
              subscription={{}}
              marginTop="none"
            >
              <SimpleFormIterator fullWidth>
                <FirdousSelect
                  resettable
                  label="Account"
                  list="coa"
                  source="coa"
                  sort="code"
                  optionText={optionRenderer}
                  validate={ra_required}
                  //initialValue={1}
                  //resource="vouchers"
                  fullWidth
                  formClassName={classes.width35}
                  className={classes.BorderandBackground}
                  // margin="none"
                />
                <TextInput
                  margin="none"
                  label="RefNo."
                  source="refno"
                  //resource="vouchers"
                  fullWidth
                  formClassName={classes.width20}
                  className={classes.BorderandBackground}
                />
                <NumberInput
                  //formClassName={classes.iteratorinput50}
                  //className={classes.fixedWidth}
                  label="Debit"
                  source="dr"
                  // resource="vouchers"
                  //validate={ra_required}

                  className={classes.BorderandBackground}
                  formClassName={classes.width20}
                  fullWidth
                />

                <NumberInput
                  //className={classes.fixedWidth}
                  label="Credit"
                  source="cr"
                  //resource="vouchers"
                  //validate={ra_required}
                  className={classes.BorderandBackground}
                  formClassName={classes.width20}
                  fullWidth
                />
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
          <Grid container display="flex" fullWidth spacing={2}>
            <Grid item xs="6" align="left">
              <TextInput
                margin="none"
                label="Remarks"
                source="remarks"
                //resource="vouchers"
                multiline
                fullWidth
                className={classes.BorderandBackground}
              />
            </Grid>
            <Grid item xs="6" align="right">
              <TotalInput
                variant="outlined"
                margin="none"
                source="total_debit"
                field="dr"
              />
              <TotalInput
                variant="outlined"
                margin="none"
                source="total_credit"
                field="cr"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SimpleForm>
  );
};
