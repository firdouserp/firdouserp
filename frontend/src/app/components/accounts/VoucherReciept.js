import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { Error, useQueryWithStore } from "react-admin";
import logo from "../../assets/firdouslogo.png";

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
export function formatDate(date) {
  return date;
}

export function formatCurrency(amount) {
  return Number.parseFloat(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const VoucherReceipt = (voucher) => {
  console.log("reciept:" + JSON.stringify(voucher));
  const { data, loaded, error } = useQueryWithStore({
    type: "getList",
    resource: "vouchers/voudetail",
    payload: {
      pagination: { page: 1, perPage: 500 },
      sort: { field: "srno", order: "ASC" },
      filter: { vou_no: voucher.vou_no },
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
    <VoucherPrint
      voucher={data}
      company={{
        name: "Firdous ERP",
        logoUrl: logo,
      }}
      notes={"Here comes the Remarks"}
    />
  );
};

const VoucherPrint = ({ records, company, notes }) => {
  console.log("records:" + JSON.stringify(records));
  let sum_debit = 0.0;
  let sum_credit = 0.0;
  let vou_number = records.reduce((record) => record.vou_no);
  let vou_date = records.reduce((record) => record.vou_date);
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
            <div class="header">
              <span>Voucher #</span>
              <span>{vou_number}</span>
              <span>Voucher #</span>
              <span>{vou_date}</span>
            </div>

            <table width="100%" cellPadding="0" cellSpacing="0">
              <thead>
                <td>Account Name</td>
                <td>Description</td>
                <td className="debit">Debit</td>
                <td className="credit">Credit</td>
              </thead>
              <tbody>
                {records.map((record) => {
                  sum_debit = sum_debit + parseFloat(record.debit || 0);
                  sum_credit = sum_credit + parseFloat(record.credit || 0);
                  if (record.id) {
                    return (
                      <tr>
                        <td className="account">
                          {record.coa_code + "-" + record.coa_title}
                        </td>
                        <td className="account">{record.description}</td>
                        <td className="debit">{formatCurrency(record.dr)}</td>
                        <td className="credit">{formatCurrency(record.cr)}</td>
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

export class PrintVoucherReciept extends Component {
  render() {
    const { record } = this.props;
    if (record.id) {
      return (
        <div>
          <VoucherReceipt {...record } />
        </div>
      );
    }
    return null;
  }
}

export default PrintVoucherReciept;
