import * as M from "@material-ui/core";
import { useState, useEffect } from "react";
import "./index.css";
import { useStyles } from "./styles/styles";
import Inputs from "./components/inputs";

function App() {
  const URL = "https://mustang-index.azurewebsites.net/index.json";
  const styles = useStyles();
  const Fname = "";
  const [click, setClick] = useState(false);
  const [input, setInput] = useState();
  const [createClick, setCreateClick] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [updatedState, setUpdateState] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    zip: "",
  });
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

  console.log(storage);

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
    setReadOnly(false);
  };

  const handleInput = (data) => {
    setCreateClick(false);
    setInput(data);
    let copyList = [...storage];
    copyList.push(data);
    setStorage(copyList);
  };

  const handleTextFields = (e) => {
    const nameValue = e.target.value;
    const name = e.target.name;

    setUpdateState({
      [name]: nameValue,
    });
  };

  const handleUpdateSubmit = () => {};

  return (
    <div className="sub-container">
      <div className="inner-sub-container">
        <M.Paper className={styles.paper} variant="elevation" elevation={3}>
          <div className="input-container">
            <h1>Create, Read, Update, Delete</h1>
            {createClick ? (
              <Inputs data={input} userInputField={handleInput} />
            ) : null}
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
                  <form key={index} onSubmit={handleUpdateSubmit}>
                    <ul>
                      <li className="api-container2">
                        <M.TextField
                          value={updatedState.firstName}
                          placeholder={m.firstName}
                          disabled={readOnly}
                          onChange={handleTextFields}
                        />
                        <M.TextField
                          value={updatedState.lastName}
                          placeholder={m.lastName}
                          disabled={readOnly}
                          onChange={handleTextFields}
                        />
                        <M.TextField
                          value={updatedState.state}
                          placeholder={m.state}
                          disabled={readOnly}
                          onChange={handleTextFields}
                        />
                        <M.TextField
                          value={updatedState.city}
                          placeholder={m.city}
                          disabled={readOnly}
                          onChange={handleTextFields}
                        />
                        <M.TextField
                          value={updatedState.zip}
                          placeholder={m.zip}
                          disabled={readOnly}
                          onChange={handleTextFields}
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
