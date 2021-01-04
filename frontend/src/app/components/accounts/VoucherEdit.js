import { Box, makeStyles, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import {
  Create,
  DateInput,
  DeleteButton,
  Error,
  FormWithRedirect,
  Loading,
  NullableBooleanInput,
  ReferenceInput,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  TextInput,
  useAuthenticated,
  useQueryWithStore,
} from "react-admin";
import VoucherTable from "./VoucherTable";

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

export const VoucherEntry = (props) => {
  useAuthenticated();
  return (
    <div variant="standard">
      <Create basePath="vouchers" resource="vouchers">
        <VisitorForm variant="standard" {...props} />
      </Create>
      Voucher Entry Form goes here
    </div>
  );
};

const segments = [
  { id: "compulsive", name: "Compulsive" },
  { id: "collector", name: "Collector" },
  { id: "ordered_once", name: "Ordered Once" },
  { id: "regular", name: "Regular" },
  { id: "returns", name: "Returns" },
  { id: "reviewer", name: "Reviewer" },
];

const VisitorForm = (props) => {
  const { data, loading, error } = useQueryWithStore({
    type: "getList",
    resource: "notes/list",
    payload: {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "vou_date", order: "DESC" },
      filter: {},
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        // here starts the custom form layout
        <form>
          <Box p="1em">
            <Box display="flex">
              <Box flex={2} mr="1em">
                <Typography variant="h6" gutterBottom>
                  {props.vou_type}
                </Typography>

                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="first_name"
                      resource="customers"
                      fullWidth
                    />
                  </Box>
                  <Box flex={1} ml="0.5em">
                    <TextInput
                      source="last_name"
                      resource="customers"
                      fullWidth
                    />
                  </Box>
                </Box>
                <TextInput
                  source="email"
                  resource="customers"
                  type="email"
                  fullWidth
                />
                <DateInput source="birthday" resource="customers" />
                <Box mt="1em" />

                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>

                <TextInput
                  resource="customers"
                  source="address"
                  multiline
                  fullWidth
                />
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="zipcode"
                      resource="customers"
                      fullWidth
                    />
                  </Box>
                  <Box flex={2} ml="0.5em">
                    <TextInput source="city" resource="customers" fullWidth />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} ml="1em">
                <Typography variant="h6" gutterBottom>
                  Stats
                </Typography>

                <SelectArrayInput
                  optionText="value"
                  source="groups"
                  resource="customers"
                  choices={data}
                  fullWidth
                />
                <ReferenceInput source="notes" reference="notes">
                  <SelectInput optionText="code" />
                </ReferenceInput>
                <SelectInput source="notes" optionText="value" choices={data} />
                <NullableBooleanInput
                  source="has_newsletter"
                  resource="customers"
                />
                <VoucherTable />
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
