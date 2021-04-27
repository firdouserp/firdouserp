import * as React from "react";
import {
  DateInput,
  Filter,
  List,
  SearchInput,
  useListContext,
} from "react-admin";
import FirdousSelect from "../accounts/FirdousSelect";

export function formatCurrency(amount) {
  return !amount
    ? "0.00"
    : Number.parseFloat(amount)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const TrialBalanceSearchFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      variant="standard"
      placeholder="Account"
      source="coa_title"
      alwaysOn
    />

    <FirdousSelect
      variant="standard"
      label="Projects"
      source="project"
      optionText="title"
      list="projects"
      sort="title"
      alwaysOn
    />
    {/*     <ReferenceArrayInput reference="coa" source="coa" alwaysOn>
        <SelectArrayInput optionText="title">
          <ChipField source="coa" optionText="title" />
        </SelectArrayInput>
      </ReferenceArrayInput> */}

    <DateInput
      variant="standard"
      placeholder="Voucher Date"
      source="vou_date_from"
      resettable
      alwaysOn
    />
    <DateInput
      variant="standard"
      placeholder="Voucher Date"
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
.accountcode{
  width: 50px;
}
th.account, th.accountcode {
  border-bottom: 1px solid #ccc;
  font-size: 10pt;
  background: #e0e0e3;
  height: 25px;
  text-transform:uppercase;
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
      <body>
        <div className="container-main">
          <table width="100%">
            <thead>
              <th className="account">Account</th>
              <th className="accountcode">Account No.</th>
              <th className="account">Account Title</th>
              <th className="account">Opening Bal (DR)</th>
              <th className="account">Opening Bal (CR)</th>
              <th className="account">Current Period (DR)</th>
              <th className="account">Current Period (CR)</th>
              <th className="account">Closing (DR)</th>
              <th className="account">Closing (CR)</th>
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
                              <td className="account_l">{account.coa_title}</td>
                              <td className="account_r">
                                {formatCurrency(account.period_less_dr)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.period_less_cr)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.p_dr)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.p_dr)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.p_dr)}
                              </td>
                              <td className="account_r">
                                {formatCurrency(account.p_cr)}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td />
                          <td />
                          <td className="grouptotal">Group Totals</td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td className="grouptotal">
                            {formatCurrency(subhead.total_p_dr)}
                          </td>
                          <td className="grouptotal">
                            {formatCurrency(subhead.total_p_cr)}
                          </td>
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
