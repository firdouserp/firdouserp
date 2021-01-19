import { useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import StoreIcon from "@material-ui/icons/Store";
import * as React from "react";
import {
  BooleanInput,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  Filter,
  List,
  ListButton,
  SearchInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
  TopToolbar
} from "react-admin";
import FirdousSelect from "./FirdousSelect";
export const NotesIcon = StoreIcon;

export const NotesActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const NotesSearchFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      variant="standard"
      placeholder="Title"
      source="title"
      alwaysOn
    />
    <SearchInput
      variant="standard"
      placeholder="SCode"
      source="scode"
      alwaysOn
    />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>
);

export const NotesList = (props) => (
  <List filters={<NotesSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="code" />
          <TextField source="scode" />
          <TextField source="title" />
          <TextField source="active" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>
      )}
  </List>
);

const NotesTitle = ({ record }) => {
  return <span>Supplier {record ? `"${record.title}"` : ""}</span>;
};

export const NotesEdit = (props) => (
  <Edit
    undoable={false}
    title={<NotesTitle />}
    {...props}
  >
    <SimpleForm variant="standard" margin="none">
      <TextInput disabled source="id" />
      <TextInput source="code" />
      <TextInput source="scode" /*options={{ multiLine: true }}*/ />
      <TextInput multiline source="title" />
      <FirdousSelect
        margin="none"
        allowEmpty={false}
        label="Account Type"
        source="coa_type"
        list="coa_type"
        sort="title"
        filter={""}
        optionText="title"
      />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

export const NotesCreate = (props) => (
  <Create
    undoable={false}
    title="New Note"
    {...props}
  >
    <SimpleForm variant="standard">
      <TextInput disabled source="id" />
      <TextInput source="code" />
      <TextInput source="scode" /*options={{ multiLine: true }}*/ />
      <TextInput multiline source="title" />
      <FirdousSelect
        margin="none"
        allowEmpty={false}
        label="Account Type"
        source="coa_type"
        list="coa_type"
        sort="title"
        filter={""}
        optionText="title"
      />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);
