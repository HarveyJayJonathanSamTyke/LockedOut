import React, { useState } from "react";



const PasswordEntry = (props) => {

    const [passwordState, setPasswordState] = useState(props.entryPassword);
    const [passwordType, setPasswordType] = useState('password');
    const [usernameState, setUsernameState] = useState(props.entryUserName);
    const [readOnlyState, setReadOnlyState] = useState(true);
    const [editState, setEditState] = useState("Edit");
    
    const handleEditEntries = () => {
      // needs to change input readOnly property (line 34 & line 45) to false
      if (readOnlyState === true){
        setReadOnlyState(false);
        setEditState("Save");
      } else {
          // if entry primary key is available, use that instead
          fetch(
            `/api/updateEntry?urlEntry=${props.entryURL}&userName=${usernameState}&userID=${props.userID}&passwordEntry=${passwordState}`,
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
        <button className="entrybtn"
  
          onClick={() =>
            setPasswordType(passwordType === "password" ? "text" : "password")
          }
        >
          Reveal
        </button>

        {/* edit button */}
        <button className="entrybtn"
          
          onClick={() =>
            handleEditEntries()
          }
        >
          {editState}
        </button>

        {/* delete button */}
        <button className="entrybtn"
          
          onClick={() =>
            handleDeleteEntries()
          }
        >
          Delete
        </button>
      </>
    );
};

export default PasswordEntry;