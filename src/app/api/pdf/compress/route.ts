import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const compressionLevel = formData.get('compressionLevel') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    // Apply compression based on level
    let compressionOptions = {};
    
    switch (compressionLevel) {
      case 'low':
        // Minimal compression - preserve most quality
        compressionOptions = {
          useObjectStreams: false,
          addDefaultPage: false,
        };
        break;
      case 'medium':
        // Balanced compression
        compressionOptions = {
          useObjectStreams: true,
          addDefaultPage: false,
        };
        break;
      case 'high':
        // Maximum compression
        compressionOptions = {
          useObjectStreams: true,
          addDefaultPage: false,
          updateFieldAppearances: false,
        };
        break;
      default:
        compressionOptions = {
          useObjectStreams: true,
          addDefaultPage: false,
        };
    }

    // Save with compression options
    const compressedPdfBytes = await pdf.save(compressionOptions);

    // Create filename for compressed PDF
    const originalName = file.name.replace('.pdf', '');
    const filename = `compressed-${compressionLevel}-${originalName}.pdf`;

    // Return the compressed PDF as a download
    return new NextResponse(Buffer.from(compressedPdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': compressedPdfBytes.length.toString(),
        'X-Original-Size': arrayBuffer.byteLength.toString(),
        'X-Compressed-Size': compressedPdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error compressing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to compress PDF file' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
