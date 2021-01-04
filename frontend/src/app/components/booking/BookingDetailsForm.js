import { Box } from "@material-ui/core";
import React, { Component } from "react";
import { BooleanInput, Button, TextInput, Toolbar } from "react-admin";
class BookingDetailsForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { booking, step, handleChange } = this.props;
    const styles = {
      button: {
        margin: 15,
      },
    };

    console.log(booking);
    if (step == 1) {
      return (
        <Box p="1em">
          <Box title="Enter User details">
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="unit" />
            <TextInput source="client" />
            <TextInput source="book_date" />
            <TextInput source="sale_price" />
            <TextInput source="discount" />
            <TextInput source="remarks" />
            <TextInput source="name" />
            <TextInput source="father_name" />
            <TextInput source="residential_address" />
            <TextInput source="phone_no" />
            <TextInput source="occupation" />
            <TextInput source="nationality" />
            <TextInput source="reference_off" />
            <TextInput source="nominee_name" />
            <TextInput source="relation" />
            <TextInput source="cnic" />
            <TextInput source="project" />
            <TextInput source="email" />
            <BooleanInput source="active" />
            <Button source="Schedule" />
          </Box>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button
                label="Back"
                primary={false}
                style={styles.button}
                onClick={this.back}
              />
            </Box>
          </Toolbar>
        </Box>
      );
    }
    return null;
  }
}

export default BookingDetailsForm;
