export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface User {
  id: Number;
  email: string;
  name: string;
  password: string;
}

// User data without password (for API responses and req.user)
export interface UserWithoutPassword {
  id: number;
  email: string;
  name: string;
}
