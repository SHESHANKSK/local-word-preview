import React from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { createDownloadLink } from '../utils/docxConverter';

interface PreviewPaneProps {
  htmlContent: string;
  fileName: string;
  message?: string;
  isLoading: boolean;
  base64Content?: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ 
  htmlContent, 
  fileName, 
  message,
  isLoading,
  base64Content 
}) => {
  const hasContent = htmlContent.length > 0;

  const handleDownload = () => {
    if (!base64Content) return;
    
    try {
      const downloadUrl = createDownloadLink(base64Content, fileName);
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-5 flex flex-col min-h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Document Preview</h2>
        
        {hasContent && (
          <div className="flex space-x-2">
            <button 
              className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-md transition hover:bg-gray-200"
              aria-label={`File: ${fileName}`}
            >
              <FileText className="w-4 h-4 mr-1" />
              {fileName}
            </button>
            
            <button 
              onClick={handleDownload}
              disabled={!base64Content}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md transition hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download document"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        )}
      </div>
      
      {message && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
          <p className="text-sm text-blue-700">{message}</p>
        </div>
      )}
      
      <div className="flex-1 border border-gray-200 rounded-md p-4 overflow-auto bg-gray-50 transition-all">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <span className="ml-2 text-gray-500">Converting document...</span>
          </div>
        ) : hasContent ? (
          <div 
            className="docx-content h-full"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <FileText className="w-12 h-12 mb-2" />
            <p>Document preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPane;