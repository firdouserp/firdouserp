import React, { Component } from 'react';
import Confirm from './Confirm';
import FormPersonalDetails from './FormPersonalDetails';
import FormUserDetails from './FormUserDetails';
import Success from './Success';


export class Userform extends Component {

    state = {
        step : 1,
        firstName: '',
        lastname:'',
        email : '',
        occupation : '',
        city:'',
        bio:''
    }
    //Proceed to the next step
    nextStep = () => {

        const {step} = this.state;
        this.setState({
            step : step + 1
        });
    }
    // Go back to prev step
    prevStep = () => {
    
                const {step} = this.state;
                this.setState({
                    step : step - 1
                });
    }
    
    
    // Handle field change
    handleChange = input => e => {
        this.setState({[input] : e.target.value});
    }
    


    render() {
        const {step} = this.state;
        const {firstName,lastName,city,emailName,occupation,bio} = this.state;
        const values = {firstName,lastName,city,emailName,occupation,city,bio}
        switch(step) {
            case 1: 
            return(
                <FormUserDetails 
                nextStep = {this.nextStep}
                handleChange = {this.handleChange}
                values = {values}
                />
            )
            case 2:
            return(
                <FormPersonalDetails 
                nextStep = {this.nextStep}
                prevStep = {this.prevStep}
                handleChange = {this.handleChange}
                values = {values}
                />
            )
            case 3 :
                return(
                    <Confirm 
                    nextStep = {this.nextStep}
                    prevStep = {this.prevStep}
                    values = {values}
                    
                    />
                )
                
            case 4 :
                    return <Success/> 

                

        }
    }
}

export default Userform;



    