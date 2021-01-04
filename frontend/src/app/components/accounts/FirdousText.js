import TextField from "@material-ui/core/TextField";
import { useField } from "react-final-form";
const FirdousText = (...props) => {
  console.log(props);
  const {
    input: { onChange },
    meta: { touched, error },
  } = useField(props.name);
  return (
    <TextField
      name={props.name}
      label={props.label}
      onChange={onChange}
      error={!!(touched && error)}
      helperText={touched && error}
    />
  );

  return <TextField name="myfield" />;
};

export default FirdousText;
