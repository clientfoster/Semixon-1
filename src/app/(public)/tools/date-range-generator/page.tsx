'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Download, CheckCircle2, CalendarRange } from 'lucide-react';

export default function DateRangeGeneratorPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [outputFormat, setOutputFormat] = useState<'csv' | 'xlsx'>('csv');
    const [outputFileName, setOutputFileName] = useState('date_range');
    const [processed, setProcessed] = useState(false);
    const [generatedDates, setGeneratedDates] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const generateDateRange = (start: Date, end: Date): string[] => {
        const dates: string[] = [];
        const currentDate = new Date(start);

        while (currentDate <= end) {
            // Format as DD/MM/YYYY
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            dates.push(`${day}/${month}/${year}`);

            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const handleProcess = () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates!');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            alert('Start date must be before or equal to end date!');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            const dates = generateDateRange(start, end);
            setGeneratedDates(dates);
            setProcessed(true);
            setIsProcessing(false);
        }, 100);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setOutputFormat('csv');
        setOutputFileName('date_range');
        setProcessed(false);
        setGeneratedDates([]);
    };

    const handleDownload = () => {
        if (generatedDates.length === 0) {
            alert('No dates to download.');
            return;
        }

        // Create worksheet with header and dates
        const wsData = [['Date'], ...generatedDates.map(date => [date])];
        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Date Range');

        const extension = outputFormat === 'csv' ? '.csv' : '.xlsx';
        const fileName = `${outputFileName}${extension}`;

        XLSX.writeFile(workbook, fileName, { bookType: outputFormat });
    };

    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gradient-royal pb-1">Date Range Generator</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Generate a list of dates between a start and end date
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Date Selection */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24 z-10">
                        <Card className="bg-white shadow-royal border-0">
                            <CardHeader>
                                <CardTitle className="text-black">Select Date Range</CardTitle>
                                <CardDescription>Choose your start and end dates</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate" className="text-sm font-medium text-black">
                                        Start Date
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endDate" className="text-sm font-medium text-black">
                                        End Date
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="outputFileName" className="text-sm font-medium text-black">
                                        Output File Name
                                    </Label>
                                    <Input
                                        id="outputFileName"
                                        type="text"
                                        value={outputFileName}
                                        onChange={(e) => setOutputFileName(e.target.value)}
                                        placeholder="date_range"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-black">Output Format</Label>
                                    <RadioGroup value={outputFormat} onValueChange={(value) => setOutputFormat(value as 'csv' | 'xlsx')}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="csv" id="csv" />
                                            <Label htmlFor="csv" className="cursor-pointer text-black font-normal">CSV</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="xlsx" id="xlsx" />
                                            <Label htmlFor="xlsx" className="cursor-pointer text-black font-normal">XLSX</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {!processed && (
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleProcess}
                                            disabled={isProcessing || !startDate || !endDate}
                                            className="w-full btn-gradient-royal shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {isProcessing ? 'Processing...' : 'Generate Date Range'}
                                        </Button>
                                    </div>
                                )}

                                {processed && (
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleReset}
                                            variant="outline"
                                            className="w-full border-slate-200 hover:bg-slate-50"
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Options & Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {!startDate || !endDate ? (
                            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30 h-[400px] flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CalendarRange className="h-10 w-10 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No dates selected</p>
                                    <p className="text-sm">Select start and end dates on the left</p>
                                </div>
                            </Card>
                        ) : !processed ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="bg-white shadow-royal border-0">
                                    <CardHeader>
                                        <CardTitle className="text-black">Ready to Generate</CardTitle>
                                        <CardDescription>Click the button to generate your date range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="bg-blue-50/30 rounded-lg p-6 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Start Date:</span>
                                                <span className="font-semibold text-black">{startDate}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">End Date:</span>
                                                <span className="font-semibold text-black">{endDate}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Format:</span>
                                                <span className="font-semibold text-black">{outputFormat.toUpperCase()}</span>
                                            </div>
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
                                                    <span>Dates will be generated in DD/MM/YYYY format</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-600 mt-0.5">•</span>
                                                    <span>Both start and end dates are included in the range</span>
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
                                            <h3 className="text-3xl font-bold text-black">Date Range Generated!</h3>
                                            <p className="text-lg text-gray-700 max-w-md mx-auto">
                                                Your date range has been generated. You can now download the file.
                                            </p>
                                        </div>

                                        <div className="bg-white/50 rounded-lg p-6 space-y-2 max-w-md mx-auto">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Start Date:</span>
                                                <span className="font-semibold text-black">{startDate}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">End Date:</span>
                                                <span className="font-semibold text-black">{endDate}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Total Dates:</span>
                                                <span className="font-semibold text-black">{generatedDates.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Output file:</span>
                                                <span className="font-semibold text-black">{outputFileName}.{outputFormat}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                            <Button variant="outline" size="lg" onClick={handleReset} className="border-slate-200 hover:bg-white hover:text-blue-600">
                                                Generate New Range
                                            </Button>
                                            <Button size="lg" onClick={handleDownload} className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all text-white px-8">
                                                <Download className="h-5 w-5 mr-2" />
                                                Download File
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {generatedDates.length > 0 && (
                                    <Card className="bg-white shadow-royal border-0">
                                        <CardHeader>
                                            <CardTitle className="text-black">Preview</CardTitle>
                                            <CardDescription>First 10 dates of generated range</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="bg-blue-50">
                                                            <th className="border border-slate-200 px-4 py-2 text-left text-sm font-semibold text-black">
                                                                Date
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {generatedDates.slice(0, 10).map((date, index) => (
                                                            <tr key={index} className="hover:bg-slate-50">
                                                                <td className="border border-slate-200 px-4 py-2 text-sm text-slate-700">
                                                                    {date}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {generatedDates.length > 10 && (
                                                    <p className="text-center text-sm text-slate-500 mt-4 italic">
                                                        ... and {generatedDates.length - 10} more dates
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
