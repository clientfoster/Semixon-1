
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Embedded Diagnostics</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We develop comprehensive diagnostic software that runs on your hardware, enabling rapid testing, fault detection, and failure analysis in manufacturing, service, and development environments.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Ensuring Hardware Integrity</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            From the factory floor to the field, being able to quickly and accurately test hardware is critical. We build powerful diagnostic firmware and software suites that exercise every component of your board, including processors, memory, and peripherals. These tools are indispensable for production line testing, returned-material analysis (RMA), and engineering validation.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Power-On Self-Tests (POST)</h4>
                <p className="text-muted-foreground text-sm">Developing fast, efficient tests that run at boot to ensure basic hardware integrity.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-running-0" />
              <div>
                <h4 className="font-semibold">Manufacturing Diagnostics</h4>
                <p className="text-muted-foreground text-sm">Creating comprehensive test suites for use in factory functional test stations.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Interactive Command-Line Interface</h4>
                <p className="text-muted-foreground text-sm">Building CLI-based tools that give engineers deep control for debugging and fault isolation.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Features of Our Diagnostics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Comprehensive Coverage:</strong> Tests for CPUs, memory (DRAM, flash), high-speed interfaces (Ethernet, USB, PCIe), and low-speed peripherals (I2C, SPI).</p>
            <p><strong>Stress Testing:</strong> Routines to push the system to its limits to identify stability and thermal issues.</p>
            <p><strong>Automated & Scriptable:</strong> Designed for easy integration into automated test environments.</p>
            <p><strong>Clear Reporting:</strong> Providing simple and clear pass/fail results and detailed logs for analysis.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
