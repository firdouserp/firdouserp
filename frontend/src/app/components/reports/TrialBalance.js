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
  return Number.parseFloat(amount)
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
  border-bottom:1px solid #ccc;
  padding-top : 1em;
}
.topheads{
  
}
.MuiToolbar-root{
  
}
`;
const CommentGrid = () => {
  const { ids, data, basePath } = useListContext();
  const types = [];
  const heads = [];
  const grouping = {};
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
              <th>Account</th>
              <th>Account No</th>
              <th>Account Title</th>
              <th>Opening Balance</th>
              <th>Activity during Period</th>
              <th>Closing Balance</th>
            </thead>

            {ids.map((id) => {
              var record = data[id];
              var closingdr;
              return (
                (types.indexOf(record.ct_id) === -1 &&
                  types.push(record.ct_id) && (
                    <tr>
                      <td colspan="7" className="types">
                        <span className="ct-title">{record.ct_title}</span>
                      </td>
                    </tr>
                  )) || (
                  <tr className="topheads">
                    <td className="headtitle">
                      {heads.indexOf(record.n_id) === -1 &&
                        heads.push(record.n_id) && (
                          <span>{record.n_title}</span>
                        )}
                    </td>
                    <td className="subheads">{record.coa_code}</td>
                    <td className="subheads">{record.coa_title}</td>
                    <td className="subheads">{record.period_less_dr}</td>
                    <td className="subheads">{record.period_less_cr}</td>
                    <td className="subheads">{record.p_dr}</td>
                    <td className="subheads">{record.p_cr}</td>
                    <td className="subheads">
                      {formatCurrency((closingdr = closingdr + record.p_cr))}
                    </td>
                  </tr>
                )
              );

              // return RenderElements(data[id], types, heads);
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
