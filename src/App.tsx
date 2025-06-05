import React from 'react';
import DocxViewer from './components/DocxViewer';
import { File } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <File className="w-6 h-6 text-purple-500 mr-2" />
          <h1 className="text-xl font-medium text-gray-800">Base64 DOCX Viewer</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <DocxViewer />
      </main>
      
      <footer className="bg-white py-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-500">
            Frontend-only DOCX Viewer • No server required
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;