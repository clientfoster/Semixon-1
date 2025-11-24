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

                <div className="grid grid-cols-1 gap-8">
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

                    {csvData.length > 0 && (
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
                    )}

                    {showResults && (
                        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-royal-lg">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-royal">
                                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-black">Split Complete!</h3>
                                            <p className="text-slate-600">{splitFiles.length} files created</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleDownload}
                                        className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white"
                                    >
                                        <Download className="h-5 w-5 mr-2" />
                                        Download ZIP
                                    </Button>
                                </div>

                                <div className="max-h-64 overflow-y-auto space-y-2">
                                    {splitFiles.slice(0, 20).map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
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
                                        <p className="text-center text-sm text-slate-500 italic">
                                            ... and {splitFiles.length - 20} more files
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
