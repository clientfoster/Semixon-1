'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy, limit, doc } from 'firebase/firestore';
// @ts-ignore
import { db } from '@/lib/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Target, Gem, Linkedin, ArrowRight, Mail, Clock, Award, MapPin, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Simple interface for journey item
interface JourneyItem {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'achievement' | 'expansion' | 'innovation';
  isHighlight: boolean;
  order: number;
}

// Simple interface for team member
interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  imageUrl?: string;
  imageId?: string;
  linkedinUrl?: string;
  bio?: string;
  priority?: number;
}

// Simple interface for page content
interface PageContent {
  title?: string;
  subtitle?: string;
  content?: string;
  heroImage?: string;
}

export function AboutPageClient() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-overview');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [aboutContent, setAboutContent] = useState<PageContent | null>(null);
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @ts-ignore
    const teamQuery = query(collection(db, 'team'));
    // @ts-ignore
    const teamUnsubscribe = onSnapshot(teamQuery, (snapshot) => {
      const teamData: TeamMember[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        teamData.push({
          id: doc.id,
          ...data,
          priority: data.priority || 999
        } as TeamMember);
      });
      teamData.sort((a, b) => {
        const aPriority = a.priority || 999;
        const bPriority = b.priority || 999;
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        return a.name.localeCompare(b.name);
      });
      setTeam(teamData);
    });

    // @ts-ignore
    const contentUnsubscribe = onSnapshot(doc(db, 'pageContent', 'about'), (doc) => {
      if (doc.exists()) {
        setAboutContent(doc.data() as PageContent);
      }
      setLoading(false);
    });

    // Load journey items
    // @ts-ignore
    const journeyUnsubscribe = onSnapshot(collection(db, 'journey'), (snapshot) => {
      const items: JourneyItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          year: data.year || '',
          title: data.title || '',
          description: data.description || '',
          type: data.type || 'milestone',
          isHighlight: data.isHighlight || false,
          order: data.order || 0
        });
      });
      // Sort by order, then by year
      items.sort((a, b) => a.order - b.order || parseInt(a.year) - parseInt(b.year));
      setJourneyItems(items);
    });

    return () => {
      teamUnsubscribe();
      contentUnsubscribe();
      journeyUnsubscribe();
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
                  Founded by a team of visionary engineers, Semixon was born from a desire to push the boundaries of what's possible in the semiconductor industry. We saw an opportunity to create more efficient, powerful, and reliable technologies that could solve the critical challenges of tomorrow.
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
                          <Link href={member.linkedinUrl || '#'} target="_blank" aria-label={`${member.name}'s LinkedIn`}>
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

      {/* Journey Timeline Section */}
      {journeyItems.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Our Journey</h2>
              <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
                Milestones and achievements that have shaped our path in semiconductor innovation.
              </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
                
                {journeyItems.map((item, index) => {
                  const isEven = index % 2 === 0;
                  const getIcon = () => {
                    switch (item.type) {
                      case 'achievement':
                        return <Award className="w-6 h-6" />;
                      case 'expansion':
                        return <MapPin className="w-6 h-6" />;
                      case 'innovation':
                        return <Target className="w-6 h-6" />;
                      default:
                        return <Clock className="w-6 h-6" />;
                    }
                  };
                  
                  const getColorClass = () => {
                    switch (item.type) {
                      case 'achievement':
                        return 'bg-green-500';
                      case 'expansion':
                        return 'bg-purple-500';
                      case 'innovation':
                        return 'bg-orange-500';
                      default:
                        return 'bg-blue-500';
                    }
                  };
                  
                  return (
                    <div key={item.id} className={`relative flex items-center mb-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Content */}
                      <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <Card className={`${item.isHighlight ? 'ring-2 ring-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/20' : ''} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                          <CardHeader className="pb-3">
                            <div className={`flex items-center gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                              <span className="text-2xl font-bold text-primary">{item.year}</span>
                              {item.isHighlight && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                  Highlight
                                </span>
                              )}
                            </div>
                            <CardTitle className={`text-xl ${isEven ? 'text-right' : 'text-left'}`}>
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className={`text-muted-foreground leading-relaxed ${isEven ? 'text-right' : 'text-left'}`}>
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center">
                        <div className={`w-8 h-8 ${getColorClass()} rounded-full flex items-center justify-center text-white`}>
                          {getIcon()}
                        </div>
                      </div>
                      
                      {/* Empty space for the other side */}
                      <div className="w-5/12"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
