// src/store/types.ts
export interface RootState {
  category: CategoryState;
  auth: AuthState;
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

