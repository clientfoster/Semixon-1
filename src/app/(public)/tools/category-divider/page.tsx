'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet, X, Download, RefreshCw, CheckCircle2, Split } from 'lucide-react';

interface FileData {
    name: string;
    data: any[];
    headers: string[];
}

interface CategoryData {
    data: any[];
    headers: string[];
    originalFile: string;
}

export default function CategoryDividerPage() {
    const [files, setFiles] = useState<FileData[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<Record<number, string>>({});
    const [processed, setProcessed] = useState(false);
    const [extension, setExtension] = useState<string>('');
    const [categoriesData, setCategoriesData] = useState<Record<string, CategoryData>>({});
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

        setSelectedColumns((prev) => {
            const newSelected: Record<number, string> = {};
            // Re-index remaining selections
            Object.keys(prev).forEach((key) => {
                const keyNum = parseInt(key);
                if (keyNum < index) {
                    newSelected[keyNum] = prev[keyNum];
                } else if (keyNum > index) {
                    newSelected[keyNum - 1] = prev[keyNum];
                }
            });
            return newSelected;
        });
    };

    const handleColumnSelect = (fileIndex: number, column: string) => {
        setSelectedColumns((prev) => ({
            ...prev,
            [fileIndex]: column,
        }));
    };

    const handleProcess = () => {
        // Check if at least one category column is selected
        const hasSelection = Object.keys(selectedColumns).length > 0;
        if (!hasSelection) {
            alert('Please select a category column for at least one file!');
            return;
        }

        const newCategoriesData: Record<string, CategoryData> = {};

        files.forEach((file, index) => {
            const selectedColumn = selectedColumns[index];
            if (!selectedColumn) return;

            const fileName = file.name.replace(/\.[^/.]+$/, "");

            file.data.forEach((row) => {
                const category = row[selectedColumn] || 'Uncategorized';
                // Sanitize category for filename safety
                const safeCategory = String(category).replace(/[^a-z0-9_\-]/gi, '_');
                const key = `${fileName}_${safeCategory}`;

                if (!newCategoriesData[key]) {
                    newCategoriesData[key] = {
                        data: [],
                        headers: file.headers,
                        originalFile: fileName,
                    };
                }
                newCategoriesData[key].data.push(row);
            });
        });

        setCategoriesData(newCategoriesData);
        setProcessed(true);
    };

    const handleReset = () => {
        setFiles([]);
        setSelectedColumns({});
        setCategoriesData({});
        setProcessed(false);
        setExtension('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDownload = async () => {
        const zip = new JSZip();

        for (const [key, categoryInfo] of Object.entries(categoriesData)) {
            const fileName = `${key}${extension === '.csv' ? '.csv' : '.xlsx'}`;

            const worksheet = XLSX.utils.json_to_sheet(categoryInfo.data, { header: categoryInfo.headers });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            if (extension === '.csv') {
                const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
                zip.file(fileName, csvOutput);
            } else {
                const excelOutput = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                zip.file(fileName, excelOutput);
            }
        }

        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'divided_files.zip';
        link.click();
    };

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">Category Divider</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Upload files and split them into multiple files based on a category column.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: File Upload */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24 z-10">
                        <Card className="card-gradient-royal shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-slate-800">Upload Files</CardTitle>
                                <CardDescription>Select one or multiple files to split</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <div className="p-3 bg-white rounded-full shadow-royal-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-900">Click to upload files</p>
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
                                            <h3 className="text-sm font-medium text-slate-900">Uploaded Files ({files.length})</h3>
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
                                                            <p className="text-sm font-medium text-slate-900 truncate" title={file.name}>{file.name}</p>
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
                                        <FileSpreadsheet className="h-10 w-10 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No files uploaded</p>
                                    <p className="text-sm">Upload files on the left to see options</p>
                                </div>
                            </Card>
                        ) : !processed ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-royal border border-slate-100">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Select Category Column</h2>
                                        <p className="text-sm text-slate-500 mt-1">Choose the column to split by for each file</p>
                                    </div>
                                    <Button onClick={handleProcess} className="btn-gradient-royal shadow-lg hover:shadow-xl transition-all">
                                        Split Files
                                    </Button>
                                </div>

                                <div className="grid gap-6">
                                    {files.map((file, fileIndex) => (
                                        <Card key={fileIndex} className="card-gradient-royal shadow-sm hover:shadow-md transition-all duration-200 border-0">
                                            <CardHeader className="pb-4 border-b border-slate-100 bg-white/50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Label className="font-semibold text-base text-slate-800">
                                                            {file.name}
                                                        </Label>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="max-w-md">
                                                    <Label className="mb-2 block text-sm text-slate-500">
                                                        Choose which column contains the categories to split this file by
                                                    </Label>
                                                    <Select
                                                        value={selectedColumns[fileIndex] || ''}
                                                        onValueChange={(value) => handleColumnSelect(fileIndex, value)}
                                                    >
                                                        <SelectTrigger className="w-full border-slate-200 focus:ring-blue-500">
                                                            <SelectValue placeholder="Select a column" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {file.headers.map((header) => (
                                                                <SelectItem key={header} value={header}>
                                                                    {header}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-royal-lg">
                                    <CardContent className="p-12 text-center space-y-8">
                                        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-royal-lg mb-6">
                                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-slate-900">Files Split Successfully!</h3>
                                            <p className="text-lg text-slate-600 mt-2">
                                                Created {Object.keys(categoriesData).length} separate files based on categories.
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                            <Button variant="outline" size="lg" onClick={() => setProcessed(false)} className="border-slate-200 hover:bg-white hover:text-blue-600">
                                                Back to Selection
                                            </Button>
                                            <Button size="lg" onClick={handleDownload} className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white px-8">
                                                <Download className="h-5 w-5 mr-2" />
                                                Download ZIP
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(categoriesData).map(([name, data]) => (
                                        <Card key={name} className="card-gradient-royal border-0 hover:shadow-royal transition-all duration-300">
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="p-2 bg-blue-50 rounded-lg">
                                                        <Split className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-slate-900 truncate" title={name}>{name}</p>
                                                        <p className="text-xs text-slate-500">{data.data.length} rows</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
