import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Building, Users, DollarSign, CreditCard } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  iconColor?: string;
  iconBgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={`rounded-md ${iconBgColor} p-2 ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminStats: React.FC = () => {
  // Mock data - this would be replaced with actual API data
  const stats = {
    totalChurches: 24,
    totalMembers: 3718,
    earningsThisMonth: "₦3,245,000",
    remittanceThisMonth: "₦1,622,500"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Building size={24} />}
        title="Total Churches in Your State"
        value={stats.totalChurches}
        subtitle="Across 5 local areas"
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
      <StatCard
        icon={<Users size={24} />}
        title="Total Members in Your State"
        value={stats.totalMembers}
        subtitle="152 new this month"
        iconColor="text-violet-600"
        iconBgColor="bg-violet-100"
      />
      <StatCard
        icon={<DollarSign size={24} />}
        title="Total Earnings This Month (₦)"
        value={stats.earningsThisMonth}
        subtitle="12.4% increase from last month"
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatCard
        icon={<CreditCard size={24} />}
        title="Total Remittance This Month (₦)"
        value={stats.remittanceThisMonth}
        subtitle="50% of total earnings"
        iconColor="text-amber-600"
        iconBgColor="bg-amber-100"
      />
    </div>
  );
};

export default AdminStats; 