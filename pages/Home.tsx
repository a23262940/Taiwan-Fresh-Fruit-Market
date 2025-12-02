import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../services/mockData';
import BannerCarousel from '../components/BannerCarousel';
import { useCart } from '../context/CartContext';

const ITEMS_PER_PAGE = 8;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPriceRange = (variants: { price: number }[]) => {
    if (variants.length === 0) return '0';
    const prices = variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} ~ $${max}`;
  };

  const handleQuickAdd = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.preventDefault(); 
    // Default to first variant for quick add, or navigate to detail
    if(product.variants.length > 0) {
       addToCart({
         productId: product.id,
         productName: product.name,
         imageUrl: product.imageUrl,
         variantName: product.variants[0].name,
         price: product.variants[0].price,
         quantity: 1
       });
       alert(`已加入 ${product.name} (${product.variants[0].name}) 到購物車`);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <BannerCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="搜尋商品 (例如: 芒果, 高麗菜...)"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search className="absolute left-3 top-3.5 text-stone-400" size={20} />
          </div>
        </div>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-primary hover:text-white hover:bg-primary transition-colors"
                    title="快速加入購物車 (預設規格)"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-stone-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-500 mb-3 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-3 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-accent font-bold text-lg">
                      {getPriceRange(product.variants)}
                    </span>
                    <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded">
                      {product.variants.length} 種規格
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-500">
            <p className="text-xl">找不到相關商品，請嘗試其他關鍵字。</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-white border border-stone-300 text-stone-600 disabled:opacity-50 hover:bg-stone-50"
            >
              上一頁
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white font-bold'
                    : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-white border border-stone-300 text-stone-600 disabled:opacity-50 hover:bg-stone-50"
            >
              下一頁
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
