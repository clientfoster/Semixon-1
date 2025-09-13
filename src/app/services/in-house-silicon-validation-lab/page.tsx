
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">In-House Silicon Validation Lab</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        Our state-of-the-art in-house lab provides the critical infrastructure for comprehensive silicon bring-up, validation, and characterization, ensuring your product is robust and market-ready.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">State-of-the-Art Facilities</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Access to the right equipment is crucial for efficient post-silicon validation. Our lab is stocked with a wide array of high-performance test and measurement equipment, enabling our engineers to quickly debug and validate every aspect of your design. We provide a secure, ESD-safe environment for all post-silicon activities, from initial power-on to full system-level testing.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">High-Bandwidth Oscilloscopes & Analyzers</h4>
                <p className="text-muted-foreground text-sm">For signal integrity analysis, protocol compliance, and high-speed interface validation.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Thermal Chambers & Probers</h4>
                <p className="text-muted-foreground text-sm">Enabling full characterization over voltage and temperature extremes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Custom Test Setups</h4>
                <p className="text-muted-foreground text-sm">Expertise in building custom hardware and software setups for unique validation requirements.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Lab Services Offered</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>First Silicon Bring-Up:</strong> Expert hands-on support to power up and establish initial communication with your device.</p>
            <p><strong>Bench Characterization:</strong> Automated testing to validate performance against all datasheet specifications.</p>
            <p><strong>System-Level Validation:</strong> Testing the device in a representative end-application environment.</p>
            <p><strong>Failure Analysis & Debug:</strong> Providing the tools and environment for rapid root cause analysis.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
