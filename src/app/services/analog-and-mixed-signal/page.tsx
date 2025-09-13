
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Analog and Mixed-Signal IC Design</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We specialize in creating high-performance Analog and Mixed-Signal Integrated Circuits (ICs) that bridge the physical and digital worlds, enabling seamless interaction and superior performance for your most complex applications.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Our Expertise</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Our world-class engineering team possesses deep expertise across the entire analog and mixed-signal domain. We design custom ICs that meet the most demanding requirements for performance, power efficiency, and size. From data converters and amplifiers to power management and RF transceivers, we deliver solutions that are optimized for your specific needs.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">High-Precision Data Converters (ADC/DAC)</h4>
                <p className="text-muted-foreground text-sm">Designs for high-speed, high-resolution applications in instrumentation, medical, and communications.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Power Management ICs (PMICs)</h4>
                <p className="text-muted-foreground text-sm">Efficient and compact solutions including LDOs, buck/boost converters, and battery management systems.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">RF and Wireless ICs</h4>
                <p className="text-muted-foreground text-sm">Custom RF front-ends, transceivers, and PLLs for modern wireless standards.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>What We Deliver</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Turnkey Solutions:</strong> From concept to GDSII, we manage the entire design flow.</p>
            <p><strong>Process Node Flexibility:</strong> Experience with a wide range of foundry processes from legacy nodes to FinFET.</p>
            <p><strong>Rigorous Verification:</strong> Ensuring robust performance through extensive simulation and modeling.</p>
            <p><strong>First-Time-Right Silicon:</strong> Our meticulous methodology minimizes respins, saving time and cost.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
