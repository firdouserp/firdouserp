
import { Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import * as React from "react";
import {
    ArrayInput, Create, DateInput, DeleteButton, Error, FormWithRedirect, Loading, NumberInput, required,
    SaveButton,
    SelectInput, SimpleFormIterator,
    TextInput, useAuthenticated, useQueryWithStore
} from 'react-admin';
import { useLocation } from "react-router";

const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1em', width: "40%" },
    smallwidth: { display: 'inline-flex', marginRight: '0.2em', width: '25%' }
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
    return (

        <div >
            <Create basePath="vouchers" resource="vouchers">
                <VisitorForm vou_type={vou_type} {...props} />
            </Create>
        </div>

    )
};






const segments = [
    { id: 'compulsive', name: 'Compulsive' },
    { id: 'collector', name: 'Collector' },
    { id: 'ordered_once', name: 'Ordered Once' },
    { id: 'regular', name: 'Regular' },
    { id: 'returns', name: 'Returns' },
    { id: 'reviewer', name: 'Reviewer' },
];

const VisitorForm = props => {
    const classes = useStyles();
    const initial = [{ "coa": "Debit Account" }, { "coa": "Credit Account", }]
    // const toCurrency= (number)=> {
    //     const formatter = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "PKR"
    //     });
    //     console.log(number)
    //     formatter.format(number);
    // }
    const { data, loading, error } = useQueryWithStore({
        type: 'getList',
        resource: 'notes/list',
        payload: { pagination: { page: 1, perPage: 100 }, sort: { field: 'vou_date', order: 'DESC' }, filter: {} }
    });

    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!data) return null;

    return (


        <FormWithRedirect
            {...props}
            render={formProps => (
                // here starts the custom form layout
                <form>
                    <Box p="1em" style={{ border: "1px solid #e0e0e3" }}>
                        <Box display="flex">
                            <Box flex={1} mr="1em">

                                <Typography variant="h6" gutterBottom>Voucher Entry {props.vou_type}</Typography>
                                <Box flex={1}>
                                    <SelectInput margin="none" label="Voucher Type" source="vou_type" optionText="value" choices={data} validate={[required()]} fullWidth />
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput margin="none" disabled source="vou_no" resource="vouchers" fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <DateInput initialValue={new Date()} margin="none" source="vou_date" resource="vouchers" validate={[required()]} autoFocus fullWidth />
                                    </Box>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <SelectInput margin="none" allowEmpty={true} label="Vendor" source="suppliers" optionText="value" choices={data} fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <SelectInput margin="none" label="Project" source="project" optionText="value" choices={data} validate={[required()]} fullWidth />
                                    </Box>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <SelectInput margin="none" allowEmpty={true} label="Unit" source="unit" optionText="value" choices={data} fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <SelectInput margin="none" allowEmpty={true} label="Stock" source="stock" optionText="value" choices={data} fullWidth />
                                    </Box>

                                </Box>
                                <Box flex={1}>
                                    <SelectInput margin="none" allowEmpty={true} label="Employee" source="employee" optionText="value" choices={data} fullWidth />
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput margin="none" label="cheque no" source="chq_no" resource="vouchers" fullWidth />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <DateInput margin="none" label="Cheque Date" source="chq_date" resource="vouchers" fullWidth />
                                    </Box>
                                </Box>
                                <TextInput source="description" resource="vouchers" multiline fullWidth />
                                <TextInput margin="none" label="Remarks" source="remarks" resource="vouchers" multiline fullWidth />
                                <Box mt="1em" />
                            </Box>
                            <Box display="flex" flexGrow={1} ml="1em" width="100%"  >
                                <ArrayInput initialValue={initial} variant="standard" source="transactions" label="Transactions">


                                    <SimpleFormIterator>

                                        <TextInput formClassName={classes.inlineBlock} label="Account" source="coa" resource="vouchers" multiline fullWidth />
                                        {/* <TextInput formClassName={classes.inlineBlock} label ="Description" source="description" resource="vouchers" multiline fullWidth margin="none"/> */}
                                        <NumberInput formClassName={classes.smallwidth} label="Debit" source="dr" resource="vouchers" fullWidth />
                                        <NumberInput formClassName={classes.smallwidth} label="Credit" source="cr" resource="vouchers" fullWidth />


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
    )
};

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