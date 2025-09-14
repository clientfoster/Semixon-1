# 🚀 Semixon Admin Panel Setup

## Quick Start

### 1. Start the Development Server
```bash
npm run dev
```
The server will start at `http://localhost:9002`

### 2. Create Super Admin Account
Visit: `http://localhost:9002/setup`

Fill in the form:
- **Display Name**: Your full name
- **Email**: Your email address (will be used for login)
- **Password**: Secure password (minimum 6 characters)
- **Confirm Password**: Same password

Click "Create Super Admin"

### 3. Login to Admin Panel
Visit: `http://localhost:9002/admin/login`

Use your created credentials to access the admin dashboard.

## 🔐 User Roles

### Super Admin
- ✅ Manage all admin users
- ✅ Access all site settings
- ✅ Full content management
- ✅ System administration

### Admin
- ✅ Manage content and settings
- ✅ Limited user management
- ✅ Access to most features

### Editor
- ✅ Content management only
- ✅ Blog posts and pages
- ❌ Cannot manage users or settings

## 🛠️ Features

### Content Management
- Blog posts with markdown support
- Team member management
- Services and products
- Industries and categories

### Site Administration
- Site settings and configuration
- Contact message management
- User role management
- System monitoring

### Security
- Firebase Authentication
- Role-based access control
- Secure password requirements
- Session management

## 📱 Access Points

- **Setup**: `http://localhost:9002/setup`
- **Login**: `http://localhost:9002/admin/login`
- **Dashboard**: `http://localhost:9002/admin`
- **Public Site**: `http://localhost:9002`

## 🔧 Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Find process using port 9002
netstat -ano | findstr :9002

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Restart server
npm run dev
```

### Firebase Errors
- Ensure Firebase project is properly configured
- Check Firestore security rules
- Verify API keys in `src/lib/firebase.ts`

### Authentication Issues
- Clear browser cache and cookies
- Check Firebase Auth configuration
- Verify user exists in Firestore `adminUsers` collection

## 📋 Next Steps

1. **Create your super admin account** at `/setup`
2. **Login** at `/admin/login`
3. **Configure site settings** in the admin panel
4. **Add content** (blog posts, team members, etc.)
5. **Create additional admin users** as needed

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Ensure all dependencies are installed
4. Check the terminal for server errors

---

**Your Semixon admin panel is ready to use!** 🎉
