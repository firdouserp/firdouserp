//import { formatCurrency, formatDate } from "./utils";
import PropTypes from "prop-types";
import React from "react";
export function formatDate(date) {
  return date;
}

const styles = `
.invoice-box{
  max-width:800px;
  margin:auto;
  border:1px solid #ccc;
  box-shadow:0 0 10px rgba(0, 0, 0, .15);
  font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color:#555;
}
.invoice-box table{
  width:100%;
  line-height:inherit;
  text-align:left;
}
.invoice-box table td{
  padding:5px;
  vertical-align:top;
}
.invoice-box table td td{
  padding:0;
}
.voutype{
  text-align:center;
  vertical-align:top;
  color:#333;
  font-size:16px;
  font-weight:bold;
  width:100%;
  background:#ccc;
  padding:0.5em;
  margin-top: 0.5em;
}
.particulars{
  word-wrap: break-word;
  text-align:left !important;
}

.invoice-box .footer {
  border-top:1px solid #ccc;
  text-align:center;
  color : #c0c0c0;
}

.invoice-box table tr td:nth-child(2){
  text-align:right;
}
.invoice-box table tr td.refno{
  text-align:left;
}

.invoice-box table tr.information table td.information-column{
  width:50%;
}
.invoice-box table table.invoice-information{
  display:inline-block;
  width:auto;
}
.invoice-box table table.invoice-information td:first-child{
  padding-right:30px;
}
.invoice-box table tr.information table td td{
  padding-bottom:0;
}
.invoice-box table tr.heading td{
  background:#eee;
  border-bottom:1px solid #ddd;
  font-weight:bold;

}
invoice-box table tr.item td{
  border-bottom:1px solid #eee;
}
.invoice-box table tr.item td.debit{
  text-align:right;
}
.invoice-box table tr.heading td.credit{
  text-align:right;
}
.invoice-box table tr.heading td.debit{
  text-align:right;
}
.invoice-box table tr.item td.credit{
  text-align:right;
}
.invoice-box table tr.item.last td{
  border-bottom:none;
}
.invoice-box table tr.total td:nth-child(2){
  background:#eee;
  font-weight:bold;
}
.invoice-box .subheading {
  font-weight: bold;
   text-transform: uppercase;
}
.bottomline{
    margin-top:80px;
    position: fixed;
  left: 0;
  bottom: 10;
  width: 100%;
}
.description{
  margin-top:5px;
  color:#ccc;
}
.details{
  margin-top:5em;
  height:80px;
}
@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td{
    width:100%;
    display:block;
    text-align:center;
  }
  .invoice-box table tr.information table td{
    width:100%;
    display:block;
    text-align:center;
  }
  
}
.page
    {
     -webkit-transform: rotate(-90deg); 
     -moz-transform:rotate(-90deg);
     filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }
@media print {

  @Page{
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    // margin: 0;
    // padding: 0;
    // border: none;
    // background: none;
    // transform: rotate(270deg) translate(-210mm, 0);
    // transform-origin: 0 0;
  }
  .invoice-box {
    font-family: sans-serif;
    // width: 200mm;
    // height: 120mm;
    box-shadow: none;
    border:0;
    margin:1em;

    
  }
  *{
    font-size:8pt;
  }
}
`;

export function formatCurrency(amount) {
  return Number.parseFloat(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
const vou_types = [
  { id: 1, title: "Journal Voucher" },
  { id: 2, title: "Payment Voucher" },
  { id: 3, title: "Reciept Voucher" },
  { id: 4, title: "Sales Voucher" },
  { id: 5, title: "Salary Voucher" },
  { id: 6, title: "Inventory Voucher" },
];
export default function Voucher({ voucher, company, notes }) {
  let { transactions } = voucher;

  const totalAmount = transactions.reduce((sum, item) => sum + item.dr, 0);
  transactions = transactions.sort(function (t1, t2) {
    return t1.dr > 0 ? -1 : 1;
  });

  let voutype = vou_types.find((v) => v.id == voucher.vou_type);
  const voucherName = voutype.title || "Voucher";

  return (
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>
          {company.name} {voucherName}
        </title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <div className="voutype">{voucherName}</div>
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
                <td colSpan="6">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div>
                            {voucher.vou_no && (
                              <div className="subheading">
                                Voucher No # {voucher.vou_no}
                              </div>
                            )}
                            {voucher.vou_date && (
                              <div>Voucher Date :{voucher.vou_date}</div>
                            )}
                            {voucher.project && (
                              <div> Project :Infinity One</div>
                            )}
                            {voucher.chq_no && (
                              <div>CHQ # :{voucher.chq_no}</div>
                            )}
                            {voucher.chq_date && (
                              <div>CHQ Date :{voucher.chq_date}</div>
                            )}
                            {voucher.created_by && (
                              <div>Created By :{voucher.created_by}</div>
                            )}
                          </div>
                        </td>
                        <td className="title">
                          <img
                            src={company.logoUrl}
                            style={{
                              display: "block",
                              width: "auto",
                              height: "auto",
                              maxWidth: "250px",
                              maxHeight: "120px",
                              marginLeft: "auto",
                            }}
                            alt={company.name}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr className="heading">
                <td className="subheading">Transactions</td>
                <td className="refno"> Particulars</td>
                <td className="debit">Debit</td>
                <td className="credit">Credit</td>
              </tr>
              {transactions.map((item) => (
                <tr className="item" key={item.description}>
                  <td className="account">{item.account}</td>
                  <td className="particulars">{item.particulars}</td>

                  <td className="debit">{formatCurrency(item.dr)}</td>
                  <td className="credit">{formatCurrency(item.cr)}</td>
                </tr>
              ))}
              <tr className="total">
                <td />

                <td colSpan={"5"}>
                  <table>
                    <tbody>
                      <tr>
                        <td className="subheading">Total</td>
                        <td>{formatCurrency(totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {voucher.description && [
                <tr className="description" key="heading">
                  <td className="subheading" colSpan="6">
                    Description
                  </td>
                </tr>,
                <tr className="details-row" key="details">
                  <td className="details" colSpan="6">
                    {voucher.description}
                  </td>
                </tr>,
              ]}
            </tbody>
          </table>
          {voucher.remarks && (
            <div style={{ marginTop: 30 }}>
              <div className="">Remarks: {voucher.remarks}</div>
            </div>
          )}
          <div className="bottomline">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr className="footer">
                  <td colSpan="2">
                    {" "}
                    <div className="footer">Prepared By</div>
                  </td>
                  <td colSpan="2">
                    {" "}
                    <div className="footer"> Checked By</div>
                  </td>
                  <td colSpan="2">
                    {" "}
                    <div className="footer"> Recieved By</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  );
}

Voucher.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  }).isRequired,
  voucher: PropTypes.shape({
    vou_no: PropTypes.string,
    vou_date: PropTypes.string,
    vou_type: PropTypes.string,
    project: PropTypes.string,
    supplier: PropTypes.string,
    unit: PropTypes.string,
    stock: PropTypes.string,
    employee: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    remarks: PropTypes.string,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        coa: PropTypes.string.isRequired,
        refno: PropTypes.string,
        chq_no: PropTypes.string,
        chq_date: PropTypes.string,
        dr: PropTypes.number,
        cr: PropTypes.number,
        account: PropTypes.string,
      }).isRequired
    ).isRequired,
    name: PropTypes.string,
  }).isRequired,

  lang: PropTypes.string,
};

Voucher.defaultProps = {
  lang: "en_US",
  notes: null,
};
