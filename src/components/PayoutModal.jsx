import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

export default function PayoutModal({ isOpen, onClose, totalEarnings }) {
  const [payoutMethod, setPayoutMethod] = useState('bankTransfer');
  const [accountDetails, setAccountDetails] = useState('');

  const handlePayout = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send a request to your backend to process the payout
      // For this example, we'll just simulate a successful payout
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      toast({
        title: "Payout Requested",
        description: `Your payout of $${totalEarnings} has been requested via ${payoutMethod}.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePayout}>
          <div className="space-y-4">
            <div>
              <Label>Total Available for Payout</Label>
              <p className="text-2xl font-bold">${totalEarnings}</p>
            </div>
            <RadioGroup value={payoutMethod} onValueChange={setPayoutMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                <Label htmlFor="bankTransfer">Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>
            <div>
              <Label htmlFor="accountDetails">
                {payoutMethod === 'bankTransfer' ? 'Bank Account Details' : 'PayPal Email'}
              </Label>
              <Input
                id="accountDetails"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={payoutMethod === 'bankTransfer' ? 'Enter your bank details' : 'Enter your PayPal email'}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Request Payout</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}