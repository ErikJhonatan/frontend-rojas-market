import axios from 'axios';

/**
 * Fetches products from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 * @throws {Error} If the API request fails.
 */
export const getProducts = async () => {
  try {
    const response = await axios.get('/api/v1/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Re-throw the error or return a specific error structure
    throw error; 
  }
};

/**
 * Fetches categories from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of categories.
 * @throws {Error} If the API request fails.
 */
export const getCategories = async () => {
  try {
    const response = await axios.get('/api/v1/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Re-throw the error or return a specific error structure
    throw error;
  }
};

/**
 * Logs in a user.
 * @param {object} credentials - The user's credentials (e.g., { email, password }).
 * @returns {Promise<object>} A promise that resolves to the server's response (or response.data).
 * @throws {Error} If the API request fails.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/v1/auth/login', credentials);
    return response.data; // Or return response for more details like status code
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    // Re-throw the error or return a specific error structure
    // This allows the component to handle the error appropriately
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// Function to create an order
export const createOrderAPI = async (customerId, token) => {
  // TODO: Implement actual API call with JWT token in Phase 3
  // For now, this is a placeholder and simulates success.
  console.log('Attempting to create order for customer:', customerId, 'with token:', token);
  if (!customerId) {
    throw new Error('Customer ID is required to create an order.');
  }
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500)); 
  const mockOrderId = `order_${Date.now()}`;
  console.log('Mock order created with ID:', mockOrderId);
  return { success: true, orderId: mockOrderId, message: 'Order created successfully (mock)' };
};

// Function to add a product to an order
export const addProductToOrderAPI = async (itemData, token) => {
  // itemData should be { orderId, productId, amount }
  // TODO: Implement actual API call with JWT token in Phase 3
  // For now, this is a placeholder.
  console.log('Attempting to add product to order:', itemData, 'with token:', token);
  if (!itemData.orderId || !itemData.productId || !itemData.amount) {
    throw new Error('Order ID, Product ID, and Amount are required.');
  }
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Mock product added to order:', itemData.orderId);
  return { success: true, message: `Product ${itemData.productId} added to order ${itemData.orderId} (mock)` };
};
