/* eslint-disable no-eval */
// https://eslint.org/docs/rules/no-eval

import React, { Component } from "react";
import History from "./History";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      expression: "",
      history: []
    };
  }

  handleKeyboard(e) {
    this.setState({
      expression: this.state.expression + this.sanitize(e.key)
    });
    if (e.key === "Enter") {
      this.handleEval();
    }
  }

  sanitize(value) {
    return value.replace(/([^+-/*\d]*)/g, "");
  }

  handleUserInput(e) {
    const validChar = e.target.textContent.replace(/x/g, "*");
    if (validChar !== "=" && validChar.length === 1) {
      // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
      this.setState(prevState => ({
        expression: prevState.expression + validChar
      }));
    }
  }

  handleEval() {
    if (this.state.expression.length) {
      try {
        const sanitizedExpression = this.sanitize(this.state.expression);
        const result = eval(sanitizedExpression);
        this.setState({
          expression: result,
          history: [
            ...this.state.history,
            { expression: sanitizedExpression, result }
          ]
        });
      } catch {
        this.setState({
          expression: "Invalid expression"
        });
      }
    }
  }

  handleResetDisplay() {
    this.setState({
      expression: ""
    });
  }

  handleResetHistory() {
    this.setState({
      history: []
    });
  }

  render() {
    return (
      <div
        className="calculator"
        onKeyPress={e => this.handleKeyboard(e)}
        // https://frontarm.com/james-k-nelson/react-events-cheatsheet/
        tabIndex={-1}
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
      >
        <div id="calculator">
          <div className="top">
            <span className="clear" onClick={() => this.handleResetDisplay()}>
              C
            </span>
            <div className="screen">{this.state.expression}</div>
          </div>
          <div className="keys" onClick={e => this.handleUserInput(e)}>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span className="operator">+</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span className="operator">-</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span className="operator">/</span>
            <span>0</span>
            <span>.</span>
            <span className="eval" onClick={() => this.handleEval()}>
              =
            </span>
            <span className="operator">x</span>
          </div>
          {this.state.history.length ? (
            <History
              history={this.state.history}
              onResetHistory={() => this.handleResetHistory()}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
