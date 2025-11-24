'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, FileSpreadsheet, X, Download, CheckCircle2 } from 'lucide-react';

interface EmailFormat {
    fn: (f: string, l: string, fi: string, li: string) => string;
    label: string;
    example: string;
}

const EMAIL_FORMATS: EmailFormat[] = [
    { fn: (f, l) => `${f}-${l}`, label: "firstname-lastname", example: "john-doe" },
    { fn: (f, l) => `${f}_${l}`, label: "firstname_lastname", example: "john_doe" },
    { fn: (f, l) => `${l}-${f}`, label: "lastname-firstname", example: "doe-john" },
    { fn: (f, l) => `${l}_${f}`, label: "lastname_firstname", example: "doe_john" },
    { fn: (f, l, fi) => `${fi}-${l}`, label: "f-lastname", example: "j-doe" },
    { fn: (f, l, fi, li) => `${li}-${f}`, label: "l-firstname", example: "d-john" },
    { fn: (f, l, fi, li) => `${li}_${f}`, label: "l_firstname", example: "d_john" },
    { fn: (f, l, fi, li) => `${f}-${li}`, label: "firstname-l", example: "john-d" },
    { fn: (f, l, fi, li) => `${f}_${li}`, label: "firstname_l", example: "john_d" },
    { fn: (f, l, fi, li) => `${l}-${fi}`, label: "lastname-f", example: "doe-j" },
    { fn: (f, l, fi, li) => `${l}_${fi}`, label: "lastname_f", example: "doe_j" },
    { fn: (f, l, fi, li) => `${fi}-${li}`, label: "f-l", example: "j-d" },
    { fn: (f, l, fi, li) => `${fi}_${li}`, label: "f_l", example: "j_d" },
    { fn: (f, l, fi, li) => `${li}-${fi}`, label: "l-f", example: "d-j" },
    { fn: (f, l, fi, li) => `${li}_${fi}`, label: "l_f", example: "d_j" },
    { fn: (f, l) => `${f}${l}`, label: "firstnamelastname", example: "johndoe" },
    { fn: (f, l) => `${f}.${l}`, label: "firstname.lastname", example: "john.doe" },
    { fn: (f, l, fi) => `${fi}${l}`, label: "flastname", example: "jdoe" },
    { fn: (f, l, fi) => `${fi}.${l}`, label: "f.lastname", example: "j.doe" },
    { fn: (f, l, fi) => `${fi}_${l}`, label: "f_lastname", example: "j_doe" },
    { fn: (f, l) => `${l}.${f}`, label: "lastname.firstname", example: "doe.john" },
    { fn: (f, l, fi, li) => `${li}.${f}`, label: "l.firstname", example: "d.john" },
    { fn: (f, l) => `${l}${f}`, label: "lastnamefirstname", example: "doejohn" },
    { fn: (f, l, fi, li) => `${f}.${li}`, label: "firstname.l", example: "john.d" }
];

