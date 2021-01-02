import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
export class Success extends Component {
  continue = e => {
      e.preventDefault();   
      //PROCESS FORM // 
      this.props.nextStep();

  }
  
  
    render() {


        return (
            <MuiThemeProvider>
                <React.Fragment>
                   <AppBar title = "Success" />
                   <h1>Thank you for your submission</h1>
                   <p>You will get an email for further instructions</p>
                </React.Fragment>
            </MuiThemeProvider>  

        )
    }
}

const styles= {
    button: {
        margin : 15
    }
}


export default Success;
