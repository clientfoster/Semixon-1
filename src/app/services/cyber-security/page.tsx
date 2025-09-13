
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Embedded Cyber Security</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We help you build secure embedded systems from the ground up, protecting your devices, your data, and your customers from emerging threats.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Security by Design</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            In an increasingly connected world, security cannot be an afterthought. Our embedded security experts work with you throughout the product lifecycle to identify threats, define security requirements, and implement robust countermeasures. We help you build a defense-in-depth strategy that protects your product at the hardware, firmware, and software levels.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Secure Boot & Firmware Updates</h4>
                <p className="text-muted-foreground text-sm">Implementing cryptographic chain-of-trust to ensure your device only runs authentic, untampered firmware.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Hardware Security Integration</h4>
                <p className="text-muted-foreground text-sm">Leveraging hardware security modules (HSMs) and trusted execution environments (TEEs) like TrustZone.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Threat Modeling & Penetration Testing</h4>
                <p className="text-muted-foreground text-sm">Proactively identifying vulnerabilities and providing actionable recommendations for mitigation.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Security Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Device Identity & Provisioning:</strong> Securely provisioning unique identities and credentials at manufacturing.</p>
            <p><strong>Secure Communications:</strong> Integrating TLS/DTLS and other secure protocols to protect data-in-transit.</p>
            <p><strong>System Hardening:</strong> Reducing the attack surface by disabling unused services and implementing access control policies.</p>
            <p><strong>Security Audits & Compliance:</strong> Assessing your design against industry standards and best practices.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
