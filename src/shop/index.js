// Import necessary components and hooks
import Products from "./products";
import Header from "./header";
import { useEffect, useState } from "react";
import { products } from "../data"; // Import product data

// Define a functional component named Shop, which receives 'handleClick' as a prop
const Shop = ({ handleClick }) => {
  // Initialize state variables using the useState hook
  const [filters, setFilters] = useState({
    price: "default",
    category: [],
  });
  const [data] = useState(products); // Store the product data in a state variable
  const [categories, setCategories] = useState(
    products
      .map((product) => product.category)
      .filter((item, index, categories) => {
        return categories.indexOf(item) === index;
      }),
  );
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered products

  // useEffect hook to filter and update the displayed products when filters change
  useEffect(() => {
    let filterProducts = () => {
      // Start with the full data
      let filteredData = [...data];

      // Apply category filter
      if (filters.category.length > 0) {
        filteredData = filteredData.filter((item) =>
          filters.category.includes(item.category),
        );
      }

      // Apply price filter
      if (filters.price) {
        if (filters.price === "high") {
          filteredData.sort((a, b) => b.price - a.price); // Sort by high to low price
        } else if (filters.price === "low") {
          filteredData.sort((a, b) => a.price - b.price); // Sort by low to high price
        }
      }

      // Set the filtered items
      setFilteredItems(filteredData);
    };

    filterProducts();
  }, [filters.price, filters.category, data]);

  // Function to handle changes in filter options
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFilters((prev) => {
      let indexOfCategory = prev.category.indexOf(value);

      if (name === "price") {
        return { ...prev, [name]: value }; // Update price filter
      } else if (name === "category") {
        if (prev.category.length === 0) {
          return { ...prev, [name]: [value] }; // Set the first category filter
        } else if (indexOfCategory === -1) {
          return { ...prev, [name]: [...prev.category, value] }; // Add a new category filter
        } else if (indexOfCategory !== -1) {
          let updated = prev.category.filter((item) => item !== value); // Remove a category filter
          return { ...prev, [name]: updated };
        }
      }
    });
  };

  // Function for future search functionality (placeholder for now)
  const onSearch = (e) => {
    // Implement search functionality here
  };

  // Render the component's UI
  return (
    <>
      <Header handleChange={onSearch} /> {/* Render the header component */}
      <div
        style={{
          display: "flex",
          padding: "40px",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "80%" }}>
            {filteredItems.length ? (
              <Products
                handleAddToCart={handleClick}
                data={filteredItems} // Display filtered products if available
              />
            ) : (
              <Products
                handleAddToCart={handleClick}
                data={data} // Display all products when no filters applied
              />
            )}
          </div>
          <div style={{ width: "20%" }}>
            <h4>Filter On Pricing</h4>

            <div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  value="low"
                  onChange={handleChange}
                />
                <h5>low to high</h5>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  value="high"
                  onChange={handleChange}
                />
                <h5>high to low</h5>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  value="default"
                  onChange={handleChange}
                />
                <h5>default</h5>
              </div>
            </div>
            <div>
              <h3>Filter on Category</h3>
              {categories &&
                categories.map((category, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "5px" }}>
                    <input
                      type="checkbox"
                      name="category"
                      checked={
                        category ===
                        filters.category.find((item) => item === category)
                          ? true
                          : false
                      }
                      value={category}
                      onChange={handleChange}
                    />
                    <h4>{category}</h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the Shop component
export default Shop;
