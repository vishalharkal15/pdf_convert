import Link from "next/link";
import { ArrowRight, FileText, Upload, Merge, Scissors, Minimize, RefreshCw, FileSpreadsheet, Image as ImageIcon } from "lucide-react";

export default function Home() {
  const tools = [
    {
      id: "merge",
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one document",
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

  const conversions = [
    {
      id: "pdf-to-word",
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word files",
      icon: FileText,
      color: "bg-blue-600",
      href: "/convert/pdf-to-word",
      fromFormat: "PDF",
      toFormat: "DOCX"
    },
    {
      id: "pdf-to-excel",
      title: "PDF to Excel",
      description: "Extract tables and data from PDF to Excel",
      icon: FileSpreadsheet,
      color: "bg-green-600",
      href: "/convert/pdf-to-excel",
      fromFormat: "PDF",
      toFormat: "XLSX"
    },
    {
      id: "jpg-to-pdf",
      title: "JPG to PDF",
      description: "Convert images to PDF documents",
      icon: ImageIcon,
      color: "bg-purple-600",
      href: "/convert/jpg-to-pdf",
      fromFormat: "JPG",
      toFormat: "PDF"
    },
    {
      id: "word-to-pdf",
      title: "Word to PDF",
      description: "Convert Word documents to PDF format",
      icon: FileText,
      color: "bg-red-600",
      href: "/convert/word-to-pdf",
      fromFormat: "DOCX",
      toFormat: "PDF"
    },
    {
      id: "excel-to-pdf",
      title: "Excel to PDF",
      description: "Convert Excel spreadsheets to PDF format",
      icon: FileSpreadsheet,
      color: "bg-indigo-600",
      href: "/convert/excel-to-pdf",
      fromFormat: "XLSX",
      toFormat: "PDF"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">PDF Toolkit</span>
            </div>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Professional PDF
            <span className="text-blue-600 dark:text-blue-400"> Toolkit</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Complete PDF solution for all your document needs. Merge, split, compress, convert, and manipulate PDFs with ease. Fast, secure, and professional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Main Tools Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful PDF Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to work with PDF documents efficiently and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700 group"
                >
                  <div className={`${tool.color} p-4 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Conversion Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Document Conversion Hub
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Convert between different document formats quickly and easily. Support for PDF, Word, Excel, and image formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conversions.map((conversion) => {
              const IconComponent = conversion.icon;
              return (
                <Link
                  key={conversion.id}
                  href={conversion.href}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${conversion.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {conversion.fromFormat} → {conversion.toFormat}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {conversion.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {conversion.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform text-sm">
                    Convert Now →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our PDF Toolkit?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Drag and drop your files or click to browse. Support for multiple file formats.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick and efficient processing with instant download of results.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                High Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Maintain document quality and formatting throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our PDF toolkit for their document processing needs.
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Processing PDFs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">PDF Toolkit</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional PDF processing tools for all your document needs.
            </p>
            <div className="text-sm text-gray-500">
              © 2025 PDF Toolkit. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
