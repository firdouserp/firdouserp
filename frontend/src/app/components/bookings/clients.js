import { Grid, useMediaQuery } from "@material-ui/core";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import * as React from "react";
import {
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


export const ClientsIcon = HomeWorkIcon;

// export const UnitsActions = ({ basePath, data }) => (
//   <TopToolbar>
//     <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
//     {/* <ShowButton basePath={basePath} record={data} /> */}
//   </TopToolbar>
// );

const ClientsSearchFilter = (props) => (
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

export const ClientsList = (props) => (
  <List filters={<ClientsSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="name" />
          <TextField source="father_name" />
          <TextField source="postal_address" />
          <TextField source="residential_address" />
          <TextField source="phone_office" />
          <TextField source="phone_residential" />
          <TextField source="phone_mobile" />
          <TextField source="occupation" />
          <TextField source="age" />
          <TextField source="nationality" />
          <TextField source="reference_of" />
          <TextField source="nominee_name" />
          <TextField source="nominee_relation" />
          <TextField source="nominee_address" />
          <TextField source="email" />
          
          
          
          
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>
      )}
  </List>
);

const ClientsTitle = ({ record }) => {
  return <span>Edit Clients {record ? `"${record.title}"` : ""}</span>;
};

export const ClientsEdit = (props) => (
  <Edit
    undoable={false}
    //actions={<UnitsActions />}
    title={<ClientsTitle />}
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
          <TextInput disabled source="name" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="father_name" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="postal_address"
            /*options={{ multiLine: true }}*/ fullWidth
          />
        </Grid>
        <Grid>
        <TextField source="name" />
          <TextField source="father_name" />
          <TextField source="postal_address" />
          <TextField source="residential_address" />
          <TextField source="phone_office" />
          <TextField source="phone_residential" />
          <TextField source="phone_mobile" />
          <TextField source="occupation" />
          <TextField source="age" />
          <TextField source="nationality" />
          <TextField source="reference_of" />
          <TextField source="nominee_name" />
          <TextField source="nominee_relation" />
          <TextField source="nominee_address" />
          <TextField source="email" />
          {/* </Grid>
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
        </Grid> */}
      </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const ClientsCreate = (props) => (
  <Create
    //actions={<UnitsActions />}
    title="New Client"
    {...props}
  >
      <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
       
        <TextField source="name" />
          <TextField source="father_name" />
          <TextField source="postal_address" />
          <TextField source="residential_address" />
          <TextField source="phone_office" />
          <TextField source="phone_residential" />
          <TextField source="phone_mobile" />
          <TextField source="occupation" />
          <TextField source="age" />
          <TextField source="nationality" />
          <TextField source="reference_of" />
          <TextField source="nominee_name" />
          <TextField source="nominee_relation" />
          <TextField source="nominee_address" />
          <TextField source="email" />
      </Grid>
    </SimpleForm>
  </Create>
);
