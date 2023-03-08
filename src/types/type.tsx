export interface Todo {
  id: number;
  title: string;
  description: string;
  userId: number;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CustomRouteProps {
  exact?: boolean;
}
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}
