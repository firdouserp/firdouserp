import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Error, useQueryWithStore } from "react-admin";
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
.heading{
    text-align:center;
    font-weight:bold;
    font-size: "120%";
}
.debit, .credit{
    width: 100px;
    padding: 10px;
}
`;

export const AccountBalanceReport = () => {
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

  return accountbalances(data);
};
const accountbalances = (records) => {
  console.log("records:" + JSON.stringify(records));
  return (
    <div>
      {records.map((record) => {
        console.log("record:" + JSON.stringify(record));
        if (record.id) {
          return (
            <html lang={"en_US"}>
              <head>
                <meta charSet="utf-8" />
                <title>{/* {company.name} {POName} */}</title>
                <style dangerouslySetInnerHTML={{ __html: styles }} />
                <meta name="robots" content="noindex, nofollow" />
              </head>
              <body>
                <div width="100%"></div>
                <div className="invoice-box">
                  <table width="100%" cellPadding="0" cellSpacing="0">
            
                    <thead>
                      <td>Account Name</td>
                      <td className="debit">Debit</td>
                      <td className="credit">Credit</td>
                    </thead>
                    <tbody>
                    
                      <tr>
                        <td className="account">{record.title}</td>

                        <td className="debit">{record.debit}</td>
                        <td className="credit">{record.credit}</td>
                      </tr>
                      {/* {record.accounts.map((account) => (
                      <div>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr className="account">
                              <td className="subheading">
                                {account.code + " - " + account.title}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="debit">
                                {formatCurrency(account.debit)}
                              </td>
                              <td className="credit">
                                {formatCurrency(account.credit)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))} */}
                      <tr className="detail"></tr>
                    </tbody>
                  </table>
                </div>
              </body>
            </html>
          );
        }
      })}
    </div>
  );
  //   return records.map((record) => {
  //     if (record.id) {
  //       <html lang={"en_US"}>
  //         <head>
  //           <meta charSet="utf-8" />
  //           <title>{/* {company.name} {POName} */}</title>
  //           <style dangerouslySetInnerHTML={{ __html: styles }} />
  //           <meta name="robots" content="noindex, nofollow" />
  //         </head>
  //         <body>
  //           <div width="100%"></div>
  //           <div className="Account Balances">
  //             <table cellPadding="0" cellSpacing="0">
  //               <tbody>
  //                 <tr className="top">
  //                   <td colSpan="6"> Account Balances</td>
  //                 </tr>
  //                 {/* {record.accounts.map((account) => (
  //                     <div>
  //                       <table cellPadding="0" cellSpacing="0">
  //                         <tbody>
  //                           <tr className="account">
  //                             <td className="subheading">
  //                               {account.code + " - " + account.title}
  //                             </td>
  //                             <td></td>
  //                             <td></td>
  //                             <td></td>
  //                             <td className="debit">
  //                               {formatCurrency(account.debit)}
  //                             </td>
  //                             <td className="credit">
  //                               {formatCurrency(account.credit)}
  //                             </td>
  //                           </tr>
  //                         </tbody>
  //                       </table>
  //                     </div>
  //                   ))} */}
  //                 <tr className="detail"></tr>
  //               </tbody>
  //             </table>
  //           </div>
  //         </body>
  //       </html>;
  //     }
  //   });
};

export default AccountBalanceReport;
