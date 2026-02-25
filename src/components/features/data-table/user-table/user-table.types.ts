
export type IUserStatus = 'active' | 'pending' | 'banned';
export type IUserRole = 'admin' | 'editor' | 'viewer';

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  role: IUserRole;
  status: IUserStatus;
  lastLogin: string;
}
