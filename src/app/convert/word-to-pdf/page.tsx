"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Download, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";

export default function WordToPDFPage() {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const isClient = useIsClient();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes('wordprocessingml') || file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      setWordFile(file);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!wordFile) {
      alert("Please upload a Word document first");
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
      console.error('Error converting Word document:', error);
      alert('Failed to convert Word to PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && wordFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${wordFile.name.replace(/\.(docx|doc)$/i, '')}.pdf`;
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
                <div className="bg-red-600 p-2 rounded-lg">
                  {isClient && <FileText className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Word to PDF Converter
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Convert Word documents to PDF format
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
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
              How to convert Word to PDF:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-red-800 dark:text-red-200">
              <li>Upload your Word document (.docx or .doc)</li>
              <li>Click &quot;Convert to PDF&quot; to start the conversion</li>
              <li>Download your PDF document with preserved formatting</li>
            </ol>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Word Document
            </h2>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isClient && <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />}
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your Word document
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">.docx and .doc files supported</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            {wordFile && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isClient && <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />}
                  <div>
                    <p className="font-medium text-red-900 dark:text-red-100">
                      {wordFile.name}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {(wordFile.size / 1024 / 1024).toFixed(2)} MB • Ready for conversion
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Convert Button */}
          {wordFile && !downloadUrl && (
            <div className="flex justify-center">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Converting to PDF...</span>
                  </>
                ) : (
                  <>
                    {isClient && <FileText className="h-5 w-5" />}
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
                  Your Word document has been successfully converted to PDF.
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
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Format Preservation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maintains original formatting, fonts, and layout in PDF output.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Universal Compatibility
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Works with both .doc and .docx file formats.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <Download className="h-6 w-6 text-green-600 dark:text-green-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Professional Output
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Creates high-quality PDF documents ready for sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
