// RestoERP Data Engine - Safari Grill & Lounge
// Full SRS v1.1 Data Schema & Seed Entities

export const fmt = n => 'TSh ' + Math.round(n || 0).toLocaleString('en-US');
export const fmtNum = n => Number(n || 0).toLocaleString('en-US');
export const fmtTime = t => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export const fmtDateTime = t => new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

export const ST = ['placed', 'accepted', 'preparing', 'ready', 'served', 'billreq', 'paid', 'closed'];

export const LB = {
  placed: 'Placed',
  accepted: 'Accepted by Kitchen',
  preparing: 'Preparing in Kitchen',
  ready: 'Ready at Pass',
  served: 'Served at Table',
  billreq: 'Bill Requested',
  paid: 'Paid & Verified',
  closed: 'Closed & Archived',
  cancelled: 'Cancelled'
};

export const ST_COLORS = {
  placed: '#FF9500',
  accepted: '#007AFF',
  preparing: '#5856D6',
  ready: '#34C759',
  served: '#0E5A47',
  billreq: '#FF6B2C',
  paid: '#15803D',
  closed: '#8E8E93',
  cancelled: '#FF3B30'
};

export const SITES = [
  { id: 'masaki', name: 'Safari Grill & Lounge · Masaki', type: 'Flagship Restaurant', address: 'Plot 42, Haile Selassie Rd, Masaki, Dar es Salaam', tables: 6, covers: 22, gm: 'Rehema Said' },
  { id: 'oysterbay', name: 'Safari Grill Express · Oysterbay', type: 'Kiosk & Takeaway', address: 'Oysterbay Shopping Village, Dar es Salaam', tables: 3, covers: 8, gm: 'Hassan Mwinyi' },
  { id: 'city', name: 'Safari Grill & Lounge · City Centre', type: 'Branch Restaurant', address: 'Samora Avenue, City Centre, Dar es Salaam', tables: 5, covers: 18, gm: 'Fatma Juma' }
];

export const CATS = ['All', 'Grills', 'Burgers', 'Sides', 'Drinks', 'Desserts'];

export const MENU = [
  { id: 1, n: 'Roasted Chicken', e: '🍗', p: 18000, c: 'Grills', t: 15, r: 4.8, station: 'grill', allergens: ['Garlic'], d: 'Half chicken roasted with lemon, garlic, rosemary and fresh herbs. Served with side sauce.' },
  { id: 2, n: 'Mishkaki Platter', e: '🍢', p: 16000, c: 'Grills', t: 12, r: 4.7, station: 'grill', allergens: ['Chilli'], d: 'Tender marinated beef skewers fire-grilled on charcoal with spicy kachumbari salad and lemon.' },
  { id: 3, n: 'Grilled Tilapia', e: '🐟', p: 22000, c: 'Grills', t: 20, r: 4.6, station: 'grill', allergens: ['Fish'], d: 'Whole fresh Lake Victoria tilapia in rich Swahili coconut-tamarind sauce, served with fragrant rice or ugali.' },
  { id: 4, n: 'Steakhouse Burger', e: '🍔', p: 15000, c: 'Burgers', t: 10, r: 4.7, station: 'grill', allergens: ['Gluten', 'Dairy'], d: '200g prime beef patty, mature cheddar, caramelised onions, pickles, house smoked BBQ sauce on brioche.' },
  { id: 5, n: 'Crispy Chicken Burger', e: '🥪', p: 13000, c: 'Burgers', t: 10, r: 4.5, station: 'fry', allergens: ['Gluten', 'Dairy'], d: 'Golden buttermilk fried chicken breast, pickled jalapeños, purple cabbage slaw, tangy garlic aioli.' },
  { id: 6, n: 'Masala Chips', e: '🍟', p: 6000, c: 'Sides', t: 8, r: 4.6, station: 'sides', allergens: [], d: 'Crispy hand-cut fries tossed in house spicy tamarind masala, chopped cilantro and fresh lime.' },
  { id: 7, n: 'Pilau', e: '🍛', p: 9000, c: 'Sides', t: 10, r: 4.8, station: 'sides', allergens: [], d: 'Authentic spiced East African basmati rice cooked slowly in rich aromatic beef broth with whole spices.' },
  { id: 8, n: 'Fresh Mango Juice', e: '🥭', p: 4500, c: 'Drinks', t: 3, r: 4.9, station: 'bar', allergens: [], d: 'Cold-pressed ripe Kilombero mangoes made to order. 100% pure fruit, no added sugar.' },
  { id: 9, n: 'Passion Cooler', e: '🍹', p: 5000, c: 'Drinks', t: 3, r: 4.6, station: 'bar', allergens: [], d: 'Fresh local passion fruit pulp shaken with mint leaves, crushed ice and sparkling lime.' },
  { id: 10, n: 'Spiced Chai', e: '☕', p: 2500, c: 'Drinks', t: 4, r: 4.7, station: 'bar', allergens: ['Dairy'], d: 'Fresh whole cow milk simmered gently with crushed cardamom, ginger, cloves and premium Tanzanian tea leaves.' },
  { id: 11, n: 'Chocolate Lava', e: '🍫', p: 8000, c: 'Desserts', t: 9, r: 4.8, station: 'dessert', allergens: ['Gluten', 'Dairy', 'Eggs'], d: 'Warm dark Belgian chocolate cake with a molten centre, served with vanilla bean whip.' },
  { id: 12, n: 'Coconut Tart', e: '🥥', p: 7000, c: 'Desserts', t: 5, r: 4.4, station: 'dessert', allergens: ['Gluten', 'Dairy', 'Eggs'], d: 'Caramelised Zanzibar coconut custard baked into a crisp butter pastry shell.' },
  { id: 13, n: 'Kilimanjaro Mineral Water', e: '💧', p: 2000, c: 'Drinks', t: 1, r: 4.9, station: 'bar', allergens: [], d: '500ml chilled natural mineral water bottled at the foot of Mount Kilimanjaro.' },
  { id: 14, n: 'Coca-Cola Zero 330ml', e: '🥤', p: 3000, c: 'Drinks', t: 1, r: 4.7, station: 'bar', allergens: [], d: 'Cold canned Coca-Cola Zero Sugar served with fresh lemon slice and ice.' },
  { id: 15, n: 'Safari Premium Lager 500ml', e: '🍺', p: 5000, c: 'Drinks', t: 1, r: 4.8, station: 'bar', allergens: ['Gluten'], d: 'Tanzania’s iconic full-bodied cold lager brewed with malted barley.' }
];

