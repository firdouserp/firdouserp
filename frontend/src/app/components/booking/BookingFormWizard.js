import React, { Component } from 'react';
import { Button, Create, FormWithRedirect, Toolbar } from 'react-admin';
import BookingConfirm from './BookingConfirm';
import BookingDetailsForm from './BookingDetailsForm';
import ScheduleForm from './ScheduleForm';

//import Confirm from './Confirm';
//import Success from './Success';


class BookingFormWizard extends Component {



    state = {
        step: 1,
        booking: { code: "", scode: "", title: "", unit: "123", client: "", project: "", book_date: "", sale_price: "", discount: "", remarks: "", client_name: "", father_name: "", residential_address: "", phone_no: "", nationality: "", cnic: "", reference_off: "", nominee_name: "", relation: "", email: "" },
        schedule: { id: "", name: "", date: "", unit: "", type: "", floor: "", block: "", contact: "", total_cost: "", on_booking: "", on_allocation: "", on_confirmation: "", on_start: "", monthly_installment: "", quaterly_payment: "", on_excavation: "", on_foundation: "", on_slab: "", on_block: "", on_plumbing: "", on_electric: "", on_coloring: "", on_finishing: "", on_possesion: "" }
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
        const { schedule, step, booking } = this.state;
        console.log(booking);
        return (<Create basePath="booking" resource="booking" {...props}>
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


                        <ScheduleForm
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            booking={booking}
                            schedule={schedule}

                            step={step}
                        />

*
                        { <BookingConfirm
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            booking={booking}
                            schedule={schedule}
                            step={step}
                        />}





                    </form>)} />
        </Create>
        )
    }
}

export default BookingFormWizard;



