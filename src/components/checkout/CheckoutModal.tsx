import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PaymentForm } from './PaymentForm';
import { ShippingForm } from './ShippingForm';
import { CartItem, PaymentDetails, ShippingDetails } from '../../types';
import { formatCurrency } from '../../utils/format';
import { checkout } from '../../services/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export function CheckoutModal({ isOpen, onClose, items }: CheckoutModalProps) {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleShippingSubmit = (details: ShippingDetails) => {
    setShippingDetails(details);
    setStep('payment');
  };

  const handlePaymentSubmit = async (paymentDetails: PaymentDetails) => {
    if (!shippingDetails) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      await checkout({
        items,
        shipping: shippingDetails,
        payment: paymentDetails,
      });
      onClose();
      // You might want to clear the cart and show a success message here
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="p-6">
          {step === 'shipping' ? (
            <ShippingForm onSubmit={handleShippingSubmit} />
          ) : (
            <PaymentForm onSubmit={handlePaymentSubmit} />
          )}
        </div>

        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold">{formatCurrency(total)}</span>
          </div>
          <button
            onClick={() => {
              const form = document.querySelector('form');
              if (form) form.requestSubmit();
            }}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isProcessing
              ? 'Processing...'
              : step === 'shipping'
              ? 'Continue to Payment'
              : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}