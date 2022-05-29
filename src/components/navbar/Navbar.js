import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const { rates } = props;
  return (
    <div className="head_navbar">
      <div className="header_navbar">
        <h1>Конвертер валют</h1>
      </div>
      <div className="courses_navbar">
        {Object.keys(rates).map((rate) => (
          <div key={rates[rate]} className="d-flex">
            <div className="courses_item">{rate}</div>
            <div className="val_item">{rates[rate]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
