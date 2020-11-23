import * as M from "@material-ui/core";
import { useState } from "react";
import "./index.css";
import { useStyles } from "./styles/styles";
import Inputs from "./components/inputs";
import { MdAddCircle } from "react-icons/md";
import useInput from "./helpers/useInput";


function App() {
  const URL = "https://mustang-index.azurewebsites.net/index.json";
  const styles = useStyles();

  const [input, setInput] = useState([]);
  const [createClick, setCreateClick] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const [firstName, bindFirstName, resetFirstName] = useInput("");
  const [lastName, bindLastName, resetLastName] = useInput("");
  const [zip, bindZip, resetZip] = useInput("");

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
      .then(
        (arr) =>
          arr.map((index, key) => ({
            id: key,
            firstName: index.firstName,
            lastName: index.lastName,
            state: index.state,
            city: index.city,
            zip: index.zip,
          })) // Store the contact the data
      )
      .then((data) => setStorage(data));
  };

  const handleReadClick = () => {
    fetchContacts();
    setReadOnly(true);
    setCreateClick(false);
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

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      state: input.state,
      city: input.city,
      zip: zip,
    };
    // create copy
    let copyList = [...storage];

    copyList.splice(-1, 1);
    // update last input
    copyList.push(data);
    setStorage(copyList);
    resetFirstName();
    resetLastName();
    resetZip();
  };

  return (
    <div className="sub-container">
      <div className="inner-sub-container">
        <M.Paper className={styles.paper} variant="elevation" elevation={3}>
          <div className="input-container">
            <h1>Create, Read, Update, Delete</h1>

            {createClick ? (
              <Inputs data={input} userInputField={handleInput} />
            ) : null}

            {updateClick ? (
              input !== null ? (
                <form
                  className="form-update-container"
                  onSubmit={handleUpdateSubmit}
                >
                  <M.IconButton className={styles.iconBtn} type="submit">
                    <MdAddCircle />
                  </M.IconButton>
                  <input
                    list="firstName"
                    placeholder={input.firstName}
                    name="firstName"
                    disabled={readOnly}
                    {...bindFirstName}
                  />

                  <input
                    list="lastName"
                    placeholder={input.lastName}
                    disabled={readOnly}
                    name="lastName"
                    {...bindLastName}
                  />

                  <input
                    list="state"
                    placeholder={input.state}
                    name="state"
                    disabled={readOnly}
                  />
                  <input
                    list="city"
                    placeholder={input.city}
                    name="city"
                    disabled={readOnly}
                  />
                  <input
                    list="zip"
                    name="zip"
                    placeholder={input.zip}
                    disabled={readOnly}
                    {...bindZip}
                  />
                  <datalist id="firstName">
                    {storage.map((m, key) => (
                      <div key={key}>
                        <option value={m.firstName} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="lastName">
                    {storage.map((m, key) => (
                      <div key={key}>
                        <option value={m.lastName} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="state">
                    {storage.map((m, key) => (
                      <div key={key}>
                        <option value={m.state} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="city">
                    {storage.map((m, key) => (
                      <div key={key}>
                        <option value={m.city} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="zip">
                    {storage.map((m, key) => (
                      <div key={key}>
                        <option value={m.zip} />
                      </div>
                    ))}
                  </datalist>
                </form>
              ) : (
                ""
              )
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
                  <ul key={index}>
                    <li className="api-container2">
                      {`First Name: ${m.firstName}`}
                      <br />
                      {`Last Name: ${m.lastName}`}
                      <br />
                      {`State: ${m.state}`}
                      <br />
                      {`City: ${m.city}`}
                      <br />
                      {`Zip: ${m.zip}`}
                    </li>
                    <hr />
                  </ul>
                )) || null
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
