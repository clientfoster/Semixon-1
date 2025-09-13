
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Design Verification</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        Our rigorous design verification methodologies ensure your digital and mixed-signal designs are bug-free and functionally correct, mitigating risk and preventing costly silicon respins.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">First-Time-Right Silicon Guarantee</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            In modern SoC design, verification consumes the majority of the project timeline. Our world-class DV team is expert in advanced verification techniques, from Universal Verification Methodology (UVM) to formal verification. We build scalable, reusable testbenches and constrained-random environments to exhaustively test your design, uncovering corner-case bugs early in the cycle.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">UVM-Based Verification</h4>
                <p className="text-muted-foreground text-sm">Building state-of-the-art, coverage-driven verification environments using SystemVerilog and UVM.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Formal Verification</h4>
                <p className="text-muted-foreground text-sm">Applying formal methods for property checking and exhaustive proofs of correctness on critical logic blocks.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">End-to-End Coverage</h4>
                <p className="text-muted-foreground text-sm">Employing code, functional, and assertion coverage to ensure all design specifications are met and tested.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Verification Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Verification Planning:</strong> Creating a comprehensive vPlan tied directly to design specifications.</p>
            <p><strong>Testbench Architecture:</strong> Designing robust, reusable, and scalable verification IP (VIP) and testbenches.</p>
            <p><strong>Regression Management:</strong> Running nightly regressions and providing clear, actionable reports.</p>
            <p><strong>Gate-Level Simulations:</strong> Performing final verification on the netlist to catch any post-synthesis issues.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
