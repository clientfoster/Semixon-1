'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts but TypeScript can't infer it here
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Linkedin,
  Calendar,
  RefreshCw,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { TeamMemberForm } from '@/components/admin/team-member-form';
import { TeamMemberList } from '@/components/admin/team-member-list';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useCachedData } from '@/hooks/use-performance';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  linkedinUrl: string;
  imageUrl?: string;
  imageId: string;
  email: string;
  priority: number; // Lower numbers = higher priority (1 = first, 2 = second, etc.)
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

export default function TeamManagementPage() {
  const { toast } = useToast();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    // Use a simple query without composite index to avoid Firestore index requirements
    // @ts-ignore - db is properly typed in firebase.ts
    const teamQuery = query(collection(db, 'team'));
    const teamUnsubscribe = onSnapshot(teamQuery, (snapshot) => {
      const teamData: TeamMember[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        teamData.push({
          id: doc.id,
          ...data,
          priority: data.priority || 999, // Default priority for existing members
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as TeamMember);
      });
      // Sort by priority first, then by name as fallback
      teamData.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.name.localeCompare(b.name);
      });
      setTeam(teamData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching team:', error);
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to load team members: ${error.message}`,
      });
    });

    return () => {
      teamUnsubscribe();
    };
  }, [toast]);


  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      'CEO': 'bg-purple-900/30 text-purple-300 border-purple-700',
      'CTO': 'bg-blue-900/30 text-blue-300 border-blue-700',
      'VP': 'bg-green-900/30 text-green-300 border-green-700',
      'Director': 'bg-orange-900/30 text-orange-300 border-orange-700',
      'Manager': 'bg-yellow-900/30 text-yellow-300 border-yellow-700',
      'Senior': 'bg-indigo-900/30 text-indigo-300 border-indigo-700',
      'Lead': 'bg-pink-900/30 text-pink-300 border-pink-700',
    };
    
    for (const [key, value] of Object.entries(roleColors)) {
      if (role.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    return 'bg-slate-700 text-slate-300 border-slate-600';
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = async (member: TeamMember) => {
    try {
      console.log('Deleting team member:', member.id, member.name);
      
      if (!member.id) {
        throw new Error('Team member ID is missing');
      }
      
      // Import deleteDoc and doc for deletion
      const { deleteDoc, doc } = await import('firebase/firestore');
      // @ts-ignore - db is properly typed in firebase.ts
      await deleteDoc(doc(db, 'team', member.id));
      
      toast({
        title: 'Team Member Deleted',
        description: `${member.name} has been removed from the team.`,
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to delete team member: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="space-y-8 p-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800 rounded-xl border border-slate-700 animate-pulse"></div>
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="h-96 bg-slate-800 rounded-xl border border-slate-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-400" />
              Team Management
            </h1>
            <p className="text-slate-400 mt-2">
              Manage your team members, roles, and organizational structure
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true);
                // Force re-fetch
                window.location.reload();
              }}
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </div>





        {/* Main Content */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="grid" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="table" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Table View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6">
            {team.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-12 text-center">
                  <div className="text-slate-400">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No team members found</p>
                    <p className="text-sm">Add your first team member to get started.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member) => {
                  // Prioritize imageUrl over imageId
                  const hasImageUrl = member.imageUrl && member.imageUrl.trim() !== '';
                  const teamImage = !hasImageUrl ? PlaceHolderImages.find(img => img.id === member.imageId) : null;
                  
                  return (
                    <Card key={member.id} className="bg-slate-800 border-slate-700 text-center flex flex-col items-center pt-8 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                      <CardHeader className="p-0 relative">
                        {/* Priority Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <Badge 
                            variant="outline" 
                            className={`text-xs font-mono ${
                              (member.priority || 999) <= 3 
                                ? 'bg-green-900/30 text-green-300 border-green-700' 
                                : (member.priority || 999) <= 10 
                                ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700'
                                : 'bg-slate-700/50 text-slate-400 border-slate-600'
                            }`}
                          >
                            #{member.priority || 999}
                          </Badge>
                        </div>
                        
                        <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full border-4 border-slate-600 outline-2 outline-blue-500/20">
                              {hasImageUrl ? (
                                <Image
                                  src={member.imageUrl!}
                                  alt={`${member.name}'s profile photo`}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 128px, 128px"
                                  onError={(e) => {
                                    // Fallback to placeholder image if URL fails
                                    const target = e.target as HTMLImageElement;
                                    const fallbackImage = PlaceHolderImages.find(img => img.id === member.imageId);
                                    if (fallbackImage) {
                                      target.src = fallbackImage.imageUrl;
                                    }
                                  }}
                                />
                              ) : teamImage ? (
                                <Image
                                  src={teamImage.imageUrl}
                                  alt={teamImage.description}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 128px, 128px"
                                  data-ai-hint={teamImage.imageHint}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                              )}
                        </div>
                        
                        {/* Action buttons - positioned absolutely */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-slate-800/80 hover:bg-slate-700 border border-slate-600">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem
                                onClick={() => handleEdit(member)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => window.open(member.linkedinUrl, '_blank')}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-slate-700" />
                              <DropdownMenuItem
                                onClick={() => handleDelete(member)}
                                className="text-red-400 hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      <CardContent className="mt-4 w-full">
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                        
                        <div className="space-y-2 text-sm text-slate-400 mb-4">
                          {member.email && (
                            <div className="flex items-center justify-center gap-1">
                              <Mail className="h-4 w-4" />
                              <span className="truncate">{member.email}</span>
                            </div>
                          )}
                          {member.createdAt && (
                            <div className="flex items-center justify-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-700">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(member)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(member.linkedinUrl, '_blank')}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                  </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="table">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-0">
                <TeamMemberList team={team} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Member Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMember(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TeamMemberForm 
                  onSuccess={() => {
                    console.log('Form success callback called');
                    setShowForm(false);
                    setEditingMember(null);
                    console.log('Form closed and editing member cleared');
                  }}
                  editingMember={editingMember}
                />
          </CardContent>
        </Card>
          </div>
        )}
      </div>
    </div>
  );
}