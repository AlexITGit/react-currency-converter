import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Converter from "./components/converter/Converter";
import Navbar from "./components/navbar/Navbar";
import { fetchCourses } from "./http/coursesAPI";
//import data from "./data";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [val1, setVal1] = useState(1);
  const [name1, setName1] = useState("USD");
  const [val2, setVal2] = useState(1);
  const [name2, setName2] = useState("UAH");
  const [direction1, setDirection1] = useState(true);
  const [direction2, setDirection2] = useState(false);
  const [headerRates, setHeaderRates] = useState({});
  const [convereRrates, setConvererRates] = useState({});
  const headerNames = ["USD", "EUR", "GBP"];
  const convererNames = ["UAH", "USD", "EUR", "RUB", "GBP"];

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setHeaderRates(filter(data.conversion_rates, headerNames));
        setConvererRates(filter(data.conversion_rates, convererNames));
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   setHeaderRates(filter(data, headerNames));
  //   setConvererRates(filter(data, convererNames));
  // }, []);

  useEffect(() => {
    if (!!headerRates) {
      headerValues();
    }
  }, [headerRates]);

  useEffect(() => {
    if (!!convereRrates) {
      handleVal1Change(1);
    }
  }, [convereRrates]);

  let filter = (db, keys) =>
    keys.reduce((a, key) => ((a[key] = db[key]), a), {});

  let format = (num) => {
    return num.toFixed(4);
  };

  function headerValues() {
    for (const key in headerRates) {
      headerRates[key] = (convereRrates["UAH"] / headerRates[key]).toFixed(2);
    }
  }

  function handleVal1Change(val1) {
    setVal2(format((val1 * convereRrates[name2]) / convereRrates[name1]));
    setVal1(val1);
  }
  function handleName1Change(name1) {
    if (direction1) {
      setVal2(format((val1 * convereRrates[name2]) / convereRrates[name1]));
    } else {
      setVal1(format((val2 * convereRrates[name1]) / convereRrates[name2]));
    }
    //setVal2(format((val1 * convereRrates[name2]) / convereRrates[name1]));
    setName1(name1);
  }

  function handleVal2Change(val2) {
    setVal1(format((val2 * convereRrates[name1]) / convereRrates[name2]));
    setVal2(val2);
  }
  function handleName2Change(name2) {
    if (!direction1) {
      setVal1(format((val2 * convereRrates[name1]) / convereRrates[name2]));
    } else {
      setVal2(format((val1 * convereRrates[name2]) / convereRrates[name1]));
    }
    //setVal2(format((val1 * convereRrates[name2]) / convereRrates[name1]));
    setName2(name2);
  }

  function handleDirection() {
    setDirection1(!direction1);
    setDirection2(!direction2);
  }

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <div>
      <Navbar rates={headerRates}></Navbar>
      <div className="group d-flex">
        <div>
          <Converter
            className="converter"
            amount={val1}
            name={name1}
            direction={direction1}
            currencies={Object.keys(convereRrates)}
            onValueChange={handleVal1Change}
            onNameChange={handleName1Change}
          ></Converter>
          <Converter
            amount={val2}
            name={name2}
            direction={direction2}
            currencies={Object.keys(convereRrates)}
            onValueChange={handleVal2Change}
            onNameChange={handleName2Change}
          ></Converter>
        </div>
        <Button className="converter_btn" onClick={handleDirection}>
          Direction
        </Button>
      </div>
    </div>
  );
};

export default App;
