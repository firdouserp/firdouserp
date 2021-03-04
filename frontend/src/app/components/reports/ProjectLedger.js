import { CardContent, CircularProgress, Toolbar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import PrintIcon from "@material-ui/icons/Print";
import {
  endOfYesterday,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import * as React from "react";
import { cloneElement, Component } from "react";
import {
  BulkActionsToolbar,
  Button,
  Datagrid,
  DateInput,
  Error,
  Filter,
  FilterList,
  FilterListItem,
  List,
  ListBase,
  ListToolbar,
  Pagination,
  SearchInput,
  ShowButton,
  TextField,
  useQueryWithStore,
} from "react-admin";
import ReactToPrint from "react-to-print";
import FirdousSelect from "../accounts/FirdousSelect";
export function formatCurrency(amount) {
  return Number.parseFloat(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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

export class PrintProjectLedgerComponent extends Component {
  render() {
    return <ProjectLedegerReport />;
  }
}

export const ProjectLedegerReport = () => {
  const { data, loaded, error } = useQueryWithStore({
    type: "getList",
    resource: "reports/projectledger",
    payload: {
      pagination: { page: 1, perPage: 500 },
      sort: { field: "coa_code", order: "ASC" },
      filter: { project: 1 },
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

  return projectledger(data);
};
const projectledger = (records) => {
  console.log("records:" + JSON.stringify(records));
  let sum_debit = 0.0;
  let sum_credit = 0.0;
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
                        <td className="account">{record.COA_TITLE}</td>
                        <td className="debit">
                          {formatCurrency(record.debit)}
                        </td>
                        <td className="credit">
                          {formatCurrency(record.credit)}
                        </td>
                        <td className="balance">
                          {formatCurrency(record.balance)}
                        </td>
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

const ProjectLedgerPrintable = () => {
  const componentRef = React.useRef();

  return (
    <div>
      <Toolbar style={{ justifyContent: "spance-between" }}>
        <h1 style={{ paddingRight: "15px" }}> Project Ledger</h1>

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
        <PrintProjectLedgerComponent ref={componentRef} />
      </div>
    </div>
  );
};

const PostList = (props) => (
  <MyList {...props}>
    <Datagrid>...</Datagrid>
  </MyList>
);

const MyList = ({ children, ...props }) => (
  <ListBase {...props}>
    <h1>{props.title}</h1>
    <ListToolbar filters={props.filters} actions={props.actions} />
    <Card>
      <BulkActionsToolbar>{props.bulkActionButtons}</BulkActionsToolbar>
      {cloneElement(children, {
        hasBulkActions: props.bulkActionButtons !== false,
      })}
      <Pagination />
    </Card>
  </ListBase>
);

const ProjectLedgerSearchFilter = (props) => (
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

const LastVisitedFilter = () => (
  <FilterList label="Filter By Voucher Date">
    <FilterListItem
      label="Today"
      value={{
        vou_date_from: endOfYesterday().toISOString(),
        vou_date_to: undefined,
      }}
    />
    <FilterListItem
      label="This week"
      value={{
        vou_date_from: startOfWeek(new Date()).toISOString(),
        vou_date_to: undefined,
      }}
    />
    <FilterListItem
      label="Last week"
      value={{
        vou_date_from: subWeeks(startOfWeek(new Date()), 1).toISOString(),
        vou_date_to: startOfWeek(new Date()).toISOString(),
      }}
    />
    <FilterListItem
      label="This month"
      value={{
        vou_date_from: startOfMonth(new Date()).toISOString(),
        vou_date_to: undefined,
      }}
    />
    <FilterListItem
      label="Last month"
      value={{
        vou_date_from: subMonths(startOfMonth(new Date()), 1).toISOString(),
        vou_date_to: startOfMonth(new Date()).toISOString(),
      }}
    />
    <FilterListItem
      label="Earlier"
      value={{
        vou_date_from: undefined,
        vou_date_to: subMonths(startOfMonth(new Date()), 1).toISOString(),
      }}
    />
  </FilterList>
);
const FilterSidebar = () => (
  <Card>
    <CardContent>
      <LastVisitedFilter />
    </CardContent>
  </Card>
);
export const ProjectLedgerList = (props) => (
  <List
    aside={<FilterSidebar />}
    filters={<ProjectLedgerSearchFilter />}
    {...props}
  >
    {
      <Datagrid rowClick="edit">
        <TextField source="COA_TITLE" te="Account" />
        <TextField source="COA_Obal" title="Opening Bal" />
        <TextField source="debit" />
        <TextField source="credit" />
        <TextField source="balance" />
        <TextField source="active" />
        <ShowButton variant="contained" color="secondary" />
        {/* <DeleteButton /> */}
      </Datagrid>
    }
  </List>
);

export default ProjectLedgerPrintable;
