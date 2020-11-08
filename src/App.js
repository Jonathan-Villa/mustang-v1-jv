import * as M from "@material-ui/core";
import react, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [click, setClick] = useState(false);
  const [data, setData] = useState([]);
  const [contactData, setContactData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (click) {
      const time = setTimeout(() => {
        setIsLoading(() => false);
        fetchAPI()
        fetchContacts()
      }, 3000);
      return () => clearTimeout(time)
    }
  });

  const handleClick = () => {
    setClick(() => true); 
    setIsLoading(() => true);
  };

  const fetchAPI = async () => {
    const data1 = await fetch(
      "https://mustang-index.azurewebsites.net/index.json"
    )
      .then((res) => 
      res.json()
      .then((arr) => arr)) // array of objects
      .catch((e) => console.log(e));

    setData(data1.map((d) => ({ 
        Name: d["Name"],
        Email: d["Email"],
        ContactURL: d["ContactURL"],
      }))
    );
  };

  const fetchContacts = () => {
    fetch("https://mustang-index.azurewebsites.net/index.json")
      .then((res) => res.json())
      .then(arr => getArray(arr))  // get array
      .catch((err) => console.log(err))
  }

  const getArray = (dataArray) => {
    const copyList = [] 

    dataArray.forEach((element) => {  // get contact URLs
      copyList.push(element.ContactURL) 
    });

    Promise.all(copyList.map((urls) => // fetch all JSON data from URLs
      fetch(urls)
        .then(res => res.json())
        .catch(err => console.log(err))
    ))
      .then(data => setContactData(data.map((d) => ({ // Final response from promise
        firstName: d["firstName"],
        lastName: d["lastName"],
        preferredName: d["preferredName"],
        email: d["email"],
        phoneNumber: d["phoneNumber"],
        city: d["city"],
        state: d["state"],
        zip: d["zip"],
        lat: d["lat"],
        lng: d["lng"],
      }))));
  }

  return (
    <M.Container maxWidth="xl" id="main-container">
      <div className="sub-container">

      <div className="inner-sub-container">

      <div className="input-container">
          {isLoading ? <h1>Loading ...</h1> : null}
          <h1>Mustang Contact</h1>
          {data.map((m, index) => (
            <ul key={index}>
              <li className="api-container" >
                {`Name:${m.Name}`}
                <br />
                {`Email:${m.Email}`}
                <br />
                {`ContactURL:${m.ContactURL}`}
                <hr />

              </li>
            </ul>
          ))}
        </div>

        <div className="input-container2">
          {isLoading ? <h1>Loading ...</h1> : null}
          <h1>Contact URLs</h1>

          {contactData.map((m, index) =>

            <ul key={index}>

              <li className="api-container2" >
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
            </ul>)
          }
        </div>
      </div>



        <M.Button
          variant="contained"
          onClick={handleClick}
          aria-label="click me"
          color="primary"
        >
          Click me!
        </M.Button>

      </div>
    </M.Container>
  );
}

export default App;
