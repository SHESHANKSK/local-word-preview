import mammoth from 'mammoth';

/**
 * Converts a base64-encoded DOCX file to HTML
 * @param base64Content - The base64-encoded DOCX content
 * @returns A promise that resolves to the HTML content
 */
export const convertToHtml = async (base64Content: string): Promise<string> => {
  try {
    if (!base64Content) {
      throw new Error('No content provided');
    }

    // Convert base64 to array buffer
    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const arrayBuffer = bytes.buffer;
    
    // Convert DOCX to HTML using mammoth.js
    const result = await mammoth.convertToHtml({ arrayBuffer });
    
    // Add some basic styling to the output HTML
    const styledHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333;">
        ${result.value}
      </div>
    `;
    
    return styledHtml;
  } catch (error) {
    // Preserve the original error message for better debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error converting DOCX to HTML:', error);
    throw new Error(`DOCX conversion failed: ${errorMessage}`);
  }
};

/**
 * Creates a download link for a base64-encoded DOCX file
 * @param base64Content - The base64-encoded DOCX content
 * @param fileName - The name to use for the downloaded file
 * @returns The URL for downloading the file
 */
export const createDownloadLink = (base64Content: string, fileName: string): string => {
  try {
    if (!base64Content) {
      throw new Error('No content provided');
    }

    // Convert base64 to blob
    const byteCharacters = atob(base64Content);
    const byteArrays: Uint8Array[] = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Create download URL
    return URL.createObjectURL(blob);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating download link:', error);
    throw new Error(`Failed to create download link: ${errorMessage}`);
  }
};