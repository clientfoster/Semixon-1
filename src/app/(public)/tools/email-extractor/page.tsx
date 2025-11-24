'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Mail, X, Download, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function EmailExtractorPage() {
    const [extractedEmails, setExtractedEmails] = useState<string[]>([]);
    const [fileName, setFileName] = useState('');
    const [showResults, setShowResults] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Email regex pattern - must start with alphanumeric character
    const emailRegex = /\b[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.name.endsWith('.txt')) {
            alert('Please select a .txt file');
            return;
        }

        setFileName(file.name);

        try {
            const content = await file.text();
            extractEmails(content);
        } catch (error) {
            alert('Error reading file. Please try again.');
        }
    };

    const isValidEmail = (email: string): boolean => {
        // Comprehensive email validation
        if (!email || email.length > 254) return false; // Max email length per RFC 5321

        const parts = email.split('@');
        if (parts.length !== 2) return false;

        const [localPart, domain] = parts;

        // Validate local part (before @)
        if (!localPart || localPart.length > 64) return false; // Max 64 chars
        if (!/^[a-zA-Z0-9]/.test(localPart)) return false; // Must start with alphanumeric
        if (!/[a-zA-Z0-9]$/.test(localPart)) return false; // Must end with alphanumeric
        if (/[._%+-]{2,}/.test(localPart)) return false; // No consecutive special chars
        if (!/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(localPart)) return false;

        // Validate domain part (after @)
        if (!domain || domain.length > 253) return false;
        if (!/^[a-zA-Z0-9]/.test(domain)) return false; // Must start with alphanumeric
        if (!/[a-zA-Z]{2,}$/.test(domain)) return false; // Must end with valid TLD (2+ letters)
        if (/\.{2,}/.test(domain)) return false; // No consecutive dots
        if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z]{2,}$/.test(domain)) return false;

        // Check for valid domain structure
        const domainParts = domain.split('.');
        if (domainParts.length < 2) return false; // Must have at least domain.tld
        if (domainParts.some(part => !part || part.length > 63)) return false; // Each label max 63 chars

        return true;
    };

    const extractEmails = (text: string) => {
        // Extract all email addresses
        const emails = text.match(emailRegex);

        if (!emails || emails.length === 0) {
            alert('No email addresses found in the file.');
            setShowResults(false);
            return;
        }

        // Validate and clean emails
        const validEmails = emails
            .map(email => email.trim().toLowerCase()) // Normalize
            .filter(email => isValidEmail(email)); // Strict validation

        if (validEmails.length === 0) {
            alert('No valid email addresses found in the file.');
            setShowResults(false);
            return;
        }

        // Remove duplicates and sort
        const uniqueEmails = [...new Set(validEmails)].sort();
        setExtractedEmails(uniqueEmails);
        setShowResults(true);
    };

    const handleDownload = () => {
        if (extractedEmails.length === 0) {
            alert('No emails to download');
            return;
        }

        // Create text content with one email per line
        const textContent = extractedEmails.join('\n');

        // Create blob and download
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extracted_emails_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setExtractedEmails([]);
        setFileName('');
        setShowResults(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">📧 Email Extractor</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Upload a text file to extract and validate email addresses
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: File Upload */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24 z-10">
                        <Card className="bg-white shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-black">Upload File</CardTitle>
                                <CardDescription>Select a .txt file to extract emails</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <div className="p-3 bg-white rounded-full shadow-royal-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-black">Click to upload file</p>
                                    <p className="text-xs text-slate-500 mt-1">Only .txt files supported</p>
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".txt"
                                        onChange={handleFileSelect}
                                    />
                                </div>

                                {fileName && (
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm font-medium text-blue-700 truncate" title={fileName}>
                                            Selected: {fileName}
                                        </p>
                                    </div>
                                )}

                                {showResults && (
                                    <Button
                                        variant="outline"
                                        onClick={handleReset}
                                        className="w-full border-slate-200 hover:bg-slate-50"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear & Upload New File
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-50/30 border border-blue-100">
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-black flex items-center gap-2">
                                        <span className="text-blue-600">ℹ️</span>
                                        How it works
                                    </h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Upload a .txt file containing text with email addresses</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Emails are automatically validated and deduplicated</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Download the cleaned list as a .txt file</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>All processing happens locally in your browser</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {!showResults ? (
                            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30 h-[400px] flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="h-10 w-10 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No file uploaded</p>
                                    <p className="text-sm">Upload a .txt file to extract emails</p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-royal-lg">
                                    <CardContent className="p-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-royal">
                                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-black">
                                                        {extractedEmails.length} Email{extractedEmails.length !== 1 ? 's' : ''} Found
                                                    </h3>
                                                    <p className="text-slate-600">Validated and deduplicated</p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={handleDownload}
                                                className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white"
                                            >
                                                <Download className="h-5 w-5 mr-2" />
                                                Download TXT
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-royal border-0">
                                    <CardHeader>
                                        <CardTitle className="text-black">Extracted Emails</CardTitle>
                                        <CardDescription>All unique email addresses found in the file</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                            <div className="space-y-2">
                                                {extractedEmails.map((email, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border-l-4 border-blue-600"
                                                    >
                                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold min-w-[50px] text-center">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-slate-700 font-mono text-sm break-all">
                                                            {email}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
