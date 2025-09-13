'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Target, Gem, Linkedin, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { TeamMember } from '@/app/admin/team/page';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-overview');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'team'), orderBy('name'), limit(3));
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
          <h1 className="font-headline text-4xl md:text-5xl font-bold">About Semixion</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Pioneering the next generation of semiconductor technology through innovation, expertise, and a commitment to excellence.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl font-semibold text-primary">Our Story</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Founded by a team of visionary engineers, Semixion was born from a desire to push the boundaries of what's possible in the semiconductor industry. We saw an opportunity to create more efficient, powerful, and reliable technologies that could solve the critical challenges of tomorrow.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              From our humble beginnings in a small lab, we have grown into a trusted partner for leading technology companies worldwide. Our journey is one of relentless innovation, strategic growth, and an unwavering dedication to our clients' success.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
           <div className="order-2 md:order-1">
             <h2 className="font-headline text-3xl font-semibold text-primary">Our Mission</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                To empower global technological advancement by designing and delivering innovative semiconductor solutions that offer unparalleled performance, efficiency, and reliability. We strive to be the catalyst for our clients' breakthroughs, enabling them to create products that shape the future.
              </p>
           </div>
           <div className="order-1 md:order-2 flex justify-center">
              <Target className="w-32 h-32 text-accent" />
           </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Our Core Values</h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              The principles that guide every decision we make.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-accent/10 rounded-full p-4 w-fit">
                  <Gem className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="font-headline mt-4">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We relentlessly pursue new ideas and technologies to stay at the forefront of the industry.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-accent/10 rounded-full p-4 w-fit">
                  <Eye className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="font-headline mt-4">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We operate with transparency and honesty, building trust with our clients, partners, and team.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-accent/10 rounded-full p-4 w-fit">
                  <Target className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="font-headline mt-4">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We are committed to the highest standards of quality and performance in everything we do.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Meet Our Leadership</h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              The experts guiding our mission forward.
            </p>
          </div>
          {loading ? (
             <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
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
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/team">
                See Full Team <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

    