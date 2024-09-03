import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import TeamMemberModal from '@/components/TeamMemberModal';
import AWSConnectModal from '@/components/AWSConnectModal';
import DeleteAccountModal from '@/components/DeleteAccountModal';

export default function Settings() {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member' },
  ]);
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isAWSConnectModalOpen, setIsAWSConnectModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    address: '',
    taxId: '',
    managingDirector: '',
    email: '',
  });

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsTeamMemberModalOpen(true);
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setIsTeamMemberModalOpen(true);
  };

  const handleSaveMember = (member) => {
    if (member.id) {
      setTeamMembers(teamMembers.map(m => m.id === member.id ? member : m));
    } else {
      setTeamMembers([...teamMembers, { ...member, id: Date.now() }]);
    }
    setIsTeamMemberModalOpen(false);
    toast({
      title: member.id ? "Team Member Updated" : "Team Member Added",
      description: `${member.name} has been ${member.id ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleCompanyInfoChange = (e) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
  };

  const handleSaveCompanyInfo = () => {
    // Implement API call to save company info
    toast({
      title: "Company Information Saved",
      description: "Your company information has been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Settings</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4" onClick={handleAddMember}>Add Team Member</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="name" value={companyInfo.name} onChange={handleCompanyInfoChange} />
              </div>
              <div>
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input id="companyAddress" name="address" value={companyInfo.address} onChange={handleCompanyInfoChange} />
              </div>
              <div>
                <Label htmlFor="taxId">Tax ID</Label>
                <Input id="taxId" name="taxId" value={companyInfo.taxId} onChange={handleCompanyInfoChange} />
              </div>
              <div>
                <Label htmlFor="managingDirector">Managing Director</Label>
                <Input id="managingDirector" name="managingDirector" value={companyInfo.managingDirector} onChange={handleCompanyInfoChange} />
              </div>
              <div>
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input id="companyEmail" name="email" type="email" value={companyInfo.email} onChange={handleCompanyInfoChange} />
              </div>
              <Button onClick={handleSaveCompanyInfo}>Save Company Information</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connect Cloud Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsAWSConnectModalOpen(true)} className="flex items-center">
              <img src="/api/placeholder/32/32" alt="AWS Logo" className="mr-2" />
              Connect AWS Account
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Warning: This action cannot be undone. All your data will be permanently deleted.</p>
            <Button variant="destructive" onClick={() => setIsDeleteAccountModalOpen(true)}>Delete My Account</Button>
          </CardContent>
        </Card>
      </div>

      <TeamMemberModal
        isOpen={isTeamMemberModalOpen}
        onClose={() => setIsTeamMemberModalOpen(false)}
        onSave={handleSaveMember}
        member={editingMember}
      />

      <AWSConnectModal
        isOpen={isAWSConnectModalOpen}
        onClose={() => setIsAWSConnectModalOpen(false)}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
      />
    </Layout>
  );
}