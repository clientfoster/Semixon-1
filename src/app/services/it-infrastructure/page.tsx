
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">IT Infrastructure Management</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We provide comprehensive IT infrastructure services, from design and implementation to ongoing management and support, ensuring your core technology is reliable, secure, and aligned with your business goals.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Building a Resilient Foundation</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Your IT infrastructure is the engine that powers your business. Our team of certified engineers helps you design, build, and maintain a robust and scalable infrastructure, whether on-premises, in the cloud, or in a hybrid environment. We focus on uptime, security, and performance, freeing you to focus on your core business.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Network Design & Management</h4>
                <p className="text-muted-foreground text-sm">Designing and managing secure, high-performance local and wide area networks (LAN/WAN).</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Server & Storage Administration</h4>
                <p className="text-muted-foreground text-sm">Managing Windows and Linux servers, virtualization (VMware, Hyper-V), and storage solutions (SAN/NAS).</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">24/7 Monitoring & Support</h4>
                <p className="text-muted-foreground text-sm">Proactive monitoring to detect and resolve issues before they impact your business, with round-the-clock helpdesk support.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Infrastructure Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Infrastructure Assessment & Planning:</strong> Auditing your current environment and creating a strategic roadmap.</p>
            <p><strong>Cyber Security Services:</strong> Implementing firewalls, endpoint protection, and security policies to protect your assets.</p>
            <p><strong>Backup & Disaster Recovery:</strong> Designing and managing robust backup solutions to ensure business continuity.</p>
            <p><strong>Managed IT Services:</strong> Acting as your outsourced IT department for a flat monthly fee.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
