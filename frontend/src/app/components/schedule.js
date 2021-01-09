import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { Button, Create, Datagrid, DateInput, DeleteButton, Edit, EditButton, Filter, List, ListButton, NumberInput, SearchInput, SimpleForm, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';

const small = 6;
const xsmall = 12;
const medium = 6;


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
  <Edit undoable={false} title={<ScheduleTitle />} {...props}>
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
        <Grid item xs={12} md={4}>
          <NumberInput disabled source="id" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="date" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="unit" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="type" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="floor" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="block" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="contact" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="total_cost" fullWidth />
        </Grid> <Grid item xs={12} md={4}>
          <NumberInput source="on_booking" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_confirmation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_allocation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_start" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="monthly_installment" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="quaterly_payment" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_excavation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_foundation" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_slab" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_block" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_plaster" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_plumbing" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_electric" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_finishing" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="on_possesion" fullWidth />
        </Grid>


      </Grid>
    </SimpleForm>
  </Edit>
);

export const ScheduleCreate = (props) => (

  <Create undoable={false} title="New Schedule" {...props}>
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <di>
        <Box p="1em" width="100%">
          <Typography variant="h6" gutterBottom>
            Payment Schedule
          </Typography>
          <Grid container fullWidth display="flex" spacing={7}>
            <Grid spacing={1} id="left-container" item xs={xsmall} md={4}>
              <Typography variant="h7" gutterBottom>
                Details
                </Typography>
              <Grid container spacing={1}>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput disabled source="id" fullWidth />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="name"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="unit"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="type"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="block"

                    fullWidth  /*options={{ multiLine: true }}*/
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput fullWidth multiline source="contact" />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    fullWidth
                    source="total_cost"

                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                  <DateInput
                    source="on_booking"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_allocation"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_confirmation"

                    fullWidth
                    multiline
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid spacing={1} id="right-container" item xs={xsmall} md={4}>
              <Typography variant="h7" gutterBottom>
                Payment Details
                </Typography>
              <Grid container spacing={2}>
                <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                  <TextInput
                    source="on_start"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="monthly_installment"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="quaterly_payment"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_excavation"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_foundation"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_slab"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_block"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_plaster"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_plumbing"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_electric"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_coloring"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_finishing"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_possesion"

                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button source="Schedule" />


        </Box>
      </di>
    </SimpleForm>
  </Create>
);