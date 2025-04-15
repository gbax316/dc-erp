import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Building, Users, Banknote, Upload } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  iconColor = "text-primary",
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`rounded-md bg-primary/10 p-2 ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  // Mock data - this would be fetched from an API in a real application
  const stats = {
    totalChurches: 42,
    totalMembers: 12465,
    earningsThisMonth: "₦4,587,000",
    remittanceDue: "₦2,145,850"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Building size={24} />}
        title="🏛 Total Churches"
        value={stats.totalChurches}
      />
      <StatCard
        icon={<Users size={24} />}
        title="👥 Total Members"
        value={stats.totalMembers}
      />
      <StatCard
        icon={<Banknote size={24} />}
        title="💰 Earnings This Month (₦)"
        value={stats.earningsThisMonth}
      />
      <StatCard
        icon={<Upload size={24} />}
        title="📤 Remittance Due This Month (₦)"
        value={stats.remittanceDue}
      />
    </div>
  );
};

export default DashboardStats; 