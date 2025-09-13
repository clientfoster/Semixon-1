'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { TeamMember } from '@/app/admin/team/page';

export default function TeamPage() {
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
    <div>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Meet Our Team</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/80">
            The driving force behind our innovation. Our team of experts is dedicated to pushing the boundaries of semiconductor technology.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="text-center flex flex-col items-center pt-8">
                  <Skeleton className="h-40 w-40 rounded-full" />
                  <CardContent className="mt-4 w-full">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                  </CardContent>
                  <CardFooter className="mt-auto pb-6">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => {
                const teamImage = PlaceHolderImages.find(img => img.id === member.imageId);
                return (
                  <Card key={member.id} className="text-center flex flex-col items-center pt-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      {teamImage && (
                        <Image
                          src={teamImage.imageUrl}
                          alt={teamImage.description}
                          width={160}
                          height={160}
                          className="rounded-full border-4 border-background outline-accent outline"
                          data-ai-hint={teamImage.imageHint}
                        />
                      )}
                    </CardHeader>
                    <CardContent className="mt-4">
                      <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                      <p className="text-accent font-medium">{member.role}</p>
                    </CardContent>
                    <CardFooter className="mt-auto pb-6">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={member.linkedinUrl} target="_blank" aria-label={`${member.name}'s LinkedIn`}>
                          <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
