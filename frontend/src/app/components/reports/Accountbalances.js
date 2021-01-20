import { CircularProgress, Toolbar } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import React, { Component } from "react";
import { Button, Error, useQueryWithStore } from "react-admin";
import ReactToPrint from "react-to-print";
export function formatCurrency(amount) {
  return Number.parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

}
const styles = `
.invoice-box{
  margin-left:2em;
  margin-right:2em;
  max-width:1000px;
  border:1px solid #ccc;
  box-shadow:0 0 10px rgba(0, 0, 0, .15);
  color:#555;
}
.heading{
    text-align:center;
    font-weight:bold;
    font-size: "120%";
}
.debit, .credit, .balance{
    width: 150px;
    padding: 10px;
    text-align:right;
    border-bottom: 1px solid #ddd;
}
thead td,tfoot td{
    font-weight:bold;
    text-align: left;
    background-color: #4CAF50;
    color: white;
    padding: 10px;
}
.account{
  font-weight:bold;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
@media print {
  .invoice-box{
    box-shadow: none;
    border: 0;
    page-break-before: always;
  }

}
@page {
  size: auto;
  margin-top: 10mm;
  margin-bottom: 10mm;
}
`;



export class PrintAccountBalanceComponent extends Component {
  render() {
    return (
      <AccountBalanceReport />
    );
  }
}



export const AccountBalanceReport = () => {
  const componentRef = React.useRef();
  const { data, loaded, error } = useQueryWithStore({
    type: "getList",
    resource: "reports/accbal",
    payload: {
      pagination: { page: 1, perPage: 500 },
      sort: { field: "coa.code", order: "ASC" },
      filter: {},
    },
  });

  if (!loaded) {
    return <CircularProgress />;
  }
  if (error) {
    return <Error />;
  }
  if (!data) {
    console.log("return null");
    return null;
  }

  return (
    accountbalances(data))
}
const accountbalances = (records) => {
  console.log("records:" + JSON.stringify(records));
  let sum_debit = 0.00;
  let sum_credit = 0.00;
  return (
    <div>
      <html lang={"en_US"}>
        <head>
          <meta charSet="utf-8" />
          <title>{/* {company.name} {POName} */}</title>
          <style dangerouslySetInnerHTML={{ __html: styles }} />
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <body>

          <div className="invoice-box">
            <table width="100%" cellPadding="0" cellSpacing="0">

              <thead>
                <td>Account Name</td>
                <td className="debit">Debit</td>
                <td className="credit">Credit</td>
                <td className="balance">Balance</td>
              </thead>
              <tbody>
                {records.map((record) => {
                  sum_debit = sum_debit + parseFloat(record.debit || 0);
                  sum_credit = sum_credit + parseFloat(record.credit || 0);
                  if (record.id) {
                    return (
                      <tr>
                        <td className="account">{record.title}</td>
                        <td className="debit">{formatCurrency(record.debit)}</td>
                        <td className="credit">{formatCurrency(record.credit)}</td>
                        <td className="balance">{formatCurrency(record.balance)}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
              <tfoot>
                <tr>

                  <td className="account">Totals</td>

                  <td className="debit">{formatCurrency(sum_debit)}</td>
                  <td className="credit">{formatCurrency(sum_credit)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </body>
      </html>
    </div>
  );
};

const AccountBalancePrintable = () => {
  const componentRef = React.useRef();

  return (
    <div>
      <Toolbar style={{ justifyContent: "spance-between" }}>
        <h1 style={{ paddingRight: "15px" }}> Account Balance (Trial)</h1>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return (
              <Button

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

      </Toolbar>
      <div>
        <PrintAccountBalanceComponent ref={componentRef} />
      </div>
    </div>
  )
}
export default AccountBalancePrintable;
