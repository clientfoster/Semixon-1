import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { AdminUser } from './auth-types';

export async function createSuperAdmin(email: string, password: string, displayName: string) {
  try {
    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Create super admin user document
    const superAdmin: AdminUser = {
      uid: firebaseUser.uid,
      email: email,
      displayName: displayName,
      role: 'super-admin',
      isActive: true,
      createdAt: new Date(),
      permissions: {
        canManageUsers: true,
        canManageContent: true,
        canManageSettings: true,
        canViewAnalytics: true,
      }
    };

    await setDoc(doc(db, 'adminUsers', firebaseUser.uid), {
      ...superAdmin,
      createdAt: superAdmin.createdAt,
      lastLoginAt: superAdmin.lastLoginAt,
    });

    console.log('Super admin created successfully:', superAdmin);
    return superAdmin;
  } catch (error) {
    console.error('Error creating super admin:', error);
    throw error;
  }
}

// Usage example (run this once to create the first super admin):
// createSuperAdmin('admin@semixon.com', 'your-secure-password', 'Super Admin');
