'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Package, 
  Building2, 
  BookOpen, 
  CheckCircle, 
  Activity, 
  Settings, 
  Zap, 
  BarChart3, 
  FileText, 
  Globe, 
  Mail, 
  Clock, 
  Eye, 
  ArrowUpRight,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Calendar,
  Target,
  DollarSign,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Star,
  Heart,
  ThumbsUp,
  TrendingDown,
  Minus,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { ConnectionStatus } from '@/components/admin/connection-status';
import { FirebaseTroubleshooting } from '@/components/admin/firebase-troubleshooting';
import type { ContactMessage } from '@/lib/types';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [teamCount, setTeamCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [industriesCount, setIndustriesCount] = useState(0);
  const [blogPostsCount, setBlogPostsCount] = useState(0);
  const [publishedPostsCount, setPublishedPostsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = () => {
      try {
        // Team count
        // @ts-ignore - db is properly typed in firebase.ts
        const teamUnsubscribe = onSnapshot(collection(db, 'team'), (snapshot) => {
          setTeamCount(snapshot.size);
        });

        // Products count
        // @ts-ignore - db is properly typed in firebase.ts
        const productsUnsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
          setProductsCount(snapshot.size);
        });

        // Services count
        // @ts-ignore - db is properly typed in firebase.ts
        const servicesUnsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
          setServicesCount(snapshot.size);
        });

        // Industries count
        // @ts-ignore - db is properly typed in firebase.ts
        const industriesUnsubscribe = onSnapshot(collection(db, 'industries'), (snapshot) => {
          setIndustriesCount(snapshot.size);
        });

        // Blog posts count
        // @ts-ignore - db is properly typed in firebase.ts
        const blogUnsubscribe = onSnapshot(collection(db, 'blogPosts'), (snapshot) => {
          const allPosts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<{ id: string; status?: string; isActive?: boolean }>;
          setBlogPostsCount(allPosts.length);
          setPublishedPostsCount(allPosts.filter(post => post.status === 'published' && post.isActive).length);
        });

        // Messages count
        // @ts-ignore - db is properly typed in firebase.ts
        const messagesUnsubscribe = onSnapshot(
          // @ts-ignore - db is properly typed in firebase.ts
          query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc')),
          (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as ContactMessage[];
            setMessagesCount(messages.length);
            setNewMessagesCount(messages.filter(msg => msg.status === 'new').length);
            setRecentMessages(messages.slice(0, 5));
          }
        );

        setLoading(false);

        return () => {
          teamUnsubscribe();
          productsUnsubscribe();
          servicesUnsubscribe();
          industriesUnsubscribe();
          blogUnsubscribe();
          messagesUnsubscribe();
        };
      } catch (error) {
        console.error('Error setting up listeners:', error);
        setLoading(false);
      }
    };

    const cleanup = unsubscribe();
    return cleanup;
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-white rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-white rounded w-1/2 animate-pulse"></div>
          </div>
          
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-xl border animate-pulse"></div>
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-xl border animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
            </h1>
            <p className="text-slate-400 mt-1">
              Here's what's happening with your site today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Members */}
          <Card className="bg-slate-800 border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Team Members</p>
                  <p className="text-3xl font-bold text-white">{teamCount}</p>
                  <div className="flex items-center gap-1">
                    <UserCheck className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Active</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts */}
          <Card className="bg-slate-800 border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Blog Posts</p>
                  <p className="text-3xl font-bold text-white">{blogPostsCount}</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">{publishedPostsCount} published</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="bg-slate-800 border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Services</p>
                  <p className="text-3xl font-bold text-white">{servicesCount}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Available</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="bg-slate-800 border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Messages</p>
                  <p className="text-3xl font-bold text-white">{messagesCount}</p>
                  <div className="flex items-center gap-1">
                    {newMessagesCount > 0 ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="text-xs text-orange-400 font-medium">{newMessagesCount} new</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">All read</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700 hover:shadow-md hover:shadow-slate-900/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Products</p>
                  <p className="text-2xl font-bold text-white">{productsCount}</p>
                </div>
                <Package className="h-8 w-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:shadow-md hover:shadow-slate-900/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Industries</p>
                  <p className="text-2xl font-bold text-white">{industriesCount}</p>
                </div>
                <Building2 className="h-8 w-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:shadow-md hover:shadow-slate-900/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Site Health</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-16 bg-slate-700 rounded-full">
                      <div className="h-2 w-4/5 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-green-400 font-medium">Excellent</span>
                  </div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Messages */}
          <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                  Recent Messages
                  {newMessagesCount > 0 && (
                    <Badge className="bg-orange-500 text-white">
                      {newMessagesCount} new
                    </Badge>
                  )}
                </CardTitle>
                <Link href="/admin/messages">
                  <Button variant="outline" size="sm" className="border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-slate-500" />
                  </div>
                  <p className="text-slate-400">No messages received yet</p>
                  <p className="text-sm text-slate-500 mt-1">Contact form messages will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="group p-4 border border-slate-700 rounded-lg hover:border-slate-600 hover:shadow-sm hover:shadow-slate-900/50 transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-white truncate">{message.name}</h4>
                            <Badge 
                              variant={message.status === 'new' ? 'default' : 'secondary'}
                              className={message.status === 'new' ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-300'}
                            >
                              {message.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                            {message.subject || message.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {message.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        </div>
                        <Link href="/admin/messages">
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white hover:bg-slate-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-5 w-5 text-slate-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full justify-start h-12 border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                  <Globe className="h-4 w-4 mr-3" />
                  Site Settings
                </Button>
              </Link>
              <Link href="/admin/blog">
                <Button variant="outline" className="w-full justify-start h-12 border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                  <BookOpen className="h-4 w-4 mr-3" />
                  Blog Management
                </Button>
              </Link>
              <Link href="/admin/team">
                <Button variant="outline" className="w-full justify-start h-12 border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                  <Users className="h-4 w-4 mr-3" />
                  Team Management
                </Button>
              </Link>
              <Link href="/admin/services">
                <Button variant="outline" className="w-full justify-start h-12 border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                  <TrendingUp className="h-4 w-4 mr-3" />
                  Services
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="outline" className="w-full justify-start h-12 border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                  <Package className="h-4 w-4 mr-3" />
                  Products
                </Button>
              </Link>
              <Link href="/admin/industries">
                <Button variant="outline" className="w-full justify-start h-12 border-slate-700 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-600">
                  <Building2 className="h-4 w-4 mr-3" />
                  Industries
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConnectionStatus />
          <FirebaseTroubleshooting />
        </div>
      </div>
    </div>
  );
}