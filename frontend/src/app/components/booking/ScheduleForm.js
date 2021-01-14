import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Button, DateInput, required, TextInput, Toolbar } from "react-admin";
import FirdousSelect from "../accounts/FirdousSelect";
class ScheduleForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { schedule, step, handleChange } = this.props;
    const small = 6;
    const xsmall = 12;
    const medium = 6;
    const styles = {
      button: {
        margin: 15,
      },
    };


    const ra_required = [required()];
    if (step == 2) {
      return (
        <Box p="1em">
          <Typography variant="h6" gutterBottom>
            Payment Schedule
          </Typography>
          <div>
            <Grid container spacing={7}>
              <Grid spacing={1} id="left-container" item xs={xsmall} md={4}>
                <Typography variant="h7" gutterBottom>
                  Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput disabled source="id" fullWidth onBlur={handleChange} />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="name"
                      defaultValue={schedule.name}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <FirdousSelect
                       margin="units"
                      label="units"
                    source="units"
                      optionText="title"
                    list="units"
                    sort="title"
                  validate={ra_required}
                    fullWidth
                          
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="type"
                      defaultValue={schedule.type}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="block"
                      defaultValue={schedule.block}
                      fullWidth onBlur={handleChange} /*options={{ multiLine: true }}*/
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput fullWidth onBlur={handleChange} multiline source="contact" />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      fullWidth onBlur={handleChange}
                      source="total_cost"
                      defaultValue={schedule.total_cost}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                    <DateInput
                      source="on_booking"
                      defaultValue={schedule.on_booking}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_allocation"
                      defaultValue={schedule.on_allocation}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_confirmation"
                      defaultValue={schedule.on_confirmation}
                      fullWidth onBlur={handleChange}
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
                      defaultValue={schedule.on_start}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="monthly_installment"
                      defaultValue={schedule.monthly_installment}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="quaterly_payment"
                      defaultValue={schedule.quaterly_payment}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_excavation"
                      defaultValue={schedule.on_excavation}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_foundation"
                      defaultValue={schedule.on_foundation}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_slab"
                      defaultValue={schedule.on_slab}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_block"
                      defaultValue={schedule.on_block}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_plaster"
                      defaultValue={schedule.on_plaster}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_plumbing"
                      defaultValue={schedule.on_plumbing}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_electric"
                      defaultValue={schedule.on_electric}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_coloring"
                      defaultValue={schedule.on_coloring}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_finishing"
                      defaultValue={schedule.on_finishing}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_possesion"
                      defaultValue={schedule.on_possesion}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button source="Schedule" />
          </div>

          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button
                label="Back"
                primary={false}
                style={styles.button}
                onClick={this.back}
              />

              <Button
                label="Continue"
                primary={false}
                style={styles.button}
                onClick={this.continue}
              />
            </Box>
          </Toolbar>
        </Box>
      );
    }
    return null;
  }
}

export default ScheduleForm;
