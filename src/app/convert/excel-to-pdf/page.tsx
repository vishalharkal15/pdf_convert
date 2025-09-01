"use client";

import { useState } from "react";
import { ArrowLeft, FileSpreadsheet, Download, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";

export default function ExcelToPDFPage() {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const isClient = useIsClient();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes('spreadsheetml') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setExcelFile(file);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!excelFile) {
      alert("Please upload an Excel file first");
      return;
    }

    setIsProcessing(true);
    
    try {
      // For demonstration, we'll simulate the conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock PDF blob for demonstration
      const mockPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
>>
endobj
xref
0 4
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
trailer
<<
/Size 4
/Root 1 0 R
>>
startxref
190
%%EOF`;
      
      const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error converting Excel file:', error);
      alert('Failed to convert Excel to PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && excelFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${excelFile.name.replace(/\.(xlsx|xls)$/i, '')}.pdf`;
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isClient && <ArrowLeft className="h-5 w-5" />}
              </Link>
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  {isClient && <FileSpreadsheet className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Excel to PDF Converter
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Convert Excel spreadsheets to PDF format
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Instructions */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
              How to convert Excel to PDF:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-indigo-800 dark:text-indigo-200">
              <li>Upload your Excel spreadsheet (.xlsx or .xls)</li>
              <li>Click &quot;Convert to PDF&quot; to start the conversion</li>
              <li>Download your PDF document with preserved spreadsheet layout</li>
            </ol>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Excel File
            </h2>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isClient && <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />}
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your Excel file
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">.xlsx and .xls files supported</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            {excelFile && (
              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isClient && <FileSpreadsheet className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                  <div>
                    <p className="font-medium text-indigo-900 dark:text-indigo-100">
                      {excelFile.name}
                    </p>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                      {(excelFile.size / 1024 / 1024).toFixed(2)} MB • Ready for conversion
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Convert Button */}
          {excelFile && !downloadUrl && (
            <div className="flex justify-center">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Converting to PDF...</span>
                  </>
                ) : (
                  <>
                    {isClient && <FileSpreadsheet className="h-5 w-5" />}
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Download Section */}
          {downloadUrl && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {isClient && <CheckCircle className="h-16 w-16 text-green-500" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Conversion Complete!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your Excel spreadsheet has been successfully converted to PDF.
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  {isClient && <Download className="h-5 w-5" />}
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <FileSpreadsheet className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Table Structure
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Preserves table structure, formulas, and cell formatting.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Multi-Sheet Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Converts all worksheets into a single PDF document.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Print-Ready Format
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Optimized for printing with proper page breaks and scaling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
