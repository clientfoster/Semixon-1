'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import type { TeamMember } from '@/app/admin/team/page';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface TeamMemberListProps {
  team: TeamMember[];
}

export function TeamMemberList({ team }: TeamMemberListProps) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      console.log('TeamMemberList: Deleting team member with ID:', id);
      
      if (!id) {
        throw new Error('Team member ID is missing');
      }
      
      // @ts-ignore - db is properly typed in firebase.ts
      await deleteDoc(doc(db, 'team', id));
      toast({
        title: 'Team Member Deleted',
        description: 'The team member has been successfully deleted.',
      });
    } catch (error) {
      console.error('TeamMemberList: Error deleting document:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: `Failed to delete team member: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700">
            <TableHead className="text-slate-300">Priority</TableHead>
            <TableHead className="text-slate-300">Photo</TableHead>
            <TableHead className="text-slate-300">Name</TableHead>
            <TableHead className="text-slate-300">Role</TableHead>
            <TableHead className="text-slate-300">Email</TableHead>
            <TableHead className="text-slate-300">LinkedIn</TableHead>
            <TableHead className="text-slate-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.map((member) => {
            // Prioritize imageUrl over imageId
            const hasImageUrl = member.imageUrl && member.imageUrl.trim() !== '';
            const teamImage = !hasImageUrl ? PlaceHolderImages.find(img => img.id === member.imageId) : null;
            
            return (
              <TableRow key={member.id} className="border-slate-700 hover:bg-slate-800/50">
                <TableCell className="text-slate-300 font-mono text-sm">
                  {member.priority || 999}
                </TableCell>
                <TableCell>
                  <div className="w-10 h-10 relative overflow-hidden rounded-full border-2 border-slate-600">
                    {hasImageUrl ? (
                      <Image
                        src={member.imageUrl!}
                        alt={`${member.name}'s profile photo`}
                        fill
                        className="object-cover object-center"
                        sizes="40px"
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
                        sizes="40px"
                        data-ai-hint={teamImage.imageHint}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-white">
                  <div className="font-semibold">{member.name}</div>
                </TableCell>
                <TableCell>
                  <span className="text-slate-300">{member.role}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-400">{member.email}</span>
                </TableCell>
                <TableCell>
                  {member.linkedinUrl && (
                    <a 
                      href={member.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      LinkedIn
                    </a>
                  )}
                </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-800 border-slate-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        This action cannot be undone. This will permanently delete the team member.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(member.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
