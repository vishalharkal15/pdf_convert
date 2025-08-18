"use client";

import { useState } from "react";
import { ArrowLeft, Merge, Download, FileText, GripVertical } from "lucide-react";
import Link from "next/link";
import { PDFUploader } from "@/components/PDFUploader";

export default function MergePage() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      alert("Please upload at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData();
    pdfFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/pdf/merge', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged-document.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to merge PDFs');
      }
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs');
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
                <div className="bg-green-500 p-2 rounded-lg">
                  <Merge className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Merge PDFs
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Combine multiple PDF files into one document
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
              How to merge PDFs:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
              <li>Upload the PDF files you want to merge</li>
              <li>Drag and drop to reorder the files as needed</li>
              <li>Click &quot;Merge PDFs&quot; to combine them into one document</li>
              <li>Download your merged PDF file</li>
            </ol>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload PDF Files
            </h2>
            <PDFUploader onFilesUploaded={setPdfFiles} />
          </div>

          {/* File List */}
          {pdfFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Files to Merge ({pdfFiles.length})
              </h3>
              <div className="space-y-3">
                {pdfFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                    <FileText className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Page {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleMerge}
                  disabled={isProcessing || pdfFiles.length < 2}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Merging PDFs...</span>
                    </>
                  ) : (
                    <>
                      <Merge className="h-5 w-5" />
                      <span>Merge PDFs</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                <Merge className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Easy Merging
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Simply drag and drop your PDF files to combine them into one document.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Maintain Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your PDF quality is preserved during the merging process.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
                <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quick Download
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download your merged PDF instantly after processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
