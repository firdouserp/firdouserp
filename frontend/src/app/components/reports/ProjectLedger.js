import {
  CardContent,
  CircularProgress,
  Toolbar,
  Typography
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import PrintIcon from "@material-ui/icons/Print";
import {
  endOfYesterday,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks
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
  TextField,
  useListContext,
  useQueryWithStore
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
.balance{
  border-right: 1px solid #ddd;
}
.debit, .credit, .balance{
    width: 150px;
    padding: 10px;
    text-align:right;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
}
thead td,.totals{
    font-weight:bold;
    text-align: left;
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: 1px solid #ddd;
    
}
.report-title{
  text-align:center;
}

td .footer{
  visibility : hidden;
}
.account{
  font-weight:bold;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  border-left: 1px solid #ddd;
}
.vou_date{
  min-width:100px;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  text-align:center;
}
.vou_no{
  min-width:120px;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
  border-left: 1px solid #ddd;
}
.vou_no a{
  text-decoration: none;
}
.description{
  border-bottom: 1px solid #ddd;
  min-width:400px;
  border-left: 1px solid #ddd;
  text-align:left;
  padding:5px;
  font-size:80%;
}
.obal{
  font-size:90%;
  float:right;
}
@media print {
  body{font-family: 'Helvetica', 'Arial', sans-serif;}
  
  @page{
    size: A4;
    margin:2em;
    padding:0;
    width:100%;
    
  }
  @page:right{
    @bottom-right {
      content: counter(page);
    }
  }
  
  @page:left{
    @bottom-left {
      content: counter(page);
    }
  }
  .invoice-box{
    box-shadow: none;
    border: 0;
    page-break-before: always;

    @bottom-left {
      content: counter(page);
    }
    @bottom-right {
      content: counter(page);
    }
   
  }
  h1{
    font-size:10pt;
  }
  thead td{
    font-weight:bold;
    text-align: left;
    background-color: transparent;
    color: #000;
    padding: 5px;
}
  .heading-title{
    font-weight:bold;
    font-size:9pt;
}
.footer{
  visibility:visible;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size:8pt;
  content: counter(page) ' of ' counter(pages);
}
}
@page {
  size: auto;
  margin-top: 10mm;
  margin-bottom: 10mm;
  font-size:5pt;
  @bottom-left {
    content: counter(page) ' of ' counter(pages);
  }
}
`;

export class PrintProjectLedgerComponent extends Component {
  render() {
    const { id } = this.props;
    return <ProjectLedegerReport coa={id} />;
  }
}

export const ProjectLedegerReport = (props) => {
  const { data, loaded, error } = useQueryWithStore({
    type: "getList",
    resource: "reports/projectledger/" + props.coa,
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
const user = JSON.parse(localStorage.getItem("jwtToken"));
const projectledger = (records) => {
  console.log("records:" + JSON.stringify(records));
  let sum_debit = 0.0;
  let sum_credit = 0.0;
  let sum_obal = parseFloat(records[0] && records[0].coa_obal || 0);
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
            <div>
              <h2 className="report-title">
                Accoutnt Ledger  FGS INFINITY ONE

              </h2>
            </div>
            <div class="heading-title">
              <h2 style={{ margin: "15px" }}>
                {records[0] && records[0].COA_Code + "-" + records[0].COA_TITLE}{" "}
                <span class="obal">Opening Balance : {formatCurrency(records[0].coa_obal)}</span>
              </h2>
            </div>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <thead>
                <td>Voucher #</td>
                <td className="vou_date">Vou Date</td>
                <td className="description">Description</td>
                <td className="debit">Debit</td>
                <td className="credit">Credit</td>
                <td className="balance">Balance</td>
              </thead>
              <tbody>
                {records.map((record) => {
                  sum_debit = sum_debit + parseFloat(record.DR || 0);
                  sum_credit = sum_credit + parseFloat(record.CR || 0);
                  sum_obal = sum_obal + parseFloat(record.DR || 0) - parseFloat(record.CR || 0);
                  if (record.id) {
                    return (
                      <tr>
                        <td className="vou_no">
                          <a href={"/#/transactions/" + record.Vou_No}>
                            {record.Vou_No}
                          </a>
                        </td>
                        <td className="vou_date">
                          {new Date(record.Vou_Date)
                            .toISOString()
                            .substring(0, 10)}
                        </td>
                        <td className="description">{record.Description}</td>
                        <td className="debit">{formatCurrency(record.DR)}</td>
                        <td className="credit">{formatCurrency(record.CR)}</td>
                        <td className="balance">
                          {formatCurrency(
                            sum_obal 
                          )}
                        </td>
                        {/* <td className="balance">
                          {formatCurrency(record.balance)}
                        </td> */}
                      </tr>
                    );
                  }
                })}
                <tr class="totals">
                  <td />
                  <td />
                  <td className="totals">Totals</td>
                  <td className="totals">{formatCurrency(sum_debit)}</td>
                  <td className="totals">{formatCurrency(sum_credit)}</td>
                  <td className="totals">{formatCurrency(sum_obal)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  
                  <td colspan="6" className="footer">Printed By {user && user.username} on {new Date().toISOString()}</td>

                </tr>
              </tfoot>
            </table>
          </div>
        </body>
      </html>
    </div>
  );
};

const ProjectLedgerPrintable = (props) => {
  const componentRef = React.useRef();

  return (
    <div>
      <Toolbar style={{ justifyContent: "spance-between" }}>
        <h1 style={{ paddingRight: "15px" }}> Account Ledger</h1>

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
        <PrintProjectLedgerComponent {...props} ref={componentRef} />
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

const Totals = () => {
  const { data, ids } = useListContext();
  return (
    <div style={{ textAlign: "right", width: "99%", margin: "0.5em" }}>
      <Typography variant="h6">
        <span style={{ textAlign: "right", width: "90%", margin: "1em" }}>
          Total Debit: Rs.{" "}
          {formatCurrency(
            ids
              .map((id) => data[id])
              .reduce((sum, rec) => sum + parseFloat(rec.debit || 0), 0)
          )}
        </span>
        Total Credit: Rs.
        {formatCurrency(
          ids
            .map((id) => data[id])
            .reduce((sum, rec) => sum + parseFloat(rec.credit || 0), 0)
        )}
      </Typography>
    </div>
  );
};
const FilterSidebar = () => (
  <Card>
    <CardContent>
      <LastVisitedFilter />
    </CardContent>
  </Card>
);
const ProjectLedgerPagination = (props) => (
  <div>
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
    <Totals />
  </div>
);
export const ProjectLedgerList = (props) => (
  <List
    aside={<FilterSidebar />}
    perPage={100}
    pagination={<ProjectLedgerPagination />}
    filters={<ProjectLedgerSearchFilter />}
    {...props}
  >
    {
      <Datagrid rowClick="edit">
        <TextField source="COA_TITLE" te="Account" />
        <TextField source="coa_obal" title="Opening Bal" />
        <TextField source="debit" />
        <TextField source="credit" />
        <TextField source="balance" />
        <TextField source="vou_count" />
        {/* <ShowButton variant="contained" color="secondary" /> */}
        {/* <DeleteButton /> */}
        <TextField source="active" />
      </Datagrid>
    }
  </List>
);
export const ProjectLedgerDetail = (props) => (
  <ProjectLedgerPrintable {...props}></ProjectLedgerPrintable>
);
export default ProjectLedgerPrintable;
