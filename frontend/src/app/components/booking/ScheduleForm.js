import { Box } from '@material-ui/core';
import React, { Component } from 'react';
import { BooleanInput, Button, TextInput, Toolbar } from 'react-admin';
class ScheduleForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }


    render() {
        const { booking, step, handleChange, ScheduleForm } = this.props;
        const styles = {
            button: {
                margin: 15
            }
        }

        console.log(booking)
        if (step == 2) {
            return (
                <Box p="1em">
                    <Box>

                        <TextInput disabled source="id" />
                        <TextInput source="name" />
                        <TextInput source="date" /*options={{ multiLine: true }}*/ />
                        <TextInput multiline source="unit" />
                        <TextInput source="type" />
                        <TextInput source="floor" />
                        <TextInput source="block" />
                        <TextInput source="contact" />
                        <TextInput source="total_cost" />
                        <TextInput source="on_booking" />
                        <TextInput source="on_allocation" />
                        <TextInput source="on_confirmation" />
                        <TextInput source="on_start" />
                        <TextInput source="monthly_installment" />
                        <TextInput source="quaterly_payment" />
                        <TextInput source="on_excavation" />
                        <TextInput source="on_foundation" />
                        <TextInput source="on_slab" />
                        <TextInput source="on_block" />
                        <TextInput source="on_plaster" />
                        <TextInput source="on_plumbing" />
                        <TextInput source="on_electric" />
                        <BooleanInput source="on_coloring" />
                        <BooleanInput source="on_finishing" />
                        <BooleanInput source="on_possesion" />


                    </Box><Toolbar>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Button
                                label="Back"
                                primary={false}
                                style={styles.button}
                                onClick={this.back}
                            />

                            <Button

                                label="Continue"
                                primary={false}
                                style={styles.button}
                                onClick={this.continue}


                            />

                        </Box>
                    </Toolbar>
                </Box>
            )
        }
        return null;
    }
}




export default ScheduleForm;
