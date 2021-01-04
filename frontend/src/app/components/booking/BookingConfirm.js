import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { TextInput } from 'react-admin';
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
        const { values: { code, scode, title, client, project, book_date, sale_price, discount, remarks, client_name, father_name, residential_address, phone_no, nationality, cnic, reference_off, nominee_name, relation, email, name, date, unit, type, floor, block, contact, total_cost, on_booking, on_allocation, on_confirmation, on_start, monthly_installment, quaterly_payment } } = this.props;


        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Confirm User Data" ></AppBar>
                    <List>
                        <TextInput
                            primaryText="code"
                            secondaryText={code} />
                        <TextInput
                            primaryText="scode"
                            secondaryText={scode} />
                        <TextInput
                            primaryText="title"
                            secondaryText={title} />
                        <TextInput
                            primaryText="unit"
                            secondaryText={unit} />
                        <TextInput
                            primaryText="client"
                            secondaryText={client} />
                        <TextInput
                            primaryText="project"
                            secondaryText={project} />
                        <TextInput
                            primaryText="book_date"
                            secondaryText={book_date} />
                        <TextInput
                            primaryText="sale_price"
                            secondaryText={sale_price} />
                        <TextInput
                            primaryText="discount"
                            secondaryText={discount} />
                        <TextInput
                            primaryText="remarks"
                            secondaryText={remarks} />
                        <TextInput
                            primaryText="client_name"
                            secondaryText={client_name} />
                        <TextInput
                            primaryText="father_name"
                            secondaryText={father_name} />
                        <TextInput
                            primaryText="residential_address"
                            secondaryText={residential_address} />
                        <TextInput
                            primaryText="phone_no"
                            secondaryText={phone_no} />
                        <TextInput
                            primaryText="nationality"
                            secondaryText={nationality} />
                        <TextInput
                            primaryText="cnic"
                            secondaryText={cnic} />
                        <TextInput
                            primaryText="reference_off"
                            secondaryText={reference_off} />
                        <TextInput
                            primaryText="nominee_name"
                            secondaryText={nominee_name} />
                        <TextInput
                            primaryText="relation"
                            secondaryText={relation} />
                        <TextInput
                            primaryText="email"
                            secondaryText={email} />
                        <TextInput
                            primaryText="name"
                            secondaryText={name} />
                        <TextInput
                            primaryText="date"
                            secondaryText={date} />
                        <TextInput
                            primaryText="unit"
                            secondaryText={unit} />
                        <TextInput
                            primaryText="type"
                            secondaryText={type} />
                        <TextInput
                            primaryText="floor"
                            secondaryText={floor} />
                        <TextInput
                            primaryText="block"
                            secondaryText={block} />
                        <TextInput
                            primaryText="contact"
                            secondaryText={contact} />
                        <TextInput
                            primaryText="total_cost"
                            secondaryText={total_cost} />
                        <TextInput
                            primaryText="on_booking"
                            secondaryText={on_booking} />
                        <TextInput
                            primaryText="on_allocation"
                            secondaryText={on_allocation} />
                        <TextInput
                            primaryText="on_confirmation"
                            secondaryText={on_confirmation} />
                        <TextInput
                            primaryText="on_start"
                            secondaryText={on_start} />
                        <TextInput
                            primaryText="monthly_installment"
                            secondaryText={monthly_installment} />
                        <TextInput
                            primaryText="quaterly_payment"
                            secondaryText={quaterly_payment} />

                    </List>
                    <br />
                    <RaisedButton
                        label="Confirm & Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
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
}

const styles = {
    button: {
        margin: 15
    }
}


export default BookingConfirm;

