import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// THIS LINE IS CRITICAL: Imports the named exports from CartSlice.jsx
import { removeItem, updateQuantity } from './CartSlice.jsx'; // Ensure .jsx extension matches the actual filename
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Access the cart items from the Redux store
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the total amount for all products in the cart.
   *
   * @returns {string} The total amount formatted as a currency string.
   */
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = typeof item.cost === 'string' ? parseFloat(item.cost.substring(1)) : item.cost;
      total += cost * quantity;
    });
    return total.toFixed(2);
  };

  /**
   * Handles the "Continue Shopping" button click.
   * Calls the onContinueShopping prop function.
   * @param {Event} e - The click event.
   */
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  /**
   * Handles incrementing the quantity of an item in the cart.
   * Dispatches the updateQuantity action with the new quantity.
   * @param {Object} item - The cart item to increment.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Handles decrementing the quantity of an item in the cart.
   * Dispatches the updateQuantity action with the new quantity.
   * Ensures quantity does not go below 0.
   * @param {Object} item - The cart item to decrement.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1 and decrement is clicked, remove the item
      dispatch(removeItem({ name: item.name })); // Pass an object with name as payload
    }
  };

  /**
   * Handles removing an item completely from the cart.
   * Dispatches the removeItem action.
   * @param {Object} item - The cart item to remove.
   */
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name })); // Pass an object with name as payload
  };

  /**
   * Calculates the total cost for a single item based on its quantity.
   * @param {Object} item - The cart item.
   * @returns {string} The total cost for the item formatted as a currency string.
   */
  const calculateTotalCost = (item) => {
    const cost = typeof item.cost === 'string' ? parseFloat(item.cost.substring(1)) : item.cost;
    const total = cost * item.quantity;
    return total.toFixed(2);
  };

  // If the cart is empty, display a message
  if (cart.length === 0) {
    return (
      <div className="cart-container" style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ color: 'black' }}>Your cart is empty.</h2>
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${typeof item.cost === 'string' ? parseFloat(item.cost.substring(1)).toFixed(2) : item.cost.toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity <= 0}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;