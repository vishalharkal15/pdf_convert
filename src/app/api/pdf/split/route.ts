import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const splitType = formData.get('splitType') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const totalPages = pdf.getPageCount();

    const pagesToExtract: number[] = [];

    if (splitType === 'pages') {
      const pageNumbers = formData.get('pageNumbers') as string;
      if (!pageNumbers) {
        return NextResponse.json(
          { error: 'Page numbers are required' },
          { status: 400 }
        );
      }

      // Parse page numbers (supports ranges like "1,3,5-7")
      const parts = pageNumbers.split(',').map(part => part.trim());
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim()));
          if (start && end && start <= end && start >= 1 && end <= totalPages) {
            for (let i = start; i <= end; i++) {
              if (!pagesToExtract.includes(i - 1)) { // Convert to 0-based index
                pagesToExtract.push(i - 1);
              }
            }
          }
        } else {
          const pageNum = parseInt(part);
          if (pageNum && pageNum >= 1 && pageNum <= totalPages) {
            if (!pagesToExtract.includes(pageNum - 1)) { // Convert to 0-based index
              pagesToExtract.push(pageNum - 1);
            }
          }
        }
      }
    } else if (splitType === 'range') {
      const startPage = parseInt(formData.get('startPage') as string);
      const endPage = parseInt(formData.get('endPage') as string);

      if (!startPage || !endPage || startPage < 1 || endPage > totalPages || startPage > endPage) {
        return NextResponse.json(
          { error: 'Invalid page range' },
          { status: 400 }
        );
      }

      for (let i = startPage - 1; i < endPage; i++) { // Convert to 0-based index
        pagesToExtract.push(i);
      }
    }

    if (pagesToExtract.length === 0) {
      return NextResponse.json(
        { error: 'No valid pages to extract' },
        { status: 400 }
      );
    }

    // Sort pages to maintain order
    pagesToExtract.sort((a, b) => a - b);

    // Create new PDF with selected pages
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, pagesToExtract);
    
    pages.forEach((page) => newPdf.addPage(page));

    // Generate the split PDF
    const pdfBytes = await newPdf.save();

    // Create filename based on extracted pages
    const pageList = pagesToExtract.map(p => p + 1).join(',');
    const filename = `split-pages-${pageList}-${file.name}`;

    // Return the split PDF as a download
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error splitting PDF:', error);
    return NextResponse.json(
      { error: 'Failed to split PDF file' },
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