export const M = Object.fromEntries(MENU.map(m => [m.id, m]));

export const TABLES = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'Takeaway'];
export const TW = { T1: 'w1', T2: 'w1', T3: 'w1', T4: 'w2', T5: 'w2', T6: 'w2', Takeaway: 'w1' };
export const SEATS = { T1: 2, T2: 4, T3: 4, T4: 6, T5: 2, T6: 4, Takeaway: 0 };

// Recipe BOM Mapping for Theoretical Stock Depletion (INV-04)
export const RECIPES = {
  1: [{ stockId: 'stk_chicken', qty: 0.5 }, { stockId: 'stk_spices', qty: 0.04 }, { stockId: 'stk_oil', qty: 0.05 }],
  2: [{ stockId: 'stk_beef', qty: 0.35 }, { stockId: 'stk_spices', qty: 0.05 }],
  3: [{ stockId: 'stk_tilapia', qty: 1 }, { stockId: 'stk_rice', qty: 0.2 }, { stockId: 'stk_spices', qty: 0.03 }],
  4: [{ stockId: 'stk_beef', qty: 0.2 }, { stockId: 'stk_buns', qty: 1 }, { stockId: 'stk_cheese', qty: 0.05 }],
  5: [{ stockId: 'stk_chicken', qty: 0.25 }, { stockId: 'stk_buns', qty: 1 }, { stockId: 'stk_oil', qty: 0.08 }],
  6: [{ stockId: 'stk_potatoes', qty: 0.4 }, { stockId: 'stk_oil', qty: 0.06 }],
  7: [{ stockId: 'stk_rice', qty: 0.25 }, { stockId: 'stk_beef', qty: 0.1 }, { stockId: 'stk_spices', qty: 0.03 }],
  8: [{ stockId: 'stk_mangoes', qty: 0.4 }],
  9: [{ stockId: 'stk_passion', qty: 0.25 }],
  10: [{ stockId: 'stk_milk', qty: 0.2 }, { stockId: 'stk_spices', qty: 0.02 }],
  11: [{ stockId: 'stk_chocolate', qty: 0.15 }],
  12: [{ stockId: 'stk_coconut', qty: 0.1 }]
};

