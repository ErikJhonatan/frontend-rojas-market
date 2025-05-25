import React, { useState } from 'react'; // Added useState
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Task 1.1
import { createOrderAPI, addProductToOrderAPI } from '../services/api.js'; // Task 1.2

const CarritoPage = () => {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const { cartItems } = cartState;
  const { authState } = useAuth(); // Task 4.3

  // Task 2: State for Customer ID and Order Process
  const [customerId, setCustomerId] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null); // For success messages

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Task 4: Implement handlePlaceOrder function
  const handlePlaceOrder = async () => {
    setOrderError(null);
    setOrderSuccess(null);

    // Validations (Task 4.4)
    if (!customerId.trim()) {
      setOrderError('Customer ID is required.');
      return;
    }
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty.');
      return;
    }
    if (!authState.isAuthenticated || !authState.token) {
      setOrderError('Please login to place an order.');
      return;
    }

    setIsPlacingOrder(true); // Task 4.5
    try {
      // Create Order (Task 4.5.1)
      const orderResponse = await createOrderAPI(customerId, authState.token);

      if (orderResponse && orderResponse.success && orderResponse.orderId) { // Task 4.5.2
        const orderId = orderResponse.orderId;
        
        // Add products to order (Task 4.5.3)
        // Using Promise.all for concurrent product additions for better performance
        // Note: if one fails, others might still succeed. More complex rollback logic would be needed for transactions.
        const productAddPromises = cartItems.map(item =>
          addProductToOrderAPI({ orderId: orderId, productId: item.id, amount: item.quantity }, authState.token)
        );
        
        const results = await Promise.all(productAddPromises);

        // Check if all products were added successfully (basic check)
        const allProductsAdded = results.every(res => res && res.success);

        if (allProductsAdded) {
          setOrderSuccess(`Order placed successfully! Order ID: ${orderId}`); // Task 4.5.5
          clearCart(); // Task 4.5.5
          setCustomerId(''); // Task 4.5.5
        } else {
          // Handle partial success/failure if needed
          setOrderError('Some products could not be added to the order. Please contact support.');
        }
      } else {
        setOrderError(orderResponse.message || 'Failed to create order.'); // Task 4.5.6
      }
    } catch (error) {
      console.error("Order placement error:", error);
      setOrderError(error.message || 'An unexpected error occurred while placing the order.'); // Task 4.5.7
    } finally {
      setIsPlacingOrder(false); // Task 4.5.8
    }
  };


  if (cartItems.length === 0 && !orderSuccess) { // Don't show empty cart if success message is present
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p className="mb-4">Your cart is empty.</p>
        <Link to="/productos" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  // Display success message if order was placed
   if (orderSuccess) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="alert alert-success shadow-lg my-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{orderSuccess}</span>
          </div>
        </div>
        <Link to="/productos" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>

      <div className="overflow-x-auto mb-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    {item.image && (
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>${item.price?.toFixed(2)}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                      className="btn btn-ghost btn-xs"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinusSquare />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)} 
                      className="btn btn-ghost btn-xs"
                    >
                      <FaPlusSquare />
                    </button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="btn btn-ghost btn-xs text-red-500"
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start p-4 bg-base-200 rounded-lg shadow">
        <div className="mb-4 md:mb-0">
          <button onClick={clearCart} className="btn btn-outline btn-error" disabled={isPlacingOrder}>
            Clear Cart
          </button>
        </div>
        <div className="w-full md:w-auto md:text-right">
          <div className="text-xl font-bold mb-4">
            Total: ${calculateTotal()}
          </div>
          {/* Task 3: Update Customer ID Input */}
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Customer ID</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter Customer ID" 
              className={`input input-bordered w-full max-w-xs ${orderError && !customerId.trim() ? 'input-error' : ''}`}
              value={customerId}
              onChange={(e) => {
                setCustomerId(e.target.value);
                if (orderError && e.target.value.trim()) setOrderError(null); // Clear error when user types
              }}
              disabled={isPlacingOrder}
            />
          </div>
          
          {/* Task 5: Update "Proceed to Checkout" Button */}
          <button 
            className="btn btn-primary btn-block md:btn-wide" 
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || cartItems.length === 0}
          >
            {isPlacingOrder ? (
              <>
                <span className="loading loading-spinner"></span>
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>

          {/* Task 6: Display Order Error */}
          {orderError && (
            <div className="alert alert-error shadow-lg mt-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{orderError}</span> {/* Display actual error message */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
