
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Engineering and Technical Services</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We provide specialized engineering and technical services to support your entire product lifecycle, augmenting your team with the expertise you need, when you need it.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">An Extension of Your Team</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Navigating the complexities of technology development requires a diverse skillset. We offer a broad range of technical services to fill gaps in your team's expertise or to provide extra capacity to meet aggressive deadlines. Our engineers integrate seamlessly with your existing teams, bringing with them a wealth of experience and a commitment to your success.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Technical Documentation</h4>
                <p className="text-muted-foreground text-sm">Writing clear and comprehensive datasheets, application notes, and user manuals for your products.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Product & Sustaining Engineering</h4>
                <p className="text-muted-foreground text-sm">Managing products post-launch, including yield improvement, cost reduction, and failure analysis.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Project & Program Management</h4>
                <p className="text-muted-foreground text-sm">Providing experienced project leadership to drive your projects from concept to completion, on time and on budget.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>How We Can Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Staff Augmentation:</strong> Providing skilled engineers to supplement your team for short or long-term engagements.</p>
            <p><strong>Turnkey Project Execution:</strong> Taking full ownership of specific projects or work packages.</p>
            <p><strong>Expert Consulting:</strong> Offering strategic advice and expert review for your most critical technical challenges.</p>
            <p><strong>Technical Training:</strong> Developing and delivering custom training programs for your engineering teams.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
