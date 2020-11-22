import * as M from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import { useStyles } from "./styles/styles";
import Inputs from "./components/inputs";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
const apiKey = "AIzaSyCdnUr2jm0d1m07Awac2ZgHH66ekKT21oQ"
const library = ["places"]
function App() {

  const URL = "https://mustang-index.azurewebsites.net/index.json";
  const styles = useStyles();
  const Fname = "";
  const [click, setClick] = useState(false);
  const [input, setInput] = useState();
  const [autoInput, setAutoInput] = useState([])
  const [createClick, setCreateClick] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const formKey = useRef()
  const firstName = useRef(null)
  const lastName = useRef(null)
  const state = useRef(null)
  const city = useRef(null)
  const zip = useRef(null)

  let [storage, setStorage] = useState([""]);

  const fetchContacts = async () => {
    let copyURLs = [];
    const data = await fetch(URL)
      .then((res) => res.json())
      .then((arr) => arr) // get array
      .catch((err) => console.log(err));

    data.forEach((element) => copyURLs.push(element.ContactURL));
    Promise.all(
      copyURLs.map((urls) =>
        fetch(urls).then((parse) =>
          parse.json().then((dataObjects) => dataObjects)
        )
      )
    )
      .then((arr) =>
        arr.map((index) => ({
          firstName: index.firstName,
          lastName: index.lastName,
          state: index.state,
          city: index.city,
          zip: index.zip,
        }))
      )
      .then((data) => setStorage(data));
  };


  const handleReadClick = () => {
    setClick(true);
    fetchContacts();
    setReadOnly(true);
  };

  const handleClickDelete = () => {
    let copyList = [...storage];
    copyList.pop();
    setStorage(copyList);
  };

  const handleCreateClick = () => {
    setCreateClick(true);
    setUpdateClick(false);
  };

  const handleUpdateClick = (data) => {
    setUpdateClick(true);
    setCreateClick(false);
    let directions = [...autoInput.gm_accessors_.place.qe.place.address_components] 
    console.log(directions)
    setAutoInput(directions)
    setReadOnly(false);
  };

  const handleInput = (data) => {
    setCreateClick(false);
    setInput(data);
    let copyList = [...storage];
    copyList.push(data);
    setStorage(copyList);
  };


  const handleUpdateSubmit = (e) => {
    e.preventDefault()
  };

  const handleLoad = (autoComplete) => setAutoInput(autoComplete)

  return (
    <div className="sub-container">
      <div className="inner-sub-container">
        <M.Paper className={styles.paper} variant="elevation" elevation={3}>
          <div className="input-container">
            <h1>Create, Read, Update, Delete</h1>
            {createClick ? (
              <Inputs data={input} userInputField={handleInput} />
            ) : null}
            {updateClick ? <LoadScript libraries={library} googleMapsApiKey={apiKey}>
              <div id="input-container">
                <Autocomplete onLoad={handleLoad} >
                  <M.TextField fullWidth autoFocus type="search" id="input-map" variant="filled" />
                </Autocomplete>
              </div>
            </LoadScript> : null}
          </div>
        </M.Paper>

        <M.Paper className={styles.paper2} variant="elevation" elevation={3}>
          <div className="input-container2">
            <h1>Contact URLs</h1>

            <div>
              {storage === null ? (
                <h1>Empty</h1>
              ) : (
                  storage.map((m, index) => (
                    <form key={index} ref={formKey} onSubmit={handleUpdateSubmit}>
                      <ul>
                        <li className="api-container2">

                          <M.TextField

                            ref={firstName}
                            placeholder={m.firstName}
                            name="firstName"
                            disabled={readOnly}

                          />
                          <M.TextField
                            ref={lastName}
                            placeholder={m.lastName}
                            disabled={readOnly}
                            name="lastName"

                          />
                          <M.TextField
                            ref={state}
                            placeholder={m.state}
                            name="state"
                            disabled={readOnly}
                          />
                          <M.TextField
                            ref={city}
                            placeholder={m.city}
                            name="city"
                            disabled={readOnly}

                          />
                          <M.TextField
                            ref={zip}
                            name="zip"
                            placeholder={m.zip}
                            disabled={readOnly}
                          />
                        </li>
                        <hr />
                      </ul>
                    </form>
                  ))
                )}
            </div>
          </div>
        </M.Paper>
      </div>
      <div className="btn-container">
        <M.Button
          variant="contained"
          onClick={handleCreateClick}
          aria-label="Clear"
          color="secondary"
        >
          Create
        </M.Button>
        <M.Button
          variant="contained"
          onClick={handleReadClick}
          aria-label="click me"
          color="primary"
        >
          Read
        </M.Button>
        <M.Button
          onClick={handleUpdateClick}
          variant="contained"
          aria-label="Clear"
          color="secondary"
        >
          Update
        </M.Button>

        <M.Button
          onClick={handleClickDelete}
          variant="contained"
          aria-label="Clear"
          color="secondary"
        >
          Delete
        </M.Button>
      </div>


    </div>
  );
}

export default App;