export const STOCK_ITEMS = [
  // Raw materials (Kitchen / Food Prep) - Not sold directly, consumed via BOM
  { id: 'stk_chicken', name: 'Fresh Whole Chicken', cat: 'Poultry', uom: 'kg', onHand: 42.5, storeQty: 25.0, kitchenQty: 17.5, barQty: 0, par: 50, reorder: 20, unitCost: 8500, sellingPrice: null, itemType: 'raw_material', loc: 'Cold Room', theoretical: 42.5 },
  { id: 'stk_beef', name: 'Prime Beef Tenderloin', cat: 'Meat', uom: 'kg', onHand: 28.0, storeQty: 18.0, kitchenQty: 10.0, barQty: 0, par: 35, reorder: 15, unitCost: 14000, sellingPrice: null, itemType: 'raw_material', loc: 'Meat Freezer', theoretical: 28.0 },
  { id: 'stk_tilapia', name: 'Fresh Tilapia (Whole)', cat: 'Seafood', uom: 'pcs', onHand: 24, storeQty: 16, kitchenQty: 8, barQty: 0, par: 30, reorder: 10, unitCost: 9500, sellingPrice: null, itemType: 'raw_material', loc: 'Fish Cooler', theoretical: 24 },
  { id: 'stk_potatoes', name: 'Mbeya Red Potatoes', cat: 'Produce', uom: 'kg', onHand: 85.0, storeQty: 60.0, kitchenQty: 25.0, barQty: 0, par: 100, reorder: 40, unitCost: 1800, sellingPrice: null, itemType: 'raw_material', loc: 'Dry Store', theoretical: 85.0 },
  { id: 'stk_rice', name: 'Kyela Basmati Rice', cat: 'Dry Goods', uom: 'kg', onHand: 62.0, storeQty: 45.0, kitchenQty: 17.0, barQty: 0, par: 75, reorder: 25, unitCost: 3200, sellingPrice: null, itemType: 'raw_material', loc: 'Dry Store', theoretical: 62.0 },
  { id: 'stk_buns', name: 'Brioche Burger Buns', cat: 'Bakery', uom: 'pcs', onHand: 55, storeQty: 30, kitchenQty: 25, barQty: 0, par: 80, reorder: 30, unitCost: 900, sellingPrice: null, itemType: 'raw_material', loc: 'Kitchen Pass', theoretical: 55 },
  { id: 'stk_cheese', name: 'Cheddar Cheese Blocks', cat: 'Dairy', uom: 'kg', onHand: 8.5, storeQty: 5.5, kitchenQty: 3.0, barQty: 0, par: 12, reorder: 5, unitCost: 22000, sellingPrice: null, itemType: 'raw_material', loc: 'Dairy Fridge', theoretical: 8.5 },
  { id: 'stk_mangoes', name: 'Kilombero Mangoes', cat: 'Produce', uom: 'kg', onHand: 34.0, storeQty: 20.0, kitchenQty: 0, barQty: 14.0, par: 40, reorder: 15, unitCost: 2500, sellingPrice: null, itemType: 'raw_material', loc: 'Fruit Chiller', theoretical: 34.0 },
  { id: 'stk_passion', name: 'Lushoto Passion Fruit', cat: 'Produce', uom: 'kg', onHand: 16.0, storeQty: 10.0, kitchenQty: 0, barQty: 6.0, par: 20, reorder: 8, unitCost: 4000, sellingPrice: null, itemType: 'raw_material', loc: 'Fruit Chiller', theoretical: 16.0 },
  { id: 'stk_milk', name: 'Fresh Pasteurized Milk', cat: 'Dairy', uom: 'L', onHand: 22.0, storeQty: 14.0, kitchenQty: 4.0, barQty: 4.0, par: 30, reorder: 10, unitCost: 2400, sellingPrice: null, itemType: 'raw_material', loc: 'Dairy Fridge', theoretical: 22.0 },
  { id: 'stk_chocolate', name: 'Dark Chocolate Callets 70%', cat: 'Bakery', uom: 'kg', onHand: 6.2, storeQty: 4.0, kitchenQty: 2.2, barQty: 0, par: 10, reorder: 4, unitCost: 28000, sellingPrice: null, itemType: 'raw_material', loc: 'Pastry Store', theoretical: 6.2 },
  { id: 'stk_oil', name: 'Pure Sunflower Cooking Oil', cat: 'Oils', uom: 'L', onHand: 45.0, storeQty: 30.0, kitchenQty: 15.0, barQty: 0, par: 60, reorder: 20, unitCost: 4800, sellingPrice: null, itemType: 'raw_material', loc: 'Dry Store', theoretical: 45.0 },
  { id: 'stk_spices', name: 'Safari House Spice Blend', cat: 'Spices', uom: 'kg', onHand: 12.0, storeQty: 8.0, kitchenQty: 4.0, barQty: 0, par: 15, reorder: 5, unitCost: 15000, sellingPrice: null, itemType: 'raw_material', loc: 'Dry Store', theoretical: 12.0 },
  { id: 'stk_coconut', name: 'Zanzibar Coconut Milk', cat: 'Produce', uom: 'L', onHand: 14.0, storeQty: 10.0, kitchenQty: 4.0, barQty: 0, par: 20, reorder: 8, unitCost: 5500, sellingPrice: null, itemType: 'raw_material', loc: 'Dry Store', theoretical: 14.0 },

  // Direct Resale items (Retail goods - purchased and sold directly on menu without kitchen production)
  { id: 'stk_water', name: 'Kilimanjaro Mineral Water', cat: 'Drinks', uom: 'bottles', onHand: 120, storeQty: 80, kitchenQty: 0, barQty: 40, par: 150, reorder: 40, unitCost: 800, sellingPrice: 2000, itemType: 'direct_resale', loc: 'Beverage Store', theoretical: 120, menuId: 13 },
  { id: 'stk_coke', name: 'Coca-Cola Zero 330ml', cat: 'Drinks', uom: 'cans', onHand: 96, storeQty: 60, kitchenQty: 0, barQty: 36, par: 120, reorder: 30, unitCost: 1200, sellingPrice: 3000, itemType: 'direct_resale', loc: 'Beverage Store', theoretical: 96, menuId: 14 },
  { id: 'stk_beer', name: 'Safari Premium Lager 500ml', cat: 'Drinks', uom: 'bottles', onHand: 72, storeQty: 48, kitchenQty: 0, barQty: 24, par: 100, reorder: 24, unitCost: 2500, sellingPrice: 5000, itemType: 'direct_resale', loc: 'Bar Chiller', theoretical: 72, menuId: 15 }
];

export const SUPPLIERS = [
  { id: 'sup_1', name: 'Serengeti Meats & Poultry', contact: 'Bakari Mwita', phone: '+255 784 112 233', terms: 'Net 15', leadDays: 1, rating: 4.9, cats: ['Poultry', 'Meat', 'Seafood'] },
  { id: 'sup_2', name: 'Farm Fresh Tanzania Ltd', contact: 'Salma Hamad', phone: '+255 715 443 322', terms: 'Net 7', leadDays: 1, rating: 4.8, cats: ['Produce', 'Dairy'] },
  { id: 'sup_3', name: 'Kibo Food & Beverage Supplies', contact: 'Emanuel Kimaro', phone: '+255 754 887 766', terms: 'Net 30', leadDays: 2, rating: 4.7, cats: ['Dry Goods', 'Bakery', 'Oils', 'Spices', 'Drinks'] }
];

