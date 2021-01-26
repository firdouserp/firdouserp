import { Chip, makeStyles, useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import StoreIcon from "@material-ui/icons/Store";
import * as React from "react";
import {
  Create,
  Datagrid,
  DateInput,
  Edit,
  EditButton,
  Filter,
  List,
  ListButton,
  Pagination,
  SearchInput,
  SelectInput,
  SimpleList,
  TextField,
  TopToolbar,
} from "react-admin";
import { useLocation } from "react-router";
import FirdousSelect from "./FirdousSelect";
import { VoucherEntryForm } from "./VoucherEntry3";
import VoucherShow from "./VoucherShow";
export const useQuery = (queryParam) => {
  const search = new URLSearchParams(useLocation().search);
  return search.get(queryParam);
};

export const VouchersIcon = StoreIcon;

export const VouchersActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const vou_types = [
  { id: 1, title: "Journal Voucher" },
  { id: 2, title: "Payment Voucher" },
  { id: 3, title: "Reciept Voucher" },
  { id: 4, title: "Sales Voucher" },
  { id: 5, title: "Salary Voucher" },
  { id: 6, title: "Inventory Voucher" },
];

const useQuickFilterStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: theme.spacing(1),
  },
}));
const QuickFilter = ({ label }) => {
  const classes = useQuickFilterStyles();
  return <Chip className={classes.chip} label={label} />;
};

const VouchersSearchFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      variant="standard"
      placeholder="Voucher-No"
      source="vou_no"
      alwaysOn
    />

    <DateInput
      variant="standard"
      placeholder="Voucher Date"
      source="vou_date"
      resettable
      alwaysOn
    />
    <SearchInput
      variant="standard"
      placeholder="Chq-No"
      source="chq_no"
      alwaysOn
    />
    <FirdousSelect
      variant="standard"
      label="Project"
      source="project"
      optionText="title"
      list="projects"
      sort="title"
      resettable
      alwaysOn
    />
    <FirdousSelect
      variant="standard"
      label="Vendor"
      source="supplier"
      optionText="title"
      list="suppliers"
      sort="title"
      resettable
    />
    <FirdousSelect
      variant="standard"
      label="Units"
      source="unit"
      optionText="title"
      list="units"
      sort="title"
      resettable
    />
    <FirdousSelect
      variant="standard"
      label="Stocks"
      source="stock"
      optionText="title"
      list="stock"
      sort="title"
      resettable
    />
    <FirdousSelect
      variant="standard"
      label="Employees"
      source="employee"
      optionText="title"
      list="employees"
      sort="title"
      resettable
    />
    <SelectInput
      variant="standard"
      margin="none"
      label="Voucher Type"
      source="vou_type"
      optionText="title"
      optionValue="id"
      choices={vou_types}
      fullWidth
    />
  </Filter>
);
const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

const TransactionList = ({ id, record, resource }) => {
  console.log(JSON.stringify(record));
  return (
    <table width="100%" cellPadding="0" cellSpacing="0">
      <tr>
        <th>Account</th>
        <th>Description</th>
        <th>Debit</th>
        <th>Credit</th>
      </tr>
      <tbody>
        {record.transactions.map((t) => {
          return (
            <tr className="top">
              <td width="20%">{t.coa}</td>
              <td width="40%">{t.description}</td>
              <td width="20%">{t.dr}</td>
              <td width="20%">{t.cr}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    // <div><span>{t.coa}</span><span>{t.description}</span> <span>{t.dr}</span> <span>{t.cr}</span></div>
  );
};
export const VouchersList = (props) => (
  <List
    sort={{ field: "row_id", order: "DESC" }}
    perPage={25}
    pagination={<PostPagination />}
    empty={false}
    filters={<VouchersSearchFilter />}
    {...props}
    undoable={false}
  >
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
      <Datagrid rowClick="edit" expand={<TransactionList />}>
        <TextField source="row_id" />
        <TextField source="vou_no" />
        <TextField source="vou_date" />
        {/* <ReferenceField label="Project" source="project" reference="Projects">
          <TextField source="title" />
        </ReferenceField> */}
        <TextField source="chq_no" />
        <TextField source="chq_date" />
        <TextField source="created_by" />
        {/* <EditButton
          label=""
          undoable={false}
          // variant="contained"
          color="secondary"
        /> */}
        {/* <DeleteButton /> */}
      </Datagrid>
    )}
  </List>
);

export const InvalidVouchersList = (props) => (
  <List
    sort={{ field: "row_id", order: "DESC" }}
    perPage={25}
    pagination={<PostPagination />}
    empty={false}
    basePath="/vouchers"
    resource="vouchers/invalidvou"
    filters={<VouchersSearchFilter />}
    {...props}
  >
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
      <Datagrid rowClick="edit">
        <TextField source="row_id" />
        <TextField source="vou_no" />
        <TextField source="vou_date" />
        {/* <ReferenceField label="Project" source="project" reference="Projects">
          <TextField source="title" />
        </ReferenceField> */}
        <TextField source="debit" />
        <TextField source="credit" />
        <EditButton variant="standard" color="secondary" />
        {/* <DeleteButton /> */}
      </Datagrid>
    )}
  </List>
);

const VouchersTitle = ({ record }) => {
  return <span>Voucher {record ? `"${record.vou_no}"` : ""}</span>;
};
export const VouchersEdit = (props) => {
  return (
    <Edit undoable={false} actions={null} title={<VouchersTitle />} {...props}>
      <VoucherEntryForm {...props} />
    </Edit>
  );
};

export const VouchersCreate = (props) => {
  const vou_type = useQuery("vou_type");
  return (
    <Create undoable={false} title="New Voucher" {...props}>
      <VoucherEntryForm vou_type={vou_type} {...props} />
    </Create>
  );
};

export const VouchersShow = (props) => {
  return <VoucherShow {...props} />;
};

const dateFormatter = (v) => {
  // v is a `Date` object
  if (!(v instanceof Date) || isNaN(v)) return;
  const pad = "00";
  const yy = v.getFullYear().toString();
  const mm = (v.getMonth() + 1).toString();
  const dd = v.getDate().toString();
  return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateParser = (v) => {
  // v is a string of "YYYY-MM-DD" format
  const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (match === null) return;
  const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
  if (isNaN(d)) return;
  return d;
};
