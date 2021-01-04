import React, { Component } from 'react';
import { Button, Create, FormWithRedirect, Toolbar } from 'react-admin';
import BookingDetailsForm from './BookingDetailsForm';
import ScheduleForm from './ScheduleForm';
import BookingConfirm from './BookingConfirm';

//import Confirm from './Confirm';
//import Success from './Success';


class BookingFormWizard extends Component {



    state = {
        step: 1,
        booking: { code: "", scode: "", title: "", unit: "123", client: "", project: "", book_date: "", sale_price: "", discount: "", remarks: "", client_name: "", father_name: "", residential_address: "", phone_no: "", nationality: "", cnic: "", reference_off: "", nominee_name: "", relation: "", email: "" },
        schedule: { id: "", name: "", date: "", unit: "", type: "", floor: "", block: "", contact: "", total_cost: "", on_booking: "", on_allocation: "", on_confirmation: "", on_start: "", monthly_installment: "", quaterly_payment: "" }
    }
    //Proceed to the next step
    nextStep = () => {

        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    // Go back to prev step
    prevStep = () => {

        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }


    // Handle field change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    CustomToolbar = props => (
        <Toolbar {...props} >
            <Button label="Continue"></Button>
        </Toolbar>
    );

    render(props) {
        const { step, booking } = this.state;
        console.log(booking);
        const { schedule } = this.state.schedule;
        return (<Create basePath="vouchers" resource="vouchers" {...props}>
            <FormWithRedirect
                {...props}
                render={formProps => (
                    <form>
                        <BookingDetailsForm
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            booking={booking}
                            step={step}
                        />
                        {/* <BookingConfirm
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                        /> */}





                    </form>)} />
        </Create>
        )
    }
}

export default BookingFormWizard;



