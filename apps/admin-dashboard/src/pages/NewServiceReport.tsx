import { useNavigate } from 'react-router-dom';
import { ServiceReportForm } from '@/components/forms/ServiceReportForm';
import { Button } from '@/components/ui/button';

export default function NewServiceReportPage() {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/service-reports');
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/service-reports')}
          className="mr-4"
        >
          ← Back to Service Reports
        </Button>
        <h1 className="text-2xl font-bold">New Service Report</h1>
      </div>
      
      <ServiceReportForm onSuccess={handleSuccess} />
    </div>
  );
} 