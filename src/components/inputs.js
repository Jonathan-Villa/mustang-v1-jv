import React from "react";
import { TextField, Button } from "@material-ui/core";
import useInput from "../helpers/useInput";
import { inputStyles } from "./inputstyles";

function Inputs(props) {
  const styles = inputStyles();
  const [firstName, bindFirstName, resetFirstName] = useInput("");
  const [lastName, bindLastName, resetLastName] = useInput("");
  const [city, bindCity, resetCity] = useInput("");
  const [state, bindState, resetState] = useInput("");
  const [zip, bindZip, resetZip] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInputData = {
      // object with form data
      firstName: firstName,
      lastName: lastName,
      city: city,
      state: state,
      zip: zip,
    };

    // props function for component to parent
    props.userInputField(userInputData);

    // clear fields
    resetFirstName();
    resetLastName();
    resetCity();
    resetState();
    resetZip();
  };

  return (
    <form typeof="post" className="form-container" onSubmit={handleSubmit}>
        <TextField
        
          fullWidth
          className={styles.root}
          type="text"
          required={true}
          variant="filled"
          name="firstName"
          autoFocus={true}
          label="First Name"
          inputProps={props.inputFName}
          {...bindFirstName}
        />


      <TextField
        fullWidth
        className={styles.root}
        required={true}
        variant="filled"
        name="lName"
        label="Last Name"
        {...bindLastName}
      />

      <TextField
        fullWidth
        className={styles.root}
        required={true}
        variant="filled"
        name="city"
        label="City"
        {...bindCity}
      />
      <TextField
        fullWidth
        className={styles.root}
        required={true}
        variant="filled"
        name="state"
        label="State"
        {...bindState}
      />
      <TextField
        fullWidth
        className={styles.root}
        required={true}
        variant="filled"
        name="zip"
        label="Zip"
        {...bindZip}
      />

      <Button
        className={styles.btn}
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default Inputs;
