import CircularProgress from '@material-ui/core/CircularProgress';
import { Error, SelectInput, useQueryWithStore } from "react-admin";
const FirdousSelect = ({ list, sort, filter = {}, ...props }) => {
  const { data, loading, error } = useQueryWithStore({
    type: "getList",
    resource: list,
    payload: {
      pagination: { page: 1, perPage: 500 },
      sort: { field: sort, order: "ASC" },
      filter: filter,
    },
  });

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Error />;
  }
  console.log("data -" + data);
  if (!data) {
    console.log("return null");
    return null;
  }

  return <SelectInput {...props} choices={data} />;
};

export default FirdousSelect;
