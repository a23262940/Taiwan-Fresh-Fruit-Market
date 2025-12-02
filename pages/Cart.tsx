import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = '請輸入姓名';
    
    // Taiwan Phone Validation: 
    // Mobile: 0912345678 (10 digits starting with 09)
    // Landline: 02-12345678 or 041234567 (Roughly 9-10 digits starting with 0)
    const phoneRegex = /^09\d{8}$|^0\d{1,2}-?\d{6,8}$/;
    
    if (!phone.trim()) {
      newErrors.phone = '請輸入電話號碼';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = '電話格式不正確 (例: 0912345678)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validate()) {
      alert(`訂單已送出！\n\n感謝您的購買, ${name}。\n總金額: $${totalAmount}`);
      clearCart();
      navigate('/');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-stone-500">
        <h2 className="text-2xl font-bold mb-4">購物車是空的</h2>
        <p className="mb-8">快去選購新鮮蔬果吧！</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors">
          前往購物
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-8 border-l-8 border-primary pl-4">您的購物車</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variantName}`} className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 flex flex-col sm:flex-row items-center gap-4">
              <img src={item.imageUrl} alt={item.productName} className="w-24 h-24 rounded-md object-cover flex-shrink-0" />
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-stone-800">{item.productName}</h3>
                <p className="text-sm text-stone-500">{item.variantName}</p>
                <p className="text-accent font-bold mt-1">${item.price}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                 <div className="flex items-center bg-stone-100 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.productId, item.variantName, -1)}
                    className="p-2 text-stone-600 hover:text-red-500"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId, item.variantName, 1)}
                    className="p-2 text-stone-600 hover:text-primary"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-stone-800 font-bold text-sm">
                  小計: ${item.price * item.quantity}
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.productId, item.variantName)}
                className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                title="移除商品"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border-t-4 border-accent">
            <h2 className="text-xl font-bold mb-6">訂單摘要</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">收件人姓名 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 bg-red-50' : 'border-stone-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="請輸入姓名"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">聯絡電話 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-stone-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="09xxxxxxxx"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2 text-stone-600">
                <span>商品總計</span>
                <span>${totalAmount}</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-stone-600">
                 <span>運費</span>
                 <span className="text-green-600">免運費</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-stone-800 mt-4">
                <span>總金額</span>
                <span className="text-accent">${totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              確認結帳 <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