export default function EmailGeneratorPage() {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState('');
    const [originalFileName, setOriginalFileName] = useState('');
    const [selectedPatterns, setSelectedPatterns] = useState<boolean[]>(EMAIL_FORMATS.map(() => true));
    const [firstNameCol, setFirstNameCol] = useState('');
    const [lastNameCol, setLastNameCol] = useState('');
    const [domainType, setDomainType] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [domainColumn, setDomainColumn] = useState('');
    const [generatedCSV, setGeneratedCSV] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.csv')) {
            alert('Please select a CSV file.');
            return;
        }

        setOriginalFileName(file.name.replace(/\.csv$/i, ''));
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            parseCSV(text);
        };
        reader.readAsText(file);
    };

    const parseCSV = (text: string) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
            alert('CSV file is empty');
            return;
        }

        const headers = parseCSVLine(lines[0]);
        const data: string[][] = [];

        for (let i = 1; i < lines.length; i++) {
            const row = parseCSVLine(lines[i]);
            if (row.length === headers.length) {
                data.push(row);
            }
        }

        setCsvHeaders(headers);
        setCsvData(data);
    };

    const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    };

    const handleGenerate = () => {
        if (!firstNameCol || !lastNameCol) {
            alert('Please map both first and last name columns');
            return;
        }

        if (domainType === 'custom' && !customDomain) {
            alert('Please enter a custom domain');
            return;
        }

        if (domainType === 'map-from-sheet' && !domainColumn) {
            alert('Please select a domain column');
            return;
        }

        const selectedFormats = EMAIL_FORMATS.filter((_, i) => selectedPatterns[i]);
        if (selectedFormats.length === 0) {
            alert('Please select at least one email pattern');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            const firstNameIndex = csvHeaders.indexOf(firstNameCol);
            const lastNameIndex = csvHeaders.indexOf(lastNameCol);
            const domainIndex = domainType === 'map-from-sheet' ? csvHeaders.indexOf(domainColumn) : -1;

            const processedRows: string[] = [csvHeaders.join(',')];

            csvData.forEach(row => {
                const firstName = cleanName(row[firstNameIndex]);
                const lastName = cleanName(row[lastNameIndex]);
                const domain = getDomain(row, domainIndex);

                selectedFormats.forEach(format => {
                    const email = `${format.fn(firstName, lastName, firstName[0], lastName[0])}${domain}`;
                    processedRows.push(`${row.join(',')},${email}`);
                });
            });

            setGeneratedCSV(processedRows.join('\n'));
            setShowResults(true);
            setIsProcessing(false);
        }, 500);
    };

    const cleanName = (name: string): string => {
        return name.replace(/^"(.*)"$/, '$1')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    };

    const getDomain = (row: string[], domainIndex: number): string => {
        let domain = '';
        if (domainType === 'custom') {
            domain = customDomain.startsWith('@') ? customDomain : `@${customDomain}`;
        } else if (domainType === 'map-from-sheet') {
            domain = row[domainIndex];
            domain = domain.startsWith('@') ? domain : `@${domain}`;
        } else {
            domain = domainType;
        }
        return domain.replace(/"/g, '').trim();
    };

    const handleDownload = () => {
        const downloadFileName = originalFileName ? `${originalFileName}_emails.csv` : 'generated_emails.csv';
        const blob = new Blob([generatedCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const togglePattern = (index: number) => {
        const newPatterns = [...selectedPatterns];
        newPatterns[index] = !newPatterns[index];
        setSelectedPatterns(newPatterns);
    };

    const selectAll = () => setSelectedPatterns(EMAIL_FORMATS.map(() => true));
    const deselectAll = () => setSelectedPatterns(EMAIL_FORMATS.map(() => false));
    const invertSelection = () => setSelectedPatterns(selectedPatterns.map(p => !p));

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">📧 CSV Email Generator</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Generate email addresses from your CSV data with multiple format options
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <Card className="bg-white shadow-royal border-0">
                        <CardHeader>
                            <CardTitle className="text-black">Upload CSV File</CardTitle>
                            <CardDescription>Select a CSV file with name columns</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                onClick={() => fileInputRef.current?.click()}>
                                <div className="p-3 bg-white rounded-full shadow-royal-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="h-8 w-8 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium text-black">Click to upload CSV file</p>
                                <p className="text-xs text-slate-500 mt-1">CSV files up to 100MB</p>
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                />
                            </div>

                            {fileName && (
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm font-medium text-blue-700">Selected: {fileName}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {csvHeaders.length > 0 && (
                        <>
                            <Card className="bg-white shadow-royal border-0">
                                <CardHeader>
                                    <CardTitle className="text-black">Map Columns</CardTitle>
                                    <CardDescription>Select which columns contain the name data</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name Column</Label>
                                        <select
                                            id="firstName"
                                            value={firstNameCol}
                                            onChange={(e) => setFirstNameCol(e.target.value)}
                                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                        >
                                            <option value="">Select Column</option>
                                            {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name Column</Label>
                                        <select
                                            id="lastName"
                                            value={lastNameCol}
                                            onChange={(e) => setLastNameCol(e.target.value)}
                                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                        >
                                            <option value="">Select Column</option>
                                            {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="domain">Domain Name</Label>
                                        <select
                                            id="domain"
                                            value={domainType}
                                            onChange={(e) => setDomainType(e.target.value)}
                                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                        >
                                            <option value="">Choose Domain</option>
                                            <option value="@gmail.com">@gmail.com</option>
                                            <option value="@yahoo.com">@yahoo.com</option>
                                            <option value="custom">Custom Domain</option>
                                            <option value="map-from-sheet">Map From Sheet</option>
                                        </select>
                                    </div>

                                    {domainType === 'custom' && (
                                        <Input
                                            type="text"
                                            value={customDomain}
                                            onChange={(e) => setCustomDomain(e.target.value)}
                                            placeholder="@company.com"
                                            className="w-full"
                                        />
                                    )}

                                    {domainType === 'map-from-sheet' && (
                                        <select
                                            value={domainColumn}
                                            onChange={(e) => setDomainColumn(e.target.value)}
                                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                        >
                                            <option value="">Select Column</option>
                                            {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-royal border-0">
                                <CardHeader>
                                    <CardTitle className="text-black">Email Patterns</CardTitle>
                                    <CardDescription>Select which email formats to generate</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex gap-3 flex-wrap">
                                        <Button onClick={selectAll} variant="outline" size="sm">Select All</Button>
                                        <Button onClick={deselectAll} variant="outline" size="sm">Deselect All</Button>
                                        <Button onClick={invertSelection} variant="outline" size="sm">Invert Selection</Button>
                                    </div>

                                    <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                                        {EMAIL_FORMATS.map((format, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    id={`pattern-${index}`}
                                                    checked={selectedPatterns[index]}
                                                    onChange={() => togglePattern(index)}
                                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <label htmlFor={`pattern-${index}`} className="flex-1 cursor-pointer text-sm">
                                                    <span className="font-medium">{format.label}</span>
                                                    <span className="text-slate-500"> ({format.example}@domain.com)</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleGenerate}
                                        disabled={isProcessing || !firstNameCol || !lastNameCol || !domainType}
                                        className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {isProcessing ? 'Generating...' : 'Generate Emails'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {showResults && (
                        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-royal-lg">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-royal">
                                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-black">Emails Generated!</h3>
                                            <p className="text-slate-600">Ready to download</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleDownload}
                                        className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white"
                                    >
                                        <Download className="h-5 w-5 mr-2" />
                                        Download CSV
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
