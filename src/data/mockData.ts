// ─── Mock Products ───────────────────────────────────────────────────────────
export interface MockProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image: string;
  rating: number;
  sales: number;
  sku: string;
}

export const mockProducts: MockProduct[] = [
  { id: "P001", name: "iPhone 15 Pro Max", category: "Electronics", price: 1199, stock: 45, status: "active", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80", rating: 4.9, sales: 1240, sku: "APL-IP15PM" },
  { id: "P002", name: "MacBook Pro 16\"", category: "Electronics", price: 2499, stock: 12, status: "active", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", rating: 4.8, sales: 890, sku: "APL-MBP16" },
  { id: "P003", name: "Nike Air Max 270", category: "Footwear", price: 149, stock: 230, status: "active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", rating: 4.6, sales: 3200, sku: "NK-AM270" },
  { id: "P004", name: "Sony WH-1000XM5", category: "Electronics", price: 349, stock: 78, status: "active", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80", rating: 4.7, sales: 2100, sku: "SNY-WH1000" },
  { id: "P005", name: "Levi's 501 Jeans", category: "Clothing", price: 89, stock: 450, status: "active", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", rating: 4.4, sales: 5600, sku: "LV-501-32" },
  { id: "P006", name: "Dyson V15 Detect", category: "Home", price: 749, stock: 34, status: "active", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.8, sales: 670, sku: "DYS-V15" },
  { id: "P007", name: "Samsung 4K OLED TV", category: "Electronics", price: 1899, stock: 8, status: "active", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80", rating: 4.7, sales: 340, sku: "SAM-OLED65" },
  { id: "P008", name: "Adidas Ultraboost 23", category: "Footwear", price: 189, stock: 180, status: "active", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80", rating: 4.5, sales: 2800, sku: "ADI-UB23" },
  { id: "P009", name: "Instant Pot Duo 7-in-1", category: "Home", price: 99, stock: 120, status: "active", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80", rating: 4.6, sales: 4100, sku: "IP-DUO7" },
  { id: "P010", name: "Canon EOS R6 Mark II", category: "Electronics", price: 2499, stock: 15, status: "draft", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", rating: 4.9, sales: 210, sku: "CAN-R6M2" },
  { id: "P011", name: "Patagonia Fleece Jacket", category: "Clothing", price: 229, stock: 95, status: "active", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80", rating: 4.7, sales: 1560, sku: "PAT-FJ-M" },
  { id: "P012", name: "KitchenAid Stand Mixer", category: "Home", price: 449, stock: 3, status: "active", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", rating: 4.8, sales: 890, sku: "KA-SM5" },
];

// ─── Mock Orders ─────────────────────────────────────────────────────────────
export interface MockOrder {
  id: string;
  customer: string;
  customerEmail: string;
  avatar: string;
  product: string;
  amount: number;
  status: "fulfilled" | "pending" | "cancelled" | "refunded";
  paymentStatus: "paid" | "pending" | "failed";
  date: string;
  items: number;
}

export const mockOrders: MockOrder[] = [
  { id: "#1042", customer: "Sarah Connor", customerEmail: "sarah@example.com", avatar: "SC", product: "iPhone 15 Pro Max", amount: 1199, status: "fulfilled", paymentStatus: "paid", date: "Mar 19, 2026", items: 1 },
  { id: "#1041", customer: "John Doe", customerEmail: "john@example.com", avatar: "JD", product: "MacBook Pro 16\"", amount: 2499, status: "pending", paymentStatus: "paid", date: "Mar 18, 2026", items: 1 },
  { id: "#1040", customer: "Alice Brown", customerEmail: "alice@example.com", avatar: "AB", product: "Sony WH-1000XM5", amount: 349, status: "fulfilled", paymentStatus: "paid", date: "Mar 18, 2026", items: 1 },
  { id: "#1039", customer: "Bob Wilson", customerEmail: "bob@example.com", avatar: "BW", product: "Nike Air Max 270", amount: 298, status: "fulfilled", paymentStatus: "paid", date: "Mar 17, 2026", items: 2 },
  { id: "#1038", customer: "Diana Martinez", customerEmail: "diana@example.com", avatar: "DM", product: "Dyson V15 Detect", amount: 749, status: "cancelled", paymentStatus: "failed", date: "Mar 17, 2026", items: 1 },
  { id: "#1037", customer: "Ethan Davis", customerEmail: "ethan@example.com", avatar: "ED", product: "Levi's 501 Jeans", amount: 178, status: "fulfilled", paymentStatus: "paid", date: "Mar 16, 2026", items: 2 },
  { id: "#1036", customer: "Fiona Garcia", customerEmail: "fiona@example.com", avatar: "FG", product: "KitchenAid Stand Mixer", amount: 449, status: "pending", paymentStatus: "pending", date: "Mar 16, 2026", items: 1 },
  { id: "#1035", customer: "George Lee", customerEmail: "george@example.com", avatar: "GL", product: "Samsung 4K OLED TV", amount: 1899, status: "fulfilled", paymentStatus: "paid", date: "Mar 15, 2026", items: 1 },
  { id: "#1034", customer: "Hannah Kim", customerEmail: "hannah@example.com", avatar: "HK", product: "Adidas Ultraboost 23", amount: 189, status: "refunded", paymentStatus: "paid", date: "Mar 15, 2026", items: 1 },
  { id: "#1033", customer: "Ivan Petrov", customerEmail: "ivan@example.com", avatar: "IP", product: "Instant Pot Duo", amount: 99, status: "fulfilled", paymentStatus: "paid", date: "Mar 14, 2026", items: 1 },
  { id: "#1032", customer: "Julia Chen", customerEmail: "julia@example.com", avatar: "JC", product: "Patagonia Fleece Jacket", amount: 229, status: "pending", paymentStatus: "pending", date: "Mar 14, 2026", items: 1 },
  { id: "#1031", customer: "Kevin Park", customerEmail: "kevin@example.com", avatar: "KP", product: "Canon EOS R6 Mark II", amount: 2499, status: "fulfilled", paymentStatus: "paid", date: "Mar 13, 2026", items: 1 },
];

// ─── Mock Customers ───────────────────────────────────────────────────────────
export interface MockCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  orders: number;
  spent: number;
  status: "active" | "inactive";
  joined: string;
  lastOrder: string;
}

export const mockCustomers: MockCustomer[] = [
  { id: "C001", name: "Sarah Connor", email: "sarah@example.com", avatar: "SC", location: "New York, US", orders: 12, spent: 4890, status: "active", joined: "Jan 2025", lastOrder: "Mar 19, 2026" },
  { id: "C002", name: "John Doe", email: "john@example.com", avatar: "JD", location: "Los Angeles, US", orders: 8, spent: 3240, status: "active", joined: "Feb 2025", lastOrder: "Mar 18, 2026" },
  { id: "C003", name: "Alice Brown", email: "alice@example.com", avatar: "AB", location: "Chicago, US", orders: 23, spent: 9120, status: "active", joined: "Nov 2024", lastOrder: "Mar 18, 2026" },
  { id: "C004", name: "Bob Wilson", email: "bob@example.com", avatar: "BW", location: "Houston, US", orders: 5, spent: 1560, status: "inactive", joined: "Mar 2025", lastOrder: "Mar 17, 2026" },
  { id: "C005", name: "Diana Martinez", email: "diana@example.com", avatar: "DM", location: "Phoenix, US", orders: 17, spent: 6780, status: "active", joined: "Dec 2024", lastOrder: "Mar 17, 2026" },
  { id: "C006", name: "Ethan Davis", email: "ethan@example.com", avatar: "ED", location: "Philadelphia, US", orders: 3, spent: 890, status: "active", joined: "Apr 2025", lastOrder: "Mar 16, 2026" },
  { id: "C007", name: "Fiona Garcia", email: "fiona@example.com", avatar: "FG", location: "San Antonio, US", orders: 9, spent: 2340, status: "active", joined: "Jan 2025", lastOrder: "Mar 16, 2026" },
  { id: "C008", name: "George Lee", email: "george@example.com", avatar: "GL", location: "San Diego, US", orders: 31, spent: 14200, status: "active", joined: "Sep 2024", lastOrder: "Mar 15, 2026" },
];

// ─── Chart Data ───────────────────────────────────────────────────────────────
export const salesTrendData = [
  { month: "Apr", revenue: 42000, orders: 310, customers: 180 },
  { month: "May", revenue: 58000, orders: 420, customers: 240 },
  { month: "Jun", revenue: 51000, orders: 380, customers: 210 },
  { month: "Jul", revenue: 67000, orders: 490, customers: 290 },
  { month: "Aug", revenue: 74000, orders: 540, customers: 320 },
  { month: "Sep", revenue: 69000, orders: 510, customers: 300 },
  { month: "Oct", revenue: 82000, orders: 610, customers: 380 },
  { month: "Nov", revenue: 91000, orders: 680, customers: 420 },
  { month: "Dec", revenue: 108000, orders: 820, customers: 510 },
  { month: "Jan", revenue: 95000, orders: 720, customers: 450 },
  { month: "Feb", revenue: 112000, orders: 850, customers: 530 },
  { month: "Mar", revenue: 128000, orders: 940, customers: 590 },
];

export const trafficSourceData = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#22c55e" },
  { name: "Social Media", value: 18, color: "#f59e0b" },
  { name: "Email", value: 12, color: "#ec4899" },
  { name: "Referral", value: 8, color: "#14b8a6" },
];

export const topProductsData = [
  { name: "iPhone 15 Pro", sales: 1240, revenue: 1486760 },
  { name: "MacBook Pro", sales: 890, revenue: 2224110 },
  { name: "Nike Air Max", sales: 3200, revenue: 476800 },
  { name: "Sony WH-1000", sales: 2100, revenue: 732900 },
  { name: "Dyson V15", sales: 670, revenue: 501830 },
];

export const weeklyData = [
  { day: "Mon", sales: 4200, visitors: 1200 },
  { day: "Tue", sales: 5800, visitors: 1800 },
  { day: "Wed", sales: 4900, visitors: 1500 },
  { day: "Thu", sales: 7200, visitors: 2200 },
  { day: "Fri", sales: 8100, visitors: 2600 },
  { day: "Sat", sales: 6400, visitors: 2000 },
  { day: "Sun", sales: 5100, visitors: 1600 },
];
