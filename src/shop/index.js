import Products from "./products";
import Header from "./header";
import { useEffect, useState } from "react";
import { products } from "../data";

const Shop = ({ handleClick }) => {
  const [filters, setFilters] = useState({
    price: "default",
    category: "",
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
  console.log(categories);
  useEffect(() => {
    let filterProducts = () => {
      if (filters.price) {
        if (filters.price === "high") {
          setFilteredItems([...data].sort((a, b) => b.price - a.price));
        } else if (filters.price === "low") {
          setFilteredItems([...data].sort((a, b) => a.price - b.price));
        } else {
          setFilteredItems(data);
        }
      }
      if (filters.category) {
        console.log("here");
        setFilteredItems((prev) =>
          prev
            .filter((item) => item.category === filters.category)
            .sort((a, b) => {
              if (filters.price === "low") {
                return a.price - b.price;
              } else if (filters.price === "high") {
                return b.price - a.price;
              }
              return 0;
            }),
        );
      }
    };
    filterProducts();
  }, [filters, data]);
  console.log(filteredItems);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFilters((prev) => {
      return { ...prev, [name]: value };
    });
  };
  console.log(filters);
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          padding: "40px",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{}}>
            {filteredItems.length ? (
              <Products handleAddToCart={handleClick} data={filteredItems} />
            ) : (
              <Products handleAddToCart={handleClick} data={data} />
            )}
          </div>
          <div style={{ width: "700px" }}>
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
                      checked={category === filters.category ? true : false}
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
