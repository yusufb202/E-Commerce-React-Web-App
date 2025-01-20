import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Home, Sun, Moon, LogIn, Menu } from 'lucide-react';
import { categories } from '../data/categories';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onLoginClick: () => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onSelectCategory: (categoryId: number | null) => void;
}

export function Header({ 
  cartItemCount, 
  onCartClick, 
  onHomeClick, 
  onLoginClick, 
  theme, 
  onThemeToggle,
  onSelectCategory 
}: HeaderProps) {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-lg relative`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onHomeClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-white' 
                : 'hover:bg-gray-100 text-gray-900'
            } transition-colors`}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              } transition-colors`}
            >
              <Menu size={20} />
              <span>Categories</span>
            </button>

            {isCategoryMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsCategoryMenuOpen(false)}
                ></div>
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg z-20 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onSelectCategory(category.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${
                        theme === 'dark'
                          ? 'text-white hover:bg-gray-700'
                          : 'text-gray-900 hover:bg-gray-100'
                      } first:rounded-t-lg last:rounded-b-lg transition-colors`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-full ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={onCartClick}
            className={`relative p-2 rounded-full ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            <CartIcon size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={onLoginClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors`}
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}