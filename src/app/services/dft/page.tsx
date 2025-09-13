
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Design for Test (DFT)</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We integrate comprehensive Design for Test (DFT) methodologies into your ASIC design flow to ensure high-quality manufacturing tests, improved yield, and reduced test costs.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Ensuring Manufacturability</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            As process nodes shrink, ensuring the manufacturability and testability of complex SoCs becomes paramount. Our DFT engineers are experts in implementing a full suite of testability features, including scan chains, memory BIST (Built-in Self-Test), logic BIST, and boundary scan (JTAG). We work to achieve the highest possible test coverage while balancing area, power, and performance trade-offs.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Scan Insertion & ATPG</h4>
                <p className="text-muted-foreground text-sm">Implementing scan compression and generating high-coverage ATPG patterns for stuck-at, transition, and other advanced fault models.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Memory BIST and Repair</h4>
                <p className="text-muted-foreground text-sm">Integrating memory BIST controllers and repair analysis logic to improve yield on embedded memories.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Boundary Scan (JTAG)</h4>
                <p className="text-muted-foreground text-sm">Implementing IEEE 1149.1/6 compliant JTAG for board-level testing and debug.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our DFT Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>DFT Architecture:</strong> Defining the complete test strategy early in the design cycle.</p>
            <p><strong>RTL Integration & Verification:</strong> Inserting and verifying all DFT logic at the RTL stage.</p>
            <p><strong>Pattern Generation:</strong> Delivering fully validated test patterns for ATE handoff.</p>
            <p><strong>Post-Silicon Debug:</strong> Assisting with pattern bring-up and debug on the ATE platform.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
