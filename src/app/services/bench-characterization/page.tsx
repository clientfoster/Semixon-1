
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Bench Characterization</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We offer comprehensive bench characterization services to validate your silicon, providing the in-depth performance data needed to ensure your device meets and exceeds specifications before production.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Deep Performance Insights</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            First-silicon bring-up is a critical milestone. Our bench characterization lab is equipped with high-end instrumentation to perform detailed electrical and functional validation. We work systematically to bring-up, debug, and fully characterize your device across process, voltage, and temperature (PVT), giving you full confidence in your design.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Automated Test Environment</h4>
                <p className="text-muted-foreground text-sm">Leveraging automation scripts (Python, LabVIEW) for efficient and repeatable measurements.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Comprehensive Reporting</h4>
                <p className="text-muted-foreground text-sm">Delivering detailed characterization reports with clear pass/fail analysis against datasheet specs.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Failure Analysis Support</h4>
                <p className="text-muted-foreground text-sm">Collaborating with design and failure analysis teams to rapidly identify root causes of issues.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Characterization Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Functional Validation:</strong> Verifying all operating modes and features.</p>
            <p><strong>Electrical Parametrics:</strong> Measuring current, voltage, timing, and other key electrical characteristics.</p>
            <p><strong>PVT Characterization:</strong> Sweeping across conditions to guarantee performance over the product's operating range.</p>
            <p><strong>Correlation:</strong> Ensuring strong correlation between bench, ATE, and simulation data.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
