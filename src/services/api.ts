// API service for fetching data from dummyjson.com

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  company: { name: string };
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com";

/** Fetch paginated users with optional search */
export async function fetchUsers(page = 1, limit = 10, search = ""): Promise<UsersResponse> {
  const skip = (page - 1) * limit;
  const url = search
    ? `${BASE_URL}/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/users?limit=${limit}&skip=${skip}`;
  const res = await fetch(url);
  return res.json();
}

/** Fetch paginated products with optional search */
export async function fetchProducts(page = 1, limit = 12, search = ""): Promise<ProductsResponse> {
  const skip = (page - 1) * limit;
  const url = search
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  const res = await fetch(url);
  return res.json();
}
