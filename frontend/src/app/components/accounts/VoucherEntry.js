
import * as React from "react";
import {useQueryWithStore,required,AutocompleteInput,
    Error,FormWithRedirect, SelectArrayInput,SaveButton,SimpleFormIterator,
        NullableBooleanInput,BooleanInput ,ReferenceInput, SelectInput,TabbedForm , SearchInput,Filter, List, Datagrid, Edit, Create, SimpleList,SimpleForm, DateField, TextField, EditButton,DeleteButton, TextInput, DateInput, CheckboxGroupInput, BooleanField, FormTab } from 'react-admin';
import { TopToolbar, ListButton, ShowButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { makeStyles, Chip,useMediaQuery } from '@material-ui/core';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { useAuthenticated ,useAuthState, Loading,ArrayInput } from 'react-admin';
import { sanitizeEmptyValues } from 'react-admin';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { CardContent, Typography, Box } from '@material-ui/core';
import {  Toolbar } from '@material-ui/core';
import   VoucherTable  from './VoucherTable';
import   parse   from 'query-string';

import { useParams,useLocation } from "react-router";
const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

export const useQuery = queryParam => {
    const search = new URLSearchParams(useLocation().search);
    return search.get(queryParam);
  };
export const VoucherEntry = (props) => {
    useAuthenticated();
    //const params = QueryString.parse(props.location.search);
    //const params = new URLSearchParams(props.location.search);
    const vou_type = useQuery('vou_type');

    
    //console.log("params :"+QueryString.parse(JSON.stringify(props.location.search))); 
    //const params = QueryString.parse(props.location.search);
     //console.log("vou_type :"+params); 
    return(
    
        <div >
            <Create basePath="vouchers" resource="vouchers">
                <VisitorForm  vou_type={vou_type} {...props }/>
            </Create>
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
    
    const VisitorForm = props => {
        const { data, loading, error } = useQueryWithStore({ 
            type: 'getList',
            resource: 'notes/list',
            payload: { pagination: { page: 1 , perPage: 100 }, sort: { field: 'vou_date', order: 'DESC'},filter:{}}
        });
      
        if (loading) return <Loading />;
        if (error) return <Error />;
        if (!data) return null;

        return(

            
        <FormWithRedirect 
            {...props}
            render={formProps => (
                // here starts the custom form layout
                <form>
                    <Box p="1em" style={{border:"1px solid #e0e0e3"}}>
                        <Box display="flex">
                            <Box flexGrow={1} flex={1} mr="1em">
    
                                <Typography variant="h6" gutterBottom>Voucher Entry {props.vou_type}</Typography>
                                <Box flex={1}>
                                        <SelectInput label="Voucher Type" source="vou_type" optionText="value" choices={data} validate={[required()]} fullWidth/>  
                                    </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput disabled source="vou_no" resource="vouchers" fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                         <DateInput source="vou_date" resource="vouchers" validate={[required()]} autoFocus fullWidth/>
                                    </Box>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <SelectInput allowEmpty="true" label="Vendor" source="suppliers" optionText="value" choices={data} fullWidth/>
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <SelectInput  label="Project" source="project" optionText="value" choices={data} validate={[required()]} fullWidth/>                                        
                                    </Box>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                     <SelectInput allowEmpty="true" label="Unit" source="unit" optionText="value" choices={data} fullWidth/>  
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <SelectInput allowEmpty="true"  label="Stock" source="stock" optionText="value" choices={data} fullWidth/>  
                                    </Box>
                                   
                                </Box>
                                <Box flex={1}>
                                        <SelectInput allowEmpty="true"  label="Employee" source="employee" optionText="value" choices={data} fullWidth/>  
                                    </Box>
                                 <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput label="cheque no" source="chq_no" resource="vouchers" fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                         <DateInput label="Cheque Date" source="chq_date" resource="vouchers" fullWidth/>
                                    </Box>
                                </Box>
                                {/* <TextInput  source="description" resource="vouchers" multiline fullWidth /> */}
                                <TextInput  label="Remarks" source="remarks" resource="vouchers"  multiline fullWidth />
                                <Box mt="1em" />
                            </Box>
    
                            <Box ml="1em">
                            <ArrayInput source="transactions">
                            <SimpleFormIterator>
                            <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                    <ReferenceInput
                                        label="Account"
                                        source="coa"
                                        reference="coa"
                                    >
                                <AutocompleteInput optionText="title"/>
                            </ReferenceInput>
                                        <TextInput label="cheque no" source="chq_no" resource="vouchers" fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                         <DateInput label="Cheque Date" source="chq_date" resource="vouchers" fullWidth/>
                                    </Box>
                                </Box>
                            </SimpleFormIterator>
                             </ArrayInput>
                                {/* <VoucherTable/> */}
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
    )};

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