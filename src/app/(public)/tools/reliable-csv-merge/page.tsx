'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet, X, Download, CheckCircle2, Table } from 'lucide-react';

interface FileData {
    name: string;
    data: any[][];
    headers: string[];
}

export default function ReliableCSVMergePage() {
    const [files, setFiles] = useState<FileData[]>([]);
    const [processedData, setProcessedData] = useState<any[][]>([]);
    const [processedHeaders, setProcessedHeaders] = useState<string[]>([]);
    const [processed, setProcessed] = useState(false);
    const [groupColumn, setGroupColumn] = useState<string>('');
    const [repeatColumns, setRepeatColumns] = useState<string[]>([]);
    const [extension, setExtension] = useState<string>('.csv');
    const [outputFileName, setOutputFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (!uploadedFiles || uploadedFiles.length === 0) return;

        const file = uploadedFiles[0];
        const ext = file.name.substring(file.name.lastIndexOf('.'));
        const baseName = file.name.substring(0, file.name.lastIndexOf('.'));
        setExtension(ext);
        setOutputFileName(`${baseName}_processed`);

        try {
            const data = await parseFile(file);
            if (data) {
                setFiles([{
                    name: file.name,
                    data: data.data,
                    headers: data.headers,
                }]);
                
                // Auto-select first column as group column if available
                if (data.headers.length > 0) {
                    setGroupColumn(data.headers[0]);
                }
            }
        } catch (error) {
            console.error('Error parsing file:', error);
            alert('Error parsing file. Please make sure it\'s a valid CSV file.');
        }

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

                try {
                    // Use XLSX to parse CSV files
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    
                    // Convert to JSON array format
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

                    if (jsonData.length === 0) {
                        resolve(null);
                        return;
                    }

                    // Clean and process headers
                    const headers = (jsonData[0] as any[]).map((h) => String(h || '').trim());
                    const rows = jsonData.slice(1).map((row: any[]) => 
                        row.map((cell: any) => String(cell || '').trim())
                    );

                    resolve({ headers, data: rows });
                } catch (error) {
                    console.error('XLSX parsing error:', error);
                    resolve(null);
                }
            };

            reader.readAsArrayBuffer(file);
        });
    };

    const removeFile = () => {
        setFiles([]);
        setGroupColumn('');
        setRepeatColumns([]);
    };

    const toggleRepeatColumn = (column: string) => {
        setRepeatColumns(prev => {
            if (prev.includes(column)) {
                return prev.filter(c => c !== column);
            } else {
                return [...prev, column];
            }
        });
    };

    const handleMerge = () => {
        if (files.length === 0) {
            alert('Please upload a file first!');
            return;
        }

        if (!groupColumn) {
            alert('Please select a group column!');
            return;
        }

        if (repeatColumns.length === 0) {
            alert('Please select at least one column to repeat!');
            return;
        }

        const file = files[0];
        
        // Create mapping from headers to indices
        const headerMap: Record<string, number> = {};
        file.headers.forEach((header, index) => {
            headerMap[header] = index;
        });

        // Group data by the selected group column
        const grouped: Record<string, any[]> = {};
        
        file.data.forEach(row => {
            const groupValue = row[headerMap[groupColumn]] || '';
            if (!grouped[groupValue]) {
                grouped[groupValue] = [];
            }

            const entry: Record<string, any> = {};
            repeatColumns.forEach(col => {
                entry[col] = row[headerMap[col]] ?? '';
            });
            grouped[groupValue].push(entry);
        });

        // Find maximum number of repeats
        const max = Math.max(...Object.values(grouped).map(v => v.length));

        // Create headers for the merged data
        const outHeaders = [groupColumn];
        for (let i = 1; i <= max; i++) {
            repeatColumns.forEach(col => {
                outHeaders.push(`Director ${i} ${col}`);
            });
        }

        // Create merged data rows
        const csvRows: string[][] = [outHeaders];
        const tableRows: any[][] = [];

        Object.entries(grouped).forEach(([key, list]) => {
            const row: string[] = [key];
            
            // Add repeated columns
            list.forEach(obj => {
                repeatColumns.forEach(col => {
                    row.push(obj[col]);
                });
            });

            // Fill remaining slots with empty values
            while (row.length < outHeaders.length) {
                row.push('');
            }

            csvRows.push(row);
            tableRows.push([...row]); // Create copy for table display
        });

        // Set processed data
        setProcessedHeaders(outHeaders);
        setProcessedData(tableRows);
        setProcessed(true);
    };

    const handleReset = () => {
        setFiles([]);
        setProcessedData([]);
        setProcessedHeaders([]);
        setProcessed(false);
        setGroupColumn('');
        setRepeatColumns([]);
        setExtension('.csv');
        setOutputFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDownload = () => {
        if (processedData.length === 0) {
            alert('No processed data to download.');
            return;
        }

        // Create worksheet with headers and data
        const wsData = [processedHeaders, ...processedData];
        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Merged Data');

        const fileName = `${outputFileName}${extension}`;
        XLSX.writeFile(workbook, fileName);
    };

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">Reliable CSV Merge Tool</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Group CSV data by company and merge director information with proper column repetition
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: File Upload */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24 z-10">
                        <Card className="bg-white shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-black">Upload File</CardTitle>
                                <CardDescription>Upload your CSV file to merge</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <div className="p-3 bg-white rounded-full shadow-royal-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-black">Click to upload file</p>
                                    <p className="text-xs text-slate-500 mt-1">CSV files only</p>
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                    />
                                </div>

                                {files.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-black">Uploaded File</h3>
                                            <Button variant="ghost" size="sm" onClick={removeFile} className="text-xs text-slate-500 hover:text-red-600 h-auto p-0 hover:bg-transparent">
                                                Clear
                                            </Button>
                                        </div>
                                        <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <FileSpreadsheet className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-black truncate" title={files[0].name}>{files[0].name}</p>
                                                    <p className="text-xs text-slate-500">{files[0].data.length} rows × {files[0].headers.length} columns</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>


                    </div>

                    {/* Right Column: Preview & Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {files.length === 0 ? (
                            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30 h-[400px] flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Table className="h-10 w-10 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No file uploaded</p>
                                    <p className="text-sm">Upload a CSV file to get started</p>
                                </div>
                            </Card>
                        ) : !processed ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                <Card className="bg-white shadow-royal border-0">
                                    <CardHeader>
                                        <CardTitle className="text-black">Column Configuration</CardTitle>
                                        <CardDescription>Select grouping and repeat columns</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-sm font-medium text-black mb-2 block">
                                                    Group By Column
                                                </Label>
                                                <Select value={groupColumn} onValueChange={setGroupColumn}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select group column" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {files[0].headers.map((header) => (
                                                            <SelectItem key={header} value={header}>
                                                                {header}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-black mb-2 block">
                                                    Columns to Repeat
                                                </Label>
                                                <div className="space-y-2 max-h-60 overflow-y-auto p-3 border border-slate-200 rounded-md bg-white">
                                                    {files[0].headers
                                                        .filter(header => header !== groupColumn)
                                                        .map((header) => (
                                                            <div key={header} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded transition-colors">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`repeat-${header}`}
                                                                    checked={repeatColumns.includes(header)}
                                                                    onChange={() => toggleRepeatColumn(header)}
                                                                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                                />
                                                                <Label 
                                                                    htmlFor={`repeat-${header}`} 
                                                                    className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                                                                >
                                                                    {header}
                                                                </Label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <p className="text-xs text-slate-500 mt-2">
                                                    {repeatColumns.length} column(s) selected
                                                </p>
                                            </div>

                                            <div>
                                                <Label htmlFor="outputFileName" className="text-sm font-medium text-black mb-2 block">
                                                    Output File Name
                                                </Label>
                                                <Input
                                                    id="outputFileName"
                                                    type="text"
                                                    value={outputFileName}
                                                    onChange={(e) => setOutputFileName(e.target.value)}
                                                    placeholder="filename_processed"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-royal border-0">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-black">Configuration Summary</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="bg-slate-50 p-3 rounded-lg">
                                                    <p className="text-slate-500">Group Column</p>
                                                    <p className="font-medium text-black">{groupColumn || 'Not selected'}</p>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-lg">
                                                    <p className="text-slate-500">Repeat Columns</p>
                                                    <p className="font-medium text-black">{repeatColumns.length} selected</p>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-lg">
                                                    <p className="text-slate-500">Output Format</p>
                                                    <p className="font-medium text-black">{extension.toUpperCase()}</p>
                                                </div>
                                            </div>
                                            
                                            <Button
                                                onClick={handleMerge}
                                                disabled={!groupColumn || repeatColumns.length === 0}
                                                className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all mt-4"
                                            >
                                                Merge Data
                                            </Button>
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
                                            <h3 className="text-3xl font-bold text-black">Data Merged Successfully!</h3>
                                            <p className="text-lg text-gray-700 max-w-md mx-auto">
                                                Your data has been grouped and merged. You can now download the result.
                                            </p>
                                        </div>

                                        <div className="bg-white/50 rounded-lg p-6 space-y-2 max-w-md mx-auto">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Original rows:</span>
                                                <span className="font-semibold text-black">{files[0].data.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Unique groups:</span>
                                                <span className="font-semibold text-black">{processedData.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Max repeats:</span>
                                                <span className="font-semibold text-black">
                                                    {Math.max(...Object.values(
                                                        files[0].data.reduce((acc: Record<string, number>, row) => {
                                                            const groupValue = row[files[0].headers.indexOf(groupColumn)];
                                                            acc[groupValue] = (acc[groupValue] || 0) + 1;
                                                            return acc;
                                                        }, {})
                                                    ))}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Output file:</span>
                                                <span className="font-semibold text-black">{outputFileName}{extension}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                            <Button variant="outline" size="lg" onClick={() => setProcessed(false)} className="border-slate-200 hover:bg-white hover:text-blue-600">
                                                Back to Configuration
                                            </Button>
                                            <Button size="lg" onClick={handleDownload} className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white px-8">
                                                <Download className="h-5 w-5 mr-2" />
                                                Download Merged File
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {processedData.length > 0 && (
                                    <Card className="bg-white shadow-royal border-0">
                                        <CardHeader>
                                            <CardTitle className="text-black">Result Preview</CardTitle>
                                            <CardDescription>First 10 rows of merged data</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="bg-blue-50">
                                                            {processedHeaders.map((header, index) => (
                                                                <th key={index} className="border border-slate-200 px-4 py-2 text-left text-sm font-semibold text-black whitespace-nowrap">
                                                                    {header}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {processedData.slice(0, 10).map((row, rowIndex) => (
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
                                                {processedData.length > 10 && (
                                                    <p className="text-center text-sm text-slate-500 mt-4 italic">
                                                        ... and {processedData.length - 10} more rows
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