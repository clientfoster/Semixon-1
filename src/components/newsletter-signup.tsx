'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function NewsletterSignup() {
  const handleSubscribe = () => {
    window.open('/contact', '_blank');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-blue-100 mb-4">
          Get the latest insights on semiconductor engineering and technology trends.
        </p>
        <Button 
          variant="secondary" 
          className="w-full"
          onClick={handleSubscribe}
        >
          Subscribe to Newsletter
        </Button>
      </CardContent>
    </Card>
  );
}