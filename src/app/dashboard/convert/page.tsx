"use client";

import { useState } from "react";
import { ArrowLeft, RefreshCw, Download, FileText, Upload, Image, FileSpreadsheet, FileX } from "lucide-react";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";

type ConversionFormat = "jpg" | "png" | "word" | "excel" | "powerpoint" | "text";

export default function ConvertPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<ConversionFormat>("jpg");
  const [isProcessing, setIsProcessing] = useState(false);
  const isClient = useIsClient();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
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
    formData.append('outputFormat', outputFormat);

    try {
      const response = await fetch('/api/pdf/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Set appropriate filename based on format
        const baseName = pdfFile.name.replace('.pdf', '');
        let extension = '';
        switch (outputFormat) {
          case 'jpg': extension = '.jpg'; break;
          case 'png': extension = '.png'; break;
          case 'word': extension = '.docx'; break;
          case 'excel': extension = '.xlsx'; break;
          case 'powerpoint': extension = '.pptx'; break;
          case 'text': extension = '.txt'; break;
        }
        
        a.download = `converted-${baseName}${extension}`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to convert PDF');
      }
    } catch (error) {
      console.error('Error converting PDF:', error);
      alert('Failed to convert PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatOptions = [
    {
      value: "jpg" as ConversionFormat,
      label: "JPG Image",
      description: "Convert to JPEG image format",
      icon: Image,
      color: "bg-orange-500"
    },
    {
      value: "png" as ConversionFormat,
      label: "PNG Image", 
      description: "Convert to PNG image format",
      icon: Image,
      color: "bg-blue-500"
    },
    {
      value: "word" as ConversionFormat,
      label: "Microsoft Word",
      description: "Convert to editable Word document",
      icon: FileX,
      color: "bg-blue-600"
    },
    {
      value: "excel" as ConversionFormat,
      label: "Microsoft Excel",
      description: "Convert to Excel spreadsheet",
      icon: FileSpreadsheet,
      color: "bg-green-600"
    },
    {
      value: "powerpoint" as ConversionFormat,
      label: "PowerPoint",
      description: "Convert to PowerPoint presentation",
      icon: FileText,
      color: "bg-red-600"
    },
    {
      value: "text" as ConversionFormat,
      label: "Plain Text",
      description: "Extract text content",
      icon: FileText,
      color: "bg-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isClient && <ArrowLeft className="h-5 w-5" />}
              </Link>
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 p-2 rounded-lg">
                  {isClient && <RefreshCw className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Convert PDF
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Convert your PDF to different file formats
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
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
              How to convert PDFs:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-orange-800 dark:text-orange-200">
              <li>Upload the PDF file you want to convert</li>
              <li>Select your desired output format</li>
              <li>Click &quot;Convert PDF&quot; to process the file</li>
              <li>Download your converted file</li>
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
                  {isClient && <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />}
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

          {/* Format Selection */}
          {pdfFile && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Choose Output Format
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {formatOptions.map((format) => {
                  const IconComponent = format.icon;
                  return (
                    <div
                      key={format.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        outputFormat === format.value
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => setOutputFormat(format.value)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`${format.color} p-2 rounded-lg`}>
                          {isClient && <IconComponent className="h-5 w-5 text-white" />}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {format.label}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {format.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Converting PDF...</span>
                    </>
                  ) : (
                    <>
                      {isClient && <RefreshCw className="h-5 w-5" />}
                      <span>Convert PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <RefreshCw className="h-6 w-6 text-orange-600 dark:text-orange-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Multiple Formats
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Convert to images, Office documents, or plain text formats.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                High Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maintain document quality and formatting during conversion.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <Download className="h-6 w-6 text-green-600 dark:text-green-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quick Processing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fast conversion with immediate download of converted files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
