'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, FileSpreadsheet, X, Download, CheckCircle2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileData {
    name: string;
    data: any[];
    headers: string[];
}

export default function FileMergerPage() {
    const [files, setFiles] = useState<FileData[]>([]);
    const [includeHeaders, setIncludeHeaders] = useState(false);
    const [outputFormat, setOutputFormat] = useState<'csv' | 'xlsx'>('xlsx');
    const [processed, setProcessed] = useState(false);
    const [mergedData, setMergedData] = useState<any[]>([]);
    const [mergedHeaders, setMergedHeaders] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (!uploadedFiles || uploadedFiles.length === 0) return;

        const newFiles: FileData[] = [];

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

    const parseFile = (file: File): Promise<{ headers: string[]; data: any[] } | null> => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target?.result;
                if (!data) {
                    resolve(null);
                    return;
                }

                let workbook;
                if (file.name.endsWith('.csv')) {
                    workbook = XLSX.read(data, { type: 'array' });
                } else {
                    workbook = XLSX.read(data, { type: 'array' });
                }

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (jsonData.length === 0) {
                    resolve(null);
                    return;
                }

                const headers = (jsonData[0] as any[]).map((h) => String(h || ''));
                const rows = jsonData.slice(1).map((row: any) => {
                    const rowData: any = {};
                    headers.forEach((header, index) => {
                        rowData[header] = row[index] !== undefined ? row[index] : '';
                    });
                    return rowData;
                });

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

        // Collect all unique headers
        const allHeadersSet = new Set<string>();
        files.forEach(file => {
            file.headers.forEach(header => allHeadersSet.add(header));
        });
        const allHeaders = Array.from(allHeadersSet);

        // Merge data
        const merged: any[] = [];

        files.forEach((file, fileIndex) => {
            file.data.forEach((row) => {
                const newRow: any = {};
                allHeaders.forEach(header => {
                    newRow[header] = row[header] !== undefined ? row[header] : '';
                });
                merged.push(newRow);
            });
        });

        setMergedHeaders(allHeaders);
        setMergedData(merged);
        setProcessed(true);
    };

    const handleReset = () => {
        setFiles([]);
        setMergedData([]);
        setMergedHeaders([]);
        setProcessed(false);
        setIncludeHeaders(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(mergedData, { header: mergedHeaders });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Merged Data');

        const fileName = `merged_file.${outputFormat}`;
        XLSX.writeFile(workbook, fileName);
    };

    const totalRows = files.reduce((sum, file) => sum + file.data.length, 0);

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">File Merger</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Upload multiple CSV or XLSX files and merge them into a single file.
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
                                                            <p className="text-xs text-slate-500">{file.data.length} rows, {file.headers.length} columns</p>
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
                                        <Layers className="h-10 w-10 opacity-50" />
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
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                                                <Checkbox
                                                    id="include-headers"
                                                    checked={includeHeaders}
                                                    onCheckedChange={(checked) => setIncludeHeaders(checked as boolean)}
                                                    className="rounded-none data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                />
                                                <div className="flex-1">
                                                    <Label htmlFor="include-headers" className="text-sm font-medium cursor-pointer text-black">
                                                        Include headers from all files
                                                    </Label>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        If unchecked, only the first file's headers will be used
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-black">Output Format</Label>
                                                <RadioGroup value={outputFormat} onValueChange={(value) => setOutputFormat(value as 'csv' | 'xlsx')}>
                                                    <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-blue-400 transition-all cursor-pointer">
                                                        <RadioGroupItem value="xlsx" id="xlsx" />
                                                        <Label htmlFor="xlsx" className="flex-1 cursor-pointer text-sm text-gray-700">
                                                            Excel (.xlsx)
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-blue-400 transition-all cursor-pointer">
                                                        <RadioGroupItem value="csv" id="csv" />
                                                        <Label htmlFor="csv" className="flex-1 cursor-pointer text-sm text-gray-700">
                                                            CSV (.csv)
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-200">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                                    <p className="text-xs text-slate-600 mb-1">Total Files</p>
                                                    <p className="text-2xl font-bold text-blue-700">{files.length}</p>
                                                </div>
                                                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                                    <p className="text-xs text-slate-600 mb-1">Total Rows</p>
                                                    <p className="text-2xl font-bold text-green-700">{totalRows}</p>
                                                </div>
                                            </div>
                                            <Button onClick={handleMerge} className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all">
                                                <Layers className="h-5 w-5 mr-2" />
                                                Merge Files
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 animate-in fade-in zoom-in-95 duration-500 shadow-royal-lg">
                                <CardContent className="p-12 text-center space-y-8">
                                    <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-royal-lg mb-6">
                                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-bold text-black">Files Merged Successfully!</h3>
                                        <p className="text-lg text-gray-700 max-w-md mx-auto">
                                            Combined {files.length} files into a single file with {mergedData.length} rows and {mergedHeaders.length} columns.
                                        </p>
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
