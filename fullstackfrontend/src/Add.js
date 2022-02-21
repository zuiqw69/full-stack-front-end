import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEvent(
        props.currentEvent._id,
        e.target.eventName.value,
        e.target.location.value,
        e.target.information.value,
        e.target.date.value
      );
    } else {
      result = props.client.addEvent(
        e.target.eventName.value,
        e.target.location.value,
        e.target.information.value,
        e.target.date.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentEvent ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Name: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.name}
          name="eventName"
          disabled={disabled}
        />
        <br />
        Location: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.location}
          name="eventLocation"
          disabled={disabled}
        />
        <br />
        Information: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.information}
          name="eventInfo"
          disabled={disabled}
        />
        <br />
        Date/Time:
        <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.date}
          name="evertDate"
          disabled={disabled}
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
