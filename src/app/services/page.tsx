
import Link from 'next/link';
import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const serviceCategories = [
  'Semiconductors',
  'Embedded',
  'Software'
];

export default function ServicesPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/80">
            From concept to production, we provide comprehensive engineering services to accelerate your product development and ensure market success.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="space-y-16">
            {serviceCategories.map((category) => (
              <div key={category}>
                <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-8">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services
                    .filter((service) => service.category === category)
                    .map((service) => (
                      <Card key={service.id} className="flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto">
                           <Button asChild variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                            <Link href={service.href}>
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

    