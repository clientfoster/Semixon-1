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

async function createDefaultAdmin() {
  try {
    console.log('🚀 Creating default admin account...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const email = 'admin@semixon.com';
    const password = 'admin123456';
    const displayName = 'Super Admin';

    console.log('⏳ Creating Firebase user...');

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
    console.log('\n🎉 Default Admin Account Created!');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: Super Admin`);
    console.log(`   UID: ${firebaseUser.uid}`);
    console.log('\n🔗 Login at: http://localhost:9002/admin/login');

    process.exit(0);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Admin account already exists!');
      console.log('\n📋 Use these credentials:');
      console.log('   Email: admin@semixon.com');
      console.log('   Password: admin123456');
      console.log('\n🔗 Login at: http://localhost:9002/admin/login');
    } else {
      console.error('❌ Error creating admin account:', error.message);
    }
    process.exit(0);
  }
}

createDefaultAdmin();
