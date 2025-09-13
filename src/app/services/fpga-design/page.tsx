
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">FPGA Design</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We offer comprehensive FPGA design services, from concept to deployed solution, providing the flexibility and performance you need for prototyping, low-volume production, and acceleration.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Flexible & Fast Hardware Solutions</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Our team of FPGA experts can help you leverage the power of programmable logic to accelerate your product development. We handle all aspects of FPGA design, including architectural definition, HDL coding (VHDL/Verilog), IP integration, synthesis, timing closure, and in-system validation. Whether you need a rapid prototype for your ASIC or a standalone FPGA-based product, we deliver optimized and reliable solutions.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Multi-Vendor Expertise</h4>
                <p className="text-muted-foreground text-sm">Extensive experience with major FPGA vendors including Xilinx (AMD), Altera (Intel), and Lattice.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">High-Speed Design</h4>
                <p className="text-muted-foreground text-sm">Expertise in implementing high-speed interfaces like PCIe, DDR4/5, Ethernet, and JESD204B.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Algorithm Acceleration</h4>
                <p className="text-muted-foreground text-sm">Implementing complex DSP and computational algorithms in hardware for maximum performance.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our FPGA Design Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>System Architecture:</strong> Defining hardware/software partitioning and selecting the right FPGA device.</p>
            <p><strong>RTL & IP Integration:</strong> High-quality, synthesizable code and seamless integration of third-party or custom IP.</p>
            <p><strong>Rigorous Verification:</strong> Comprehensive simulation and in-system hardware validation.</p>
            <p><strong>Timing Closure:</strong> Meeting your performance goals through expert synthesis and place-and-route techniques.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
