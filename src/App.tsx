import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ErrorMessage } from './components/ErrorMessage';
import { CartItem, Product } from './types';
import { getProducts } from './services/products';
import { useTheme } from './hooks/useTheme';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  }

const apiUrl = import.meta.env.VITE_API_URL;
  fetch(`${apiUrl}/User/register`)
   .then((response) => response.json())
   .then((data) => console.log(data));


  const handleHomeClick = () => {
    setSelectedCategory(null);
  };

  const handleLoginClick = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleRegisterClick = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/User/register`)
   .then((response) => response.json())
   .then((data) => console.log(data));
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={loadProducts} />;
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        theme={theme}
        onThemeToggle={toggleTheme}
        onSelectCategory={setSelectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {selectedCategory ? 'Category Products' : 'All Products'}
          </h2>
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onAddToCart={addToCart}
            theme={theme}
          />
        </section>
      </main>

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        theme={theme}
      />

      {isLoginOpen && (
        <LoginPage
          onClose={() => setIsLoginOpen(false)}
          theme={theme}
          onRegisterClick={handleRegisterClick}
        />
      )}

      {isRegisterOpen && (
        <RegisterPage
          onClose={() => setIsRegisterOpen(false)}
          theme={theme}
          onLoginClick={handleLoginClick}
        />
      )}
    </div>
  );
}