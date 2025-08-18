"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  status: "uploading" | "success" | "error" | "complete";
  progress: number;
}

interface PDFUploaderProps {
  onFilesUploaded?: (files: File[]) => void;
}

export function PDFUploader({ onFilesUploaded }: PDFUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "uploading" as const,
      progress: 0,
    }));

    setUploadedFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...newFiles];
      onFilesUploaded?.(updatedFiles.map(f => f.file));
      return updatedFiles;
    });

    // Simulate upload progress
    newFiles.forEach((newFile) => {
      const interval = setInterval(() => {
        setUploadedFiles((prevFiles) =>
          prevFiles.map((f) => {
            if (f.id === newFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 20, 100);
              if (newProgress === 100) {
                clearInterval(interval);
                return { ...f, progress: 100, status: "complete" as const };
              }
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 200);
    });
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const newFiles = prev.filter((f) => f.id !== id);
      onFilesUploaded?.(newFiles.map(f => f.file));
      return newFiles;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {isDragActive ? "Drop your PDF files here" : "Drag & drop PDF files here"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              or{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                click to browse
              </span>
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Supports PDF files up to 100MB each
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Uploaded Files ({uploadedFiles.length})
          </h3>
          <div className="space-y-3">
            {uploadedFiles.map((uploadFile) => (
              <div
                key={uploadFile.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {uploadFile.file.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(uploadFile.file.size)}
                      </span>
                      {uploadFile.status === "success" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {uploadFile.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <button
                        onClick={() => removeFile(uploadFile.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      >
                        <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  {uploadFile.status === "uploading" && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Uploading... {uploadFile.progress}%
                      </p>
                    </div>
                  )}
                  
                  {uploadFile.status === "success" && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Upload complete
                    </p>
                  )}
                  
                  {uploadFile.status === "error" && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      Upload failed
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {uploadedFiles.some((f) => f.status === "success") && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Merge PDFs
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Split PDF
              </button>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Compress
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Convert
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
