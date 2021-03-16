import { makeStyles, useMediaQuery } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {
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
import FirdousSelect from '../accounts/FirdousSelect';

export const SettingIcon = ListAltIcon;
const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

export const SettingActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const SettingSearchFilter = (props) => (
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

export const SettingList = (props) => (
  <List empty={false} filters={<SettingSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
      <Datagrid rowClick="edit">
        <TextInput source="id" />
        <TextInput source="org_name" />
        <TextInput source="org_address" />
        <TextInput source="company_logo" />
        <TextInput source="grn_account" />
        <EditButton variant="contained" color="secondary" />
        <DeleteButton />
      </Datagrid>
    )}
  </List>
);

const SettingTitle = ({ record }) => {
  return <span>Setting {record ? `"${record.title}"` : ""}</span>;
};

export const SettingEdit = (props) => {
  const classes = useStyles();
  return (
    <Edit undoable={false} title={<SettingTitle />} {...props}>
      <SimpleForm variant="standard" margin="none">
        <TextInput disabled source="id" formClassName={classes.inlineBlock} />
        <TextInput source="org_name" formClassName={classes.inlineBlock} />
        <TextInput
          source="org_address" /*options={{ multiLine: true }}*/
          formClassName={classes.inlineBlock}
        />
        <TextInput multiline source="company_logo" />
      </SimpleForm> 
    </Edit>
  );
};

export const SettingCreate = (props) => (
  <Create undoable={false} title="Setting" {...props}>
    <SimpleForm variant="standard">
    <TextField source="id" />
        <TextInput source="org_name" />
        <TextInput source="org_address" />
        <TextInput source="company_logo" />
        
        <FirdousSelect source="grn Account" list="coa" sort="title" optionText="title"  />
      
    </SimpleForm>
  </Create>
);

export const SettingShow = (props) => {
  return <SettingShow {...props} />;
};
