'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy, limit, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Target, Gem, Linkedin, ArrowRight, Mail } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { TeamMember } from '@/app/admin/team/page';
import type { PageContent } from '@/lib/types';

export const metadata: Metadata = generateMeta({
  title: 'About Semixion - Leading Semiconductor Engineering Solutions',
  description: 'Learn about Semixion\'s journey in semiconductor engineering, our expert team, and our commitment to delivering cutting-edge IC design, wafer fabrication, and reliability testing solutions.',
  keywords: [
    'about semixion',
    'semiconductor company',
    'engineering team',
    'company history',
    'semiconductor expertise',
    'IC design company',
    'wafer fabrication',
    'reliability testing'
  ],
  url: '/about',
  type: 'website',
});

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-overview');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [aboutContent, setAboutContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use a simple query without composite index to avoid Firestore index requirements
    const teamQuery = query(collection(db, 'team'));
    const teamUnsubscribe = onSnapshot(teamQuery, (snapshot) => {
      const teamData: TeamMember[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        teamData.push({ 
          id: doc.id, 
          ...data,
          priority: data.priority || 999 // Default priority for existing members
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
    });

    const contentUnsubscribe = onSnapshot(doc(db, 'pageContent', 'about'), (doc) => {
      if (doc.exists()) {
        setAboutContent(doc.data() as PageContent);
      }
      setLoading(false);
    });

    return () => {
      teamUnsubscribe();
      contentUnsubscribe();
    };
  }, []);

  return (
    <div>
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-blue-900/80 via-blue-700/70 to-blue-900/80">
        <div className="absolute inset-0 bg-royal-pattern opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {aboutContent?.title || 'About Semixon'}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              {aboutContent?.subtitle || 'Pioneering the next generation of semiconductor technology through innovation, expertise, and a commitment to excellence.'}
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl font-semibold text-primary">Our Story</h2>
            {aboutContent?.content ? (
              <div 
                className="mt-4 text-muted-foreground text-lg leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: aboutContent.content }}
              />
            ) : (
              <>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  Founded by a team of visionary engineers, Semixion was born from a desire to push the boundaries of what's possible in the semiconductor industry. We saw an opportunity to create more efficient, powerful, and reliable technologies that could solve the critical challenges of tomorrow.
                </p>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  From our humble beginnings in a small lab, we have grown into a trusted partner for leading technology companies worldwide. Our journey is one of relentless innovation, strategic growth, and an unwavering dedication to our clients' success.
                </p>
              </>
            )}
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            {aboutContent?.heroImage ? (
              <Image
                src={aboutContent.heroImage}
                alt="About Semixon"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            ) : aboutImage ? (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            ) : null}
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

      <section id="team-section" className="py-16 md:py-24 bg-card scroll-mt-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Meet Our Team</h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              Our focused team of 3 experts is dedicated to pushing the boundaries of semiconductor technology with precision and innovation.
            </p>
          </div>
          {loading ? (
             <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="text-center flex flex-col items-center pt-8">
                  <div className="w-40 h-40 mx-auto relative overflow-hidden rounded-full border-4 border-background outline-accent outline">
                    <Skeleton className="w-full h-full rounded-full" />
                  </div>
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
                // Prioritize imageUrl over imageId
                const hasImageUrl = member.imageUrl && member.imageUrl.trim() !== '';
                const teamImage = !hasImageUrl ? PlaceHolderImages.find(img => img.id === member.imageId) : null;
                
                return (
                  <Card key={member.id} className="text-center flex flex-col items-center pt-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <div className="w-40 h-40 mx-auto relative overflow-hidden rounded-full border-4 border-background outline-accent outline">
                        {hasImageUrl ? (
                          <Image
                            src={member.imageUrl!}
                            alt={`${member.name}'s profile photo`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 160px, 160px"
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
                            sizes="(max-width: 768px) 160px, 160px"
                            data-ai-hint={teamImage.imageHint}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-4xl font-bold text-muted-foreground">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                      <p className="text-accent font-medium">{member.role}</p>
                      {member.email && (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={`mailto:${member.email}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.bio && (
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="mt-auto pb-6">
                      <div className="flex items-center gap-2">
                        {member.email && (
                          <Button asChild variant="ghost" size="icon">
                            <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                              <Mail className="h-6 w-6 text-muted-foreground hover:text-primary" />
                            </a>
                          </Button>
                        )}
                        <Button asChild variant="ghost" size="icon">
                          <Link href={member.linkedinUrl} target="_blank" aria-label={`${member.name}'s LinkedIn`}>
                            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                          </Link>
                        </Button>
                      </div>
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

    