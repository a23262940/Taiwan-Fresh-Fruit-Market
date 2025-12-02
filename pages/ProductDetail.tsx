import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, ArrowLeft, Truck } from 'lucide-react';
import { PRODUCTS } from '../services/mockData';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Reset selection when product changes
    setSelectedVariantIdx(0);
    setQuantity(1);
    
    // Generate 10 random products excluding current
    const others = PRODUCTS.filter(p => p.id !== id);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 10));
    
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="text-center py-20">商品不存在</div>;
  }

  const currentVariant = product.variants[selectedVariantIdx];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      imageUrl: product.imageUrl,
      variantName: currentVariant.name,
      price: currentVariant.price,
      quantity: quantity
    });
    alert('已加入購物車！');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-stone-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-1" /> 回上一頁
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="h-[400px] md:h-[600px] bg-stone-100">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="p-8 md:p-12 flex flex-col">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">{product.name}</h1>
            <p className="text-lg text-stone-500 mb-6">{product.description}</p>
            
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-3">選擇規格</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedVariantIdx === idx
                        ? 'border-primary bg-green-50 text-primary font-bold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between mb-8 pb-8 border-b border-stone-100">
              <div>
                 <span className="text-3xl font-bold text-accent">${currentVariant.price}</span>
                 <span className="text-stone-400 ml-2">/ {currentVariant.name}</span>
              </div>
              
              <div className="flex items-center bg-stone-100 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-stone-600 hover:text-primary transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-stone-600 hover:text-primary transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              加入購物車 - ${currentVariant.price * quantity}
            </button>
            
            <div className="mt-6 flex items-center gap-2 text-stone-500 text-sm">
               <Truck size={16} />
               <span>全台低溫宅配運送，確保新鮮品質</span>
            </div>
          </div>
        </div>

        {/* Details & Notes */}
        <div className="p-8 md:p-12 bg-stone-50 border-t border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-stone-800 mb-4">商品詳細介紹</h2>
              <div className="prose text-stone-600 leading-relaxed whitespace-pre-line">
                {product.details}
              </div>
            </div>
            <div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">商家注意事項</h3>
                <ul className="list-disc list-inside text-yellow-900 space-y-2 text-sm">
                  <li>生鮮食品不適用於7天鑑賞期。</li>
                  <li>收到商品後請立即開箱檢查，若有損壞請於24小時內拍照回傳客服。</li>
                  <li>因氣候影響，實際出貨時間可能會有些許調整。</li>
                  <li>保存方式請參照商品說明，以免影響口感。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Random Recommendations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">猜你喜歡</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {randomProducts.map(p => (
            <div 
              key={p.id} 
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden cursor-pointer hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-stone-100">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-stone-800 text-sm mb-1 truncate">{p.name}</h4>
                <p className="text-accent font-bold text-sm">
                   ${Math.min(...p.variants.map(v=>v.price))} 起
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
