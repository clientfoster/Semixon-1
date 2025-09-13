
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">OS Porting and Customization</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We adapt and optimize your chosen operating system—from Linux and Android to real-time operating systems (RTOS)—to run flawlessly on your custom hardware.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Tailoring the OS to Your Product</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Running a standard OS on custom hardware is a complex task. Our team specializes in porting kernels, developing Board Support Packages (BSPs), and writing the device drivers necessary to make it work. But we go beyond just making it boot. We customize and optimize the entire software stack for performance, power, and footprint, ensuring the OS is perfectly tuned for your application's needs.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Linux/Android Porting</h4>
                <p className="text-muted-foreground text-sm">Bringing up and customizing embedded Linux (using Yocto/Buildroot) or AOSP on your target board.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">RTOS Integration</h4>
                <p className="text-muted-foreground text-sm">Expertise in integrating and configuring real-time operating systems like FreeRTOS, Zephyr, and VxWorks.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Performance & Power Optimization</h4>
                <p className="text-muted-foreground text-sm">Fine-tuning the kernel, drivers, and system services for faster boot times, lower latency, and extended battery life.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Customization Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Kernel Configuration:</strong> Removing unnecessary features to reduce footprint and improve security.</p>
            <p><strong>Fast-Boot Optimization:</strong> Analyzing and optimizing the entire boot sequence to get your product up and running in seconds.</p>
            <p><strong>Power Management Frameworks:</strong> Implementing suspend-to-RAM, dynamic frequency scaling, and other power-saving features.</p>
            <p><strong>File System Selection & Tuning:</strong> Choosing and configuring the right file system for your storage media and use case.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
