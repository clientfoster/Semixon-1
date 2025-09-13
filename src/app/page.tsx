import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { services, products } from '@/lib/data';

const getImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find(img => img.id === id);
};

export default function Home() {
  const heroImage = getImage('hero');
  const aboutImage = getImage('about-summary');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Engineering the Future of Semiconductors
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
            Semixion delivers cutting-edge solutions and products for the most demanding technological challenges.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/services">Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section id="about" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">About Semixion</h2>
            <p className="text-muted-foreground text-lg">
              At Semixion, we are pioneers in semiconductor technology. Our mission is to drive innovation and deliver excellence through our state-of-the-art products and expert engineering services. We are committed to building a sustainable future with technology that empowers progress.
            </p>
            <Button asChild className="mt-4">
              <Link href="/about">Learn More <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Our Core Services</h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            We provide a range of specialized services to meet the complex needs of the semiconductor industry.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <Cpu className="w-10 h-10 text-accent" />
                <CardTitle className="font-headline">IC Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Custom integrated circuit design services, from concept to GDSII.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <Layers className="w-10 h-10 text-accent" />
                <CardTitle className="font-headline">Wafer Fabrication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">High-quality wafer processing and fabrication using advanced process nodes.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <ShieldCheck className="w-10 h-10 text-accent" />
                <CardTitle className="font-headline">Reliability Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Comprehensive testing and qualification services to ensure product longevity and performance.</p>
              </CardContent>
            </Card>
          </div>
          <Button asChild variant="link" className="mt-8 text-lg text-accent hover:text-accent/80">
            <Link href="/services">View All Services <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Featured Products</h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              Explore our innovative products designed for performance and reliability.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => {
              const productImage = getImage(product.imageId);
              return (
                <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {productImage && (
                     <div className="aspect-square w-full relative">
                        <Image
                          src={productImage.imageUrl}
                          alt={productImage.description}
                          fill
                          className="object-cover"
                          data-ai-hint={productImage.imageHint}
                        />
                     </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      {product.specs.slice(0, 2).map((spec, i) => <li key={i}>{spec}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">Explore All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Innovate With Us?</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg">
            Let's discuss how Semixion can help you achieve your technological goals. Get in touch with our experts today.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

    