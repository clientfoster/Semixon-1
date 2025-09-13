
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Board Support Package (BSP) Development</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We create robust, production-quality Board Support Packages (BSPs) that abstract your custom hardware, enabling your application developers to work with a standardized, portable API.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Bridging Hardware and Software</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            A well-architected BSP is the foundation of any successful embedded product. It is the critical software layer that initializes the hardware and provides the necessary drivers and routines to allow a higher-level operating system (like Linux or an RTOS) to function on your specific board. Our team develops and customizes BSPs that are tailored to your hardware, fully tested, and ready for application development.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Bootloader Development</h4>
                <p className="text-muted-foreground text-sm">Customizing and hardening bootloaders like U-Boot or creating proprietary solutions for secure and fast system startup.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Kernel Porting & Hardening</h4>
                <p className="text-muted-foreground text-sm">Porting your chosen OS (Linux, Android, RTOS) to your custom board and configuring the kernel for stability and performance.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Custom Device Drivers</h4>
                <p className="text-muted-foreground text-sm">Writing reliable and efficient drivers for your unique set of on-board peripherals and interfaces.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>What's Included in our BSP?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Complete Source Code:</strong> Well-documented source for the bootloader, kernel, and all drivers.</p>
            <p><strong>Build System Integration:</strong> Support for Yocto Project, Buildroot, or other build environments.</p>
            <p><strong>Comprehensive Documentation:</strong> Detailed instructions for building the BSP and developing applications.</p>
            <p><strong>Manufacturing & Test Utilities:</strong> Providing necessary tools for factory programming and testing.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
