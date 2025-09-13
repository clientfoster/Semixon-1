
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Prototyping and Emulation</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        Accelerate your software development and system-level validation with our advanced FPGA-based prototyping and emulation services, enabling early bug detection and massive verification speed-up.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Pre-Silicon Validation at Speed</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Software simulation is too slow for comprehensive system-level testing. Our prototyping and emulation solutions allow you to run real-world software and firmware on your design months before silicon is available. By mapping your ASIC/SoC design onto large-scale FPGAs or hardware emulators, we enable at-speed or near-at-speed validation, uncovering critical hardware/software integration bugs early.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">FPGA Prototyping</h4>
                <p className="text-muted-foreground text-sm">Building custom or using off-the-shelf FPGA boards to create a high-speed prototype of your design.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Hardware Emulation</h4>
                <p className="text-muted-foreground text-sm">Leveraging platforms like Palladium and Zebu for maximum capacity, debug visibility, and performance.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Virtual Prototyping</h4>
                <p className="text-muted-foreground text-sm">Creating transaction-level models (TLM) for even earlier software development and architectural exploration.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Key Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Shift-Left Your Schedule:</strong> Enable software teams to start development and testing up to 12 months earlier.</p>
            <p><strong>Find Bugs Faster:</strong> Run billions of cycles to uncover complex bugs impossible to find in simulation.</p>
            <p><strong>System-Level Validation:</strong> Test your full system with real-world peripherals and interfaces.</p>
            <p><strong>Reduce Project Risk:</strong> Gain high confidence in your design and its software interaction before tape-out.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
