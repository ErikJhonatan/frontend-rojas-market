import axios from 'axios';
import { getProducts, getCategories, loginUser } from './api';

// Mock the axios module
jest.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    // Clears the history of all mocks, but not their implementation
    jest.clearAllMocks();
  });

  // Test suite for getProducts
  describe('getProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      axios.get.mockResolvedValue({ data: mockProducts });

      const products = await getProducts();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/v1/products');
      expect(products).toEqual(mockProducts);
    });

    it('should handle API error when fetching products', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      // We expect getProducts to throw an error
      await expect(getProducts()).rejects.toThrow(errorMessage);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/v1/products');
    });
  });

  // Test suite for getCategories
  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
      axios.get.mockResolvedValue({ data: mockCategories });

      const categories = await getCategories();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/v1/categories');
      expect(categories).toEqual(mockCategories);
    });

    it('should handle API error when fetching categories', async () => {
      const errorMessage = 'Failed to fetch categories';
      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getCategories()).rejects.toThrow(errorMessage);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/v1/categories');
    });
  });

  // Test suite for loginUser
  describe('loginUser', () => {
    const mockCredentials = { email: 'test@example.com', password: 'password123' };
    
    it('should login user successfully and return user data', async () => {
      const mockLoginResponse = { token: 'fake-jwt-token', user: { id: 1, name: 'Test User' } };
      axios.post.mockResolvedValue({ data: mockLoginResponse });

      const response = await loginUser(mockCredentials);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/v1/auth/login', mockCredentials);
      expect(response).toEqual(mockLoginResponse);
    });

    it('should handle API error during login (e.g., wrong credentials)', async () => {
      const errorResponse = { message: 'Invalid credentials' };
      // Simulate an error response structure from the backend
      axios.post.mockRejectedValue({ response: { data: errorResponse } }); 

      try {
        await loginUser(mockCredentials);
      } catch (error) {
        expect(error).toEqual(errorResponse); // Expect the specific error object thrown by api.js
      }

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/v1/auth/login', mockCredentials);
    });

    it('should handle network or other errors during login', async () => {
      const errorMessage = 'Network Error';
      axios.post.mockRejectedValue(new Error(errorMessage));

      try {
        await loginUser(mockCredentials);
      } catch (error) {
        // As per api.js, it throws new Error('Login failed') if error.response is not available
        expect(error.message).toBe('Login failed'); 
      }

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/v1/auth/login', mockCredentials);
    });
  });
});
