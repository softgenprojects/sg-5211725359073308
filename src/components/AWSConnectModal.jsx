import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function AWSConnectModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement AWS connection logic here
    console.log('Connecting AWS account:', formData);
    toast({
      title: "AWS Account Connected",
      description: "Your AWS account has been successfully connected.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect AWS Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="accessKeyId">Access Key ID</Label>
              <Input id="accessKeyId" name="accessKeyId" value={formData.accessKeyId} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="secretAccessKey">Secret Access Key</Label>
              <Input id="secretAccessKey" name="secretAccessKey" type="password" value={formData.secretAccessKey} onChange={handleChange} required />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Connect AWS Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}