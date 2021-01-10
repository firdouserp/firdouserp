import { useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import StoreIcon from "@material-ui/icons/Store";
import * as React from "react";
import {
  Create,
  Datagrid,

  DateInput,

  DeleteButton,



  Edit,



  EditButton,
  Filter,
  List,
  ListButton,
  Pagination,

  SearchInput,



  SimpleList,
  TextField,

  TopToolbar
} from "react-admin";
import { useLocation } from "react-router";
import FirdousSelect from "./accounts/FirdousSelect";
import { VoucherEntryForm } from './accounts/VoucherEntry2';
import VoucherShow from './accounts/VoucherShow';


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
      alwaysOn
    />
    <SearchInput
      variant="standard"
      placeholder="Chq-No"
      source="chq_no"
      alwaysOn
    />
    <FirdousSelect

      label="Project"
      source="project"
      optionText="title"
      list="projects"
      sort="title"
      resettable

    />
    <FirdousSelect

      label="Vendor"
      source="supplier"
      optionText="title"
      list="suppliers"
      sort="title"
      resettable

    />
    <FirdousSelect

      label="Units"
      source="unit"
      optionText="title"
      list="units"
      sort="title"
      resettable

    />
    <FirdousSelect

      label="Stocks"
      source="stock"
      optionText="title"
      list="stocks"
      sort="title"
      resettable

    />
    <FirdousSelect

      label="Employees"
      source="employee"
      optionText="title"
      list="employees"
      sort="title"
      resettable

    />
  </Filter>
);
const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

export const VouchersList = (props) => (
  <List
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    pagination={<PostPagination />}
    empty={false}
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
          <TextField source="project" />
          <TextField source="created_by" />
          <TextField source="chq_no" />
          <TextField source="chq_date" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>
      )}
  </List>
);


const VouchersTitle = ({ record }) => {
  return <span>Voucher {record ? `"${record.vou_no}"` : ""}</span>;
};
export const VouchersEdit = (props) => {

  return (
    <Edit
      undoable={false}
      actions={null}
      title={<VouchersTitle />}
      redirect="show"
      {...props}
    >
      <VoucherEntryForm {...props} />
    </Edit>
  )
};

export const VouchersCreate = (props) => {
  const vou_type = useQuery("vou_type");
  return (
    <Create redirect="show" undoable={false} title="New Voucher" {...props}>
      <VoucherEntryForm vou_type={vou_type} {...props} />
    </Create>
  )
};

export const VouchersShow = (props) => {
  return (
    <VoucherShow {...props} />
  )
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
