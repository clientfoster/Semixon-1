import Image from 'next/image';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

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
            {services.map((service, index) => {
              const serviceImage = PlaceHolderImages.find(img => img.id === service.imageId);
              const isReversed = index % 2 !== 0;

              return (
                <Card key={service.id} className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                  <div className={`grid grid-cols-1 md:grid-cols-2 items-center`}>
                    <div className={`relative h-64 md:h-full min-h-[300px] ${isReversed ? 'md:order-2' : ''}`}>
                      {serviceImage && (
                        <Image
                          src={serviceImage.imageUrl}
                          alt={serviceImage.description}
                          fill
                          className="object-cover"
                          data-ai-hint={serviceImage.imageHint}
                        />
                      )}
                    </div>
                    <div className={`${isReversed ? 'md:order-1' : ''}`}>
                      <CardContent className="p-8 md:p-12">
                        <h2 className="font-headline text-2xl md:text-3xl font-semibold text-primary">{service.title}</h2>
                        <p className="mt-4 text-muted-foreground text-base leading-relaxed">{service.description}</p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
