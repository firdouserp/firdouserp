import CircularProgress from "@material-ui/core/CircularProgress";
import { AutocompleteInput, Error, useQueryWithStore } from "react-admin";
const FirdousSelect = ({ list, sort, filter = {}, ...props }) => {
  console.log(list, sort, filter);
  const { data, loaded, error } = useQueryWithStore({
    type: "getList",
    resource: list,
    payload: {
      pagination: { page: 1, perPage: 500 },
      sort: { field: sort, order: "ASC" },
      filter: filter,
    },
  });

  if (!loaded) {
    return <CircularProgress />;
  }
  if (error) {
    return <Error />;
  }
  if (!data) {
    console.log("return null");
    return null;
  }

  // return (
  //   <Autocomplete
  //     {...props}
  //     id="combo-box-demo"
  //     options={data}
  //     name="daata"
  //     onChange={(event, value) => console.log(props)}
  //     getOptionLabel={(option) => option.title}
  //     style={{}}
  //     renderInput={(params) => (
  //       <TextField source="dddd" {...params} {...props} variant="filled" />
  //     )}
  //   />
  // );
  // onChange={(event, value) => console.log(value)}
  return (
    <AutocompleteInput translateChoice={false} {...props} choices={data} />
  );
};

export default FirdousSelect;
