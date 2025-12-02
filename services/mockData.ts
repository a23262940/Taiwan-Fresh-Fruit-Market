import { Product, Order, OrderStatus } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '愛文芒果 (Irwin Mango)',
    category: 'Fruit',
    description: '屏東枋山直送，果肉細緻多汁，香氣濃郁。',
    details: '來自屏東枋山，這裡有充足的陽光與海風吹拂，造就了愛文芒果獨特的濃郁香氣與細緻口感。每一顆都经过人工嚴格挑選，保證在樹上自然熟成（在欉紅），甜度極高，是夏日消暑的最佳選擇。保存方式：收到後請放置常溫通風處，待表面出油更有香氣後放入冰箱冷藏。',
    imageUrl: 'https://picsum.photos/id/102/800/600',
    variants: [
      { name: '5台斤/箱', price: 650 },
      { name: '10台斤/箱', price: 1200 },
    ]
  },
  {
    id: 'p2',
    name: '金鑽鳳梨 (Golden Diamond Pineapple)',
    category: 'Fruit',
    description: '高雄大樹產地，肉質細嫩，酸甜適中不咬舌。',
    details: '嚴選高雄大樹金鑽鳳梨（台農17號），此品種以肉質細緻、心軟可食聞名。果實飽滿，切開後金黃色的果肉散發淡淡清香，糖酸比完美，吃起來完全不咬舌頭。適合直接食用或打成果汁。',
    imageUrl: 'https://picsum.photos/id/104/800/600',
    variants: [
      { name: '2支入', price: 180 },
      { name: '6支入/箱', price: 500 },
    ]
  },
  {
    id: 'p3',
    name: '巨峰葡萄 (Kyoho Grapes)',
    category: 'Fruit',
    description: '彰化大村，果粒飽滿Q彈，帶有淡淡果粉。',
    details: '產自彰化大村的巨峰葡萄，是台灣最知名的葡萄品種。果實呈現紫黑色，外層佈滿天然果粉，這是健康的象徵。果肉Q彈多汁，帶有獨特的濃厚果香，甜度可達18度以上。',
    imageUrl: 'https://picsum.photos/id/106/800/600',
    variants: [
      { name: '2公斤禮盒', price: 550 },
      { name: '4公斤家庭號', price: 980 },
    ]
  },
  {
    id: 'p4',
    name: '翠玉絲瓜 (Luffa)',
    category: 'Vegetable',
    description: '清甜爽口，翠綠鮮嫩，煮湯炒食皆宜。',
    details: '在地小農種植的翠玉絲瓜，外皮翠綠，瓜肉白嫩。烹調後口感滑嫩清甜，不會有土味。富含維生素與纖維質，是台灣家庭餐桌上常見的健康蔬菜。',
    imageUrl: 'https://picsum.photos/id/292/800/600',
    variants: [
      { name: '1條', price: 45 },
      { name: '3條特惠', price: 120 },
    ]
  },
  {
    id: 'p5',
    name: '高山高麗菜 (Cabbage)',
    category: 'Vegetable',
    description: '梨山高海拔種植，清脆鮮甜，口感極佳。',
    details: '來自高海拔地區的高麗菜，因日夜溫差大，生長速度慢，使得葉片特別厚實且清脆鮮甜。無需過多調味，簡單清炒即可品嚐到蔬菜最原始的甘甜味。',
    imageUrl: 'https://picsum.photos/id/306/800/600',
    variants: [
      { name: '半顆', price: 60 },
      { name: '整顆 (約2kg)', price: 110 },
    ]
  },
  {
    id: 'p6',
    name: '玉荷包荔枝 (Lychee)',
    category: 'Fruit',
    description: '高雄大樹，核小肉厚，汁多甜美。',
    details: '季節限定的珍饈！玉荷包荔枝外皮帶有些許綠色刺狀，剝開後果肉晶瑩剔透，果核極小，肉質極為豐厚多汁。每年產季短暫，敬請把握機會。',
    imageUrl: 'https://picsum.photos/id/402/800/600',
    variants: [
      { name: '3台斤/盒', price: 450 },
      { name: '5台斤/盒', price: 700 },
    ]
  },
  {
    id: 'p7',
    name: '有機地瓜 (Sweet Potato)',
    category: 'Vegetable',
    description: '台農57號黃金地瓜，口感綿密，烤炸皆宜。',
    details: '採用有機農法種植，無農藥殘留。台農57號黃肉地瓜，烘烤後香氣逼人，口感鬆軟綿密；蒸煮後則較為Q彈。連皮一起食用營養價值更高。',
    imageUrl: 'https://picsum.photos/id/431/800/600',
    variants: [
      { name: '1袋 (600g)', price: 65 },
      { name: '1箱 (3kg)', price: 280 },
    ]
  },
  {
    id: 'p8',
    name: '聖女小番茄 (Cherry Tomato)',
    category: 'Fruit',
    description: '皮薄汁多，酸甜開胃，富含茄紅素。',
    details: '溫室栽培的聖女小番茄，色澤鮮紅欲滴。皮薄肉厚，咬下去會爆漿，酸中帶甜的滋味非常適合作為飯後水果或沙拉配料。',
    imageUrl: 'https://picsum.photos/id/429/800/600',
    variants: [
      { name: '1盒 (600g)', price: 120 },
      { name: '4盒團購組', price: 400 },
    ]
  },
  {
    id: 'p9',
    name: '珍珠芭樂 (Guava)',
    category: 'Fruit',
    description: '高雄燕巢，口感脆甜，維生素C之王。',
    details: '燕巢地區特殊的泥火山土壤，孕育出品質優良的珍珠芭樂。果肉細緻、脆度高，帶有微微的果酸更能襯托出甜味。',
    imageUrl: 'https://picsum.photos/id/493/800/600',
    variants: [
      { name: '3顆入', price: 80 },
      { name: '1箱 (10台斤)', price: 450 },
    ]
  },
  {
    id: 'p10',
    name: '三星蔥 (Scallion)',
    category: 'Vegetable',
    description: '宜蘭三星鄉，蔥白長，蔥味濃郁不嗆辣。',
    details: '宜蘭多雨的氣候與蘭陽溪水質，種植出的三星蔥蔥白特別長，肉質細緻。不像一般蔥容易有嗆辣感，三星蔥口感溫潤，是料理提味的最佳夥伴。',
    imageUrl: 'https://picsum.photos/id/627/800/600',
    variants: [
      { name: '1把 (約300g)', price: 85 },
    ]
  },
  {
    id: 'p11',
    name: '黑珍珠蓮霧 (Wax Apple)',
    category: 'Fruit',
    description: '屏東林邊，色澤暗紅，口感清脆多汁。',
    details: '著名的黑珍珠蓮霧，果實嬌小但紮實。外皮呈現深紅色，海綿體少，果肉極脆且水分充足，甜度極佳。',
    imageUrl: 'https://picsum.photos/id/514/800/600',
    variants: [
      { name: '禮盒 (2kg)', price: 600 },
    ]
  },
  {
    id: 'p12',
    name: '文旦柚 (Pomelo)',
    category: 'Fruit',
    description: '台南麻豆，老欉文旦，米粒飽滿甘甜。',
    details: '中秋佳節必備水果。嚴選30年以上老欉文旦，果肉細緻，水分多，甘甜中帶有一絲天然的微酸，回甘韻味無窮。',
    imageUrl: 'https://picsum.photos/id/736/800/600',
    variants: [
      { name: '1箱 (10斤)', price: 800 },
    ]
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-20231025001',
    customerName: '王小明',
    customerPhone: '0912345678',
    pickupTime: '2023-10-26 14:00',
    items: [
      {
        productId: 'p1',
        productName: '愛文芒果 (Irwin Mango)',
        imageUrl: 'https://picsum.photos/id/102/200/200',
        variantName: '5台斤/箱',
        price: 650,
        quantity: 2
      }
    ],
    totalAmount: 1300,
    status: OrderStatus.CONFIRMED,
    createdAt: '2023-10-25 10:30'
  },
  {
    id: 'ORD-20231026005',
    customerName: '陳美麗',
    customerPhone: '0988777666',
    pickupTime: '2023-10-27 10:00',
    items: [
      {
        productId: 'p4',
        productName: '翠玉絲瓜 (Luffa)',
        imageUrl: 'https://picsum.photos/id/292/200/200',
        variantName: '3條特惠',
        price: 120,
        quantity: 1
      },
      {
        productId: 'p5',
        productName: '高山高麗菜 (Cabbage)',
        imageUrl: 'https://picsum.photos/id/306/200/200',
        variantName: '整顆 (約2kg)',
        price: 110,
        quantity: 2
      }
    ],
    totalAmount: 340,
    status: OrderStatus.READY,
    createdAt: '2023-10-26 15:45'
  }
];
