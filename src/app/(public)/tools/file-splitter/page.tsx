'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, CheckCircle2, FileText } from 'lucide-react';

export default function FileSplitterPage() {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState('');
    const [originalFileName, setOriginalFileName] = useState('');
    const [splitCount, setSplitCount] = useState(100);
    const [splitFiles, setSplitFiles] = useState<{ name: string; content: string; rowCount: number }[]>([]);
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

    const handleSplit = () => {
        if (csvData.length === 0) {
            alert('No data to split');
            return;
        }

        if (splitCount < 1) {
            alert('Please enter a valid number for rows per file');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            const files: { name: string; content: string; rowCount: number }[] = [];
            const totalFiles = Math.ceil(csvData.length / splitCount);
            const headerRow = csvHeaders.join(',');

            for (let i = 0; i < totalFiles; i++) {
                const start = i * splitCount;
                const end = Math.min(start + splitCount, csvData.length);
                const fileData = csvData.slice(start, end);

                const csvContent = fileData.map(row => row.join(',')).join('\n');
                const fullContent = headerRow + '\n' + csvContent;

                const displayStart = start + 2;
                const displayEnd = end + 1;

                files.push({
                    name: `${originalFileName}_rows_${displayStart}-${displayEnd}.csv`,
                    content: fullContent,
                    rowCount: fileData.length
                });
            }

            setSplitFiles(files);
            setShowResults(true);
            setIsProcessing(false);
        }, 500);
    };

    const handleDownload = async () => {
        const zip = new JSZip();

        splitFiles.forEach(file => {
            zip.file(file.name, file.content);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${originalFileName}_split.zip`);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const totalRows = csvData.length;
    const fileCount = Math.ceil(totalRows / splitCount);
    const lastFileRows = totalRows % splitCount || splitCount;

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">📄 CSV File Splitter</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Split large CSV files into smaller, manageable chunks
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: File Upload */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24 z-10">
                        <Card className="bg-white shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-black">Upload CSV File</CardTitle>
                                <CardDescription>Select a CSV file to split</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <div className="p-3 bg-white rounded-full shadow-royal-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-black">Click to upload CSV file</p>
                                    <p className="text-xs text-slate-500 mt-1">CSV files supported</p>
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
                                            <span>Upload a large CSV file</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Specify rows per file</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Download all files as ZIP</span>
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

                    {/* Right Column: Configuration & Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {csvData.length === 0 ? (
                            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30 h-[400px] flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="h-10 w-10 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No file uploaded</p>
                                    <p className="text-sm">Upload a CSV file to split it</p>
                                </div>
                            </Card>
                        ) : !showResults ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="bg-white shadow-royal border-0">
                                    <CardHeader>
                                        <CardTitle className="text-black">Split Configuration</CardTitle>
                                        <CardDescription>Specify how many rows per file</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="splitCount">Rows per file</Label>
                                            <Input
                                                id="splitCount"
                                                type="number"
                                                min="1"
                                                value={splitCount}
                                                onChange={(e) => setSplitCount(parseInt(e.target.value) || 100)}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Total rows:</span>
                                                <span className="text-sm font-semibold text-blue-700">{totalRows}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Files to be created:</span>
                                                <span className="text-sm font-semibold text-blue-700">{fileCount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Rows in last file:</span>
                                                <span className="text-sm font-semibold text-blue-700">{lastFileRows}</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleSplit}
                                            disabled={isProcessing}
                                            className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {isProcessing ? 'Splitting...' : 'Split CSV File'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-royal-lg">
                                    <CardContent className="p-12 text-center space-y-8">
                                        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-royal-lg mb-6">
                                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-black">Split Complete!</h3>
                                            <p className="text-lg text-gray-700 max-w-md mx-auto">
                                                {splitFiles.length} files created and ready to download.
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                            <Button variant="outline" size="lg" onClick={() => setShowResults(false)} className="border-slate-200 hover:bg-white hover:text-blue-600">
                                                Back to Options
                                            </Button>
                                            <Button size="lg" onClick={handleDownload} className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white px-8">
                                                <Download className="h-5 w-5 mr-2" />
                                                Download ZIP
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-royal border-0">
                                    <CardHeader>
                                        <CardTitle className="text-black">Split Files</CardTitle>
                                        <CardDescription>Preview of created files</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="max-h-96 overflow-y-auto space-y-2">
                                            {splitFiles.slice(0, 20).map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border-l-4 border-blue-600">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                        <span className="text-sm font-medium">{file.name}</span>
                                                    </div>
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                        {file.rowCount} rows
                                                    </span>
                                                </div>
                                            ))}
                                            {splitFiles.length > 20 && (
                                                <p className="text-center text-sm text-slate-500 mt-4 italic">
                                                    ... and {splitFiles.length - 20} more files
                                                </p>
                                            )}
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
