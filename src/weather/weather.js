import { useState, useEffect } from "react";

// Define a functional component named DisplayWeather
const DisplayWeather = () => {
  // Initialize state variables using the useState hook
  const [temperature, setTemperature] = useState({
    temp: "",
    mode: "celcius" // Default temperature mode is Celsius
  });
  const [clicked, setClicked] = useState(false);
  const [previousMode, setPreviousMode] = useState("celcius");
  const [initialTemp, setInitialTemp] = useState();

  // Function to handle the "Toggle" button click event
  const handleClick = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev); // Toggle the 'clicked' state
  };

  // Function to handle input changes (temperature and mode)
  const handleChange = (e) => {
    let { name, value, id } = e.target;
    let newValue = id || value;
    setTemperature((prev) => {
      setPreviousMode(prev.mode); // Store the previous temperature mode
      return { ...prev, [name]: newValue }; // Update the temperature state
    });

    if (id) {
      setClicked((prev) => !prev); // Toggle the 'clicked' state if mode is changed
    }
  };

  // Function to convert the temperature between Celsius and Fahrenheit
  function convertTemperature(temperature) {
    let prevTemp = { ...temperature };
    if (prevTemp.mode === "celcius") {
      let calculatedTemp = ((Number(prevTemp.temp) - 32) * 5) / 9;
      return { ...prevTemp, temp: Math.trunc(calculatedTemp) }; // Convert to Celsius
    } else if (prevTemp.mode === "fahrenheit") {
      let calculatedTemp = (Number(prevTemp.temp) * 9) / 5 + 32;
      return { ...prevTemp, temp: Math.trunc(calculatedTemp) }; // Convert to Fahrenheit
    }
  }

  // useEffect hook to perform actions when 'clicked' state changes
  useEffect(() => {
    if (temperature) {
      if (temperature.mode && temperature.temp) {
        // Copy the initial temperature if it's undefined
        if (initialTemp === undefined) {
          setInitialTemp(temperature);
        }
        setTemperature((prevTemp) => {
          if (temperature.mode !== previousMode) {
            setPreviousMode(temperature.mode); // Update the previous mode
            return convertTemperature(temperature); // Convert the temperature
          }
          return prevTemp;
        });
      }
    }
  }, [clicked]); // Execute this effect when 'clicked' state changes

  // Render the component's UI
  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <div>
        {/* Input field for temperature */}
        <input
          value={temperature.temp}
          onChange={handleChange}
          type="number"
          name="temp"
          placeholder="input initial temperature"
        />
        <div>
          <div
            style={{ display: "flex", gap: "5px", justifyContent: "center" }}
          >
            {/* Radio button for Celsius mode */}
            <input
              type="radio"
              name="mode"
              id="celcius"
              checked={temperature.mode === "celcius" ? true : false}
              value={temperature.mode}
              onChange={handleChange}
            />
            <h4>Celsius</h4>
          </div>
          <div
            style={{ display: "flex", gap: "5px", justifyContent: "center" }}
          >
            {/* Radio button for Fahrenheit mode */}
            <input
              type="radio"
              name="mode"
              id="fahrenheit"
              value={temperature.mode}
              onChange={handleChange}
            />
            <h4>Fahrenheit</h4>
          </div>
        </div>
      </div>

      <div>
        {/* Display the converted temperature */}
        {temperature.mode && temperature.temp && (
          <h2>
            The weather Today is
            {previousMode === "celcius" && <span> {temperature.temp}°C</span>}
            {previousMode === "fahrenheit" && (
              <span> {temperature.temp}°F</span>
            )}
          </h2>
        )}

        {/* Toggle button */}
        <button
          disabled={temperature.temp === "" ? true : false}
          onClick={handleClick}
        >
          Toggle
        </button>
        {/* Reset button */}
        <button
          disabled={!initialTemp ? true : false}
          onClick={() => {
            setTemperature((prev) => {
              return { ...initialTemp, mode: "celcius" }; // Reset to initial temperature and Celsius mode
            });
          }}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Export the DisplayWeather component
export default DisplayWeather;
