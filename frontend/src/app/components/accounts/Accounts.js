import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PaymentIcon from '@material-ui/icons/Payment';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  JournalVoucher: {
    backgroundColor: '#64b5f6',
    color:"white",
    hover: {
		color: 'red',

	}
  },
  PaymentVoucher: {
    backgroundColor: '#7b1fa2',
    color:"white"
  },
  SalesVoucher: {
    backgroundColor: '#aa00ff',
    color:"white"
  },
  RecieptVoucher: {
    backgroundColor: '#00897b',
    color:"white"
  },
  SalaryVoucher: {
    backgroundColor: '#ff5252',
    color:"white"
  },

}));

function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.JournalVoucher} variant="outlined" square >
             
        <CardActions>

        <Button className={classes.JournalVoucher} component={Link} to="/suppliers" size="large" color="primary">
            Gerneral Voucher
        </Button>
        </CardActions>

        </Paper>
        <Paper className={classes.PaymentVoucher} variant="outlined" square >
             
             <CardActions>
     
             <Button className={classes.PaymentVoucher} component={Link} to="/suppliers" size="large" color="primary">
                 Payment Voucher
             </Button>
             </CardActions>
     
             </Paper>
             <Paper className={classes.SalesVoucher} variant="outlined" square >
             
             <CardActions>
     
             <Button className={classes.SalesVoucher} component={Link} to="/suppliers" size="large" color="primary">
                 Sales Voucher
             </Button>
             </CardActions>
     
             </Paper>
             <Paper className={classes.RecieptVoucher} variant="outlined" square >
             
             <CardActions>
     
             <Button className={classes.RecieptVoucher} component={Link} to="/suppliers" size="large" color="primary">
                 Reciept Voucher
             </Button>
             </CardActions>
     
             </Paper>
             <Paper className={classes.SalaryVoucher} variant="outlined" square >
             
             <CardActions>
     
             <Button className={classes.SalaryVoucher} component={Link} to="/suppliers" size="large" color="primary">
                 Salary Voucher
             </Button>
             </CardActions>
     
             </Paper>
    </div>
  );
}
const Accounts = () => (
    <Card>
        <Title title="Accounts" />
        <CardContent>
        {SimplePaper()}
        </CardContent>
    </Card>
);

export default Accounts;