
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Physical Design</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We provide end-to-end physical design services, transforming your synthesized netlist into a production-ready GDSII layout, optimized for power, performance, and area (PPA).
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">From Netlist to GDSII</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Our physical design team has a proven track record of successful tape-outs across a wide range of process technologies, from mature nodes to advanced FinFET. We handle the complete backend flow, including floorplanning, placement, clock tree synthesis (CTS), routing, and final physical verification (DRC/LVS). Our focus is on achieving PPA targets and ensuring a predictable, successful tape-out.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Advanced Process Nodes</h4>
                <p className="text-muted-foreground text-sm">Expertise in 28nm, 16nm, 7nm, and below, managing complex design rules and variability effects.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Low Power Design</h4>
                <p className="text-muted-foreground text-sm">Implementation of advanced low-power techniques such as power gating, multi-Vdd, and DVFS.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Sign-off & Physical Verification</h4>
                <p className="text-muted-foreground text-sm">Rigorous static timing analysis (STA), power analysis, and ensuring a clean layout that is DRC/LVS correct.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Backend Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Floorplanning & Power Planning:</strong> Strategic placement of macros and creation of a robust power grid.</p>
            <p><strong>Place & Route:</strong> Utilizing industry-leading tools to achieve optimal placement and routing density.</p>
            <p><strong>Clock Tree Synthesis:</strong> Building balanced, low-skew clock trees to meet timing requirements.</p>
            <p><strong>Final Sign-off:</strong> Delivering a fully verified GDSII file ready for foundry handoff.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
