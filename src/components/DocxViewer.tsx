import React, { useState, useEffect } from 'react';
import { convertToHtml } from '../utils/docxConverter';
import InputPane from './InputPane';
import PreviewPane from './PreviewPane';
import { DocxData } from '../types';

const DocxViewer: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [docxData, setDocxData] = useState<DocxData | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Process JSON input when it changes
  useEffect(() => {
    const processJsonInput = async () => {
      if (!jsonInput.trim()) {
        clearData();
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Parse JSON input
        const data = JSON.parse(jsonInput) as DocxData;
        
        if (!data.fileBase64Content) {
          throw new Error('Missing required field: fileBase64Content');
        }
        
        // Set DOCX data
        setDocxData(data);
        
        // Convert base64 DOCX to HTML
        const html = await convertToHtml(data.fileBase64Content);
        setHtmlContent(html);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JSON or DOCX content');
        setHtmlContent('');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the processing to avoid excessive processing during typing
    const timer = setTimeout(() => {
      processJsonInput();
    }, 500);

    return () => clearTimeout(timer);
  }, [jsonInput]);

  // Clear all data
  const clearData = () => {
    setJsonInput('');
    setDocxData(null);
    setHtmlContent('');
    setError(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <InputPane 
        jsonInput={jsonInput} 
        setJsonInput={setJsonInput} 
        onClear={clearData} 
        error={error}
      />
      <PreviewPane 
        htmlContent={htmlContent} 
        fileName={docxData?.fileName || 'No file'} 
        message={docxData?.message}
        isLoading={isLoading}
        base64Content={docxData?.fileBase64Content}
      />
    </div>
  );
};

export default DocxViewer;