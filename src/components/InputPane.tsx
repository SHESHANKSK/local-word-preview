import React from 'react';
import { Trash2 } from 'lucide-react';

interface InputPaneProps {
  jsonInput: string;
  setJsonInput: (value: string) => void;
  onClear: () => void;
  error: string | null;
}

const InputPane: React.FC<InputPaneProps> = ({ 
  jsonInput, 
  setJsonInput, 
  onClear,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const placeholderJson = `{
  "fileName": "example.docx",
  "fileBase64Content": "BASE64_ENCODED_STRING_HERE",
  "message": "A sample message"
}`;

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-5 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">JSON Input</h2>
        <button
          onClick={onClear}
          className="inline-flex items-center px-3 py-1.5 text-sm text-red-500 bg-red-50 rounded-md transition hover:bg-red-100"
          aria-label="Clear input"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </button>
      </div>
      
      <div className="flex-1 relative">
        <textarea
          value={jsonInput}
          onChange={handleChange}
          placeholder={placeholderJson}
          className="w-full h-[400px] lg:h-full min-h-[200px] p-4 rounded-md border border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all font-mono text-sm resize-none"
          spellCheck="false"
          aria-label="JSON input for DOCX content"
        />
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div className="mt-4">
        <p className="text-xs text-gray-500">
          Paste a JSON object with <code className="bg-gray-100 px-1 py-0.5 rounded">fileName</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">fileBase64Content</code>, and <code className="bg-gray-100 px-1 py-0.5 rounded">message</code> fields.
        </p>
      </div>
    </div>
  );
};

export default InputPane;