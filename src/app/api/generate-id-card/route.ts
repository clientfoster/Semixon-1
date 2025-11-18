import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeData } = body;

    // Create simple front ID card as SVG
    const frontCardSvg = createFrontCardSvg(employeeData);
    
    // Create simple back ID card with QR code as SVG
    const backCardSvg = await createBackCardSvg(employeeData);

    // Convert SVG to base64 encoded data
    const frontCardData = Buffer.from(frontCardSvg).toString('base64');
    const backCardData = Buffer.from(backCardSvg).toString('base64');

    // Return the file data as base64 for direct download
    return NextResponse.json({
      success: true,
      frontCardData,
      backCardData,
      frontFileName: `${employeeData.employee_id}_front.svg`,
      backFileName: `${employeeData.employee_id}_back.svg`
    });
  } catch (error) {
    console.error('Error generating ID card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate ID card: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

function createFrontCardSvg(employeeData: any) {
  // Create a simple SVG for the front of the ID card
  return `
    <svg width="1011" height="639" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="1011" height="639" fill="#FFFFFF" />
      
      <!-- Header -->
      <rect width="1011" height="120" fill="#2D82FF" />
      <text x="505" y="70" font-family="Arial" font-size="48" font-weight="bold" fill="#000000" text-anchor="middle">SEMIXON TECHNOLOGIES</text>
      
      <!-- Employee Name -->
      <text x="505" y="180" font-family="Arial" font-size="48" font-weight="bold" fill="#2D82FF" text-anchor="middle">${employeeData.name.toUpperCase()}</text>
      
      <!-- Employee Role -->
      <text x="505" y="240" font-family="Arial" font-size="36" fill="#141414" text-anchor="middle">${employeeData.role}</text>
      
      <!-- Contact Information -->
      <text x="300" y="300" font-family="Arial" font-size="24" fill="#141414">Phone: ${employeeData.phone || ''}</text>
      <text x="300" y="340" font-family="Arial" font-size="24" fill="#141414">Email: ${employeeData.email || ''}</text>
      
      <!-- Employee ID -->
      <text x="505" y="580" font-family="Arial" font-size="36" font-weight="bold" fill="#000000" text-anchor="middle">ID: ${employeeData.employee_id}</text>
      
      <!-- Photo Placeholder -->
      <rect x="50" y="150" width="180" height="220" fill="#EBEBEB" />
      <text x="140" y="270" font-family="Arial" font-size="48" font-weight="bold" fill="#323232" text-anchor="middle">
        ${(employeeData.name || '').trim().split(/\s+/).slice(0, 2).map((s: string) => s[0]?.toUpperCase() || '').join('') || 'NA'}
      </text>
    </svg>
  `;
}

async function createBackCardSvg(employeeData: any) {
  // Generate QR code data
  const qrData = JSON.stringify({
    id: employeeData.employee_id,
    name: employeeData.name,
    role: employeeData.role,
    email: employeeData.email
  });

  // Generate QR code as data URL
  const qrDataUrl = await QRCode.toString(qrData, { 
    margin: 1, 
    errorCorrectionLevel: 'M',
    type: 'svg'
  });

  // Create a simple SVG for the back of the ID card
  return `
    <svg width="1011" height="639" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="1011" height="639" fill="#FFFFFF" />
      
      <!-- Header -->
      <rect width="1011" height="120" fill="#2D82FF" />
      <text x="505" y="70" font-family="Arial" font-size="48" font-weight="bold" fill="#FFFFFF" text-anchor="middle">SEMIXON TECHNOLOGIES</text>
      
      <!-- QR Code (placeholder) -->
      <foreignObject x="355" y="170" width="300" height="300">
        ${qrDataUrl}
      </foreignObject>
      
      <!-- Website -->
      <text x="505" y="580" font-family="Arial" font-size="24" fill="#141414" text-anchor="middle">www.semixon.com</text>
    </svg>
  `;
}