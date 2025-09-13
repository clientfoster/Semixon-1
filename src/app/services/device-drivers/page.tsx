
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Device Driver Development</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We develop high-quality, reliable, and performant device drivers for any OS, enabling your custom hardware and peripherals to function seamlessly with your system.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Unlocking Your Hardware's Potential</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            A device driver is the essential software that allows an operating system to communicate with a piece of hardware. Without a stable and efficient driver, your hardware is useless. Our embedded software team has extensive experience writing drivers for a variety of operating systems and hardware interfaces, from simple GPIOs to complex, high-speed DMA-based devices.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Linux Kernel Drivers</h4>
                <p className="text-muted-foreground text-sm">Developing character, block, and network drivers, and leveraging kernel subsystems like I2C, SPI, USB, and PCIe.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">RTOS & Bare Metal Drivers</h4>
                <p className="text-muted-foreground text-sm">Creating lightweight, real-time capable drivers for systems running FreeRTOS, Zephyr, or no OS at all.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Windows Drivers (KMDF/UMDF)</h4>
                <p className="text-muted-foreground text-sm">Writing drivers for custom peripherals connected to Windows-based systems.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Driver Development Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Robustness:</strong> Meticulous error handling and testing to ensure stability.</p>
            <p><strong>Performance:</strong> Optimized for low latency and high throughput, using interrupts and DMA where appropriate.</p>
            <p><strong>Maintainability:</strong> Writing clean, well-documented, and standards-compliant code.</p>
            <p><strong>Power Management:</strong> Implementing power-saving features to extend battery life.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
