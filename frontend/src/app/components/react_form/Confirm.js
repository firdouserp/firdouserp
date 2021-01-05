import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Example from '../react-to-print/Example';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
class Confirm extends Component {
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
        const {values: {firstName,lastName,emailName,occupation,city,bio }} = this.props;
 
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title = "Confirm User Data" ></AppBar>
                    <List>
                        <ListItem
                             primaryText="First Name"
                             secondaryText= {firstName }/>
                              <ListItem
                             primaryText="Last Name"
                             secondaryText= {lastName }/>
                              <ListItem
                             primaryText="Email"
                             secondaryText= {emailName }/>
                              <ListItem
                             primaryText="Occupation"
                             secondaryText= {occupation }/>
                              <ListItem
                             primaryText="City"
                             secondaryText= {city }/>
                              <ListItem
                             primaryText="Bio"
                             secondaryText= {bio }/>
                           <Example/>
                    
                   
                    </List>
                    
                   <br/>
                   <RaisedButton
                   label = "Confirm & Continue"
                   primary = {true}
                   style = {styles.button}
                   onClick = {this.continue}
                   />
                  

                     <RaisedButton
                   label = "Back"
                   primary = {false}
                   style = {styles.button}
                   onClick = {this.back}
                   />   
                   

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


export default Confirm;
