# Semixon - Professional Semiconductor & Engineering Company Website

A comprehensive Next.js 15 website with a powerful admin panel for a semiconductor and engineering company. Built with modern technologies including Firebase, TypeScript, and Tailwind CSS.

## 🚀 Features

### Public Website
- **Modern Design**: Professional dark theme with responsive layout
- **Service Showcase**: Comprehensive service offerings in semiconductors and engineering
- **Industry Focus**: Dedicated pages for various industries (Automotive, BFSI, Insurance, Retail, Semiconductor, Telecom)
- **Blog System**: Full-featured blog with markdown support and SEO optimization
- **Team Management**: Dynamic team member profiles with images and bios
- **Contact System**: Advanced contact forms with message management
- **Maintenance Mode**: Site-wide maintenance banner system
- **SEO Optimized**: Built-in SEO management and meta tag generation

### Admin Panel
- **Dark Theme Interface**: Professional admin panel with modern UI
- **Authentication System**: Secure Firebase Auth with role-based access
- **Content Management**: Full CRUD operations for all content types
- **Real-time Updates**: Live data synchronization with Firebase
- **Dashboard Analytics**: Comprehensive metrics and monitoring
- **Message Management**: Contact form message handling and status tracking

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend & Database
- **Firebase Firestore** - NoSQL database
- **Firebase Auth** - Authentication system
- **Firebase Storage** - File storage (configured)

### Additional Libraries
- **React Markdown** - Markdown rendering
- **Rehype Highlight** - Code syntax highlighting
- **Date-fns** - Date manipulation
- **Class Variance Authority** - Component variant management

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public website pages
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── team/                # Team page
│   │   ├── blog/                # Blog system
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/          # Individual blog posts
│   │   ├── services/            # Service pages
│   │   │   ├── page.tsx         # Services overview
│   │   │   └── [service]/       # Individual service pages
│   │   ├── industries/          # Industry pages
│   │   │   ├── page.tsx         # Industries overview
│   │   │   └── [industry]/      # Individual industry pages
│   │   ├── products/            # Products page
│   │   ├── privacy-policy/      # Privacy policy
│   │   └── terms-of-service/    # Terms of service
│   ├── admin/                   # Admin panel
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── login/               # Admin authentication
│   │   ├── blog/                # Blog management
│   │   ├── content/             # Content management
│   │   ├── services/            # Services management
│   │   ├── industries/          # Industries management
│   │   ├── products/            # Products management
│   │   ├── team/                # Team management
│   │   ├── messages/            # Message management
│   │   ├── settings/            # Site settings
│   │   └── setup/               # Initial setup
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── ui/                      # Shadcn/ui components
│   ├── admin/                   # Admin-specific components
│   ├── auth/                    # Authentication components
│   ├── site-header.tsx          # Main navigation
│   ├── site-footer.tsx          # Footer component
│   ├── contact-form.tsx         # Contact form
│   ├── blog-post-card.tsx       # Blog post display
│   └── maintenance-banner.tsx   # Maintenance mode banner
├── contexts/                     # React contexts
│   └── auth-context.tsx         # Authentication context
├── hooks/                        # Custom React hooks
│   ├── use-site-settings.ts     # Site settings hook
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notifications
├── lib/                          # Utility libraries
│   ├── firebase.ts              # Firebase configuration
│   ├── types.ts                 # TypeScript type definitions
│   ├── auth-types.ts            # Authentication types
│   ├── data.ts                  # Static data (services, industries)
│   ├── utils.ts                 # Utility functions
│   └── placeholder-images.ts    # Image placeholder system
└── middleware.ts                 # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd semixon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Configure Firestore security rules for development:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /{document=**} {
           allow read, write: if true;
         }
       }
     }
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:9002
   - Admin Panel: http://localhost:9002/admin/login

## 🔐 Admin Panel Setup

### Initial Admin Account Setup

1. **Visit the setup page**: http://localhost:9002/setup
2. **Create your admin account**:
   - Email: Your admin email
   - Password: Secure password
   - Display Name: Your name
3. **Login to admin panel**: http://localhost:9002/admin/login

### Admin Panel Features

#### Dashboard (`/admin`)
- **System Overview**: Key metrics and statistics
- **Recent Activity**: Latest messages and content updates
- **Quick Actions**: Direct access to all admin functions
- **Real-time Data**: Live updates from Firebase

#### Content Management
- **Blog Management** (`/admin/blog`): Create, edit, and manage blog posts
- **Content Pages** (`/admin/content`): Manage page content and SEO
- **Services** (`/admin/services`): Manage service offerings
- **Industries** (`/admin/industries`): Manage industry focus areas
- **Products** (`/admin/products`): Manage product catalog
- **Team** (`/admin/team`): Manage team member profiles

#### Communication
- **Messages** (`/admin/messages`): Handle contact form submissions
- **Status Management**: Mark messages as read, replied, or archived

#### System Administration
- **Site Settings** (`/admin/settings`): Configure site-wide settings
  - Site information (name, description, contact details)
  - Social media links
  - Maintenance mode toggle
  - SEO settings
  - Address and location information

## 📊 Data Models

### Blog Posts
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  featuredImage?: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  readingTime: number;
  viewCount: number;
  likeCount: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Services
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Team Members
```typescript
interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  email?: string;
  linkedin?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Contact Messages
```typescript
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🌐 Routes

### Public Routes
- `/` - Homepage
- `/about` - About page
- `/contact` - Contact page
- `/team` - Team page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/services` - Services overview
- `/services/[service]` - Individual service page
- `/industries` - Industries overview
- `/industries/[industry]` - Individual industry page
- `/products` - Products page
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/login` - Admin login
- `/admin/blog` - Blog management
- `/admin/content` - Content management
- `/admin/services` - Services management
- `/admin/industries` - Industries management
- `/admin/products` - Products management
- `/admin/team` - Team management
- `/admin/messages` - Message management
- `/admin/settings` - Site settings
- `/admin/setup` - Initial setup

## 🎨 Styling & Theming

### Design System
- **Color Palette**: Professional dark theme with blue accents
- **Typography**: Space Grotesk (headings) + PT Sans (body)
- **Components**: Shadcn/ui component library
- **Icons**: Lucide React icon set
- **Responsive**: Mobile-first responsive design

### Customization
- **Colors**: Easily customizable through Tailwind CSS
- **Components**: Modular component system
- **Layouts**: Flexible layout system
- **Themes**: Dark theme with light mode support

## 🔧 Configuration

### Firebase Configuration
The Firebase configuration is located in `src/lib/firebase.ts`:
- **Firestore**: Database with optimized settings
- **Authentication**: Email/password authentication
- **Storage**: File storage for images and documents

### Next.js Configuration
- **Image Optimization**: Configured for multiple domains
- **Middleware**: Authentication and routing protection
- **TypeScript**: Strict type checking enabled

### Tailwind Configuration
- **Custom Colors**: Brand-specific color palette
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first breakpoint system

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Ensure all Firebase configuration variables are set in your production environment.

### Firebase Security Rules
Update Firestore security rules for production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for published content
    match /blogPosts/{document} {
      allow read: if resource.data.status == 'published';
    }
    
    // Admin write access
    match /{collection}/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📝 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Code Structure
- **Components**: Reusable UI components
- **Pages**: Next.js page components
- **Hooks**: Custom React hooks
- **Contexts**: React context providers
- **Types**: TypeScript type definitions
- **Utils**: Utility functions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Semixon** - Professional Semiconductor & Engineering Solutions
Built with ❤️ using Next.js, Firebase, and modern web technologies by Anand.