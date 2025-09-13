
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">ATE Program Development</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We provide comprehensive Automated Test Equipment (ATE) program development services to ensure your semiconductor devices are tested efficiently, accurately, and cost-effectively from characterization to high-volume production.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Accelerating Your Time-to-Market</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Our experienced test engineers develop robust and scalable ATE solutions for a wide range of devices, including digital, analog, mixed-signal, RF, and SoC. We work closely with your design and product teams to create test strategies that maximize test coverage while minimizing test time, ultimately reducing your cost of test and accelerating your product release schedule.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Multi-Platform Expertise</h4>
                <p className="text-muted-foreground text-sm">Proficiency across leading ATE platforms like Teradyne, Advantest, and National Instruments.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Full Lifecycle Support</h4>
                <p className="text-muted-foreground text-sm">From initial test plan development and hardware design (load boards/probe cards) to production release and yield optimization.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Characterization & Production</h4>
                <p className="text-muted-foreground text-sm">Developing programs for both engineering characterization and high-throughput wafer sort and final test.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our ATE Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Test Program Development & Conversion:</strong> Creating new test programs or migrating existing ones to different platforms.</p>
            <p><strong>Test Hardware Design:</strong> Designing and managing fabrication of probe cards and load boards.</p>
            <p><strong>Test Time Reduction:</strong> Optimizing test flows and implementing multi-site testing to lower costs.</p>
            <p><strong>Data Analysis & Yield Improvement:</strong> Providing tools and expertise to quickly analyze test data and improve yields.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
