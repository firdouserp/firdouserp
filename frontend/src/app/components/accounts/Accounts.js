import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Title, useAuthenticated, useAuthState } from "react-admin";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  JournalVoucher: {
    backgroundColor: "#64b5f6",
    color: "white",
    hover: {
      color: "red",
    },
  },
  PaymentVoucher: {
    backgroundColor: "#7b1fa2",
    color: "white",
  },
  SalesVoucher: {
    backgroundColor: "#aa00ff",
    color: "white",
  },
  RecieptVoucher: {
    backgroundColor: "#00897b",
    color: "white",
  },
  SalaryVoucher: {
    backgroundColor: "#ff5252",
    color: "white",
  },
}));

function SimplePaper() {
  const classes = useStyles();

  return (
    <Grid container display="flex" spacing={2}>
      <Grid item xs={12} sm={3}>
        <Typography variant="h6" gutterBottom>
          Vocuchers Menu
        </Typography>
        <Grid item xs={12}></Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccountButton
              target="/transactions"
              label="Voucher Listing"
              stylename={classes.JournalVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/coa"
              label="Chart of Accounts"
              stylename={classes.JournalVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/notes"
              label="Account Heads"
              stylename={classes.JournalVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/coa_type"
              label="Account Types"
              stylename={classes.JournalVoucher}
            />
          </Grid>
{/*           <Grid item xs={12}>
            <AccountButton
              target="/deleted"
              label="Deleted Vouchers"
              stylename={classes.JournalVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/invalidvou"
              label="Invalid Vouchers"
              stylename={classes.JournalVoucher}
            />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Create Vocuchers
            </Typography>
            <AccountButton
              target="/transactions/create?vou_type=1"
              label="Journal Voucher"
              stylename={classes.JournalVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/transactions/create?vou_type=2"
              label="Payment Voucher"
              stylename={classes.PaymentVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/transactions/create?vou_type=4"
              label="Sales Voucher"
              stylename={classes.SalesVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/transactions/create?vou_type=3"
              label="Reciept Voucher"
              stylename={classes.RecieptVoucher}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountButton
              target="/transactions/create?vou_type=5"
              label="Salary Voucher"
              stylename={classes.SalaryVoucher}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
const Accounts = () => {
  useAuthenticated();
  const { loading, authenticated } = useAuthState();

  return (
    <Card>
      <Title title="Accounts" />
      <CardContent>{SimplePaper()}</CardContent>
    </Card>
  );
};

export const AccountButton = (props) => {
  return (
    <Paper
      className={props.stylename}
      //style={{ minHeight: "100px" ,maxWidth:"150px"}}
      variant="outlined"
      square
    >
      <CardActions>
        <Button
          className={props.stylename}
          to={props.target}
          component={Link}
          size="large"
          color="primary"
        >
          {props.label}
        </Button>
      </CardActions>
    </Paper>
  );
};

export default Accounts;
