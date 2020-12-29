
import * as React from "react";
import {FormWithRedirect, SelectArrayInput,SaveButton,
        NullableBooleanInput,BooleanInput ,TabbedForm , SearchInput,Filter, List, Datagrid, Edit, Create, SimpleList,SimpleForm, DateField, TextField, EditButton,DeleteButton, TextInput, DateInput, CheckboxGroupInput, BooleanField, FormTab } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { makeStyles, Chip,useMediaQuery } from '@material-ui/core';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { useAuthenticated ,useAuthState, Loading } from 'react-admin';
import { sanitizeEmptyValues } from 'react-admin';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { CardContent, Typography, Box } from '@material-ui/core';
import {  Toolbar } from '@material-ui/core';
const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});


export const VoucherEntry = (props) => {
    useAuthenticated();
    return(
    
        <div variant="standard">
            <Create basePath="vouchers" resource="vouchers">
                <VisitorForm  {...props}/>
            </Create>
            Voucher Entry Form goes here
        </div>
 
    )};




    
    
    const segments = [
        { id: 'compulsive', name: 'Compulsive' },
        { id: 'collector', name: 'Collector' },
        { id: 'ordered_once', name: 'Ordered Once' },
        { id: 'regular', name: 'Regular' },
        { id: 'returns', name: 'Returns' },
        { id: 'reviewer', name: 'Reviewer' },
    ];
    
    const VisitorForm = props => (
        <FormWithRedirect
            {...props}
            render={formProps => (
                // here starts the custom form layout
                <form>
                    <Box p="1em">
                        <Box display="flex">
                            <Box flex={2} mr="1em">
    
                                <Typography variant="h6" gutterBottom>Identity</Typography>
    
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput source="first_name" resource="customers" fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <TextInput source="last_name" resource="customers" fullWidth />
                                    </Box>
                                </Box>
                                <TextInput source="email" resource="customers" type="email" fullWidth />
                                <DateInput source="birthday" resource="customers" />
                                <Box mt="1em" />
    
                                <Typography variant="h6" gutterBottom>Address</Typography>
    
                                <TextInput resource="customers" source="address" multiline fullWidth />
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput source="zipcode" resource="customers" fullWidth />
                                    </Box>
                                    <Box flex={2} ml="0.5em">
                                        <TextInput source="city" resource="customers" fullWidth />
                                    </Box>
                                </Box>
                            </Box>
    
                            <Box flex={1} ml="1em">
                                
                                <Typography variant="h6" gutterBottom>Stats</Typography>
    
                                <SelectArrayInput source="groups" resource="customers" choices={segments} fullWidth />
                                <NullableBooleanInput source="has_newsletter" resource="customers" />
                            </Box>
    
                        </Box>
                    </Box>
                    <Toolbar>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <SaveButton
                                saving={formProps.saving}
                                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                            />
                            <DeleteButton record={formProps.record} />
                        </Box>
                    </Toolbar>
                </form>
            )}
        />
    );

// the parent component (Edit or Create) injects these props to their child
// const VisitorForm = ({ basePath, record, save, saving, version }) => {
//     const submit = values => {
//         // React-final-form removes empty values from the form state.
//         // To allow users to *delete* values, this must be taken into account 
//         save(sanitizeEmptyValues(record, values));
//     };
//     return (
//         <Form
//             initialValues={record}
//             onSubmit={submit}
//             mutators={{ ...arrayMutators }} // necessary for ArrayInput
//             subscription={defaultSubscription} // don't redraw entire form each time one field changes
//             key={version} // support for refresh button
//             keepDirtyOnReinitialize
//             render={formProps => (

//                 <TextInput source="id"></TextInput>
//             )}
//         />
//     );
// };
// const defaultSubscription = {
//     submitting: true,
//     pristine: true,
//     valid: true,
//     invalid: true,
// };