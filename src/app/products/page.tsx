import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div>
      <section className="py-20 md:py-32 gradient-royal relative overflow-hidden">
        <div className="absolute inset-0 bg-royal-pattern opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Discover our portfolio of high-performance semiconductor products, engineered for reliability and designed to power the next wave of technology.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const productImage = PlaceHolderImages.find(img => img.id === product.imageId);
              return (
                <Card key={product.id} className="flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  {productImage && (
                    <div className="aspect-w-1 aspect-h-1 w-full">
                       <Image
                          src={productImage.imageUrl}
                          alt={productImage.description}
                          width={500}
                          height={500}
                          className="object-cover"
                          data-ai-hint={productImage.imageHint}
                        />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm font-medium text-primary mb-2">Key Specifications:</p>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      {product.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={product.brochureUrl} target="_blank">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
