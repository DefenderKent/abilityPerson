import React from "react";
import style from "./Person.module.css";
import Person from "./Person";

const Persons = props => {
  return (
    <div className={style.mb10}>
      {props.person.map === undefined ? (
        <Person
          key={props.person.id}
          firstName={props.person.firstName}
          lastName={props.person.lastName}
        />
      ) : (
        props.person.map(p => (
          <Person
            key={p.id}
            id={p.id}
            firstName={p.firstName}
            lastName={p.lastName}
            updatePerson={props.updatePerson}
            setPerson={props.setPerson}
          />
        ))
      )}
    </div>
  );
};

export default Persons;
