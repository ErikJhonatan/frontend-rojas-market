import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Productos from './productos'; // Assuming the component is exported as default from 'productos.jsx'
import { getProducts, getCategories } from '../services/api';

// Mock the API service module
jest.mock('../services/api.js');

describe('Productos Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially for products and categories', () => {
    // Mock API calls to be pending
    getProducts.mockReturnValue(new Promise(() => {})); // Promise that never resolves
    getCategories.mockReturnValue(new Promise(() => {})); // Promise that never resolves

    render(<Productos />);

    // Check for loading spinners (DaisyUI uses role="status" or class "loading")
    // Products loading spinner
    expect(screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'span' && element.classList.contains('loading-spinner') && element.classList.contains('loading-lg');
      })).toBeInTheDocument();
    
    // Categories loading spinner
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && element.classList.contains('loading-spinner') && element.classList.contains('loading-sm');
    })).toBeInTheDocument();
  });

  test('renders fetched products and categories correctly', async () => {
    const mockProducts = [
      { id: '1', name: 'Test Product 1', price: 100, image: 'test1.jpg', description: 'Desc 1' },
    ];
    const mockCategories = [{ id: 'cat1', name: 'Test Category 1' }];

    getProducts.mockResolvedValueOnce(mockProducts);
    getCategories.mockResolvedValueOnce(mockCategories);

    render(<Productos />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Price: $100')).toBeInTheDocument(); // Based on current Card format
      expect(screen.getByText('Test Category 1')).toBeInTheDocument();
    });

    // Check that loading indicators are gone (this is implicitly tested by waiting for content,
    // but can add explicit checks if needed by ensuring the spinner elements are not present)
    expect(screen.queryByText((content, element) => element.classList.contains('loading-spinner'))).toBeNull();
  });

  test('renders error state for products when product fetch fails', async () => {
    const productErrorMessage = 'Failed to fetch products';
    getProducts.mockRejectedValueOnce(new Error(productErrorMessage));
    getCategories.mockResolvedValueOnce([{ id: 'cat1', name: 'Test Category' }]); // Categories fetch successfully

    render(<Productos />);

    await waitFor(() => {
      // Based on current error display in Productos.jsx: "Error: {error}"
      expect(screen.getByText(`Error: ${productErrorMessage}`)).toBeInTheDocument();
    });
    // Check that category is still displayed or its loading/empty state
    await waitFor(() => {
        expect(screen.getByText('Test Category')).toBeInTheDocument();
    });
  });

  test('renders error state for categories when category fetch fails', async () => {
    const categoryErrorMessage = 'Failed to fetch categories';
    getProducts.mockResolvedValueOnce([
      { id: '1', name: 'Test Product 1', price: 100, image: 'test1.jpg', description: 'Desc 1' },
    ]); // Products fetch successfully
    getCategories.mockRejectedValueOnce(new Error(categoryErrorMessage));

    render(<Productos />);

    await waitFor(() => {
      // Based on current error display in Productos.jsx: "Error loading categories: {errorCategories}"
      expect(screen.getByText(`Error loading categories: ${categoryErrorMessage}`)).toBeInTheDocument();
    });
     // Check that product is still displayed or its loading/empty state
     await waitFor(() => {
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
  });

  test('renders "No products found" and "No categories found" messages', async () => {
    getProducts.mockResolvedValueOnce([]);
    getCategories.mockResolvedValueOnce([]);

    render(<Productos />);

    await waitFor(() => {
      expect(screen.getByText('No products found.')).toBeInTheDocument();
      expect(screen.getByText('No categories found.')).toBeInTheDocument();
    });

    // Ensure loading spinners are gone
    expect(screen.queryByText((content, element) => element.classList.contains('loading-spinner'))).toBeNull();
  });
});
