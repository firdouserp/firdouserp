export const ProjectLedegerReport = (props) => {
  const { data, loaded, error } = useQueryWithStore({
    type: "getList",
    resource: "reports/projectledger/" + props.coa,
    payload: {
      pagination: { page: 1, perPage: 500 },
      sort: { field: "coa_code", order: "ASC" },
      filter: { project: 1 },
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

  return projectledger(data);
};
