<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SaaS PDF Toolkit - Copilot Instructions

This is a comprehensive SaaS PDF manipulation platform built with:

## Frontend Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- React components with hooks
- PDF.js for PDF preview
- FilePond for file upload
- Responsive design for mobile and desktop

## Backend Stack  
- Next.js API routes
- PDF-lib for PDF manipulation
- File storage (local/AWS S3)
- PostgreSQL for user and job tracking
- JWT-based authentication

## Key Features
- Upload PDF files via drag-and-drop or file picker
- Merge multiple PDFs into one
- Split PDFs by page range
- Compress PDF file size
- Convert PDF to Word, Excel, JPG, and vice versa
- Add watermark, page numbers, or annotations
- User authentication and dashboard
- Freemium model with usage limits and premium tiers

## Code Style Guidelines
- Use TypeScript for all new code
- Follow Next.js 14 App Router conventions
- Use Tailwind CSS for styling
- Implement proper error handling
- Use React hooks and functional components
- Follow REST API conventions for API routes
- Implement proper file validation and security
- Use environment variables for configuration

## Security Considerations
- Validate all file uploads
- Implement rate limiting
- Sanitize user inputs
- Use secure file storage
- Implement proper authentication middleware
