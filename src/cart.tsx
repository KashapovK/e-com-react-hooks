import React from "react";
import "./css/cart.css";
import { useStore } from "./store";

const Cart: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useStore();

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} Рублей</span>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="item-quantity">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
