import "./Converter.css";
import { Form } from "react-bootstrap";

const Converter = (props) => {
  const { amount, name, currencies, direction } = props;
  return (
    <div className="converter">
      <Form.Control
        type="number"
        placeholder="..."
        name="val1"
        value={amount}
        onChange={(e) => {
          props.onValueChange(e.target.value);
        }}
      />
      <select
        style={{ width: 100 }}
        className="form-select"
        aria-label="Default select example"
        value={name}
        onChange={(e) => {
          props.onNameChange(e.target.value);
        }}
      >
        {currencies.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <span className="from_to">{direction ? "From" : "To"}</span>
    </div>
  );
};

export default Converter;
