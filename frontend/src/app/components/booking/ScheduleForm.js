import { Box } from '@material-ui/core';
import React, { Component } from 'react';
import { BooleanInput, Button, TextInput, Toolbar } from 'react-admin';
class ScheduleForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }
    back = e => {
        e.preventDefault();   
        this.props.prevStep();
    
    }

    render() {
        const { schedule, step, handleChange, ScheduleForm } = this.props;
        const styles = {
            button: {
                margin: 15
            }
        }

        console.log(schedule)
        if (step == 2) {
            return (
                <Box p="1em">
                    <Box>

                        <TextInput disabled source="id" />
                        <TextInput source="name" defaultValue={schedule.name}/>
                        <TextInput source="date" /*options={{ multiLine: true }}*/ defaultValue={schedule.date}/>
                        <TextInput multiline source="unit"defaultValue={schedule.unit} />
                        <TextInput source="type" defaultValue={schedule.type}/>
                        <TextInput source="floor" defaultValue={schedule.floor}/>
                        <TextInput source="block"defaultValue={schedule.block} />
                        <TextInput source="contact"defaultValue={schedule.contact} />
                        <TextInput source="total_cost"defaultValue={schedule.total_cost} />
                        <TextInput source="on_booking" defaultValue={schedule.on_booking}/>
                        <TextInput source="on_allocation" defaultValue={schedule.on_allocation}/>
                        <TextInput source="on_confirmation"defaultValue={schedule.on_confirmation} />
                        <TextInput source="on_start"defaultValue={schedule.on_start} />
                        <TextInput source="monthly_installment" defaultValue={schedule.monthly_installment}/>
                        <TextInput source="quaterly_payment"defaultValue={schedule.quaterly_payment} />
                        <TextInput source="on_excavation" defaultValue={schedule._on_excavation}/>
                        <TextInput source="on_foundation"defaultValue={schedule.on_foundation} />
                        <TextInput source="on_slab"defaultValue={schedule.on_slab} />
                        <TextInput source="on_block"defaultValue={schedule.on_block} />
                        <TextInput source="on_plaster" defaultValue={schedule.on_plaster}/>
                        <TextInput source="on_plumbing" defaultValue={schedule.on_plumbing}/>
                        <TextInput source="on_electric"defaultValue={schedule.on_electric} />
                        <BooleanInput source="on_coloring"defaultValue={schedule.on_coloring}/>
                        <BooleanInput source="on_finishing"defaultValue={schedule.on_flooring} />
                        <BooleanInput source="on_possesion"defaultValue={schedule.on_possesion} />


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
