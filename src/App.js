import "./styles.css";
import { useState } from "react";
//kanban board
//input -> [backlog,todo,inprogress,done]
//output-> simulate an assembly line
//[[1,2,3,4,5,6],[],[],[]]
import Assembly from "./kanban";
import Task from "./task";
import Products from "./shop/products";
import Shop from "./shop";
import { Route, Routes } from "react-router-dom";
import Cart from "./shop/cart";
import { products } from "./data";

const Tasks = [
  { id: 1, name: "Buy groceries", completed: false },
  { id: 2, name: "Finish homework", completed: true },
  { id: 3, name: "Walk the dog", completed: false },
  { id: 4, name: "shopping", completed: false },
  { id: 5, name: "Finish classwork", completed: true },
  { id: 6, name: "sleep", completed: false }
];
const list = ["backlog", "todo", "progress", "done"];

export default function App() {
  const [cart, setCart] = useState([]);

  const handleClick = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      let updatedState = cart.map((prev) => {
        if (prev.id === product.id) {
          return { ...product, quantity: prev.quantity + 1 };
        }
        return prev;
      });
      setCart(updatedState);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    // console.log(cart);
  };
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Shop handleClick={handleClick} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}
