'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, FileSpreadsheet, X, Download, CheckCircle2, Merge } from 'lucide-react';

interface FileData {
    name: string;
    data: any[][];
    headers: string[];
}

export default function CSVMergerPage() {
    const [files, setFiles] = useState<FileData[]>([]);
    const [mergedData, setMergedData] = useState<any[][]>([]);
    const [mergedHeaders, setMergedHeaders] = useState<string[]>([]);
    const [processed, setProcessed] = useState(false);
    const [extension, setExtension] = useState<string>('');
    const [outputFileName, setOutputFileName] = useState('merged_data');
    const [includeHeaders, setIncludeHeaders] = useState(true);
    const [skipEmptyRows, setSkipEmptyRows] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (!uploadedFiles || uploadedFiles.length === 0) return;

        const newFiles: FileData[] = [];
        const firstFile = uploadedFiles[0];
        const ext = firstFile.name.substring(firstFile.name.lastIndexOf('.'));
        setExtension(ext);

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const data = await parseFile(file);
            if (data) {
                newFiles.push({
                    name: file.name,
                    data: data.data,
                    headers: data.headers,
                });
            }
        }

        setFiles((prev) => [...prev, ...newFiles]);

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const parseFile = (file: File): Promise<{ headers: string[]; data: any[][] } | null> => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target?.result;
                if (!data) {
                    resolve(null);
                    return;
                }

                let workbook;
                workbook = XLSX.read(data, { type: 'array' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

                if (jsonData.length === 0) {
                    resolve(null);
                    return;
                }

                const headers = (jsonData[0] as any[]).map((h) => String(h || ''));
                const rows = jsonData.slice(1);

                resolve({ headers, data: rows });
            };

            reader.readAsArrayBuffer(file);
        });
    };

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleMerge = () => {
        if (files.length === 0) {
            alert('Please upload at least one file!');
            return;
        }

        // Validate that all files have matching headers
        if (files.length > 1) {
            const firstFileHeaders = files[0].headers;
            const mismatchedFiles: string[] = [];

            for (let i = 1; i < files.length; i++) {
                const currentHeaders = files[i].headers;
                const headersMatch = JSON.stringify(currentHeaders) === JSON.stringify(firstFileHeaders);

                if (!headersMatch) {
                    mismatchedFiles.push(files[i].name);
                }
            }

            if (mismatchedFiles.length > 0) {
                const fileList = mismatchedFiles.join('\n• ');
                const proceed = window.confirm(
                    `⚠️ Column headers don't match!\n\n` +
                    `The following files have different column headers than "${files[0].name}":\n\n` +
                    `• ${fileList}\n\n` +
                    `First file headers: ${firstFileHeaders.join(', ')}\n\n` +
                    `This may result in misaligned data. Do you want to proceed anyway?`
                );

                if (!proceed) {
                    return;
                }
            }
        }

        setIsProcessing(true);

        setTimeout(() => {
            const merged: any[][] = [];
            let headers: string[] = [];

            files.forEach((file, index) => {
                if (index === 0) {
                    headers = file.headers;
                }

                // Add data rows
                file.data.forEach((row) => {
                    // Skip empty rows if option is selected
                    if (skipEmptyRows && row.every((cell) => !cell || String(cell).trim() === '')) {
                        return;
                    }
                    merged.push(row);
                });
            });

            setMergedHeaders(headers);
            setMergedData(merged);
            setProcessed(true);
            setIsProcessing(false);
        }, 100);
    };

    const handleReset = () => {
        setFiles([]);
        setMergedData([]);
        setMergedHeaders([]);
        setProcessed(false);
        setExtension('');
        setOutputFileName('merged_data');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDownload = () => {
        if (mergedData.length === 0) {
            alert('No merged data to download.');
            return;
        }

        // Create worksheet with headers and data
        const wsData = [mergedHeaders, ...mergedData];
        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Merged Data');

        const fileName = `${outputFileName}${extension || '.csv'}`;
        XLSX.writeFile(workbook, fileName);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">CSV/XLSX Merger</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Combine multiple CSV or XLSX files into a single file
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: File Upload */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24 z-10">
                        <Card className="bg-white shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-black">Upload Files</CardTitle>
                                <CardDescription>Select multiple files to merge</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <div className="p-3 bg-white rounded-full shadow-royal-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-black">Click to upload files</p>
                                    <p className="text-xs text-slate-500 mt-1">CSV, XLSX, XLS supported</p>
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".csv,.xlsx,.xls"
                                        multiple
                                        onChange={handleFileUpload}
                                    />
                                </div>

                                {files.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-black">Uploaded Files ({files.length})</h3>
                                            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-slate-500 hover:text-red-600 h-auto p-0 hover:bg-transparent">
                                                Clear All
                                            </Button>
                                        </div>
                                        <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <FileSpreadsheet className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-black truncate" title={file.name}>{file.name}</p>
                                                            <p className="text-xs text-slate-500">{file.data.length} rows</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 flex-shrink-0 rounded-full">
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Options & Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {files.length === 0 ? (
                            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30 h-[400px] flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Merge className="h-10 w-10 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No files uploaded</p>
                                    <p className="text-sm">Upload files on the left to merge them</p>
                                </div>
                            </Card>
                        ) : !processed ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="bg-white shadow-royal border-0">
                                    <CardHeader>
                                        <CardTitle className="text-black">Merge Options</CardTitle>
                                        <CardDescription>Configure how files should be merged</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="outputFileName" className="text-sm font-medium text-black">
                                                Output File Name
                                            </Label>
                                            <Input
                                                id="outputFileName"
                                                type="text"
                                                value={outputFileName}
                                                onChange={(e) => setOutputFileName(e.target.value)}
                                                placeholder="merged_data"
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="includeHeaders"
                                                    checked={includeHeaders}
                                                    onCheckedChange={(checked) => setIncludeHeaders(checked as boolean)}
                                                    className="rounded-none data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                />
                                                <Label htmlFor="includeHeaders" className="text-sm font-medium cursor-pointer text-black">
                                                    Include headers from first file only
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="skipEmptyRows"
                                                    checked={skipEmptyRows}
                                                    onCheckedChange={(checked) => setSkipEmptyRows(checked as boolean)}
                                                    className="rounded-none data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                />
                                                <Label htmlFor="skipEmptyRows" className="text-sm font-medium cursor-pointer text-black">
                                                    Skip empty rows
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button
                                                onClick={handleMerge}
                                                disabled={isProcessing}
                                                className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all"
                                            >
                                                {isProcessing ? 'Merging...' : 'Merge Files'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-blue-50/30 border border-blue-100">
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-semibold text-black flex items-center gap-2">
                                                <span className="text-blue-600">ℹ️</span>
                                                Instructions
                                            </h3>
                                            <ul className="space-y-2 text-sm text-slate-600">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-600 mt-0.5">•</span>
                                                    <span>Files will be merged in the order they are uploaded</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-600 mt-0.5">•</span>
                                                    <span>All files should have the same column structure for best results</span>
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
                        ) : (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-royal-lg">
                                    <CardContent className="p-12 text-center space-y-8">
                                        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-royal-lg mb-6">
                                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-black">Files Merged Successfully!</h3>
                                            <p className="text-lg text-gray-700 max-w-md mx-auto">
                                                Your files have been merged. You can now download the result.
                                            </p>
                                        </div>

                                        <div className="bg-white/50 rounded-lg p-6 space-y-2 max-w-md mx-auto">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Total files merged:</span>
                                                <span className="font-semibold text-black">{files.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Total rows:</span>
                                                <span className="font-semibold text-black">{mergedData.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Output file:</span>
                                                <span className="font-semibold text-black">{outputFileName}{extension || '.csv'}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                            <Button variant="outline" size="lg" onClick={() => setProcessed(false)} className="border-slate-200 hover:bg-white hover:text-blue-600">
                                                Back to Options
                                            </Button>
                                            <Button size="lg" onClick={handleDownload} className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white px-8">
                                                <Download className="h-5 w-5 mr-2" />
                                                Download Merged File
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {mergedData.length > 0 && (
                                    <Card className="bg-white shadow-royal border-0">
                                        <CardHeader>
                                            <CardTitle className="text-black">Preview</CardTitle>
                                            <CardDescription>First 10 rows of merged data</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="bg-blue-50">
                                                            {mergedHeaders.map((header, index) => (
                                                                <th key={index} className="border border-slate-200 px-4 py-2 text-left text-sm font-semibold text-black">
                                                                    {header}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {mergedData.slice(0, 10).map((row, rowIndex) => (
                                                            <tr key={rowIndex} className="hover:bg-slate-50">
                                                                {row.map((cell, cellIndex) => (
                                                                    <td key={cellIndex} className="border border-slate-200 px-4 py-2 text-sm text-slate-700">
                                                                        {String(cell || '')}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {mergedData.length > 10 && (
                                                    <p className="text-center text-sm text-slate-500 mt-4 italic">
                                                        ... and {mergedData.length - 10} more rows
                                                    </p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
