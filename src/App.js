import * as M from "@material-ui/core";
import react, { useState, Suspense, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [data, setData] = useState([]);
  const [contactData, setContactData] = useState([])
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (click) {
      setTimeout(() => {
        setLoading(() => false);
        fetchAPI();
        fetchContacts()
  
      },3000);
    }

  
  }, [click, data]);

  const handleClick = () => {
    setClick(() => true);
    setLoading(() => true);
    console.log(contactData)
  };


  const fetchAPI = async () => {
    const data1 = await fetch(
      "https://mustang-index.azurewebsites.net/index.json"
    )
      .then((v) => 
      v.json()
      .then((arr) => arr))
      .catch((e) => console.log(e));

    setData(
      data1.map((m) => ({
        Name: m["Name"],
        Email: m["Email"],
        ContactURL: m["ContactURL"],
      }))
    );
  };

  
  const fetchContacts = async () => {
    const data2 = await fetch(
      "https://mustang-index.azurewebsites.net/index.json"
    )
      .then((v) => v.json()).then( arr => 
          {arr.forEach(e =>{
               fetch(e.ContactURL)
              .then(j=> j.json().then(v=> v))
            })}
        )
      .catch((e) => console.log(e))
  
     
      
      // setContactData(
      //   data2.map((m)=> ({
      //   firstName: m["firstName"],
      //   lastName: m["lastName"],
      //   preferredName: m["preferredName"],
      //   email: m["email"],
      //   phoneNumber: m["phoneNumber"],
      //   city: m["city"],
      //   state: m["state"],
      //   zip: m["zip"],
      //   lat: m["lat"],
      //   lng: m["lng"],
      // })))

    }


  return (
    <M.Container maxWidth="md" id="main-container">
      <div className="sub-container">
        <div className="input-container">
          {isLoading ? <h1>Loading ...</h1> : null}
          {data.map((m, index) => (
            <div
              className="api-container"
              key={index}
            >{`Name:${m.Name}, Email: ${m.Email}, ContactURL: ${m.ContactURL}\n`}</div>
          ))}
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
