import React from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Form,
} from "@material-ui/core";
import useInput from "../helpers/useInput";
function Inputs(props) {
  const [firstName, bindFirstName, resetFirstName] = useInput("");
  const [lastName, bindLastName, resetLastName] = useInput("");
  const [preferredName, bindPreferredName, resetPreferredName] = useInput("");
  const [email, bindEmail, resetEmail] = useInput("");
  const [phoneNumber, bindPhoneNumber, resetPhoneNumber] = useInput("");
  const [city, bindCity, resetCity] = useInput("");
  const [state, bindState, resetState] = useInput("");
  const [zip, bindZip, resetZip] = useInput("");
  const [lat, bindLat, resetLat] = useInput("");
  const [lng, bindLng, resetLng] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInputData = { // object with form data
      firstName: firstName,
      lastName: lastName,
      preferredName: preferredName,
      email: email,
      phoneNumber: phoneNumber,
      city: city,
      state: state,
      zip: zip,
      lat: lat,
      lng: lng,
    };

    // props function for component to parent
    props.userInputField(userInputData);

    // clear fields
    resetFirstName(); 
    resetLastName();
    resetPreferredName();
    resetEmail();
    resetPhoneNumber();
    resetCity();
    resetState();
    resetZip();
    resetLat();
    resetLng();
  };

  return (
    <form typeof="post" onSubmit={handleSubmit}>
      <TextField
      type="text"
      fullWidth
        variant="filled"
        value="firstName"
        name="firstName"
        label="First Name"
        {...bindFirstName}
      />
      <TextField
        variant="filled"
        value="lastName"
        name="lName"
        label="Last Name"
        {...bindLastName}
      />
      <TextField
        variant="filled"
        value="preferredName"
        name="pName"
        label="Preferred Name"
        {...bindPreferredName}
      />
      <TextField
        variant="filled"
        value="email"
        name="email"
        label="Email"
        {...bindEmail}
      />
      <TextField
        variant="filled"
        value="phoneNumber"
        name="phoneNumer"
        label="Phone Number"
        {...bindPhoneNumber}
      />
      <TextField
        variant="filled"
        value="city"
        name="city"
        label="City"
        {...bindCity}
      />
      <TextField
        variant="filled"
        value="state"
        name="state"
        label="State"
        {...bindState}
      />
      <TextField
        variant="filled"
        value="zip"
        name="zip"
        label="Zip"
        {...bindZip}
      />
      <TextField
        variant="filled"
        value="lat"
        name="lat"
        label="Latitude"
        {...bindLat}
      />
      <TextField
        variant="filled"
        value="lng"
        name="lng"
        label="Longitude"
        {...bindLng}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default Inputs;
