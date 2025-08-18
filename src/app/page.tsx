import Link from "next/link";
import { ArrowRight, FileText, Upload, Merge, Scissors, Minimize, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">PDF Toolkit</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Complete PDF
            <span className="block text-blue-600 dark:text-blue-400">Processing Toolkit</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Merge, split, compress, convert, and edit your PDF files with our powerful online toolkit.
            Fast, secure, and easy to use - no software installation required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 hover:scale-105"
            >
              <Upload className="h-5 w-5" />
              <span>Start Processing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/features" 
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-semibold text-lg"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl mx-4 backdrop-blur-sm">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful PDF Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to work with PDF files, all in one place. Professional-grade tools accessible from any device.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Merge PDFs */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
              <Merge className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Merge PDFs</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Combine multiple PDF files into one document. Perfect for consolidating reports and documents.
            </p>
          </div>

          {/* Split PDFs */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
              <Scissors className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Split PDFs</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Extract specific pages or split PDF into multiple files by page ranges or intervals.
            </p>
          </div>

          {/* Compress */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg w-fit mb-4">
              <Minimize className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Compress</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Reduce PDF file size while maintaining quality. Perfect for email attachments and storage.
            </p>
          </div>

          {/* Convert */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg w-fit mb-4">
              <RefreshCw className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Convert</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Convert PDFs to Word, Excel, JPG and vice versa. Multiple format support for all your needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your PDFs?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their PDF processing needs. 
            Start for free today!
          </p>
          <Link 
            href="/dashboard" 
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg inline-flex items-center space-x-2 hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">PDF Toolkit</span>
              </div>
              <p className="text-gray-400 max-w-md">
                The most comprehensive PDF processing platform. 
                Fast, secure, and reliable tools for all your PDF needs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard/merge" className="hover:text-white transition-colors">Merge PDFs</Link></li>
                <li><Link href="/dashboard/split" className="hover:text-white transition-colors">Split PDFs</Link></li>
                <li><Link href="/dashboard/compress" className="hover:text-white transition-colors">Compress</Link></li>
                <li><Link href="/dashboard/convert" className="hover:text-white transition-colors">Convert</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PDF Toolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
