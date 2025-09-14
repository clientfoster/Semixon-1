'use client';

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { 
  Home, 
  Package, 
  Briefcase, 
  Users, 
  Globe, 
  FileText, 
  MessageSquare, 
  Eye,
  Building2,
  BookOpen,
  LogOut,
  User,
  Settings,
  BarChart3
} from 'lucide-react';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuthProvider } from '@/contexts/auth-context';
import { AuthGuard } from '@/components/auth/auth-guard';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

function AdminHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'admin':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'editor':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-slate-800 rounded-lg p-2 transition-colors text-slate-300" />
          <div className="h-6 w-px bg-slate-700" />
          <div>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-slate-400">Manage your site content and settings</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600 transition-colors">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </Link>
          
          {user && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-red-800 bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:border-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.displayName} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-medium">
                      {user.displayName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-white">{user.displayName || 'Admin'}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-slate-800 border-slate-700">
                <DropdownMenuLabel className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={user.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        {user.displayName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{user.displayName || 'Admin'}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <Badge className={`text-xs w-fit mt-1 ${getRoleColor(user.role)}`}>
                        {user.role.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="hover:bg-slate-700">
                  <Link href="/admin/settings" className="flex items-center cursor-pointer">
                    <Settings className="h-4 w-4 mr-3 text-slate-300" />
                    <div>
                      <p className="text-sm font-medium text-white">Settings</p>
                      <p className="text-xs text-slate-400">Site configuration</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

function AdminSidebar() {
  const { user } = useAuth();

  const navigationItems = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/admin', icon: Home, description: 'Main dashboard' },
      ]
    },
    {
      title: 'Content',
      items: [
        { name: 'Blog Management', href: '/admin/blog', icon: BookOpen, description: 'Manage blog posts' },
        { name: 'Content', href: '/admin/content', icon: FileText, description: 'Page content' },
      ]
    },
    {
      title: 'Business',
      items: [
        { name: 'Services', href: '/admin/services', icon: Briefcase, description: 'Service offerings' },
        { name: 'Products', href: '/admin/products', icon: Package, description: 'Product catalog' },
        { name: 'Industries', href: '/admin/industries', icon: Building2, description: 'Industry focus' },
        { name: 'Team', href: '/admin/team', icon: Users, description: 'Team members' },
        { name: 'About Management', href: '/admin/about', icon: FileText, description: 'About page & journey management' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { name: 'Messages', href: '/admin/messages', icon: MessageSquare, description: 'Contact messages' },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Site Settings', href: '/admin/settings', icon: Globe, description: 'Site configuration' }
      ]
    }
  ];

  return (
    <Sidebar className="border-r border-slate-800 bg-slate-900">
      <SidebarHeader className="border-b border-slate-800">
        <div className="flex items-center gap-3 p-6">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Logo className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-lg">Semixon</span>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="space-y-8">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={{children: item.description}}
                      className="group hover:bg-slate-800 hover:text-white transition-colors text-slate-300"
                    >
                      <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                        <item.icon className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          ))}
        </div>
        
      </SidebarContent>
    </Sidebar>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't wrap login page with AuthGuard
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return (
    <AuthGuard>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <AdminHeader />
          <main className="flex-1 bg-slate-900 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AuthProvider>
  );
}