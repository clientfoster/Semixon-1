import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    FileSpreadsheet,
    Mail,
    Merge,
    Scissors,
    Sparkles,
    FileText,
    ArrowRight
} from 'lucide-react';

const tools = [
    {
        name: 'Column Selector',
        description: 'Select and extract specific columns from your CSV or Excel files. Perfect for data filtering and creating focused datasets.',
        icon: FileSpreadsheet,
        href: '/tools/column-selector',
        color: 'from-blue-500 to-cyan-500',
        features: ['Multi-column selection', 'CSV & Excel support', 'Instant preview', 'Download filtered data']
    },
    {
        name: 'Category Divider',
        description: 'Split your CSV files into multiple files based on category values. Organize large datasets by grouping similar data.',
        icon: Scissors,
        href: '/tools/category-divider',
        color: 'from-purple-500 to-pink-500',
        features: ['Category-based splitting', 'Multiple output files', 'Automatic grouping', 'ZIP download']
    },
    {
        name: 'CSV/XLSX Merger',
        description: 'Combine multiple CSV or Excel files into a single unified file. Merge data from different sources seamlessly.',
        icon: Merge,
        href: '/tools/csv-merger',
        color: 'from-green-500 to-emerald-500',
        features: ['Multi-file merging', 'Header validation', 'Format preservation', 'Skip empty rows']
    },
    {
        name: 'Email Extractor',
        description: 'Extract and validate email addresses from text files. Get a clean, deduplicated list of all emails found.',
        icon: Mail,
        href: '/tools/email-extractor',
        color: 'from-orange-500 to-red-500',
        features: ['RFC-compliant validation', 'Auto deduplication', 'Sorted output', 'TXT file support']
    },
    {
        name: 'Email Generator',
        description: 'Generate email addresses from CSV name data with 24+ format patterns. Create bulk email lists for your contacts.',
        icon: Sparkles,
        href: '/tools/email-generator',
        color: 'from-indigo-500 to-purple-500',
        features: ['24+ email formats', 'Custom domains', 'Bulk generation', 'Pattern selection']
    },
    {
        name: 'File Splitter',
        description: 'Split large CSV files into smaller, manageable chunks. Perfect for processing large datasets in smaller batches.',
        icon: FileText,
        href: '/tools/file-splitter',
        color: 'from-teal-500 to-cyan-500',
        features: ['Custom row count', 'Multiple output files', 'Header preservation', 'ZIP download']
    },
    {
        name: 'Data Cleaner',
        description: 'Remove blank rows and empty columns from your CSV files. Clean and optimize your data for better analysis.',
        icon: Sparkles,
        href: '/tools/data-cleaner',
        color: 'from-pink-500 to-rose-500',
        features: ['Remove blank rows', 'Remove empty columns', 'Cleaning statistics', 'Data optimization']
    }
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-slate-50 bg-royal-pattern-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-gradient-royal pb-1">
                        🛠️ Data Processing Tools
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Professional tools for CSV and Excel file manipulation. All processing happens locally in your browser - your data never leaves your computer.
                    </p>
                </div>

                {/* Features Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-royal-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">100%</div>
                            <div className="text-blue-100">Client-Side Processing</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">7</div>
                            <div className="text-blue-100">Powerful Tools</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">Free</div>
                            <div className="text-blue-100">No Registration Required</div>
                        </div>
                    </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Card
                                key={tool.href}
                                className="bg-white border-0 shadow-royal hover:shadow-royal-lg transition-all duration-300 hover:-translate-y-1 group"
                            >
                                <CardHeader>
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-7 w-7 text-white" />
                                    </div>
                                    <CardTitle className="text-xl text-black group-hover:text-blue-600 transition-colors">
                                        {tool.name}
                                    </CardTitle>
                                    <CardDescription className="text-slate-600">
                                        {tool.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        {tool.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href={tool.href}>
                                        <Button className="w-full btn-gradient-royal group-hover:shadow-lg transition-all">
                                            Open Tool
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Info Section */}
                <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 shadow-royal">
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">🔒 Privacy First</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    All tools process your data entirely in your browser. Your files never leave your computer,
                                    ensuring complete privacy and security. No uploads, no servers, no tracking.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">⚡ Fast & Efficient</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Built with modern web technologies for lightning-fast performance. Process large files
                                    quickly and efficiently without any server delays or file size restrictions.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">🎯 Easy to Use</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Simple, intuitive interfaces designed for everyone. No technical knowledge required -
                                    just upload your file, configure your options, and download the results.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">💼 Professional Quality</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Enterprise-grade tools built for professionals. Handle complex data processing tasks
                                    with confidence, from simple column selection to advanced email generation.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA Section */}
                <div className="text-center space-y-4 py-8">
                    <h2 className="text-3xl font-bold text-black">Ready to get started?</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose a tool above and start processing your data in seconds. No sign-up required.
                    </p>
                </div>
            </div>
        </div>
    );
}
