
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Bare Metal Programming</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We deliver highly optimized, lightweight, and real-time capable firmware through expert bare metal programming, directly controlling hardware for maximum performance and minimum overhead.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Ultimate Control and Efficiency</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            For applications where every clock cycle and every byte of memory counts, an operating system is an unnecessary luxury. Our embedded engineers excel at bare metal development, writing code that runs directly on the processor. This approach provides deterministic, real-time performance and the smallest possible footprint, ideal for resource-constrained microcontrollers, bootloaders, and performance-critical hardware drivers.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Deep Architecture Knowledge</h4>
                <p className="text-muted-foreground text-sm">Expertise in ARM Cortex-M/R/A, RISC-V, and other microcontroller architectures to leverage every hardware feature.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Optimized C and Assembly</h4>
                <p className="text-muted-foreground text-sm">Writing clean, efficient, and maintainable C code, and using assembly only when absolutely necessary for performance.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Hardware Initialization & Control</h4>
                <p className="text-muted-foreground text-sm">Developing robust startup code, clock configuration, and direct register-level control of peripherals.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Typical Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Bootloaders:</strong> Creating secure and reliable bootloaders for firmware updates and application loading.</p>
            <p><strong>Low-Level Drivers:</strong> Writing performant drivers for custom or complex peripherals.</p>
            <p><strong>Real-Time Control Systems:</strong> Applications in motor control, industrial automation, and avionics requiring deterministic response.</p>
            <p><strong>Resource-Constrained Devices:</strong> Firmware for IoT sensors and other small-footprint embedded systems.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
