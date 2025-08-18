"use client";

import { useState } from "react";
import { ArrowLeft, Scissors, Download, FileText, Upload } from "lucide-react";
import Link from "next/link";

export default function SplitPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [splitOptions, setSplitOptions] = useState<"pages" | "range">("pages");
  const [pageNumbers, setPageNumbers] = useState("");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handleSplit = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file first");
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('splitType', splitOptions);
    
    if (splitOptions === "pages") {
      formData.append('pageNumbers', pageNumbers);
    } else {
      formData.append('startPage', startPage.toString());
      formData.append('endPage', endPage.toString());
    }

    try {
      const response = await fetch('/api/pdf/split', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `split-${pdfFile.name}`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to split PDF');
      }
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Failed to split PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Split PDF
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extract specific pages from your PDF document
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
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              How to split PDFs:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
              <li>Upload the PDF file you want to split</li>
              <li>Choose how you want to split: by specific pages or page range</li>
              <li>Enter the page numbers or range</li>
              <li>Click &quot;Split PDF&quot; to extract the pages</li>
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
                  <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your PDF file
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
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
                  <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">
                      {pdfFile.name}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Split Options */}
          {pdfFile && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Split Options
              </h3>
              
              <div className="space-y-6">
                {/* Split Type Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Choose split method:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        splitOptions === "pages"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => setSplitOptions("pages")}
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Specific Pages
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Extract specific page numbers
                      </p>
                    </div>
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        splitOptions === "range"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => setSplitOptions("range")}
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Page Range
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Extract a continuous range of pages
                      </p>
                    </div>
                  </div>
                </div>

                {/* Page Input */}
                {splitOptions === "pages" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Page Numbers (comma-separated, e.g., 1,3,5-7)
                    </label>
                    <input
                      type="text"
                      value={pageNumbers}
                      onChange={(e) => setPageNumbers(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 1,3,5-7"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Page
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={startPage}
                        onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Page
                      </label>
                      <input
                        type="number"
                        min={startPage}
                        value={endPage}
                        onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleSplit}
                    disabled={isProcessing}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Splitting PDF...</span>
                      </>
                    ) : (
                      <>
                        <Scissors className="h-5 w-5" />
                        <span>Split PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                <Scissors className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Precise Splitting
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Extract exactly the pages you need with flexible options.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quality Preserved
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Original formatting and quality are maintained in split files.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
                <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Instant Download
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download your split PDF files immediately after processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