// Inter-Location Transfers (Store -> Kitchen, Store -> Bar)
export const INITIAL_TRANSFERS = [
  {
    id: 'TR-501',
    t: Date.now() - 3 * 3600 * 1000,
    fromLoc: 'Main Store',
    toLoc: 'Kitchen Prep Station',
    items: [
      { stockId: 'stk_chicken', name: 'Fresh Whole Chicken', qty: 15.0, uom: 'kg' },
      { stockId: 'stk_beef', name: 'Prime Beef Tenderloin', qty: 10.0, uom: 'kg' },
      { stockId: 'stk_spices', name: 'Safari House Spice Blend', qty: 3.0, uom: 'kg' }
    ],
    transferredBy: 'Hamisi Bakari (Storekeeper)',
    acceptedBy: 'Chef Baraka (Kitchen Lead)',
    status: 'completed',
    notes: 'Morning kitchen stock transfer for grill prep'
  },
  {
    id: 'TR-502',
    t: Date.now() - 2 * 3600 * 1000,
    fromLoc: 'Beverage Store',
    toLoc: 'Bar Station',
    items: [
      { stockId: 'stk_water', name: 'Kilimanjaro Mineral Water', qty: 40, uom: 'bottles' },
      { stockId: 'stk_coke', name: 'Coca-Cola Zero 330ml', qty: 36, uom: 'cans' },
      { stockId: 'stk_beer', name: 'Safari Premium Lager 500ml', qty: 24, uom: 'bottles' }
    ],
    transferredBy: 'Hamisi Bakari (Storekeeper)',
    acceptedBy: 'Zawadi Ally (Bar Lead)',
    status: 'completed',
    notes: 'Bar cooler restock for evening rush'
  }
];

// Procurement Requests for Quotation (RFQs - Step 1 of Procurement)
export const INITIAL_RFQS = [
  {
    id: 'RFQ-301',
    title: 'Bi-Weekly Fresh Meat & Poultry Supply',
    createdAt: Date.now() - 48 * 3600 * 1000,
    status: 'converted_to_po',
    poId: 'PO-881',
    items: [
      { stockId: 'stk_chicken', name: 'Fresh Whole Chicken', qty: 50, uom: 'kg' },
      { stockId: 'stk_beef', name: 'Prime Beef Tenderloin', qty: 30, uom: 'kg' }
    ],
    bids: [
      { supplierId: 'sup_1', supplierName: 'Serengeti Meats & Poultry', quoteAmount: 845000, leadDays: 1, selected: true },
      { supplierId: 'sup_3', supplierName: 'Kibo Food & Beverage', quoteAmount: 910000, leadDays: 2, selected: false }
    ],
    selectedSupplierId: 'sup_1',
    notes: 'Serengeti Meats selected based on lower unit pricing and same-day delivery.'
  },
  {
    id: 'RFQ-302',
    title: 'Beverage Stock Restock (Mineral Water & Soda)',
    createdAt: Date.now() - 12 * 3600 * 1000,
    status: 'bidding',
    poId: null,
    items: [
      { stockId: 'stk_water', name: 'Kilimanjaro Mineral Water', qty: 100, uom: 'bottles' },
      { stockId: 'stk_coke', name: 'Coca-Cola Zero 330ml', qty: 80, uom: 'cans' }
    ],
    bids: [
      { supplierId: 'sup_3', supplierName: 'Kibo Food & Beverage Supplies', quoteAmount: 176000, leadDays: 1, selected: false }
    ],
    selectedSupplierId: null,
    notes: 'Pending quotation from second regional distributor before PO issuance.'
  }
];

// Operating Expenses for Boss Financial P&L Analysis
export const INITIAL_EXPENSES = [
  { id: 'exp_1', t: Date.now() - 24 * 3600 * 1000, category: 'Utilities & Power', name: 'TANESCO Commercial Electricity', amount: 180000, method: 'bank', ref: 'TAN-44129' },
  { id: 'exp_2', t: Date.now() - 48 * 3600 * 1000, category: 'Gas & Fuel', name: 'Oryx Bulk LPG Gas Refill (Grill)', amount: 120000, method: 'cash', ref: 'ORYX-9912' },
  { id: 'exp_3', t: Date.now() - 72 * 3600 * 1000, category: 'Facility & Cleaning', name: 'Hygiene & Cleaning Chemicals', amount: 45000, method: 'cash', ref: 'CSH-CLN' },
  { id: 'exp_4', t: Date.now() - 96 * 3600 * 1000, category: 'Internet & Telecom', name: 'Fiber Broadband Internet (POS & KDS)', amount: 85000, method: 'bank', ref: 'TTCL-8871' }
];

