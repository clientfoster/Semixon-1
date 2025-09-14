// Firebase utility functions for connection testing and error handling

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const testFirestoreConnection = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Test read operation
    const testDocRef = doc(db, '_test', 'connection');
    await getDoc(testDocRef);
    
    return { success: true };
  } catch (error: any) {
    console.error('Firestore connection test failed:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown connection error' 
    };
  }
};

export const createTestDocument = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const testDocRef = doc(db, '_test', 'connection');
    await setDoc(testDocRef, {
      timestamp: new Date(),
      message: 'Connection test successful'
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Firestore write test failed:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown write error' 
    };
  }
};

export const getConnectionStatus = (): 'connected' | 'connecting' | 'disconnected' => {
  // This is a simplified status check
  // In a real app, you'd want to implement proper connection state tracking
  return 'connected';
};
