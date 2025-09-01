"use client";

import { useState } from "react";
import { ArrowLeft, FileSpreadsheet, Download, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";

export default function PDFToExcelPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const isClient = useIsClient();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file first");
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('outputFormat', 'excel');

    try {
      const response = await fetch('/api/pdf/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to convert PDF to Excel');
      }
    } catch (error) {
      console.error('Error converting PDF:', error);
      alert('Failed to convert PDF to Excel');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && pdfFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${pdfFile.name.replace('.pdf', '')}.xlsx`;
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
                <div className="bg-green-600 p-2 rounded-lg">
                  {isClient && <FileSpreadsheet className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    PDF to Excel Converter
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extract tables and data from PDF to Excel spreadsheets
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
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              How to convert PDF to Excel:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-green-800 dark:text-green-200">
              <li>Upload your PDF file containing tables or data</li>
              <li>Click &quot;Convert to Excel&quot; to extract the data</li>
              <li>Download your Excel spreadsheet with organized data</li>
            </ol>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload PDF File
            </h2>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isClient && <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />}
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your PDF file
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF files with tables work best</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            {pdfFile && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isClient && <FileSpreadsheet className="h-6 w-6 text-green-600 dark:text-green-400" />}
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">
                      {pdfFile.name}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB • Ready for data extraction
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Convert Button */}
          {pdfFile && !downloadUrl && (
            <div className="flex justify-center">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Extracting Data...</span>
                  </>
                ) : (
                  <>
                    {isClient && <FileSpreadsheet className="h-5 w-5" />}
                    <span>Convert to Excel</span>
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
                  Data Extraction Complete!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your PDF data has been successfully converted to Excel format.
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  {isClient && <Download className="h-5 w-5" />}
                  <span>Download Excel File</span>
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <FileSpreadsheet className="h-6 w-6 text-green-600 dark:text-green-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Table Detection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automatically detects and extracts tables from PDF documents.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Data Integrity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Preserves data structure and formatting during conversion.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Excel Ready
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Output is compatible with Microsoft Excel and Google Sheets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
