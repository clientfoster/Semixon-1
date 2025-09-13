
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 text-center">Data Analytics, AI and Machine Learning</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
        We help you harness the power of your data, leveraging advanced analytics, artificial intelligence (AI), and machine learning (ML) to unlock actionable insights, automate processes, and create intelligent products.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Transforming Data into Value</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            In today's digital economy, data is your most valuable asset. Our team of data scientists and AI/ML engineers can help you build end-to-end solutions that turn raw data into a competitive advantage. From data collection and processing to model training and deployment, we provide the expertise to solve your toughest business challenges.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Predictive Analytics</h4>
                <p className="text-muted-foreground text-sm">Building models to forecast trends, predict customer behavior, and optimize business outcomes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Natural Language Processing (NLP)</h4>
                <p className="text-muted-foreground text-sm">Developing solutions for sentiment analysis, text classification, chatbots, and document understanding.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">Computer Vision</h4>
                <p className="text-muted-foreground text-sm">Creating systems for image recognition, object detection, and video analysis.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our AI/ML Service Offerings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>AI Strategy Consulting:</strong> Identifying high-impact use cases and creating a roadmap for AI adoption.</p>
            <p><strong>Data Engineering:</strong> Building robust and scalable data pipelines to collect, clean, and prepare data for ML.</p>
            <p><strong>Custom Model Development:</strong> Training, tuning, and validating machine learning models tailored to your specific data.</p>
            <p><strong>MLOps:</strong> Deploying, monitoring, and maintaining ML models in production environments.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
