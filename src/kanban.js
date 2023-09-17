// Import the useState hook from React
import { useState } from "react";

// Define a functional component named Assembly that receives a 'list' prop
function Assembly({ list }) {
  // Initialize state variables using the useState hook
  const [task, setTask] = useState(""); // State for input task
  const [items, setItems] = useState(list.map((element) => [])); // State for managing items in arrays

  // Handle changes in the input field
  const handleChange = (e) => {
    setTask(e.target.value); // Update the 'task' state with the input value
  };

  // Handle clicks and context menu clicks on the buttons
  const handleClick = (e, _idx, idx) => {
    e.preventDefault();
    const leftClick = e.button === 0;
    const rightClick = e.button === 2;
    let lastElement;
    let firstElement;

    setItems((prev) => {
      const newArray = prev.map((subarray, index) => {
        if (index === idx) {
          if (_idx < subarray.length - 1 && rightClick) {
            // Swap elements within the subarray
            const updatedSubarray = [...subarray];
            updatedSubarray[_idx] = subarray[_idx + 1];
            updatedSubarray[_idx + 1] = subarray[_idx];
            return updatedSubarray;
          } else if (rightClick && _idx === subarray.length - 1) {
            // Move the last element to the next array
            lastElement = subarray[subarray.length - 1];
            return subarray.slice(0, -1);
          } else if (leftClick && _idx === 0 && index !== 0) {
            // Left-click on the first element in the array
            firstElement = subarray[_idx];
            return subarray.slice(1);
          }
        } else if (index === idx + 1 && lastElement !== undefined) {
          // Add the last element to the next array
          return [lastElement, ...subarray];
        } else if (index === idx - 1 && firstElement !== undefined) {
          // Add the last element to the next array
          return [...subarray, firstElement];
        }
        return subarray;
      });
      return newArray; // Update the state with the modified arrays
    });
  };

  // Handle form submission to add a new task
  const submit = (e) => {
    e.preventDefault();
    setItems((prev) => {
      return prev.map((subarray, index) => {
        if (index === 0) {
          return [task, ...subarray]; // Add the new task to the first array
        } else {
          return subarray;
        }
      });
    });
    setTask(""); // Clear the input field
  };

  // Render the component's UI
  return (
    <div>
      <h2>Assembly Line</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        {list.map((element, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>{element}</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items[idx].map((element, _idx) => (
                <button
                  onContextMenu={(event) => {
                    handleClick(event, _idx, idx);
                  }}
                  onClick={(event) => {
                    handleClick(event, _idx, idx);
                  }}
                  key={_idx}
                >
                  {element}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the Assembly component
export default Assembly;
