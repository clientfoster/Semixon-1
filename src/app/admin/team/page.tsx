'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamMemberForm } from '@/components/admin/team-member-form';
import { TeamMemberList } from '@/components/admin/team-member-list';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  linkedinUrl: string;
  imageId: string;
};

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'team'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const teamData: TeamMember[] = [];
      snapshot.forEach((doc) => {
        teamData.push({ id: doc.id, ...doc.data() } as TeamMember);
      });
      setTeam(teamData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamMemberForm />
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Team List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <TeamMemberList team={team} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
