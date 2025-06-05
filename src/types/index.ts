/**
 * Represents the data structure for DOCX document input
 */
export interface DocxData {
  /**
   * The name of the DOCX file
   */
  fileName: string;
  
  /**
   * The base64-encoded content of the DOCX file
   */
  fileBase64Content: string;
  
  /**
   * An optional message associated with the document
   */
  message?: string;
}