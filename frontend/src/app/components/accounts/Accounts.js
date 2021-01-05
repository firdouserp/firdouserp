import { Grid } from "@material-ui/core";
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
    <Grid container display="flex" spacing={3}>
      <Grid item xs={12} sm={3}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12} >
            <Paper className={classes.JournalVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.JournalVoucher}
                  component={Link}
                  to="/accounts/voucherentry?vou_type=1"
                  size="large"
                  color="primary"
                >
                  Journal Voucher
                </Button>
              </CardActions>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.PaymentVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.PaymentVoucher}
                  component={Link}
                  to="/accounts/voucherentry?vou_type=2"
                  size="large"
                  color="primary"
                >
                  Payment Voucher
                </Button>
              </CardActions>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.SalesVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.SalesVoucher}
                  component={Link}
                  to="/accounts/voucherentry?vou_type=4"
                  size="large"
                  color="primary"
                >
                  Sales Voucher
                </Button>
              </CardActions>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.RecieptVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.RecieptVoucher}
                  component={Link}
                  to="/accounts/voucherentry?vou_type=3"
                  size="large"
                  color="primary"
                >
                  Reciept Voucher
                </Button>
              </CardActions>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.SalaryVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.SalaryVoucher}
                  component={Link}
                  to="/accounts/voucherentry?vou_type=5"
                  size="large"
                  color="primary"
                >
                  Salary Voucher
                </Button>
              </CardActions>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.SalaryVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.JournalVoucher}
                  component={Link}
                  to="/userform"
                >
                  User Form
                </Button>
              </CardActions>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.SalaryVoucher} variant="outlined" square>
              <CardActions>
                <Button
                  className={classes.JournalVoucher}
                  component={Link}
                  to="/bookingform"
                >
                  Booking Form
                </Button>
              </CardActions>
            </Paper>
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

export default Accounts;
