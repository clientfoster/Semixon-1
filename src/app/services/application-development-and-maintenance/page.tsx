
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Application Development and Maintenance</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We provide end-to-end application development services to build, deploy, and maintain robust, scalable, and secure software solutions that meet your business objectives.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Building and Supporting Your Business Software</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            From customer-facing web and mobile apps to internal enterprise systems, we design and build software that works. Our team follows agile methodologies to deliver high-quality applications quickly and efficiently. After launch, we provide comprehensive maintenance and support services to ensure your application remains secure, up-to-date, and aligned with your evolving business needs.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Full-Stack Web Development</h4>
                <p className="text-muted-foreground text-sm">Expertise in modern frontend (React, Angular, Vue) and backend (Node.js, Python, Java, .NET) technologies.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Mobile App Development</h4>
                <p className="text-muted-foreground text-sm">Building native (iOS, Android) and cross-platform (React Native, Flutter) mobile applications.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Legacy System Modernization</h4>
                <p className="text-muted-foreground text-sm">Helping you migrate from outdated technologies to modern, scalable, and maintainable architectures.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Development Lifecycle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Discovery & Design:</strong> Collaborating to define requirements, user stories, and create intuitive UX/UI designs.</p>
            <p><strong>Agile Development:</strong> Iterative development with regular demos and feedback loops.</p>
            <p><strong>DevOps & Quality Assurance:</strong> Integrating CI/CD and automated testing to ensure high quality and fast delivery.</p>
            <p><strong>Ongoing Maintenance:</strong> Providing bug fixes, security patches, feature enhancements, and 24/7 support.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
