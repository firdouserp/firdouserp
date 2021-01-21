import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Title, useAuthenticated, useAuthState } from "react-admin";
import { AccountButton } from "../accounts/Accounts";
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
          Reports Menu
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccountButton
              target="/accbal"
              label="Account Balance"
              stylename={classes.JournalVoucher}
            />
          </Grid>

          <Grid item xs={12}>
            <AccountButton
              target="/projectledger"
              label="Project Ledger"
              stylename={classes.JournalVoucher}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
const Reports = () => {
  useAuthenticated();
  const { loading, authenticated } = useAuthState();

  return (
    <Card>
      <Title title="Reports" />
      <CardContent>{SimplePaper()}</CardContent>
    </Card>
  );
};

export default Reports;
