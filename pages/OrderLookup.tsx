import React, { useState } from 'react';
import { Search, Package, Calendar, DollarSign, X } from 'lucide-react';
import { MOCK_ORDERS } from '../services/mockData';
import { Order } from '../types';

const OrderLookup: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim() || !searchPhone.trim()) {
      alert('請輸入姓名和電話');
      return;
    }

    const results = MOCK_ORDERS.filter(
      (order) => 
        order.customerName.includes(searchName) && 
        order.customerPhone.includes(searchPhone)
    );
    
    setSearchResults(results);
    setHasSearched(true);
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case '已確認': return 'text-blue-600 bg-blue-50 border-blue-200';
      case '待取貨': return 'text-orange-600 bg-orange-50 border-orange-200';
      case '已完成': return 'text-green-600 bg-green-50 border-green-200';
      case '已取消': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-stone-600 bg-stone-50 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-8 text-center">訂單查詢</h1>

      {/* Search Form */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200 max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">訂購人姓名</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="例如: 王小明"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">聯絡電話</label>
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="例如: 0912345678"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
          >
            <Search size={20} /> 查詢訂單
          </button>
        </form>
      </div>

      {/* Results List */}
      {hasSearched && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-700 mb-4 border-l-4 border-accent pl-3">
             查詢結果 ({searchResults.length})
          </h2>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-primary group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-sm text-stone-500">#{order.id.split('-')[1]}...</span>
                    <span className={`px-2 py-1 rounded text-xs border font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-stone-600 text-sm">
                      <Calendar size={16} className="mr-2" />
                      取貨: {order.pickupTime}
                    </div>
                    <div className="flex items-center text-stone-800 font-bold">
                      <DollarSign size={16} className="mr-2" />
                      總金額: ${order.totalAmount}
                    </div>
                  </div>
                  <div className="text-right text-sm text-primary font-medium group-hover:underline">
                    查看詳情 &rarr;
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-stone-500">
              查無訂單資料，請確認輸入資訊是否正確。
            </div>
          )}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-stone-800">訂單詳情</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-stone-500 block mb-1">訂單編號</label>
                  <p className="font-mono font-bold">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-stone-500 block mb-1">訂單狀態</label>
                  <span className={`px-2 py-1 rounded text-xs border font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <label className="text-stone-500 block mb-1">取貨/配送時間</label>
                  <p className="font-bold">{selectedOrder.pickupTime}</p>
                </div>
                <div>
                  <label className="text-stone-500 block mb-1">建立時間</label>
                  <p>{selectedOrder.createdAt}</p>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6">
                <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <Package size={20} /> 訂單內容
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                         <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-stone-800 text-sm">{item.productName}</p>
                        <p className="text-stone-500 text-xs">{item.variantName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-stone-600 text-sm">x {item.quantity}</p>
                        <p className="font-bold text-stone-800">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold text-stone-600">總金額</span>
                <span className="text-3xl font-bold text-accent">${selectedOrder.totalAmount}</span>
              </div>
            </div>
            
            <div className="p-6 bg-stone-50 border-t border-stone-100">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-white border border-stone-300 py-3 rounded-xl font-bold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderLookup;
