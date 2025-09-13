
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Cloud Architecture and Engineering</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We design and build scalable, secure, and resilient cloud infrastructure on AWS, Google Cloud, and Azure, enabling you to innovate faster and operate more efficiently.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Building Your Foundation in the Cloud</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            A solid cloud architecture is the backbone of modern digital business. Our certified cloud architects and engineers partner with you to design, build, and manage cloud environments that are optimized for your workloads. Whether you're migrating existing applications, building cloud-native solutions, or adopting a multi-cloud strategy, we provide the expertise to ensure your success.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Cloud-Native Development</h4>
                <p className="text-muted-foreground text-sm">Building applications using serverless, containers (Docker, Kubernetes), and microservices architectures.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Infrastructure as Code (IaC)</h4>
                <p className="text-muted-foreground text-sm">Using tools like Terraform and CloudFormation to automate the provisioning and management of your infrastructure.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">DevOps & Automation</h4>
                <p className="text-muted-foreground text-sm">Implementing CI/CD pipelines, automated testing, and monitoring to improve reliability and speed of delivery.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Cloud Engineering Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Cloud Strategy & Migration:</strong> Assessing your readiness and executing a seamless migration to the cloud.</p>
            <p><strong>Architecture Design:</strong> Designing secure, scalable, and cost-effective solutions on your chosen cloud platform.</p>
            <p><strong>Cost Optimization:</strong> Analyzing your cloud spend and implementing strategies to reduce costs without sacrificing performance.</p>
            <p><strong>Managed Cloud Services:</strong> Providing 24/7 monitoring, maintenance, and support for your cloud environment.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
