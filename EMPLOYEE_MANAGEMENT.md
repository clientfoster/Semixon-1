# Employee Management System

This document describes the new employee management feature added to the Semixon admin panel.

## Features

1. **Employee Database**: Store comprehensive employee information including personal details, employment information, and emergency contacts.
2. **ID Card Generation**: Automatically generate professional ID cards for employees with QR codes.
3. **Profile Pages**: Auto-generate public profile pages for each employee.
4. **Search & Filter**: Easily find employees by name, role, department, or ID.
5. **Responsive Design**: Works on all device sizes.

## Implementation Details

### Admin Panel Integration

The employee management section has been added to the admin panel under the "Business" category. It includes:

- Grid view and table view options
- Add/Edit employee forms with comprehensive validation
- Search functionality
- QR code generation
- ID card download capability

### Employee Profile Pages

Each employee automatically gets a public profile page at `/employees/[id]` that displays:

- Professional photo
- Personal and employment information
- Emergency contact details
- QR code for quick access

### ID Card Generation

The system can generate professional ID cards using the provided Node.js script:

- Front and back card templates
- Automatic QR code generation
- Employee information embedding
- High-quality JPEG output

## Technical Components

1. **Employee Management Page**: `/src/app/admin/employees/page.tsx`
2. **Employee Form Component**: `/src/components/admin/employee-form.tsx`
3. **Employee List Component**: `/src/components/admin/employee-list.tsx`
4. **Employee Profile Page**: `/src/app/employees/[id]/page.tsx`
5. **ID Card Generator**: `/src/lib/generate-id-card.js`
6. **API Endpoint**: `/src/app/api/generate-id-card/route.ts`

## Dependencies

The following npm packages were added for ID card generation:

- `canvas`: For image manipulation
- `qrcode`: For QR code generation
- `csv-parse`: For CSV parsing (if needed for bulk imports)

## Usage

1. Navigate to the admin panel
2. Go to the "Employees" section under "Business"
3. Add new employees using the "Add Employee" button
4. Edit existing employee information as needed
5. Generate ID cards and QR codes for employees
6. View employee profiles at `/employees/[employee-id]`

## Future Enhancements

- Bulk import/export functionality
- Advanced reporting and analytics
- Integration with HR systems
- Multi-language support
- Customizable ID card templates