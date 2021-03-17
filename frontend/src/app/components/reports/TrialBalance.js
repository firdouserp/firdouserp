import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import {
  Datagrid,
  DatagridBody,
  DateInput,
  Filter,
  List,
  SearchInput,
  TextField,
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

const MyDatagridRow = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
}) => (
  <TableRow key={id}>
    {/* first column: selection checkbox */}
    <TableCell padding="none">
      <Checkbox
        disabled={record.selectable}
        checked={selected}
        onClick={() => onToggleItem(id)}
      />
    </TableCell>
    {/* data columns based on children */}
    {React.Children.map(children, (field) => (
      <TableCell key={`${id}-${field.props.source}`}>
        {
        
        
        
        
        React.cloneElement(field, {
          record,
          basePath,
          resource,
        })}
      </TableCell>
    ))}
  </TableRow>
);

const MyDatagridBody = (props) => (
  <DatagridBody {...props} row={<MyDatagridRow />} />
);
const MyDatagrid = (props) => <Datagrid {...props} body={<MyDatagridBody />} />;

export const TrialBalanceList = (props) => (
  <List perPage={100} {...props} filters={<TrialBalanceSearchFilter />}>
    {
      <MyDatagrid>
        <TextField source="ct_title" title="Main Account" />
        <TextField source="n_title" title="Sub Account" />
        <TextField source="coa_code" title="Account #" />
        <TextField source="coa_title" title="'Account Title" />
        <TextField source="ob_dr" />
        <TextField source="ob_cr" />
      </MyDatagrid>
    }
  </List>
);

export default TrialBalanceList;
