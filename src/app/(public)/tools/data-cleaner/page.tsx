'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, CheckCircle2 } from 'lucide-react';

export default function DataCleanerPage() {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [cleanedHeaders, setCleanedHeaders] = useState<string[]>([]);
    const [cleanedData, setCleanedData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState('');
    const [originalFileName, setOriginalFileName] = useState('');
    const [removeBlankRows, setRemoveBlankRows] = useState(true);
    const [removeEmptyColumns, setRemoveEmptyColumns] = useState(true);
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
        setShowResults(false);

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

    const handleClean = () => {
        if (csvData.length === 0) {
            alert('No data to clean');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            let newData = [...csvData];
            let newHeaders = [...csvHeaders];

            // Remove blank rows
            if (removeBlankRows) {
                newData = newData.filter(row => row.some(cell => cell.trim() !== ''));
            }

            // Remove empty columns
            if (removeEmptyColumns) {
                const nonEmptyColumns: number[] = [];
                for (let colIndex = 0; colIndex < newHeaders.length; colIndex++) {
                    let hasData = false;
                    for (let rowIndex = 0; rowIndex < newData.length; rowIndex++) {
                        if (newData[rowIndex][colIndex] && newData[rowIndex][colIndex].trim() !== '') {
                            hasData = true;
                            break;
                        }
                    }
                    if (hasData) {
                        nonEmptyColumns.push(colIndex);
                    }
                }

                newHeaders = nonEmptyColumns.map(index => newHeaders[index]);
                newData = newData.map(row => nonEmptyColumns.map(index => row[index]));
            }

            setCleanedHeaders(newHeaders);
            setCleanedData(newData);
            setShowResults(true);
            setIsProcessing(false);
        }, 500);
    };

    const handleDownload = () => {
        const headerRow = cleanedHeaders.join(',');
        const dataRows = cleanedData.map(row => row.join(',')).join('\n');
        const csvContent = headerRow + '\n' + dataRows;

        const downloadFileName = `${originalFileName}_cleaned.csv`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const originalRows = csvData.length;
    const originalColumns = csvHeaders.length;
    const rowsRemoved = originalRows - cleanedData.length;
    const columnsRemoved = originalColumns - cleanedHeaders.length;

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">🧹 CSV Data Cleaner</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Remove blank rows and empty columns from your CSV files
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <Card className="bg-white shadow-royal border-0">
                        <CardHeader>
                            <CardTitle className="text-black">Upload CSV File</CardTitle>
                            <CardDescription>Select a CSV file to clean</CardDescription>
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

                    {csvData.length > 0 && (
                        <Card className="bg-white shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-black">Cleaning Options</CardTitle>
                                <CardDescription>Choose which cleaning operations to apply</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="removeBlankRows"
                                            checked={removeBlankRows}
                                            onChange={(e) => setRemoveBlankRows(e.target.checked)}
                                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <Label htmlFor="removeBlankRows" className="cursor-pointer">
                                            Remove rows with any empty cells
                                        </Label>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="removeEmptyColumns"
                                            checked={removeEmptyColumns}
                                            onChange={(e) => setRemoveEmptyColumns(e.target.checked)}
                                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <Label htmlFor="removeEmptyColumns" className="cursor-pointer">
                                            Remove completely empty columns
                                        </Label>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleClean}
                                    disabled={isProcessing}
                                    className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all"
                                >
                                    {isProcessing ? 'Cleaning...' : 'Clean Data'}
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
                                            <h3 className="text-2xl font-bold text-black">Data Cleaned!</h3>
                                            <p className="text-slate-600">Ready to download</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleDownload}
                                        className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white"
                                    >
                                        <Download className="h-5 w-5 mr-2" />
                                        Download Cleaned CSV
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-slate-700 mb-2">Rows</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>Original:</span>
                                                <span className="font-semibold">{originalRows}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Removed:</span>
                                                <span className="font-semibold text-red-600">{rowsRemoved}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Final:</span>
                                                <span className="font-semibold text-green-600">{cleanedData.length}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-slate-700 mb-2">Columns</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>Original:</span>
                                                <span className="font-semibold">{originalColumns}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Removed:</span>
                                                <span className="font-semibold text-red-600">{columnsRemoved}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Final:</span>
                                                <span className="font-semibold text-green-600">{cleanedHeaders.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
