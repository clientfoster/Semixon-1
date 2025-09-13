
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Verification and Validation (V&V)</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        Our independent Verification and Validation (V&V) services provide a systematic and rigorous approach to ensure your embedded system meets its technical and business requirements, delivering quality and reliability.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Confidence Through Quality</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Verification ("Are we building the product right?") and Validation ("Are we building the right product?") are distinct but crucial processes for ensuring product success. Our V&V team operates independently from the development team to provide unbiased testing and analysis. We create comprehensive test plans, execute them meticulously, and provide clear, actionable reports to confirm that the system is free of defects and meets all stakeholder expectations.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Requirements Traceability</h4>
                <p className="text-muted-foreground text-sm">Ensuring every single system requirement is covered by one or more test cases.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">White-box & Black-box Testing</h4>
                <p className="text-muted-foreground text-sm">Employing a full range of testing techniques, from unit and integration testing to full system and acceptance testing.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Automated Test Frameworks</h4>
                <p className="text-muted-foreground text-sm">Building and deploying automated frameworks for efficient and repeatable regression testing.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our V&V Lifecycle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Test Planning:</strong> Developing a master test plan based on product requirements and risk analysis.</p>
            <p><strong>Test Case Development:</strong> Writing clear, concise, and effective test cases and procedures.</p>p>
            <p><strong>Test Execution & Reporting:</strong> Executing tests, documenting results, and tracking defects to resolution.</p>
            <p><strong>Regression & Release Testing:</strong> Ensuring that new features don't break existing ones and providing a final quality gate before release.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
