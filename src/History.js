import React from "react";

const History = ({ history, onResetHistory }) => {
  return (
    <div className="history-title">
      <h2 className="history">Your History</h2>
      <div>
        <span>
          {history.length} element{history.length > 1 ? "s" : ""}{" "}
        </span>
        <button id="reset" onClick={onResetHistory}>
          Reset
        </button>
        {history.map((el, index) => {
          return (
            <p className="history-element" key={`${el.expression}${index}`}>
              {el.expression} = {el.result}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default History;
