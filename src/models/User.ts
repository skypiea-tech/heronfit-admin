export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersPerMonth: number[];
}