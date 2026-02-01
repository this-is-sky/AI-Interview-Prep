import { PDFParse } from "pdf-parse";

export async function parseResume(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = new PDFParse({ data: buffer });
    const data = await pdfParse.getText();

    // basic cleanup
    const cleanedText = data.text
      .replace(/\s+/g, " ")
      .trim();

    return cleanedText;
  } catch (error: any) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}
