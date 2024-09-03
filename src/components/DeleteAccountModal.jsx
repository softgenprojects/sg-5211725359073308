import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function DeleteAccountModal({ isOpen, onClose }) {
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmation.toLowerCase() === 'delete my account') {
      // Implement account deletion logic here
      console.log('Deleting account');
      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted. We'll process it within 24 hours.",
      });
      onClose();
    } else {
      toast({
        title: "Confirmation Failed",
        description: "Please type 'delete my account' to confirm.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <p>To confirm, please type "delete my account" below:</p>
            <div>
              <Label htmlFor="confirmation">Confirmation</Label>
              <Input 
                id="confirmation" 
                value={confirmation} 
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="delete my account"
                required 
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="destructive">Delete My Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}