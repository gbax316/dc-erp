import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  getServiceReports, 
  deleteServiceReport,
  ServiceReportResponse
} from '@/services/serviceReport';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/context/auth-provider';

// Format currency as Naira
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

export default function ServiceReportsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [serviceReports, setServiceReports] = useState<ServiceReportResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch service reports on component mount
  useEffect(() => {
    const fetchServiceReports = async () => {
      try {
        setLoading(true);
        const reports = await getServiceReports();
        setServiceReports(reports);
        setError(null);
      } catch (err) {
        console.error('Error fetching service reports:', err);
        setError('Failed to load service reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceReports();
  }, []);
  
  // Calculate totals for all reports
  const calculateTotalEarnings = (): number => {
    return serviceReports.reduce((sum, report) => sum + (report.total_earnings || 0), 0);
  };
  
  const calculateTotalRemittance = (): number => {
    return serviceReports.reduce((sum, report) => sum + (report.remittance_due || 0), 0);
  };
  
  // Determine if user can see remittance information based on role
  const canViewRemittance = () => {
    if (!user || !user.role) return false;
    return ['branch_admin', 'admin', 'super_admin'].includes(user.role.toLowerCase());
  };
  
  // Handle delete report
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service report?')) {
      try {
        await deleteServiceReport(id);
        // Update the local state to remove the deleted report
        setServiceReports(serviceReports.filter(report => report.id !== id));
      } catch (err) {
        console.error('Error deleting service report:', err);
        alert('Failed to delete service report. Please try again.');
      }
    }
  };
  
  // Handle view details
  const handleViewDetails = (id: string) => {
    navigate(`/service-reports/${id}`);
  };
  
  // Handle create new report
  const handleCreateNew = () => {
    navigate('/service-reports/new');
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Reports</h1>
        <Button onClick={handleCreateNew}>
          Create New Report
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Summary cards */}
      {!loading && serviceReports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Earnings</h3>
            <p className="text-2xl font-bold">{formatCurrency(calculateTotalEarnings())}</p>
          </div>
          
          {canViewRemittance() && (
            <div className="bg-blue-50 p-6 rounded-lg shadow border border-blue-100">
              <h3 className="text-sm font-medium text-blue-500 mb-1">Total Remittance Due</h3>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(calculateTotalRemittance())}</p>
            </div>
          )}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service reports...</p>
        </div>
      ) : serviceReports.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700">No service reports found</h3>
          <p className="mt-2 text-gray-500 mb-4">Create your first service report to get started</p>
          <Button onClick={handleCreateNew}>
            Create Service Report
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>First Timers</TableHead>
                <TableHead className="text-right">Total Earnings</TableHead>
                {canViewRemittance() && (
                  <TableHead className="text-right">Remittance Due</TableHead>
                )}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{formatDate(new Date(report.date))}</TableCell>
                  <TableCell>{report.service_type}</TableCell>
                  <TableCell>{report.attendance_total}</TableCell>
                  <TableCell>{report.first_timers}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(report.total_earnings || 0)}
                  </TableCell>
                  {canViewRemittance() && (
                    <TableCell className="text-right font-medium text-blue-600">
                      {formatCurrency(report.remittance_due || 0)}
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mr-2"
                      onClick={() => handleViewDetails(report.id)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(report.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Export Button */}
      {!loading && serviceReports.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => alert('Export functionality coming soon!')}>
            Export Reports
          </Button>
        </div>
      )}
    </div>
  );
} 