//import { formatCurrency, formatDate } from "./utils";
import PropTypes from "prop-types";
import React from "react";
export function formatDate(date) {
  return date;
}

export function formatCurrency(amount) {
  return amount;
}
const styles = `
.invoice-box{
  max-width:800px;
  margin:auto;
  padding:30px;
  border:1px solid #eee;
  box-shadow:0 0 10px rgba(0, 0, 0, .15);
  font-size:16px;
  line-height:24px;
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
.invoice-box .voutype{
  text-align:center;
  vertical-align:top;
  font-size:25px;
  line-height:25px;
  color:#333;
}
.invoice-box .bottomline{
  margin-top:80px;
}
.invoice-box .footer {
  border-top:1px solid grey;
  text-align:center;
}

.invoice-box table tr td:nth-child(2){
  text-align:right;
}
.invoice-box table tr td.refno{
  text-align:left;
}
.invoice-box table tr.top table td{
  padding-bottom:20px;
}
.invoice-box table tr.top table td.title{
  font-size:35px;
  line-height:35px;
  color:#333;
}
.invoice-box table tr.information table td{
  padding-bottom:40px;
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
.invoice-box table tr.details td{
  padding-bottom:20px;
}
.invoice-box table tr.item td{
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
  font-size: 14px;
  text-transform: uppercase;
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
@media print {
  .invoice-box {
    box-shadow: none;
    border: 0;
  }
}
`;

export default function PurchaseOrder({ purchaseorder, company, notes }) {
  console.log(JSON.stringify(purchaseorder));
  const { purchase_details } = purchaseorder;

  const totalAmount = purchase_details && purchase_details.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  const POName = "Purchase Order " + purchaseorder.po_no;

  return (
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>
          {company.name} {POName}
        </title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
                <td colSpan="6">
                  {" "}
                  <div className="voutype">{purchaseorder.po_no} </div>
                </td>
              </tr>
              <tr className="top">
                <td colSpan="6">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div>
                            {purchaseorder.vou_no && (
                              <div className="subheading">
                                Purchase Order No # {purchaseorder.po_no}
                              </div>
                            )}
                            {purchaseorder.vou_date && (
                              <div>
                                purchaseorder Date :{purchaseorder.vou_date}
                              </div>
                            )}
                            {purchaseorder.project && (
                              <div>Project :{purchaseorder.project}</div>
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
                              maxHeight: "150px",
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
              <tr className="information">
                <td colSpan="6">
                  <table>
                    <tbody>
                      <tr>
                        <td className="information-column">
                          <div className="subheading">To</div>
                          {/* <EntityInfo entity={customer} /> */}
                        </td>
                        <td className="information-column">
                          <table className="invoice-information">
                            <tbody>
                              <tr>
                                <td className="subheading">
                                  {"invoiceName"} #
                                </td>
                                <td>{"invoice.id"}</td>
                              </tr>
                              {purchaseorder.unit && (
                                <tr>
                                  <td className="subheading">Unit</td>
                                  <td>{purchaseorder.unit}</td>
                                </tr>
                              )}
                              {purchaseorder.supplier && (
                                <tr>
                                  <td className="subheading">Vendor</td>
                                  <td>{formatDate(purchaseorder.supplier)}</td>
                                </tr>
                              )}
                              {purchaseorder.stock && (
                                <tr>
                                  <td className="subheading">Stock</td>
                                  <td>{formatDate(purchaseorder.stock)}</td>
                                </tr>
                              )}
                              {purchaseorder.employee && (
                                <tr>
                                  <td className="subheading">Due</td>
                                  <td>{formatDate(purchaseorder.employee)}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {purchaseorder.description && [
                <tr className="heading" key="heading">
                  <td className="subheading" colSpan="6">
                    Information
                  </td>
                </tr>,
                <tr className="details" key="details">
                  <td colSpan="6"> Abdullah Iqbal {purchaseorder.supplier}</td>
                </tr>,

                <td className="chq_date"> Jf-5555 {purchaseorder.supplier}</td>



              ]}
              <tr className="heading">
                <td className="subheading">Sr.no</td>
                <td className="refno"> Particulars.</td>
                <td> Qty.</td>
                <td className="chq_date"> Cheque No</td>
                <td className="debit">Rate</td>
                <td className="credit">Amount</td>
              </tr>
              {purchase_details && purchase_details.map((item) => (
                <tr className="item" key={item.id}>
                  <td className="subheading">{item.supplier}</td>
                  <td>{item.qty}</td>
                  <td>{item.chq_no}</td>
                  <td>{item.chq_date}</td>

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
            </tbody>
          </table>
          {notes && (
            <div style={{ marginTop: 30 }}>
              <div className="">Remarks: {notes}</div>
            </div>
          )}
          <div className="bottomline">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr className="footer">
                  <td colSpan="2">
                    {" "}
                    <div className="footer">
                      {purchaseorder.vou_type} Prepared By
                    </div>
                  </td>
                  <td colSpan="2">
                    {" "}
                    <div className="footer">
                      {purchaseorder.vou_type} Checked By
                    </div>
                  </td>
                  <td colSpan="2">
                    {" "}
                    <div className="footer">
                      {purchaseorder.vou_type} Signature
                    </div>
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

PurchaseOrder.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  }).isRequired,
  purchaseorder: PropTypes.shape({
    po_no: PropTypes.string,
    purchaes_date: PropTypes.string,
    project: PropTypes.string,
    supplier: PropTypes.string,
    deliver_address: PropTypes.string,
    staus: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    purchase_details: PropTypes.arrayOf(
      PropTypes.shape({
        stock: PropTypes.string.isRequired,
        unit: PropTypes.string,
        qty: PropTypes.string,
        unit_price: PropTypes.string,
        subtotal: PropTypes.number,
      }).isRequired
    ).isRequired,
    name: PropTypes.string,
  }).isRequired,

  lang: PropTypes.string,
  notes: PropTypes.node,
};

PurchaseOrder.defaultProps = {
  lang: "en_US",
  notes: null,
};