export const USERS = [
  { id: 'u1', role: 'customer', name: 'Juma Rashid', ph: '0712000111', pw: 'demo', title: 'Loyal Customer', email: 'juma.r@gmail.com' },
  { id: 'u2', role: 'waiter', name: 'Amani Juma', ph: '0713000222', pw: 'demo', wid: 'w1', title: 'Senior Waiter', email: 'amani.j@safarigrill.tz' },
  { id: 'u2b', role: 'waiter', name: 'Neema Mushi', ph: '0713000223', pw: 'demo', wid: 'w2', title: 'Floor Waiter', email: 'neema.m@safarigrill.tz' },
  { id: 'u5', role: 'chef', name: 'Chef Baraka', ph: '0716000555', pw: 'demo', title: 'Head Chef & Kitchen Lead', email: 'baraka@safarigrill.tz' },
  { id: 'u8', role: 'production', name: 'Jaffar Mdee', ph: '0719000888', pw: 'demo', title: 'Central Kitchen & Production Manager', email: 'jaffar.m@safarigrill.tz' },
  { id: 'u3', role: 'cashier', name: 'Zawadi Ally', ph: '0714000333', pw: 'demo', title: 'Head Cashier / Receptionist', email: 'zawadi.a@safarigrill.tz' },
  { id: 'u6', role: 'storekeeper', name: 'Hamisi Bakari', ph: '0717000666', pw: 'demo', title: 'Storekeeper & Receiving', email: 'hamisi.b@safarigrill.tz' },
  { id: 'u4', role: 'manager', name: 'Rehema Said', ph: '0715000444', pw: 'demo', title: 'Site General Manager', email: 'rehema.s@safarigrill.tz' },
  { id: 'u7', role: 'owner', name: 'David Kimani', ph: '0718000777', pw: 'demo', title: 'Group Owner & CEO', email: 'david.k@safariholding.tz' }
];

// Central Kitchen & Manufacturing BOMs (SRS Section 4.8, CK-02, MNU-02)
export const BOMS = [
  {
    id: 'bom_chicken',
    name: 'Pre-Marinated Whole Chicken Halves',
    outputFgId: 'fg_marinated_chicken',
    outputName: 'Marinated Chicken Halves',
    targetYield: 40,
    uom: 'portions',
    prepTimeMins: 45,
    shelfLifeHours: 48,
    laborCost: 12000,
    overheadCost: 4000,
    allergens: ['Garlic'],
    targetStorage: 'Chiller (0°C to 3°C)',
    ingredients: [
      { stockId: 'stk_chicken', name: 'Fresh Whole Chicken', qty: 20.0, uom: 'kg' },
      { stockId: 'stk_spices', name: 'Safari House Spice Blend', qty: 1.6, uom: 'kg' },
      { stockId: 'stk_oil', name: 'Pure Sunflower Cooking Oil', qty: 2.0, uom: 'L' }
    ]
  },
  {
    id: 'bom_mishkaki',
    name: 'Charcoal Skewer Beef Mishkaki',
    outputFgId: 'fg_skewered_mishkaki',
    outputName: 'Marinated Beef Mishkaki Skewers',
    targetYield: 50,
    uom: 'skewers',
    prepTimeMins: 60,
    shelfLifeHours: 72,
    laborCost: 18000,
    overheadCost: 5000,
    allergens: ['Chilli'],
    targetStorage: 'Chiller (0°C to 3°C)',
    ingredients: [
      { stockId: 'stk_beef', name: 'Prime Beef Tenderloin', qty: 17.5, uom: 'kg' },
      { stockId: 'stk_spices', name: 'Safari House Spice Blend', qty: 2.5, uom: 'kg' }
    ]
  },
  {
    id: 'bom_pilau_base',
    name: 'Swahili Beef Pilau Broth Concentrated Base',
    outputFgId: 'fg_pilau_base',
    outputName: 'Pilau Broth Concentrate',
    targetYield: 30,
    uom: 'litres',
    prepTimeMins: 90,
    shelfLifeHours: 96,
    laborCost: 15000,
    overheadCost: 6000,
    allergens: [],
    targetStorage: 'Chiller (1°C to 4°C)',
    ingredients: [
      { stockId: 'stk_beef', name: 'Prime Beef Tenderloin (Bone & Trim)', qty: 6.0, uom: 'kg' },
      { stockId: 'stk_spices', name: 'Safari House Spice Blend', qty: 1.5, uom: 'kg' },
      { stockId: 'stk_oil', name: 'Pure Sunflower Cooking Oil', qty: 2.0, uom: 'L' }
    ]
  },
  {
    id: 'bom_lava_mix',
    name: 'Molten Belgian Chocolate Lava Batter',
    outputFgId: 'fg_lava_mix',
    outputName: 'Lava Cake Batter Ramekins',
    targetYield: 25,
    uom: 'ramekins',
    prepTimeMins: 30,
    shelfLifeHours: 72,
    laborCost: 10000,
    overheadCost: 3500,
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    targetStorage: 'Pastry Chiller (2°C to 4°C)',
    ingredients: [
      { stockId: 'stk_chocolate', name: 'Dark Chocolate Callets 70%', qty: 3.75, uom: 'kg' },
      { stockId: 'stk_milk', name: 'Fresh Pasteurized Milk', qty: 2.0, uom: 'L' }
    ]
  }
];

