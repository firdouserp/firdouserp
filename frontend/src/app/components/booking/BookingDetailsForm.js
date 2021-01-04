import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { BooleanInput, Button, TextInput, Toolbar } from "react-admin";
class BookingDetailsForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { booking, step, handleChange } = this.props;
    const small = 6;
    const xsmall = 12;
    const medium = 6;
    const styles = {
      button: {
        margin: 15,
      },
    };

    console.log(booking);
    if (step == 1) {
      return (
        <Box p="1em">
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <div>
            <Grid container spacing={10}>
              <Grid spacing={1} id="left-container" item xs={xsmall} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput disabled source="id" fullWidth />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="project"
                      defaultValue={booking.project}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput disabled source="code" fullWidth />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="scode"
                      fullWidth /*options={{ multiLine: true }}*/
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput fullWidth multiline source="title" />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      fullWidth
                      source="unit"
                      defaultValue={booking.unit}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="client"
                      defaultValue={booking.client}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                    <TextInput
                      source="book_date"
                      defaultValue={booking.book_date}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="sale_price"
                      defaultValue={booking.sale_price}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall}>
                    <TextInput
                      source="remarks"
                      defaultValue={booking.remarks}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid spacing={2} id="right-container" item xs={xsmall} md={6}>
                <Grid container spacing={1}>
                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                    <TextInput
                      source="name"
                      defaultValue={booking.name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="father_name"
                      defaultValue={booking.father_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="cnic"
                      defaultValue={booking.cnic}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="phone_no"
                      defaultValue={booking.phone_no}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall}>
                    <TextInput
                      source="residential_address"
                      defaultValue={booking.residential_address}
                      fullWidth
                      multiline
                    />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="occupation"
                      defaultValue={booking.occupation}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="nationality"
                      defaultValue={booking.nationality}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="reference_off"
                      defaultValue={booking.reference_off}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="nominee_name"
                      defaultValue={booking.nominee_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="relation"
                      defaultValue={booking.relation}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="email"
                      defaultValue={booking.unit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <BooleanInput
                      source="active"
                      defaultValue={booking.active}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button source="Booking" />
          </div>

          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button label="Continue" primary={true} onClick={this.continue} />
            </Box>
          </Toolbar>
        </Box>
      );
    }
    return null;
  }
}

export default BookingDetailsForm;
