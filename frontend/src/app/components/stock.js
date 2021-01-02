import { useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { BooleanInput, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ListButton, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

export const  StockIcon = StoreIcon;

export const StockActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
      {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const StockSearchFilter = (props) => (
   
        <Filter {...props}>
          <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
          <SearchInput variant="standard" placeholder="SCode"  source="scode" alwaysOn />
          <SearchInput variant="standard" placeholder="Code"  source="code" alwaysOn />
        </Filter>
      
  );

export const StockList = props => (
    <List filters={<StockSearchFilter />} {...props}>
        {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
                 <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.code}`}
                    tertiaryText={record => record.id  }
    
                />
                ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="scode" />
            <TextField source="title" />
            <TextField source="remarks" />
            <TextField source="active" />
            <EditButton  variant="contained" color="secondary"/>
            <DeleteButton/>
        </Datagrid>)}
    </List>
);

const StockTitle = ({ record }) => {
    return <span>Supplier {record ? `"${record.title}"` : ''}</span>;
};

export const StockEdit = (props) => (
    <Edit undoable={false} actions={<StockActions />} title={<StockTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="uom" />
            <TextInput source="qty" />
            <TextInput source="avg_rate" />
            <TextInput source="adv_cost" />
            <TextInput source="remarks" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Edit>
);

export const StockCreate = (props) => (
    <Create undoable={false} actions={<StockActions />}  title="New Stock" {...props}>
        <SimpleForm variant="standard">
        <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="uom" />
            <TextInput source="qty" />
            <TextInput source="avg_rate" />
            <TextInput source="adv_cost" />
            <TextInput source="remarks" />
            <BooleanInput source="active" />
        </SimpleForm>
    </Create>
);