// Finished Goods / Prep Stock Inventory (Section 4.6, 4.8)
export const INITIAL_FINISHED_GOODS = [
  {
    id: 'fg_marinated_chicken',
    name: 'Marinated Chicken Halves',
    category: 'Prepared Poultry',
    uom: 'portions',
    onHand: 48,
    par: 60,
    reorder: 20,
    unitCost: 5420,
    batchNo: 'BATCH-20261101-01',
    expiry: 'Nov 3, 2026',
    allergens: ['Garlic'],
    loc: 'Cold Room A (Masaki)',
    menuId: 1
  },
  {
    id: 'fg_skewered_mishkaki',
    name: 'Marinated Beef Mishkaki Skewers',
    category: 'Prepared Meat',
    uom: 'skewers',
    onHand: 65,
    par: 80,
    reorder: 30,
    unitCost: 6100,
    batchNo: 'BATCH-20261101-02',
    expiry: 'Nov 4, 2026',
    allergens: ['Chilli'],
    loc: 'Meat Freezer Pass',
    menuId: 2
  },
  {
    id: 'fg_pilau_base',
    name: 'Pilau Broth Concentrate',
    category: 'Prepared Bases',
    uom: 'litres',
    onHand: 24,
    par: 30,
    reorder: 10,
    unitCost: 4800,
    batchNo: 'BATCH-20261031-04',
    expiry: 'Nov 5, 2026',
    allergens: [],
    loc: 'Sauce Walk-in',
    menuId: 7
  },
  {
    id: 'fg_lava_mix',
    name: 'Lava Cake Batter Ramekins',
    category: 'Prepared Pastry',
    uom: 'ramekins',
    onHand: 18,
    par: 25,
    reorder: 8,
    unitCost: 4950,
    batchNo: 'BATCH-20261031-05',
    expiry: 'Nov 3, 2026',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    loc: 'Pastry Chiller',
    menuId: 11
  }
];

// Production Work Orders (SRS CK-02)
export const INITIAL_PRODUCTION_ORDERS = [
  {
    id: 'WO-101',
    batchNo: 'BATCH-20261101-01',
    bomId: 'bom_chicken',
    productName: 'Marinated Chicken Halves',
    plannedYield: 40,
    actualYield: 38,
    uom: 'portions',
    status: 'completed',
    operator: 'Chef Baraka',
    tempLog: '2.6°C',
    laborCost: 12000,
    overheadCost: 4000,
    materialsCost: 194000,
    totalBatchCost: 210000,
    unitCost: 5526,
    yieldVariancePct: -5.0,
    createdAt: Date.now() - 5 * 3600 * 1000,
    completedAt: Date.now() - 3 * 3600 * 1000,
    expiryDate: new Date(Date.now() + 48 * 3600 * 1000).toLocaleDateString(),
    notes: 'Batch seasoned with fresh garlic rosemary rub. 2 portions culled for underweight inspection.'
  },
  {
    id: 'WO-102',
    batchNo: 'BATCH-20261101-02',
    bomId: 'bom_mishkaki',
    productName: 'Marinated Beef Mishkaki Skewers',
    plannedYield: 50,
    actualYield: 50,
    uom: 'skewers',
    status: 'completed',
    operator: 'Jaffar Mdee',
    tempLog: '2.8°C',
    laborCost: 18000,
    overheadCost: 5000,
    materialsCost: 282500,
    totalBatchCost: 305500,
    unitCost: 6110,
    yieldVariancePct: 0.0,
    createdAt: Date.now() - 4 * 3600 * 1000,
    completedAt: Date.now() - 2 * 3600 * 1000,
    expiryDate: new Date(Date.now() + 72 * 3600 * 1000).toLocaleDateString(),
    notes: '100% yield achieved with zero trim loss.'
  },
  {
    id: 'WO-103',
    batchNo: 'BATCH-20261101-03',
    bomId: 'bom_lava_mix',
    productName: 'Lava Cake Batter Ramekins',
    plannedYield: 25,
    actualYield: null,
    uom: 'ramekins',
    status: 'in_production',
    operator: 'Jaffar Mdee',
    tempLog: '3.4°C',
    laborCost: 10000,
    overheadCost: 3500,
    materialsCost: 109800,
    totalBatchCost: 123300,
    unitCost: 4932,
    yieldVariancePct: null,
    createdAt: Date.now() - 45 * 60 * 1000,
    completedAt: null,
    expiryDate: new Date(Date.now() + 72 * 3600 * 1000).toLocaleDateString(),
    notes: 'Currently tempering dark Belgian chocolate callets in bain-marie.'
  }
];

// Inter-site Requisitions from Outlets to Central Kitchen (SRS CK-01, CK-03)
export const INITIAL_SITE_REQUISITIONS = [
  {
    id: 'REQ-401',
    fromSiteId: 'oysterbay',
    fromSiteName: 'Safari Grill Express · Oysterbay',
    toSiteId: 'ck',
    toSiteName: 'Central Production Facility (Masaki)',
    status: 'approved',
    items: [
      { fgId: 'fg_marinated_chicken', name: 'Marinated Chicken Halves', qty: 15, uom: 'portions' },
      { fgId: 'fg_skewered_mishkaki', name: 'Marinated Beef Mishkaki Skewers', qty: 20, uom: 'skewers' }
    ],
    requestedAt: Date.now() - 3 * 3600 * 1000,
    requestedBy: 'Hassan Mwinyi (GM Oysterbay)',
    dispatchedAt: Date.now() - 1 * 3600 * 1000,
    driver: 'Rashid Mtambo (Van #TZ 881 AC)',
    transportTemp: '3.1°C'
  },
  {
    id: 'REQ-402',
    fromSiteId: 'city',
    fromSiteName: 'Safari Grill & Lounge · City Centre',
    toSiteId: 'ck',
    toSiteName: 'Central Production Facility (Masaki)',
    status: 'pending',
    items: [
      { fgId: 'fg_pilau_base', name: 'Pilau Broth Concentrate', qty: 10, uom: 'litres' },
      { fgId: 'fg_lava_mix', name: 'Lava Cake Batter Ramekins', qty: 12, uom: 'ramekins' }
    ],
    requestedAt: Date.now() - 45 * 60 * 1000,
    requestedBy: 'Fatma Juma (GM City Centre)',
    dispatchedAt: null,
    driver: null,
    transportTemp: null
  }
];


