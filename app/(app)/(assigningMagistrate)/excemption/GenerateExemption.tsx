import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, Copy, Mail, X } from 'lucide-react';

interface UserInfo {
  name: string;
  profession: string;
  email: string;
  status: string;
}

const ExemptionIDGenerator = () => {
  const [email, setEmail] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [exemptionId, setExemptionId] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate random exemption ID
  const generateExemptionId = (): string => {
    const id = 'EX' + Math.floor(Math.random() * 10000000000).toString();
    return id;
  };

  // Simulate email verification process
  const handleVerifyEmail = async (): Promise<void> => {
    if (!email) return;

    setIsVerifying(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsVerifying(false);
    setIsVerified(true);
    
    // After verification success, generate exemption ID
    setTimeout(() => {
      const newId = generateExemptionId();
      setExemptionId(newId);
      setUserInfo({
        name: 'Benjamin Benjamin J.',
        profession: 'Lawyer',
        email: email,
        status: 'Verified'
      });
      setShowResult(true);
    }, 1000);
  };

  // Generate new exemption ID
  const handleGenerateNew = (): void => {
    const newId = generateExemptionId();
    setExemptionId(newId);
    setCopied(false);
  };

  // Copy exemption ID to clipboard
  const handleCopyId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(exemptionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Send to email (simulated)
  const handleSendToEmail = (): void => {
    alert(`Exemption ID ${exemptionId} has been sent to ${email}`);
  };

  // Reset form
  const handleClose = (): void => {
    setShowResult(false);
    setIsVerified(false);
    setEmail('');
    setExemptionId('');
    setUserInfo(null);
    setCopied(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="space-y-2">
              <CardTitle className="text-xl">{userInfo?.name}</CardTitle>
              <p className="text-sm text-gray-600">{userInfo?.email}</p>
              <Badge variant="secondary" className="w-fit">
                <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                {userInfo?.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-mono font-bold">{exemptionId}</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="default" 
                className="flex-1 bg-red-800 hover:bg-red-900"
                onClick={handleSendToEmail}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send to EMail
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-white border-orange-400"
                onClick={handleCopyId}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy ID'}
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleGenerateNew}
            >
              Generate New Exemption ID
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Note: This Code is unique to this email and can't be used by another user
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mb-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Verified Successfully</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mb-4">
              <Loader2 className="h-16 w-16 text-gray-400 mx-auto animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Verifying User</h2>
            <p className="text-gray-600">Please Hold while We verify user Status</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Exemption ID Generator</CardTitle>
          <CardDescription>
            Generate a unique exemption ID for relevant Department/Body/parastatals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Registered Email address"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleVerifyEmail}
            disabled={!email || isVerifying}
            className="w-full bg-red-800 hover:bg-red-900"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify email'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExemptionIDGenerator;