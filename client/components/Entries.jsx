import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles.scss";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import PasswordEntry from "./PasswordEntry.jsx";


const Entries = () => {
  const [entryUserName, setEntryUserName] = useState("");
  const [entryURL, setEntryURL] = useState("");
  const [entryPassword, setEntryPassword] = useState("");
  const [entries, setEntries] = useState([]);
  const [passwordState, setPasswordState] = useState("password");
  let userID = useSelector((state) => state.userID);

  useEffect(() => {
    fetch(`/api/getAllEntries?userID=${userID}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setEntries([...data]));
  }, [userID]);

  const handleSaveEntries = () => {
    fetch(
      `/api/addEntry?urlEntry=${entryURL}&userName=${entryUserName}&userID=${userID}&passwordEntry=${entryPassword}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => setEntries(data));
  };
  const displayEntries = [];
  entries?.map((element, index) => {
    displayEntries.push(
      <tr className="tableCell">
        <td className="tableCell">{element?.url}</td> {/* need to update to .urlentry to match backend */}
        {/* <td className="tableCell">{element?.username}</td> */}
        {/* <td className="tableCell">{element?.entry_password}</td> */}
        <td className="tableCell">
          <PasswordEntry 
            entryPassword={element?.entry_password} 
            setEntries={setEntries}
            entryURL={element?.url}
            entryUserName={element?.username}
            userID={userID}/>
        </td>
      </tr>
    );
  });
  return (
    // from lines 45-56, create new entries field
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSaveEntries()
        }}>
        <label>Url
          <input
            required='required'
            type='text'
            value={entryURL}
            onChange={(e) => setEntryURL(e.target.value)}/>
            {/* we technically don't need onChange for URL because we're not doing anything with it */}
        </label>
        <label>Username
          <input
            required='required'
            type='text'
            value={entryUserName}
            onChange={(e) => setEntryUserName(e.target.value)}/>
            {/* we technically don't need onChange for username because we're not doing anything with it */}
        </label>
        <label>Password
          <input
            required='required'
            type='text'
            value={entryPassword}
            onChange={(e) => setEntryPassword(e.target.value)}/>
        </label>
      <input type="submit" value="Save">
      </input>
      </form>

      
      

      <PasswordStrengthMeter password={entryPassword} />

      {/* <button
        style={{
          borderRadius: "18px",
          height: "20px",
          width: "50px",
          fontSize: "10px",
        }}
        onClick={() =>
          setPasswordState(passwordState === "password" ? "text" : "password")
        }
      >
        Reveal
      </button> */}

      {entries.length > 0 && (
        <table>
          <tr className="tableCell">
            <td className="tableCell">URL</td>
            <td className="tableCell">Username</td>
            <td className="tableCell">Passwords</td>
          </tr>

          {displayEntries}
        </table>
      )}
    </>
  );
};

export default Entries;
