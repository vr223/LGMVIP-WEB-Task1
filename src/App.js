import React, { useState, useEffect } from "react";
import './App.css';
import './style.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import logo from './images/META.png'
import 'bootstrap/dist/css/bootstrap.css';
import Service from './service';
import { Button } from "bootstrap";

function App() {

  const [user, setuser] = useState("");
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const getusers = () => {
    Service.getusers().then(
      (res) => {
        setSpinnerLoading(true);
      
        setTimeout(() => {
          setuser(res.data);
          setSpinnerLoading(false)
        }, 3000);

      },
      (error) => {
        console.log(error)
      }
    );
  }

  
  useEffect(() => { console.log(user) }, [user])


  return (
    <>
      <nav className="navbar fixed-top">
     <div className="logo"><img className="meta"src={logo} alt="META"></img></div>
        <div className="push-left">
         <ul id="primary-menu" className="menu nav-menu">
           <button className="but">
            <li className="menu-item current-menu-item"><a className="nav__link" onClick={getusers}
              href="/#"> Get Users </a></li></button>
          </ul>
        </div>
      </nav>
      
      <div className="center" >
        <Loader 
          type="Circles"
          color="purple"
          height={100}
          width={100}
          timeout={4000} 
          visible={spinnerLoading}
        />
      </div>

      {user && (
        <section>
          <div className="d-flex-row p-2 justify-center send">
            {user.map( (data) => (
              <div className="card d-inline-flex wrap justify-content-center m-3">
                <div className="text">
                  <img src={data.avatar} alt="img"></img>
                  <h3>{data.first_name + " " + data.last_name}</h3>
                  <p>{data.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


    </>
  );
}

export default App;
