// src/store/types.t

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthRegisterUser {
  password: string;
  confirmPassword: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string; // Note: You had first_name twice in your JSON
}

export interface LoginResponse {
  user: User;
  message?: string;
}

export interface User {
  id: number;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  password: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  desktopImage: string;
  mobileImage: string;
  description: string;
  featured: boolean;
}

export interface CategoryState {
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
}

export interface CategoryInProduct {
  id: number;
  name: string;
}

export interface ProductItem {
  id: number;
  name: string;
  category: CategoryInProduct;
  price: string;
  stock: number;
  image_url: string;
  description : string;
  is_active: boolean;
  is_featured: boolean
}

export interface ProductResponse {
  products: ProductItem[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface ProductState extends ProductResponse {
  loading: boolean;
  error: string | null;
}

export interface ModofyProductState extends ProductState {
  addProductLoading: boolean;
  updateProductLoading: boolean;
  deleteProductLoading: boolean;
  addProductError: string | null;
  updateProductError: string | null;
  deleteProductError: string | null;
}


// cart

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface  Cart {
  items: CartItem[],
  total : 0,
  loading: boolean,
  error : string
}

