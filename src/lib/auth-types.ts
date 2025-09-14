export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'super-admin' | 'admin' | 'editor';
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  createdBy?: string;
  permissions: {
    canManageUsers: boolean;
    canManageContent: boolean;
    canManageSettings: boolean;
    canViewAnalytics: boolean;
  };
}

export interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AdminUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  displayName: string;
  role: 'admin' | 'editor';
}
