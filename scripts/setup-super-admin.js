const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  "projectId": "studio-262487200-a8a7e",
  "appId": "1:1029715014191:web:a7dbc61a2c4ceb784d4cda",
  "storageBucket": "studio-262487200-a8a7e.firebasestorage.app",
  "apiKey": "AIzaSyAv15b3tb2dnP4D7lOzBIRad8zptcfliQs",
  "authDomain": "studio-262487200-a8a7e.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1029715014191"
};

async function createSuperAdmin() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Get user input
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    console.log('🚀 Setting up Super Admin Account for Semixon Admin Panel\n');

    const email = await question('Enter email address: ');
    const password = await question('Enter password (min 6 characters): ');
    const displayName = await question('Enter display name: ');

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    console.log('\n⏳ Creating super admin account...');

    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    console.log('✅ Firebase user created successfully');

    // Create super admin document in Firestore
    const superAdmin = {
      uid: firebaseUser.uid,
      email: email,
      displayName: displayName,
      role: 'super-admin',
      isActive: true,
      createdAt: new Date(),
      lastLoginAt: new Date(),
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

    console.log('✅ Super admin document created in Firestore');
    console.log('\n🎉 Super Admin Setup Complete!');
    console.log('\n📋 Account Details:');
    console.log(`   Email: ${email}`);
    console.log(`   Display Name: ${displayName}`);
    console.log(`   Role: Super Admin`);
    console.log(`   UID: ${firebaseUser.uid}`);
    console.log('\n🔗 You can now login at: http://localhost:9002/admin/login');

    rl.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating super admin:', error.message);
    process.exit(1);
  }
}

createSuperAdmin();
