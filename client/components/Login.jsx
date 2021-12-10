import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import store from "../store";
import { Card, Image } from 'react-bootstrap';
import Dashboard from "./Dashboard.jsx";
// import './App.css';

const Login = () => {

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const handleUserFetch = (data) => {
    console.log('dispatch is happening')
    console.log(data);
    // check if user exists
      // if user exists, they change login state to be true
    store.dispatch({
      type: "ADD_USER_ID",
      payload: data.userID,
    });
  };

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setLogin(true);
      console.log('this is line 28 response:', response);
      const facebookid = response.id;
      const name = response.name;
      const pictureurl = response.picture.data.url;

      fetch(`/api/login?id=${facebookid}&name=${name}&pictureurl=${pictureurl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        // .then((response) => console.log('this is line 35', response))
        .then((response) => handleUserFetch(response))
        // .then((data) => console.log('this is line 40', data))
        // setData(response);
        // setPicture(response.picture.data.url);
      // console.log('this is the response id', response.id);
    } else {
      setLogin(false);
    }
    // console.log('this is line 24 response:', response);
    // username = response.id;
    // fetch(`/api/login?username=${username}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   // .then((response) => console.log('this is line 35', response))
    //   .then((response) => handleUserFetch(response))
    //   .then((data) => console.log('this is line 37', data))
    //   setData(response);
    //   setPicture(response.picture.data.url);
    // console.log('this is the response id', response.id);
    // if (response.accessToken) {
    //   setLogin(true);
    // } else {
    //   setLogin(false);
    // }
    // username = response.accessToken;
    // console.log(username)
  }

  return (
    <div class="container">
      <Card style={{ width: '600px' }}>
        <Card.Header>
          {!login &&
            <FacebookLogin
              appId="772535610372466"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={ responseFacebook }
              icon="fa-facebook" />
          }
          {login &&
            <Image src={picture} roundedCircle />
          }
        </Card.Header>
        {login && <Dashboard/> }
           {/* <Card.Body>
             <Card.Title>{data.name}</Card.Title>
             <Card.Text>
               {data.email}
             </Card.Text>
           </Card.Body>
        } */}
      </Card>
    </div>
  );
}
export default Login;