import React, { useState } from "react";



const PasswordEntry = (props) => {
    console.log(`this is password entry props:`, props)
    // // this was just testing if we can update state on change
    // if (setUsernameState) setUsernameState(props.entryUserName);
    // if (setPasswordState) setPasswordState(props.passwordState);

    // this declares initial state and we thought it would update on each render
    const [passwordState, setPasswordState] = useState(props.entryPassword);
    const [passwordType, setPasswordType] = useState('password');
    const [usernameState, setUsernameState] = useState(props.entryUserName);
    const [readOnlyState, setReadOnlyState] = useState(true);
    const [editState, setEditState] = useState("Edit");

    console.log(`this is usernameState:`, usernameState);
    console.log(`this is passwordState:`, passwordState);

    // useEffect(() => {
    //   console.log(`this is usernameState:`, usernameState);
    //   console.log(`this is passwordState:`, passwordState);
    // }, [usernameState, passwordState]);
    
    const handleEditEntries = () => {
      // needs to change input readOnly property (line 34 & line 45) to false
      if (readOnlyState === true){
        setReadOnlyState(false);
        setEditState("Save");
      } else {
          // if entry primary key is available, use that instead
          fetch(
            `/api/updateEntry?urlEntry=${props.entryURL}&userName=${usernameState}&userID=${props.userID}&passwordEntry=${passwordState}`,
            // `/api/updateEntry?urlEntry=${props.entryURL}&userName=${props.entryUserName}&userID=${props.userID}&passwordEntry=${props.entryPassword}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
            }
          )
            .then((res) => res.json())
            .then((data) => props.setEntries(data));
        };
      return;
    };


    
    const handleDeleteEntries = () => {
      // if entry has primary key, it's better to use that
      fetch(
        `/api/deleteEntry?urlEntry=${props.entryURL}&userName=${props.entryUserName}&userID=${props.userID}&passwordEntry=${props.entryPassword}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => props.setEntries(data));
    };
    
    return (
      <>
        {/* username input box and display */}
        <input
          style={{ marginTop: "3px", marginLeft: "10px" }}
          id="username-input"
          className="form-group shadow-none"
          readOnly= {readOnlyState}
          type="text"
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
        ></input>

        {/* password input box and display */}
        <input
          style={{ marginTop: "3px", marginLeft: "10px" }}
          id="password-input"
          className="form-group shadow-none"
          readOnly={readOnlyState}
          type={passwordType}
          value={passwordState}
          onChange={(e) => setPasswordState(e.target.value)}
        ></input>

        {/* reveal button */}
        <button
          style={{
            borderRadius: "18px",
            height: "20px",
            width: "50px",
            fontSize: "10px",
          }}
          onClick={() =>
            setPasswordType(passwordType === "password" ? "text" : "password")
          }
        >
          Reveal
        </button>

        {/* edit button */}
        <button
          style={{
            borderRadius: "18px",
            height: "20px",
            width: "50px",
            fontSize: "10px",
          }}
          onClick={() =>
            handleEditEntries()
          }
        >
          {editState}
        </button>

        {/* delete button */}
        <button
          style={{
            borderRadius: "18px",
            height: "20px",
            width: "50px",
            fontSize: "10px",
          }}
          onClick={() =>
            handleDeleteEntries()
          }
        >
          Delete
        </button>
      </>
    );
};

export default PasswordEntry