export const WAITERS = [
  { id: 'w1', name: 'Amani Juma', phone: '0713000222', tok: 'amani-7QK2', active: true, tables: ['T1', 'T2', 'T3'], avatar: '👨🏾‍🍳' },
  { id: 'w2', name: 'Neema Mushi', phone: '0713000223', tok: 'neema-X93F', active: true, tables: ['T4', 'T5', 'T6'], avatar: '👩🏾‍🍳' }
];

export const tot = o => (o.it || []).reduce((a, l) => a + (M[l.id] ? M[l.id].p : 0) * l.q, 0);
export const calcTax = amt => Math.round(amt - amt / 1.18); // 18% VAT included
export const calcNet = amt => Math.round(amt / 1.18);

const now = Date.now();

export const INITIAL_ORDERS = [
  {
    id: 101,
    no: '#1001',
    src: 'WAITER_LINK',
    tb: 'T2',
    wid: 'w1',
    by: 'Juma Rashid',
    it: [{ id: 1, q: 2, note: 'Extra garlic herb butter' }, { id: 8, q: 2, note: 'No ice' }],
    st: 'preparing',
    pm: 'momo',
    paid: false,
    t: now - 18 * 60 * 1000,
    cust: 'u1',
    created_at: now - 18 * 60 * 1000,
    log: ['Order placed via Waiter Link', 'Kitchen accepted ticket']
  },
  {
    id: 102,
    no: '#1002',
    src: 'TABLE_QR',
    tb: 'T5',
    wid: 'w2',
    by: 'Table 5 QR Guest',
    it: [{ id: 4, q: 1, note: 'Medium-well, cheddar' }, { id: 6, q: 1, note: 'Extra spicy' }],
    st: 'billreq',
    pm: 'cashier',
    paid: false,
    t: now - 35 * 60 * 1000,
    cust: 'guest_102',
    created_at: now - 35 * 60 * 1000,
    log: ['Order placed via Table QR', 'Served at table', 'Customer requested bill']
  },
  {
    id: 103,
    no: '#1003',
    src: 'WALKIN_WAITER',
    tb: 'T1',
    wid: 'w1',
    by: 'Amani Juma',
    it: [{ id: 3, q: 1, note: 'With fragrant rice' }, { id: 7, q: 1, note: '' }],
    st: 'served',
    pm: 'cashier',
    paid: false,
    t: now - 42 * 60 * 1000,
    cust: 'guest_103',
    created_at: now - 42 * 60 * 1000,
    log: ['Walk-in entered by Waiter Amani', 'Served to table']
  },
  {
    id: 104,
    no: '#1004',
    src: 'WAITER_LINK',
    tb: 'T3',
    wid: 'w1',
    by: 'Sarah M.',
    it: [{ id: 2, q: 2, note: 'Spicy kachumbari' }, { id: 9, q: 2, note: '' }],
    st: 'paid',
    pm: 'momo',
    paid: true,
    t: now - 75 * 60 * 1000,
    cust: 'guest_104',
    created_at: now - 75 * 60 * 1000,
    log: ['Placed via link', 'Kitchen served', 'Momo payment verified (MPesa #TX99120)']
  },
  {
    id: 105,
    no: '#1005',
    src: 'CASHIER',
    tb: 'Takeaway',
    wid: 'w1',
    by: 'Zawadi Ally',
    it: [{ id: 5, q: 2, note: 'Takeaway packaging' }, { id: 6, q: 2, note: '' }, { id: 8, q: 2, note: '' }],
    st: 'placed',
    pm: 'cash',
    paid: false,
    t: now - 5 * 60 * 1000,
    cust: 'guest_105',
    created_at: now - 5 * 60 * 1000,
    log: ['Order taken at cashier counter', 'Sent to kitchen queue']
  }
];

export const INITIAL_LEDGER = [
  {
    id: 'L104',
    oid: 104,
    wid: 'w1',
    method: 'percent',
    rate: 5,
    basis: 'gross',
    eligibleAmt: 42000,
    amt: 2100,
    st: 'pending',
    t: now - 74 * 60 * 1000,
    note: 'Order #1004 payment confirmed'
  }
];

export const INITIAL_PURCHASE_ORDERS = [
  {
    id: 'PO-881',
    supplierId: 'sup_1',
    supplierName: 'Serengeti Meats & Poultry',
    siteId: 'masaki',
    status: 'received',
    items: [
      { stockId: 'stk_chicken', name: 'Fresh Whole Chicken', qty: 25, unitPrice: 8500, uom: 'kg' },
      { stockId: 'stk_beef', name: 'Prime Beef Tenderloin', qty: 15, unitPrice: 14000, uom: 'kg' }
    ],
    total: 422500,
    tempLog: '3.4°C',
    createdAt: now - 6 * 3600 * 1000,
    receivedAt: now - 2 * 3600 * 1000,
    notes: 'Morning fresh poultry and meat delivery'
  },
  {
    id: 'PO-882',
    supplierId: 'sup_2',
    supplierName: 'Farm Fresh Tanzania Ltd',
    siteId: 'masaki',
    status: 'pending_approval',
    items: [
      { stockId: 'stk_mangoes', name: 'Kilombero Mangoes', qty: 30, unitPrice: 2500, uom: 'kg' },
      { stockId: 'stk_passion', name: 'Lushoto Passion Fruit', qty: 15, unitPrice: 4000, uom: 'kg' },
      { stockId: 'stk_potatoes', name: 'Mbeya Red Potatoes', qty: 50, unitPrice: 1800, uom: 'kg' }
    ],
    total: 225000,
    createdAt: now - 1 * 3600 * 1000,
    notes: 'Restock fresh produce for weekend rush'
  }
];

