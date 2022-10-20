import React, { useState, useEffect, useRef } from "react";
import "./calculator.css";
import "./reset.css";

export default function Calculator() {
  const [screen, setScreen] = useState([]);

  function handleButton(button) {
    return () => setScreen([...screen, button]);
  }

  function useKey(key, callBack) {
    const callbackRef = useRef(callBack);

    useEffect(() => {
      callbackRef.current = callBack;
    });

    useEffect(() => {
      function handler(event) {
        if (event.code === key) {
          callbackRef.current(event);
        }
      }
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [key]);
  }

  function handleEquals() {
    const calculation = screen.join("");
    try {
      setScreen([eval(calculation)]);
    } catch {
      setScreen(["invalid input"]);
    }
  }

  useKey("Equal", handleEquals);
  useKey("Digit1", handleButton("1"));
  useKey("Digit2", handleButton("2"));
  useKey("Digit3", handleButton("3"));
  useKey("Digit4", handleButton("4"));
  useKey("Digit5", handleButton("5"));
  useKey("Digit6", handleButton("6"));
  useKey("Digit7", handleButton("7"));
  useKey("Digit8", handleButton("8"));
  useKey("Digit9", handleButton("9"));
  useKey("Backspace", () => setScreen(screen.slice(0, -1)));
  useKey("Equal", handleEquals);
  useKey("KeyP", handleButton("+"));
  useKey("Minus", handleButton("-"));
  useKey("KeyX", handleButton("*"));
  useKey("KeyC", () => setScreen([]));
  useKey("Slash", handleButton("/"));
  useKey("ArrowLeft", handleButton("("));
  useKey("ArrowRight", handleButton(")"));

  return (
    <>
      <div id="calculator">
        <div id="screen">{screen}</div>
        <div id="operations">
          <button onClick={handleButton("+")}>+</button>
          <button onClick={handleButton("-")}>-</button>
          <button onClick={handleButton("*")}>*</button>
          <button onClick={handleButton("/")}>/</button>
        </div>
        <div class="numbersRow">
          <button onClick={handleButton("1")}>1</button>
          <button onClick={handleButton("2")}>2</button>
          <button onClick={handleButton("3")}>3</button>
        </div>
        <div class="numbersRow">
          <button onClick={handleButton("4")}>4</button>
          <button onClick={handleButton("5")}>5</button>
          <button onClick={handleButton("6")}>6</button>
        </div>
        <div class="numbersRow">
          <button onClick={handleButton("7")}>7</button>
          <button onClick={handleButton("8")}>8</button>
          <button onClick={handleButton("9")}>9</button>
        </div>
        <div class="numbersRow">
          <button onClick={handleButton("0")}>0</button>
          <button id="back" onClick={() => setScreen(screen.slice(0, -1))}>
            &#8592;
          </button>
          <button id="clear" onClick={() => setScreen([])}>
            c
          </button>
        </div>
        <div class="numbersRow">
          <button onClick={handleButton("(")}>(</button>
          <button onClick={handleButton(")")}>)</button>
          <button id="equals" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>

      <div id="instructions">
        <p>Key Bindings:</p>
        <p>&#x2022; Use "p" key for +</p>
        <p>&#x2022; Use "x" key for *</p>
        <p>&#x2022; left and right arrow keys control parenthesis</p>
        <p>&#x2022; Use "c" key for Clear</p>
        <p> Everything else is bound as expected</p>
      </div>
    </>
  );
}
