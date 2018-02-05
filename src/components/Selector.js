import React from "react";
import axios from "axios";

const Selector = props => {
  return (
    <div>
      <select onChange={props.onChange}>
        {props.criteria &&
          props.criteria.map((val, i) => {
            return (
              <option key={i}>
                {typeof val === "number" ? val : val.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};
export default Selector;