export const INITIAL_WASTE_LOG = [
  { id: 'wst_1', stockId: 'stk_potatoes', name: 'Mbeya Red Potatoes', qty: 4.5, uom: 'kg', cost: 8100, reason: 'Bruised during prep', user: 'Chef Baraka', t: now - 4 * 3600 * 1000 },
  { id: 'wst_2', stockId: 'stk_milk', name: 'Fresh Milk', qty: 2.0, uom: 'L', cost: 4800, reason: 'Sour after power dip', user: 'Hamisi Bakari', t: now - 24 * 3600 * 1000 }
];

export const INITIAL_CHECKLISTS = [
  { id: 'chk_open', title: 'Morning Opening Checklist', type: 'opening', date: new Date().toISOString().slice(0, 10), completed: true, signedBy: 'Rehema Said (GM)', items: [
    { text: 'Cash drawer float verified (TSh 200,000)', done: true },
    { text: 'Kitchen cold room temp below 4°C (Logged 3.1°C)', done: true },
    { text: 'Grill gas valves and extraction fans active', done: true },
    { text: 'POS and KDS terminals online and synced', done: true },
    { text: 'Staff grooming and health check passed', done: true }
  ]},
  { id: 'chk_haccp', title: 'HACCP & Temperature Safety Log', type: 'haccp', date: new Date().toISOString().slice(0, 10), completed: true, signedBy: 'Chef Baraka', items: [
    { text: 'Walk-in Meat Cooler: 2.4°C (Normal: 0-4°C)', done: true },
    { text: 'Dairy Refrigerator: 3.2°C (Normal: 1-4°C)', done: true },
    { text: 'Cooked Food Pass Warmer: 68°C (Normal: >63°C)', done: true },
    { text: 'Handwash stations stocked with antibacterial soap', done: true }
  ]},
  { id: 'chk_close', title: 'Shift End Closing Checklist', type: 'closing', date: new Date().toISOString().slice(0, 10), completed: false, signedBy: null, items: [
    { text: 'Blind cash drawer count entered by cashier', done: false },
    { text: 'All open bills settled or transferred', done: false },
    { text: 'Waiter cash hand-over balanced with zero variance', done: false },
    { text: 'Grill and fryers safely extinguished & cleaned', done: false },
    { text: 'Z-Report generated and synced to HQ', done: false }
  ]}
];

export const INITIAL_AUDIT_LOG = [
  { id: 'aud_1', t: now - 75 * 60 * 1000, user: 'Zawadi Ally (Cashier)', action: 'PAYMENT_VERIFIED', detail: 'Verified Tigo/M-Pesa payment TSh 42,000 for Order #1004' },
  { id: 'aud_2', t: now - 74 * 60 * 1000, user: 'System (Engine)', action: 'COMMISSION_POSTED', detail: 'Posted commission TSh 2,100 snapshot for Waiter Amani Juma (Order #1004)' },
  { id: 'aud_3', t: now - 60 * 60 * 1000, user: 'Rehema Said (GM)', action: 'POLICY_SAVED', detail: 'Updated default commission rate to 5% gross' },
  { id: 'aud_4', t: now - 40 * 60 * 1000, user: 'Chef Baraka', action: '86_STATUS_UPDATE', detail: 'Checked menu availability (all items currently active)' },
  { id: 'aud_5', t: now - 5 * 60 * 1000, user: 'Hamisi Bakari', action: 'STOCK_DEPLETION', detail: 'Theoretical inventory updated after Order #1005 entry' }
];

export const SEED = {
  no: 1006,
  siteId: 'masaki',
  shiftState: 'service', // opening, service, closed
  openingFloat: 200000,
  countedCash: '',
  policy: {
    method: 'percent', // 'percent' | 'fixed' | 'tiered'
    rate: 5,
    fixed: 2000,
    basis: 'gross', // 'gross' | 'net'
    trigger: 'payment', // 'payment' | 'served'
    from: new Date().toISOString().slice(0, 10),
    overrides: { w1: 5.5 }
  },
  waiters: WAITERS,
  users: USERS,
  orders: INITIAL_ORDERS,
  ledger: INITIAL_LEDGER,
  stock: STOCK_ITEMS,
  menu: MENU,
  suppliers: SUPPLIERS,
  transfers: INITIAL_TRANSFERS,
  rfqs: INITIAL_RFQS,
  expenses: INITIAL_EXPENSES,
  finishedGoods: INITIAL_FINISHED_GOODS,
  boms: BOMS,
  productionOrders: INITIAL_PRODUCTION_ORDERS,
  siteRequisitions: INITIAL_SITE_REQUISITIONS,
  purchaseOrders: INITIAL_PURCHASE_ORDERS,
  wasteLog: INITIAL_WASTE_LOG,
  checklists: INITIAL_CHECKLISTS,
  auditLog: INITIAL_AUDIT_LOG,
  outOfStockIds: [] // 86 list
};

