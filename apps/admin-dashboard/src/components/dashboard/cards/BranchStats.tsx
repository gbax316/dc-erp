import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Users, UserPlus, Banknote, Upload, TrendingUp } from "lucide-react";

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

interface BranchStatsProps {
  className?: string;
}

const BranchStats: React.FC<BranchStatsProps> = ({ className }) => {
  // Mock data - this would be fetched from an API in a real application
  const stats = {
    weeklyAttendance: 148,
    totalMembers: 256,
    averageMembership: 124,
    monthlyEarnings: "₦325,000",
    remittanceDue: "₦162,500"
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${className}`}>
      <StatCard
        icon={<Users size={24} />}
        title="This Week's Attendance"
        value={stats.weeklyAttendance}
        subtitle="Sunday service"
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
      <StatCard
        icon={<UserPlus size={24} />}
        title="Total Membership"
        value={stats.totalMembers}
        subtitle="12 new this month"
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatCard
        icon={<TrendingUp size={24} />}
        title="Average Membership"
        value={stats.averageMembership}
        subtitle="Last 3 months"
        iconColor="text-purple-600"
        iconBgColor="bg-purple-100"
      />
      <StatCard
        icon={<Banknote size={24} />}
        title="Total Earnings This Month"
        value={stats.monthlyEarnings}
        subtitle="Combined offerings & tithes"
        iconColor="text-amber-600"
        iconBgColor="bg-amber-100"
      />
      <StatCard
        icon={<Upload size={24} />}
        title="Remittance Due"
        value={stats.remittanceDue}
        subtitle="50% of monthly earnings"
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
      />
    </div>
  );
};

export default BranchStats; 