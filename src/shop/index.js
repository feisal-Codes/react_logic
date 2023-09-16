import Products from "./products";
import Header from "./header";
import { useEffect, useState } from "react";
import { products } from "../data";

const Shop = ({ handleClick }) => {
  const [filters, setFilters] = useState({
    price: "default",
    category: [],
  });
  const [data] = useState(products);
  const [categories, setCategories] = useState(
    products
      .map((product) => product.category)
      .filter((item, index, categories) => {
        return categories.indexOf(item) === index;
      }),
  );
  const [filteredItems, setFilteredItems] = useState([]);

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
          filteredData.sort((a, b) => b.price - a.price);
        } else if (filters.price === "low") {
          filteredData.sort((a, b) => a.price - b.price);
        }
      }

      // Set the filtered items
      setFilteredItems(filteredData);
    };

    filterProducts();
  }, [filters.price, filters.category, data]);
  console.log("here", filteredItems);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFilters((prev) => {
      let indexOfCategory = prev.category.indexOf(value);

      if (name === "price") {
        return { ...prev, [name]: value };
      } else if (name === "category") {
        if (prev.category.length === 0) {
          return { ...prev, [name]: [value] };
        } else if (indexOfCategory === -1) {
          return { ...prev, [name]: [...prev.category, value] };
        } else if (indexOfCategory !== -1) {
          let updated = prev.category.filter((item) => item !== value);
          return { ...prev, [name]: updated };
        }
      }
    });
  };

  const onSearch = (e) => {};
  console.log(filters);
  return (
    <>
      <Header handleChange={onSearch} />
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
              <Products handleAddToCart={handleClick} data={filteredItems} />
            ) : (
              <Products handleAddToCart={handleClick} data={data} />
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
                <h5>low to high </h5>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  value="high"
                  onChange={handleChange}
                />
                <h5> high to low </h5>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  value="default"
                  onChange={handleChange}
                />
                <h5> default </h5>
              </div>
            </div>
            <div>
              <h3>filter on category</h3>
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

export default Shop;
