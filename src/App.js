import React, { useState, useEffect } from "react";
import "./styles.css";

// This is a demo to checkout the usecases of useEffect which is equivalent
// to the different lifecycle methods in class components.
export default function App() {
  const [name, setName] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //The code inside this useEffect eexecutes every single time the
  //component re-renders (due to props or state change)
  useEffect(() => {
    console.log("I re-rendered");
  });

  // This executes on the first render and everytime the dependency changes
  // If dependency is empty , this render only once when the component
  // first mounts/loads/renders.
  useEffect(() => {
    console.log("The name you typed is " + name);
  }, [name]);

  useEffect(() => {
    // Since we have no dependency array , this runs eevery single time
    //which is really expensive so we use a cleanup function that
    // cleans up the event lisetner before re-rendering it the next time
    console.log("Attach listener");
    window.addEventListener("resize", updateWindowWidth);

    //This is the cleanup function
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  });

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <div className="App">
      <h1>Screen Width using an event listener</h1>
      <h2>Type something.</h2>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <h2>The window width is : {windowWidth}</h2>
    </div>
  );
}
