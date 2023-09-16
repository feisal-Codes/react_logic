import { Link } from "react-router-dom";
const Header = ({handleChange}) => {
  return (
    <>
      <header style={{ display: "flex", justifyContent: "center" }}>
        <h4 style={{ marginRight: "10px" }}>
          <Link to="/">Shop</Link>
        </h4>
        <h4>
          <Link to="/cart">Cart</Link>
        </h4>
      </header>
      <div>
        <input type="text" name="search" onChange={handleChange}/>
      </div>
    </>
  );
};

export default Header;
