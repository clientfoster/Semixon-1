'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AdminUser, AuthContextType } from '@/lib/auth-types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Create admin user document in Firestore
  const createAdminUser = async (firebaseUser: FirebaseUser, role: 'super-admin' | 'admin' | 'editor' = 'admin') => {
    const adminUser: AdminUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || '',
      role,
      isActive: true,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      permissions: {
        canManageUsers: role === 'super-admin' || role === 'admin',
        canManageContent: true,
        canManageSettings: role === 'super-admin' || role === 'admin',
        canViewAnalytics: true,
      }
    };

    await setDoc(doc(db, 'adminUsers', firebaseUser.uid), {
      ...adminUser,
      createdAt: adminUser.createdAt,
      lastLoginAt: adminUser.lastLoginAt,
    });

    return adminUser;
  };

  // Fetch admin user data from Firestore
  const fetchAdminUser = async (firebaseUser: FirebaseUser): Promise<AdminUser | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'adminUsers', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          ...userData,
          createdAt: userData.createdAt?.toDate() || new Date(),
          lastLoginAt: userData.lastLoginAt?.toDate(),
        } as AdminUser;
      } else {
        // If user doesn't exist in adminUsers collection, create them
        return await createAdminUser(firebaseUser);
      }
    } catch (error) {
      console.error('Error fetching admin user:', error);
      return null;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const adminUser = await fetchAdminUser(firebaseUser);
      
      if (!adminUser) {
        throw new Error('Failed to fetch admin user data');
      }

      if (!adminUser.isActive) {
        await firebaseSignOut(auth);
        throw new Error('Your account has been deactivated. Please contact a super admin.');
      }

      // Update last login time
      await updateDoc(doc(db, 'adminUsers', firebaseUser.uid), {
        lastLoginAt: new Date(),
      });

      setUser(adminUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (data: Partial<AdminUser>) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'adminUsers', user.uid), {
        ...data,
        updatedAt: new Date(),
      });

      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!auth.currentUser) return;

    try {
      const adminUser = await fetchAdminUser(auth.currentUser);
      if (adminUser) {
        setUser(adminUser);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const adminUser = await fetchAdminUser(firebaseUser);
          if (adminUser && adminUser.isActive) {
            setUser(adminUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signOut,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
