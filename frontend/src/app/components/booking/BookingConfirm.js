import { Box, Grid } from '@material-ui/core';
import { ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
class BookingConfirm extends Component {



    continue = e => {
        e.preventDefault();
        //PROCESS FORM // 
        this.props.nextStep();

    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }



    render() {

        const { booking, schedule, step, } = this.props;

        if (step == 3) {

            return (
                <MuiThemeProvider>
                    <React.Fragment>
                        <Box title="Confirm User Data" ></Box>
                        <Grid>
                            <Grid>
                                <ListItem
                                    primaryText="code"
                                    secondaryText={booking.code} />
                                <ListItem
                                    primaryText="scode"
                                    secondaryText={booking.scode} />
                                <ListItem
                                    primaryText="title"
                                    secondaryText={booking.title} />
                                <ListItem
                                    primaryText="unit"
                                    secondaryText={booking.unit} />
                                <ListItem
                                    primaryText="client"
                                    secondaryText={booking.client} />
                                <ListItem
                                    primaryText="project"
                                    secondaryText={booking.project} />
                                <ListItem
                                    primaryText="book_date"
                                    secondaryText={booking.book_date} />
                                <ListItem
                                    primaryText="sale_price"
                                    secondaryText={booking.sale_price} />
                                <ListItem
                                    primaryText="discount"
                                    secondaryText={booking.discount} />
                                <ListItem
                                    primaryText="remarks"
                                    secondaryText={booking.remarks} />
                                <ListItem
                                    primaryText="client_name"
                                    secondaryText={booking.client_name} />
                                <ListItem
                                    primaryText="father_name"
                                    secondaryText={booking.father_name} />
                                <ListItem
                                    primaryText="residential_address"
                                    secondaryText={booking.residential_address} />
                                <ListItem
                                    primaryText="phone_no"
                                    secondaryText={booking.phone_no} />
                                <ListItem
                                    primaryText="nationality"
                                    secondaryText={booking.nationality} />
                                <ListItem
                                    primaryText="cnic"
                                    secondaryText={booking.cnic} />
                                <ListItem
                                    primaryText="reference_off"
                                    secondaryText={booking.reference_off} />
                                <ListItem
                                    primaryText="nominee_name"
                                    secondaryText={booking.nominee_name} />
                                <ListItem
                                    primaryText="relation"
                                    secondaryText={booking.relation} />
                                <ListItem
                                    primaryText="email"
                                    secondaryText={booking.email} />
                                <ListItem
                                    primaryText="name"
                                    secondaryText={schedule.name} />
                                <ListItem
                                    primaryText="date"
                                    secondaryText={schedule.date} />
                                <ListItem
                                    primaryText="unit"
                                    secondaryText={schedule.unit} />
                                <ListItem
                                    primaryText="type"
                                    secondaryText={schedule.type} />
                                <ListItem
                                    primaryText="floor"
                                    secondaryText={schedule.floor} />
                                <ListItem
                                    primaryText="block"
                                    secondaryText={schedule.block} />
                                <ListItem
                                    primaryText="contact"
                                    secondaryText={schedule.contact} />
                                <ListItem
                                    primaryText="total_cost"
                                    secondaryText={schedule.total_cost} />
                                <ListItem
                                    primaryText="on_booking"
                                    secondaryText={schedule.on_booking} />
                                <ListItem
                                    primaryText="on_allocation"
                                    secondaryText={schedule.on_allocation} />
                                <ListItem
                                    primaryText="on_confirmation"
                                    secondaryText={schedule.on_confirmation} />
                                <ListItem
                                    primaryText="on_start"
                                    secondaryText={schedule.on_start} />
                                <ListItem
                                    primaryText="monthly_installment"
                                    secondaryText={schedule.monthly_installment} />
                                <ListItem
                                    primaryText="quaterly_payment"
                                    secondaryText={schedule.quaterly_payment} />

                            </Grid>
                        </Grid>

                        <br />
                        <div>
                            <span className="print"
                                onClick={this.print}>
                                PRINT
                            </span>
                        </div>
                        <br />
                        <RaisedButton
                            label="Confirm & Continue"
                            primary={true}
                            style={styles.button}
                            onClick={this.continue}
                        />
                        <RaisedButton
                            label="print"
                            primary={true}
                            style={styles.button}
                            onClick={this.print}
                        />
                        <RaisedButton
                            label="Back"
                            primary={false}
                            style={styles.button}
                            onClick={this.back}
                        />




                    </React.Fragment>
                </MuiThemeProvider>

            )
        }
        else return null;
    }
}
const styles = {
    button: {
        margin: 15
    }
}


export default BookingConfirm;

