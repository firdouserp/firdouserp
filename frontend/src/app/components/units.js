import { Grid, useMediaQuery } from "@material-ui/core";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
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
  SearchInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput
} from "react-admin";
import FirdousSelect from './accounts/FirdousSelect';

export const UnitsIcon = HomeWorkIcon;

// export const UnitsActions = ({ basePath, data }) => (
//   <TopToolbar>
//     <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
//     {/* <ShowButton basePath={basePath} record={data} /> */}
//   </TopToolbar>
// );

const UnitsSearchFilter = (props) => (
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

export const UnitsList = (props) => (
  <List filters={<UnitsSearchFilter />} {...props}>
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
          <TextField source="ulocation" />
          <TextField source="utype" />
          <TextField source="remarks" />
          <TextField source="active" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>
      )}
  </List>
);

const UnitsTitle = ({ record }) => {
  return <span>Edit Unit {record ? `"${record.title}"` : ""}</span>;
};

export const UnitsEdit = (props) => (
  <Edit
    undoable={false}
    //actions={<UnitsActions />}
    title={<UnitsTitle />}
    {...props}
  >
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
        <Grid item xs={12} md={4}>
          <TextInput disabled source="id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="code" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="scode"
            /*options={{ multiLine: true }}*/ fullWidth
          />
        </Grid>
        <FirdousSelect source="projects" list="projects" sort="title" optionText="title" fullWidth />
        <Grid item xs={12} md={4}>
          <TextInput multiline source="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="ulocation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="utype" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="usize" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
        <FirdousSelect source="coa" list="coa" sort="title" optionText="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="remarks" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <BooleanInput source="active" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const UnitsCreate = (props) => (
  <Create
    //actions={<UnitsActions />}
    title="New Unit"
    {...props}
  >
      <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
        <Grid item xs={12} md={4}>
          <TextInput disabled source="id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="code" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="scode"
            /*options={{ multiLine: true }}*/ fullWidth
          />
        </Grid>
        <FirdousSelect source="projects" list="projects" sort="title" optionText="title" fullWidth />

        <Grid item xs={12} md={4}>
          <TextInput multiline source="title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="ulocation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="utype" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="usize" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="remarks" fullWidth />
        </Grid>
        <FirdousSelect source="coa" list="coa" sort="title" optionText="title" fullWidth />
        <Grid item xs={12} md={4}>
          <BooleanInput source="active" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
