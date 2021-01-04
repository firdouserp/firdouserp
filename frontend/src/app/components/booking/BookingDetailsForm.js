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
            <TextInput source="code" defaultValue={booking.code} />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="unit" defaultValue={booking.unit}/>
            <TextInput source="client"defaultValue={booking.client} /> 
            <TextInput source="book_date"defaultValue={booking.book_date} />
            <TextInput source="sale_price" defaultValue={booking.sale_price}/>
            <TextInput source="discount"defaultValue={booking.discount} />
            <TextInput source="remarks"defaultValue={booking.remarks} />
            <TextInput source="name" defaultValue={booking.name}/>
            <TextInput source="father_name"defaultValue={booking.father_name} />
            <TextInput source="residential_address"defaultValue={booking.residential_address} />
            <TextInput source="phone_no" defaultValue={booking.phone_no}/>
            <TextInput source="occupation"defaultValue={booking.occupation} />
            <TextInput source="nationality"defaultValue={booking.nationality} />
            <TextInput source="reference_off"defaultValue={booking.reference_off}/>
            <TextInput source="nominee_name"defaultValue={booking.nominee_name} />
            <TextInput source="relation"defaultValue={booking.relation} />
            <TextInput source="cnic" defaultValue={booking.cnic}/>
            <TextInput source="project"defaultValue={booking.project} />
            <TextInput source="email"defaultValue={booking.unit} />
            <BooleanInput source="active" defaultValue={booking.active}/>
            <Button source="Booking" />
          </Box>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
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

export default BookingDetailsForm;
