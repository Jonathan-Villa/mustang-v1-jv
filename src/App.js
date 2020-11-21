import * as M from "@material-ui/core";
import { useState, useEffect } from "react";
import { RiContactsBookLine } from "react-icons/ri";
import "./index.css";
import { useStyles } from "./styles/styles";
import Icons from "./icons";
import Inputs from "./components/inputs";

function App() {
  const URL = "https://mustang-index.azurewebsites.net/index.json";
  const styles = useStyles();
  const [click, setClick] = useState(false);
  const [iconClick, setIconClick] = useState();
  const [input, setInput] = useState();
  const [createClick, setCreateClick] = useState(false)
  const [updateClick, setUpdateClick] = useState(false)
  let [storage, setStorage] = useState([""]);

  const handleClick = () => {
    setClick(() => true);
    setStorage(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
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
      ).then((data) => localStorage.setItem("user", JSON.stringify(data)));
    };

    fetchContacts();
  });

  console.log(storage);

  const handleIconClick = (e) => {
    setIconClick(e);
  };
  console.log(iconClick);

  const handleClickClear = () => {
    localStorage.removeItem("user");
  };
  const handleCreateClick = () => {
    setCreateClick(true)
  };

  const handleUpdateClick =()=>{
    setUpdateClick(true)
  }

  const handleInput = (data) => {
    setCreateClick(false)
    storage.push(data);
    localStorage.setItem("user", JSON.stringify(storage));
  };

  return (
    <M.Container maxWidth="xl" id="main-container">
      <div className="sub-container">
        <div className="inner-sub-container">
          <M.Paper className={styles.paper} variant="elevation" elevation={3}>
            <div className="input-container">
              <h1>Create, Read, Update, Delete</h1>
              {createClick ? <Inputs data={input} userInputField={handleInput} />: null}
            </div>
          </M.Paper>

          <M.Paper  className={styles.paper2} variant="elevation" elevation={3}>
            <div className="input-container2">
              <h1>Contact URLs</h1>

              <div>
                {storage ? (
                  storage.map((m, index) => (
                    <ul key={index}>
                      <br />
                      <li className="api-container2">
                        {`firstName:${m.firstName}`}
                        <br />
                        {`lastName:${m.lastName}`}
                        <br />
                        {`preferredName:${m.preferredName}`}
                        <br />
                        {`email:${m.email}`}
                        <br />
                        {`phoneNumber:${m.phoneNumber}`}
                        <br />
                        {`city:${m.city}`}
                        <br />
                        {`state:${m.state}`}
                        <br />
                        {`zip:${m.zip}`}
                        <br />
                        {`lat: ${m.lat}`}
                        <br />
                        {`lng:${m.lng}`}
                        <hr />
                      </li>
                    </ul>
                  ))
                ) : (
                  <h1>Empty</h1>
                )}
              </div>
            </div>
          </M.Paper>
        </div>
        <div className="btn-container">
          <M.Button
            variant="contained"
            onClick={handleClick}
            aria-label="click me"
            color="primary"
          >
            Click me!
          </M.Button>
          <M.Button
            variant="contained"
            onClick={handleClickClear}
            aria-label="Clear"
            color="secondary"
          >
            Clear Data
          </M.Button>
          <M.Button
            variant="contained"
            onClick={handleCreateClick}
            aria-label="Clear"
            color="secondary"
          >
            Create
          </M.Button>
          <M.Button onClick={handleUpdateClick} variant="contained" aria-label="Clear" color="secondary">
            Update
          </M.Button>
          <M.Button variant="contained" aria-label="Clear" color="secondary">
            Delete
          </M.Button>
        </div>
      </div>
    </M.Container>
  );
}

export default App;
