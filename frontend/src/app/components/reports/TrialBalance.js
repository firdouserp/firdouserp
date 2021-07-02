import * as React from "react";
import { DateInput, Filter, List, useListContext } from "react-admin";

export function formatCurrency(amount) {
  return !amount
    ? "0.00"
    : Number.parseFloat(amount)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const TrialBalanceSearchFilter = (props) => (
  <Filter {...props}>
    {/* <SearchInput
      variant="standard"
      placeholder="Account"
      source="coa_title"
      alwaysOn
    /> */}

    {/* <FirdousSelect
      variant="standard"
      label="Projects"
      source="project"
      optionText="title"
      list="projects"
      sort="title"
      alwaysOn
    /> */}
    {/*     <ReferenceArrayInput reference="coa" source="coa" alwaysOn>
        <SelectArrayInput optionText="title">
          <ChipField source="coa" optionText="title" />
        </SelectArrayInput>
      </ReferenceArrayInput> */}

    <DateInput
      variant="standard"
      label="Period from"
      source="vou_date_from"
      resettable
      alwaysOn
    />
    <DateInput
      variant="standard"
      label="Period To"
      source="vou_date_to"
      resettable
      alwaysOn
    />
  </Filter>
);

const styles = `

h1{
  font-size:14pt !important;
}
.container-main{
  font-family: Helvetica, Sans-Serif;
  font-size:9pt;
  margin:0.5em;
}
.types{

  border-bottom:1px solid #ccc;
  padding: 1em;
}
.headtitle{
  font-weight:bold;
  width: 250px;
  
  padding-left:2em;
  padding-top:1em;
  border-bottom:0px solid #ccc;
  
}
.ct-title{
  font-size:14pt !important;
}

.subheads{
  font-size:12pt !important;
  border-bottom:1px solid #ccc;
  padding-top : 1em;
  font-weight:bold;
}
.subheads{
  border:none !important;
  border-bottom:1px solid #ccc !important;
}
.topheads{
  
}
.MuiToolbar-root{
  
}
.account{
  width: 100px;
}
.account_r{
  width: 100px;
  text-align:right;
}
.account_l{
  width: 100px;
  text-align:left;
}
.accounttitle{
  width : 200px;
  text-align:left;
}
.accountcode{
  width: 65px;
}
.twocolumn{
  width:200px;
}
th.account, th.accountcode,th.accounttitle,th.twocolumn {
  border-bottom: 1px solid #ccc;
  font-size: 10pt;
  background: #e0e0e3;
  height: 25px;
  text-transform: uppercase;
  padding-left: 2px;
  border: 1px solid #00000014;
  border-right: none;
}

.grouptotal{
  font-size:10pt;
  font-weight:bold;
  --border-bottom:1px solid #ccc;
  padding-top : 1em;
  text-align:right;
}
.periodlist td{
  border-left:1px solid #ccc;
  border-bottom:1px solid #ccc;
}
.t-center{
  text-align:center;
}
.width100{
  width:100px;
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
  body * {
    visibility: hidden;
  }
  #section-to-print, #section-to-print * {
    font-family: sans-serif;
    visibility: visible;
    font-size:6pt;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 10px;
    padding:0;
    padding-top:10px;
    margin-top:10px;
   
  }
  th.account, th.accountcode,th.accounttitle,th.twocolumn,td {
        border-right: 1px solid #00000014;
  }
  .subheads{
    font-size:8pt !important;
  }
h1{
  font-size:8pt !important;
}
}
`;

const CommentGrid = () => {
  const { ids, data, basePath } = useListContext();
  const types = [];
  const heads = [];
  const groupSubHeads = {};
  const groupTypes = {};

  ids.map((id) => {
    var record = data[id];

    groupTypes[record.ct_id] = { name: record.ct_title };
    groupSubHeads[record.n_id] = {
      head: record.ct_id,
      headtitle: record.ct_title,
      id: record.n_id,
      name: record.n_title,
    };
  });

  ids.map((id) => {
    var record = data[id];
    const subheads = groupSubHeads[record.n_id];
    subheads.children = [...(subheads.children || []), record];
  });

  // Object.keys(groupSubHeads).map((key,index)=>{
  //   console.log(key);
  //   const subhead = groupSubHeads[key];
  //   subhead.total_p_dr = subhead.children.reduce((debit_pr, item) => debit_pr + item.p_dr, 0);
  //   subhead.total_p_cr = subhead.children.reduce((credit_pr, item) => credit_pr + item.p_dr, 0);
  // });

  for (var index in groupSubHeads) {
    const subhead = groupSubHeads[index];
    let { children } = subhead;
    subhead.total_p_dr = children.reduce(
      (sum, item) => sum + ((item.p_dr && parseFloat(item.p_dr)) || 0),
      0
    );
    subhead.total_p_cr = children.reduce(
      (sum, item) => sum + ((item.p_cr && parseFloat(item.p_cr)) || 0),
      0
    );
    subhead.total_pl_dr = children.reduce(
      (sum, item) =>
        sum + ((item.open_balance >= 0 && parseFloat(item.open_balance)) || 0),
      0
    );
    subhead.total_pl_cr = children.reduce(
      (sum, item) =>
        sum + ((item.open_balance < 0 && parseFloat(item.open_balance)) || 0),
      0
    );

    subhead.total_closing_dr = children.reduce(
      (sum, item) =>
        sum + ((item.close_balance >= 0 && parseFloat(item.close_balance)) || 0),
      0
    );

    subhead.total_closing_cr = children.reduce(
      (sum, item) =>
        sum + ((item.close_balance < 0 && parseFloat(item.close_balance)) || 0),
      0
    );

    const head = groupTypes[subhead.head];
    console.log(head);
    head.children = [...(head.children || []), subhead];
  }
  console.log("grouptyes:");
  console.log(groupTypes);
  let { records } = groupSubHeads;
  return (
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>Trial Balance</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body id="section-to-print">
        <div  className="container-main">
          <table cellspacing="0" width="100%">
            <thead>
              <th className="account">Account</th>
              <th className="accountcode">Account No.</th>
              <th className="accounttitle">Account Title</th>
              <th colspan="2" className="twocolumn">
                Opening Balance
              </th>

              <th colspan="2" className="twocolumn">
                Current Period{" "}
              </th>

              <th colspan="2" className="twocolumn">
                Closing{" "}
              </th>
            </thead>
            <thead>
              <th width="100px"></th>
              <th width="65px"></th>
              <th width="200px"></th>
              <th className="width100">Debit</th>
              <th className="width100">Credit</th>
              <th className="width100">Debit</th>
              <th className="width100">Credit</th>
              <th className="width100">Debit</th>
              <th className="width100">Credit</th>
            </thead>

            {Object.keys(groupTypes).map((key, index) => {
              const head = groupTypes[key];
              return head.children.map((subhead) => {
                return (
                  <tr>
                    <td colspan="9">
                      <table className="periodlist" width="100%">
                        <tr>
                          <td className="subheads" colspan="9">
                            {subhead.name}
                          </td>
                        </tr>
                        {subhead.children.map((account) => {
                          return (
                            <tr>
                              <td className="account" />
                              <td className="accountcode">
                                {account.coa_code}
                              </td>
                              <td className="accounttitle">
                                {account.coa_title}
                              </td>

                              <td className="account_r">
                                {account.open_balance >= 0 &&
                                  formatCurrency(account.open_balance)}
                              </td>
                              <td className="account_r">
                                {account.open_balance < 0 &&
                                  formatCurrency(account.open_balance)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.p_dr)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.p_cr)}
                              </td>
                              <td className="account_r">
                                {account.close_balance >= 0 &&
                                  formatCurrency(account.close_balance)}
                              </td>
                              <td className="account_r">
                                {account.close_balance < 0 &&
                                  formatCurrency(account.close_balance)}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td />
                          <td />
                          <td className="grouptotal">Group Totals</td>

                          <td className="grouptotal">
                            {formatCurrency(subhead.total_pl_dr)}
                          </td>

                          <td className="grouptotal">
                            {formatCurrency(subhead.total_pl_cr)}
                          </td>
                          <td className="grouptotal">
                            {formatCurrency(subhead.total_p_dr)}
                          </td>
                          <td className="grouptotal">
                            {formatCurrency(subhead.total_p_cr)}
                          </td>
                          <td className="grouptotal">{formatCurrency(subhead.total_closing_dr)}</td>
                          <td className="grouptotal">{formatCurrency(subhead.total_closing_cr)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                );
              });
            })}
          </table>
        </div>
      </body>
    </html>
  );
};

export const TrialBalanceList = (props) => (
  <List pagination={false} {...props} filters={<TrialBalanceSearchFilter />}>
    {<CommentGrid />}
  </List>
);

export default TrialBalanceList;
