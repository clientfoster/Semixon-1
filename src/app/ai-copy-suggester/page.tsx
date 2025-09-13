import { AiSuggesterForm } from '@/components/ai-suggester-form';

export default function AiCopySuggesterPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">AI-Powered Content Suggester</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/80">
            Elevate your website's copy with the power of generative AI. Get instant suggestions to make your content more engaging, clear, and effective.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
           <AiSuggesterForm />
        </div>
      </section>
    </div>
  );
}
