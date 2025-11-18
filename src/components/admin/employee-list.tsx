'use client';

import { Employee } from '@/app/admin/employees/page';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  QrCode, 
  Download,
  Mail,
  Phone
} from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeListProps {
  employees: Employee[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-800 border-b border-slate-700">
          <tr>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">Employee</th>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">Role</th>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">Department</th>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">Contact</th>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">ID</th>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">Joined</th>
            <th className="text-left py-4 px-6 text-slate-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-slate-800 hover:bg-slate-800/50">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{employee.name}</p>
                    <p className="text-sm text-slate-400">#{employee.priority || 999}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <p className="text-white">{employee.role}</p>
              </td>
              <td className="py-4 px-6">
                <p className="text-white">{employee.department}</p>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{employee.phone}</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-6">
                <p className="text-white font-mono">{employee.employeeId}</p>
              </td>
              <td className="py-4 px-6">
                <p className="text-white">
                  {employee.dateOfJoining ? format(new Date(employee.dateOfJoining), 'MMM d, yyyy') : 'N/A'}
                </p>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {employees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No employees found</p>
        </div>
      )}
    </div>
  );
}