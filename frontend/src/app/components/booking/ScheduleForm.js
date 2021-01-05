import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Button, DateInput, TextInput, Toolbar } from "react-admin";
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
    const { schedule, step, handleChange, ScheduleForm } = this.props;
    const small = 6;
    const xsmall = 12;
    const medium = 6;
    const styles = {
      button: {
        margin: 15,
      },
    };

    console.log(schedule);
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
                    <TextInput disabled source="id" fullWidth />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="name"
                      defaultValue={schedule.name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="unit"
                      defaultValue={schedule.unit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="type"
                      defaultValue={schedule.type}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="block"
                      defaultValue={schedule.block}
                      fullWidth /*options={{ multiLine: true }}*/
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput fullWidth multiline source="contact" />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      fullWidth
                      source="total_cost"
                      defaultValue={schedule.total_cost}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                    <DateInput
                      source="on_booking"
                      defaultValue={schedule.on_booking}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_allocation"
                      defaultValue={schedule.on_allocation}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_confirmation"
                      defaultValue={schedule.on_confirmation}
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
                      defaultValue={schedule.on_start}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="monthly_installment"
                      defaultValue={schedule.monthly_installment}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="quaterly_payment"
                      defaultValue={schedule.quaterly_payment}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_excavation"
                      defaultValue={schedule.on_excavation}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_foundation"
                      defaultValue={schedule.on_foundation}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_slab"
                      defaultValue={schedule.on_slab}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_block"
                      defaultValue={schedule.on_block}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_plaster"
                      defaultValue={schedule.on_plaster}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_plumbing"
                      defaultValue={schedule.on_plumbing}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_electric"
                      defaultValue={schedule.on_electric}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_coloring"
                      defaultValue={schedule.on_coloring}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_finishing"
                      defaultValue={schedule.on_finishing}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="on_possesion"
                      defaultValue={schedule.on_possesion}
                      fullWidth
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
