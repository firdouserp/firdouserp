import { useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { Create, Datagrid, DateInput, DeleteButton, Edit, EditButton, Filter, List, ListButton, NumberInput, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

export const ScheduleIcon = StoreIcon;

export const ScheduleActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const ScheduleSearchFilter = (props) => (

    <Filter {...props}>
        <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
        <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
        <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    </Filter>

);

export const ScheduleList = props => (
    <List filters={<ScheduleSearchFilter />} {...props}>
        {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
            <SimpleList
                primaryText={record => record.title}
                secondaryText={record => `${record.code}`}
                tertiaryText={record => record.id}

            />
        ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="contact" />
                    <EditButton variant="contained" color="secondary" />
                    <DeleteButton />
                </Datagrid>)}
    </List>
);

const ScheduleTitle = ({ record }) => {
    return <span>Schedule {record ? `"${record.title}"` : ''}</span>;
};

export const ScheduleEdit = (props) => (
    <Edit undoable={false} actions={<ScheduleActions />} title={<ScheduleTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="date" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="unit" />
            <TextInput source="type" />
            <TextInput source="floor" />
            <TextInput source="block" />
            <TextInput source="contact" />
            <TextInput source="total_cost" />
            <TextInput source="on_booking" />
            <TextInput source="on_confirmation" />
            <TextInput source="on_allocation" />
            <TextInput source="on_start" />
            <TextInput source="monthly_installment" />
            <TextInput source="quaterly_payment" />
            <TextInput source="on_excavation" />
            <TextInput source="on_foundation" />
            <TextInput source="on_slab" />
            <TextInput source="on_block" />
            <TextInput source="on_plaster" />
            <TextInput source="on_plumbing" />
            <TextInput source="on_electric" />
            <TextInput source="on_coloring" />
            <TextInput source="on_finishing" />
            <TextInput source="on_possesion" />
        </SimpleForm>
    </Edit>
);

export const ScheduleCreate = (props) => (
    <Create undoable={false} actions={<ScheduleActions />} title="New Schedule" {...props}>
        <SimpleForm variant="standard">
        <TextInput disabled source="id" />
            <TextInput source="name" />
            <DateInput source="date" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="unit" />
            <TextInput source="type" />
            <TextInput source="floor" />
            <TextInput source="block" />
            <NumberInput source="contact" />
            <NumberInput source="total_cost" />
            <NumberInput source="on_booking" />
            <NumberInput source="on_confirmation" />
            <NumberInput source="on_allocation" />
            <NumberInput source="on_start" />
            <NumberInput source="monthly_installment" />
            <NumberInput source="quaterly_payment" />
            <NumberInput source="on_excavation" />
            <NumberInput source="on_foundation" />
            <NumberInput source="on_slab" />
            <NumberInput source="on_plaster" />
            <TextInput source="on_block" />
            <NumberInput source="on_plumbing" />
            <NumberInput source="on_electric" />
            <NumberInput source="on_coloring" />
            <NumberInput source="on_finishing" />
            <NumberInput source="on_possesion" />
        </SimpleForm>
    </Create>
);