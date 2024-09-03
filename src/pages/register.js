import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const steps = [
  { id: 'email', title: 'Connect Email' },
  { id: 'bill', title: 'Upload Bill' },
  { id: 'connect', title: 'Connect Account' },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [bill, setBill] = useState(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Registration complete, navigate to dashboard
      router.push('/dashboard');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <Button onClick={handleNext} className="mt-4">Next</Button>
          </>
        );
      case 1:
        return (
          <>
            <Label htmlFor="bill">Upload Last Month's Bill</Label>
            <Input
              id="bill"
              type="file"
              onChange={(e) => setBill(e.target.files[0])}
            />
            <Button onClick={handleNext} className="mt-4">Next</Button>
          </>
        );
      case 2:
        return (
          <>
            <p>Connect your cloud account (read-only access)</p>
            <Button onClick={handleNext} className="mt-4">Connect Account</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Register</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Registration Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(currentStep + 1) / steps.length * 100} className="mb-4" />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className={`text-sm ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}