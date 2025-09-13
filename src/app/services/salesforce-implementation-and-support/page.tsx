
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Salesforce Implementation and Support</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We help you unlock the full potential of the Salesforce platform with expert implementation, customization, and ongoing support services tailored to your business needs.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Maximizing Your CRM Investment</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Salesforce is more than just a CRM; it's a powerful platform for transforming your sales, service, and marketing operations. Our certified Salesforce consultants work with you to understand your processes and goals, then configure and customize the platform to create a solution that drives efficiency, boosts productivity, and provides a 360-degree view of your customer.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Sales & Service Cloud</h4>
                <p className="text-muted-foreground text-sm">Configuring and customizing leads, opportunities, cases, and workflows to match your business processes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Custom Development</h4>
                <p className="text-muted-foreground text-sm">Building custom applications, components (Apex, LWC), and integrations to extend the platform's capabilities.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Data Migration & Integration</h4>
                <p className="text-muted-foreground text-sm">Safely migrating your data into Salesforce and integrating it with other critical business systems.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Salesforce Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Implementation from Scratch:</strong> Guiding you through the entire process from discovery to go-live.</p>
            <p><strong>Health Checks & Optimization:</strong> Auditing your existing setup and providing recommendations for improvement.</p>
            <p><strong>Managed Services & Support:</strong> Providing ongoing administration, support, and training for your users.</p>
            <p><strong>Marketing Cloud & Pardot:</strong> Helping you automate marketing journeys and align sales and marketing efforts.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
