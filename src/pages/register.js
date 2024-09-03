import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const steps = ['Connect Email', 'Upload Bill', 'Connect Account'];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [bill, setBill] = useState(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
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
          </>
        );
      case 2:
        return (
          <>
            <p>Connect your cloud account (read-only access)</p>
            <Button onClick={() => alert('Connecting account...')}>
              Connect Account
            </Button>
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
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep + 1}: {steps[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(currentStep + 1) / steps.length * 100} className="mb-4" />
            {renderStep()}
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrevious} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}