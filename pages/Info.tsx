import React from 'react';
import { Phone, MapPin, Clock, Truck, ShieldCheck, HelpCircle } from 'lucide-react';

const Info: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="w-full h-[300px] relative">
        <img 
          src="https://picsum.photos/id/430/1600/600" 
          alt="Fresh Farm" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">訂購須知 & 關於我們</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <MapPin /> 聯絡資訊
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full text-primary"><Phone size={20}/></div>
                  <div>
                    <span className="block font-bold text-stone-700">客服電話</span>
                    <a href="tel:0800-123-456" className="text-stone-600 hover:text-primary">0800-123-456</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full text-primary"><MapPin size={20}/></div>
                  <div>
                    <span className="block font-bold text-stone-700">地址</span>
                    <span className="text-stone-600">台灣台北市信義區果菜市場大道88號</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full text-primary"><Clock size={20}/></div>
                  <div>
                    <span className="block font-bold text-stone-700">服務時間</span>
                    <span className="text-stone-600">週一至週五 09:00 - 18:00</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
               <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                 <HelpCircle /> 客服資訊
               </h2>
               <p className="text-blue-700 mb-4">
                 若您對訂單有任何疑問，歡迎透過電話或 Email 聯繫我們。我們將盡快為您服務。
               </p>
               <p className="text-blue-700">Email: service@taiwanfresh.com</p>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
               <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                 <Truck /> 訂購與配送須知
               </h2>
               <div className="space-y-4 text-stone-600 leading-relaxed">
                 <p>
                   <span className="font-bold text-stone-800">1. 配送範圍：</span> 僅限台灣本島地區。離島地區暫無配送服務。
                 </p>
                 <p>
                   <span className="font-bold text-stone-800">2. 出貨時間：</span> 確認付款後，將於 1-3 個工作天內安排出貨。若遇天災或農產品產量不穩，將另行通知。
                 </p>
                 <p>
                   <span className="font-bold text-stone-800">3. 運費說明：</span> 單筆訂單滿 $2000 免運費，未滿則收取 $160 低溫宅配運費。
                 </p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
               <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                 <ShieldCheck /> 退換貨政策
               </h2>
               <div className="space-y-4 text-stone-600 leading-relaxed">
                 <p>
                   依據消費者保護法規定，生鮮食品（蔬果類）不適用於 7 天鑑賞期。
                 </p>
                 <p>
                   為保障您的權益，請於收到商品後立即開箱檢查。若發現商品有凍傷、壓傷、腐爛等嚴重瑕疵，請於 <span className="font-bold text-red-500">24小時內</span> 拍照並聯繫客服，我們將儘速為您處理後續退換貨事宜。
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
