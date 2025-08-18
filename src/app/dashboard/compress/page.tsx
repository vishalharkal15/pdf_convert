"use client";

import { useState } from "react";
import { ArrowLeft, Minimize, Download, FileText, Upload, Info } from "lucide-react";
import Link from "next/link";

export default function CompressPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<{
    originalSize: number;
    compressedSize: number;
    reductionPercentage: number;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setCompressionResult(null);
    }
  };

  const handleCompress = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file first");
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('compressionLevel', compressionLevel);

    try {
      const response = await fetch('/api/pdf/compress', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        
        // Calculate compression stats
        const originalSize = pdfFile.size;
        const compressedSize = blob.size;
        const reductionPercentage = Math.round(((originalSize - compressedSize) / originalSize) * 100);
        
        setCompressionResult({
          originalSize,
          compressedSize,
          reductionPercentage
        });

        // Download the compressed file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compressed-${pdfFile.name}`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to compress PDF');
      }
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Failed to compress PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Minimize className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Compress PDF
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Reduce your PDF file size while maintaining quality
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
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
              How to compress PDFs:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-purple-800 dark:text-purple-200">
              <li>Upload the PDF file you want to compress</li>
              <li>Choose your preferred compression level</li>
              <li>Click &quot;Compress PDF&quot; to reduce the file size</li>
              <li>Download your compressed PDF file</li>
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
                      {formatFileSize(pdfFile.size)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compression Options */}
          {pdfFile && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Compression Level
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      compressionLevel === "low"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setCompressionLevel("low")}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Low Compression
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Minimal size reduction with maximum quality retention
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ~10-20% size reduction
                    </div>
                  </div>
                  
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      compressionLevel === "medium"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setCompressionLevel("medium")}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Medium Compression
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Balanced compression with good quality
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ~30-50% size reduction
                    </div>
                  </div>
                  
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      compressionLevel === "high"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setCompressionLevel("high")}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      High Compression
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Maximum size reduction for smaller files
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ~60-80% size reduction
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">Compression Tips:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Higher compression may reduce image quality in your PDF</li>
                        <li>Text-heavy PDFs compress better than image-heavy ones</li>
                        <li>You can always try different levels to find the best balance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleCompress}
                    disabled={isProcessing}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Compressing PDF...</span>
                      </>
                    ) : (
                      <>
                        <Minimize className="h-5 w-5" />
                        <span>Compress PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Compression Results */}
          {compressionResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                Compression Complete! 🎉
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatFileSize(compressionResult.originalSize)}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Original Size
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatFileSize(compressionResult.compressedSize)}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Compressed Size
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {compressionResult.reductionPercentage}%
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Size Reduction
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
                <Minimize className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Smart Compression
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced algorithms reduce file size while preserving document quality.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Multiple Levels
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose from different compression levels to suit your needs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Instant Results
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get your compressed PDF immediately with size reduction stats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
