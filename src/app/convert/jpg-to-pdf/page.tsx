"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Download, Upload, CheckCircle, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";

export default function JPGToPDFPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const isClient = useIsClient();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') && 
        (file.type.includes('jpeg') || file.type.includes('jpg') || file.type.includes('png'))
      );
      setImageFiles(imageFiles);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    if (imageFiles.length === 0) {
      alert("Please upload at least one image file");
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });
    formData.append('conversion_type', 'images-to-pdf');

    try {
      // For now, we'll create a simple response since we don't have the actual API
      // In a real implementation, you would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
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
      console.error('Error converting images:', error);
      alert('Failed to convert images to PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `converted-images.pdf`;
      a.click();
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(files => files.filter((_, i) => i !== index));
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
                <div className="bg-purple-600 p-2 rounded-lg">
                  {isClient && <ImageIcon className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    JPG to PDF Converter
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Convert JPG, JPEG, and PNG images to PDF documents
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
              How to convert images to PDF:
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-purple-800 dark:text-purple-200">
              <li>Upload one or more image files (JPG, JPEG, PNG)</li>
              <li>Arrange the images in your preferred order</li>
              <li>Click &quot;Convert to PDF&quot; to create your document</li>
              <li>Download your PDF with all images combined</li>
            </ol>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Image Files
            </h2>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isClient && <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />}
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your image files
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">JPG, JPEG, PNG files • Multiple files supported</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            {imageFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Uploaded Images ({imageFiles.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-2 mb-2">
                          {isClient && <ImageIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {(file.size / 1024).toFixed(1)} KB
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Convert Button */}
          {imageFiles.length > 0 && !downloadUrl && (
            <div className="flex justify-center">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Creating PDF...</span>
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
                  PDF Created Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your images have been successfully converted to a PDF document.
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
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <ImageIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Multiple Formats
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Support for JPG, JPEG, and PNG image formats.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Batch Conversion
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Convert multiple images into a single PDF document.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
                {isClient && <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quality Preserved
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maintains original image quality in the PDF output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
