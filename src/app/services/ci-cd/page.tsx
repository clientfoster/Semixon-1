
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">CI/CD for Embedded Systems</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We implement modern Continuous Integration and Continuous Deployment (CI/CD) pipelines tailored for the unique challenges of embedded systems development, increasing quality and accelerating your development lifecycle.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Automate Your Embedded Workflow</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Bringing DevOps principles to the embedded world requires specialized expertise. We design and build CI/CD pipelines that automate the entire process from code check-in to deployment. This includes automated builds, static analysis, unit testing, hardware-in-the-loop (HIL) testing, and finally, the secure deployment of firmware artifacts. The result is a faster, more reliable development process with higher quality code.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Automated Builds & Static Analysis</h4>
                <p className="text-muted-foreground text-sm">Ensuring every commit is built and analyzed for potential bugs before it's integrated.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Hardware-in-the-Loop (HIL) Testing</h4>
                <p className="text-muted-foreground text-sm">Creating automated test racks to run tests on actual target hardware, providing the highest level of confidence.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Artifact Management & Deployment</h4>
                <p className="text-muted-foreground text-sm">Managing firmware binaries and deploying them to development, QA, or production devices automatically.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our CI/CD Toolchain</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>CI Platforms:</strong> Expertise in Jenkins, GitLab CI, GitHub Actions, and other CI servers.</p>
            <p><strong>Build Systems:</strong> Integration with complex embedded build systems like Yocto and Buildroot.</p>
            <p><strong>Test Automation:</strong> Using frameworks like Pytest and custom scripting to control hardware test setups.</p>
            <p><strong>Containerization:</strong> Using Docker to create consistent and reproducible build environments.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
