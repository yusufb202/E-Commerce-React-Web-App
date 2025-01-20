import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/format';
import { CheckoutModal } from './checkout/CheckoutModal';

interface CartProps {
  items: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ items, onRemoveFromCart, onUpdateQuantity, isOpen, onClose }: CartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag /> Shopping Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                        className="border rounded p-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="border-t p-4 bg-gray-50 absolute bottom-0 w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">{formatCurrency(total)}</span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items}
      />
    </>
  );
}