import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/80">
            We're here to help. Whether you have a question about our products, services, or want to discuss a new project, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="font-headline text-3xl font-semibold text-primary">Send us a Message</h2>
            <p className="text-muted-foreground mt-2 mb-6">Fill out the form and we'll get back to you shortly.</p>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <h2 className="font-headline text-3xl font-semibold text-primary">Contact Information</h2>
            <p className="text-muted-foreground text-lg">
              Find us at our headquarters or reach out via phone or email.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Our Office</h3>
                  <p className="text-muted-foreground">123 Innovation Drive, Tech Valley, CA 94000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">contact@semixion.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    