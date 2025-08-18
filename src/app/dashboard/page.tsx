"use client";

import { useState } from "react";
import { FileText, Merge, Scissors, Minimize, RefreshCw, Settings, User } from "lucide-react";
import Link from "next/link";
import { PDFUploader } from "@/components/PDFUploader";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload");

  const tools = [
    {
      id: "merge",
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one",
      icon: Merge,
      color: "bg-green-500",
      href: "/dashboard/merge"
    },
    {
      id: "split",
      title: "Split PDF",
      description: "Extract pages or split by ranges",
      icon: Scissors,
      color: "bg-blue-500",
      href: "/dashboard/split"
    },
    {
      id: "compress",
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality",
      icon: Minimize,
      color: "bg-purple-500",
      href: "/dashboard/compress"
    },
    {
      id: "convert",
      title: "Convert PDF",
      description: "Convert to/from Word, Excel, JPG",
      icon: RefreshCw,
      color: "bg-orange-500",
      href: "/dashboard/convert"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">PDF Toolkit</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "upload"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Upload & Process
                </button>
                <button
                  onClick={() => setActiveTab("tools")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "tools"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Tools
                </button>
              </nav>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "upload" && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Upload Your PDF Files
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Drag and drop your PDF files or click to browse. 
                Choose from our powerful tools to process your documents.
              </p>
            </div>

            <PDFUploader />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700"
                  >
                    <div className={`${tool.color} p-3 rounded-lg w-fit mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                PDF Processing Tools
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Select a tool to get started with your PDF processing tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 group"
                  >
                    <div className={`${tool.color} p-4 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {tool.description}
                    </p>
                    <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                      Get Started →
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
