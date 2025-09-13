import { AiSuggesterForm } from '@/components/ai-suggester-form';

export default function AiCopySuggesterPage() {
  return (
    <div>
      <section className="py-20 md:py-32 gradient-royal relative overflow-hidden">
        <div className="absolute inset-0 bg-royal-pattern opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered Content Suggester
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Elevate your website's copy with the power of generative AI. Get instant suggestions to make your content more engaging, clear, and effective.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
           <AiSuggesterForm />
        </div>
      </section>
    </div>
  );
}
