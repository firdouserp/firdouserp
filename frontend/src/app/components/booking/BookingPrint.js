//import { formatCurrency, formatDate } from "./utils";
import PropTypes from 'prop-types';
import React from "react";
export function formatDate(date) {
  return date
}

export function formatCurrency(amount) {
  return amount
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
`

export default function Booking({ booking, company, notes }) {
  const { transactions } = booking;

  const bookingName = booking.book_type || "Booking";

  return (
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>
          {company.name} {bookingName}
        </title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
              <td colSpan="8" > <div className="book_type">{booking.book_type} <b>Firdous Residency</b></div></td>
              </tr>
              <tr className="top">
                <td colSpan="6" >
                  <table>
                    <tbody>
                      <tr>
                      

                        <td>

                          <div>
                          { <div>Booking  </div>}
                            {booking.book_no && <div className="subheading">Booking No # {booking.book_no}</div>}
                            {booking.book_date && <div>Booking Date :{booking.book_date}</div>}
                            {booking.project && <div>Project {booking.project}</div>}

                          </div>
                        </td>
                        <td colSpan="1"> <div className="book_type">{booking.book_type} <b>  Al-   </b> <b>Makkah</b> <b>Associates</b></div></td>
                        <td className="title">
                          <img
                            src={company.logoUrl}
                            style={{
                              display: "block",
                              width: "auto",
                              height: "auto",
                              maxWidth: "200px",
                              maxHeight: "100px",
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
                          <td className="subheading"></td>
                                  <td>{(booking.name)}</td>
                                  <div>
                                  <td>
                                  <td>{(booking.phone_no)}</td>
                                  </td>
                                  </div>
                                  <div>
                                  <td>
                                  <td>{(booking.cnic)}</td>
                                  </td>
                                  </div>
                                  <div>
                                  <td>
                                  <td>{(booking.residential_address)}</td>
                                  </td>
                                  </div>
                                 

                                  
                        </td>
                        
                        
                        <td className="information-column">
                          <table className="invoice-information">
                            <tbody>
                              <tr>
                                <td className="subheading">{"invoiceName"} #</td>
                                <td>{"invoice.id"}</td>
                              </tr>
                              {booking.sale_price && (
                                <tr>
                                  <td className="subheading">Sale Price</td>
                                  <td>{booking.sale_price}</td>
                                </tr>
                              )}
                              {booking.discount && (
                                <tr>
                                  <td className="subheading">Discount</td>
                                  <td>{(booking.discount)}</td>
                                </tr>
                              )}
                              {booking.phone_no && (
                                <tr>
                                  <td className="subheading">Phone Number:</td>
                                  <td>{(booking.phone_no)}</td>
                                </tr>
                              )}
                              {booking.cnic && (
                                <tr>
                                  <td className="subheading">Due</td>
                                  <td>{booking.cnic}</td>
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
           
            {booking.remarks && [
    
                  <td className="subheading" colSpan="6">
                    Description
                  </td>,
               
                <tr className="details" key="details">
                  <td colSpan="6">{booking.remarks}</td>
                </tr>,
              ]} 
              
              
              <tr className="total">
                <td />

                <td colSpan={"5"}>
                  <table>
                    <tbody>
                      <tr>
                      
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {booking.description && [
                <tr className="heading" key="heading">
                  <td className="subheading" colSpan="6">
                    Installment
                  </td>
                </tr>,
                <tr className="details" key="details">
                  <td colSpan="6">{booking.description}</td>
                </tr>,
              ]} 
              <tr className="heading">
                <td className="subheading">Sr.no</td>
                <td className="name"> unit type.</td>
                <td> Booking amount.</td>
                <td> Installment paid</td>
                <td className="phone_no">Installment due</td>
                <td className="occupation">Amount remaining</td>

              </tr>
              {}  <tr className="item" key={booking.description}>
                  <td className="subheading"  >{booking.cnic}</td>
                  <td>{booking.name}</td>
                  <td>{booking.father_name}</td>
                  <td>{booking.residential_address}</td>

                  <td className="Phone Number">{(booking.phone_no)}</td>
                  <td className="occupation">{(booking.occupation)}</td>
                </tr>
              
              <tr className="total">
                <td />

                <td colSpan={"5"}>
                  <table>
                    <tbody>
                      <tr>
                      
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
                  <td colSpan="2" > <div className="footer">{booking.book_type} Prepared By</div></td>
                  <td colSpan="2" > <div className="footer">{booking.book_type} Checked By</div></td>
                  <td colSpan="2" > <div className="footer">{booking.book_type} Senctioned By</div></td>
                  <td colSpan="2" > <div className="footer">{booking.book_type} Signature By</div></td>
                 
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </body>
    </html >
  );
}

Booking.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  }).isRequired,
  booking: PropTypes.shape({
    book_no: PropTypes.string,
    book_date: PropTypes.string,
    book_type: PropTypes.string,
    project: PropTypes.string,
    sale_price: PropTypes.string,
    discount: PropTypes.string,
    father_name: PropTypes.string,
    client: PropTypes.string,
    phone_no: PropTypes.string,
    occupation: PropTypes.string,
    reference_off: PropTypes.string,
    nationality: PropTypes.string,
    nominee_name: PropTypes.string,
    relation: PropTypes.string,
    residential_address: PropTypes.string,
    cnic: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    remarks: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,

  lang: PropTypes.string,
  notes: PropTypes.node,
};

Booking.defaultProps = {
  lang: "en_US",
  notes: null,
};
