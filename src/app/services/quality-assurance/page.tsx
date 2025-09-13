
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Quality Assurance</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        Our comprehensive Quality Assurance (QA) and testing services ensure that your software is reliable, functional, secure, and delivers an excellent user experience.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Delivering Flawless Software</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Bugs in production can damage your reputation and your bottom line. Our dedicated QA team works to catch defects early in the development cycle, reducing risk and ensuring a high-quality product launch. We offer a full spectrum of testing services, integrating seamlessly with your development team to build quality into every stage of the process.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Test Automation</h4>
                <p className="text-muted-foreground text-sm">Building and maintaining automated test suites (Selenium, Cypress, Playwright) for web and mobile applications to enable robust regression testing.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Manual & Exploratory Testing</h4>
                <p className="text-muted-foreground text-sm">Leveraging the expertise of our QA analysts to test for usability issues and edge cases that automation can miss.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Performance & Load Testing</h4>
                <p className="text-muted-foreground text-sm">Using tools like JMeter and k6 to ensure your application is scalable and can handle peak user loads.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our QA Service Offerings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>QA Strategy & Test Planning:</strong> Defining a comprehensive testing strategy and plan tailored to your project.</p>
            <p><strong>Functional Testing:</strong> Verifying that your application meets all functional requirements.</p>
            <p><strong>API Testing:</strong> Ensuring the reliability and security of your backend services and APIs.</p>
            <p><strong>Security Testing:</strong> Identifying vulnerabilities and weaknesses in your application's security posture.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
