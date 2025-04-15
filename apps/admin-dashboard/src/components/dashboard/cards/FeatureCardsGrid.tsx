import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import ComingSoonModal from "../../ui/ComingSoonModal";
import {
  Building2,
  Users,
  FileCheck,
  GraduationCap,
  LineChart,
  Receipt,
  BarChart4,
  Grid3X3,
  Settings,
} from "lucide-react";

/**
 * Feature routes configuration
 * - Defined routes will navigate to those paths
 * - Features with null values will trigger "Coming Soon" modals
 */
const featureRoutes = {
  churches: '/churches',
  members: '/members',
  vows: '/vows',
  remittance: '/remittance',
  settings: '/settings',
  trainings: null,
  financialReports: null,
  attendanceInsights: null,
  units: null,
} as const;

/**
 * Utility function to check if a feature is available
 * @param key Feature identifier from featureRoutes
 * @returns Boolean indicating if the feature has an active route
 */
function isFeatureAvailable(key: keyof typeof featureRoutes): boolean {
  return !!featureRoutes[key];
}

/**
 * Feature card type definition
 */
type FeatureCardType = {
  id: keyof typeof featureRoutes;
  title: string;
  description: string;
  icon: React.ReactNode;
};

/**
 * Feature cards configuration with metadata for each card
 */
const featureCards: FeatureCardType[] = [
  {
    id: "churches",
    title: "Churches",
    description: "Manage church branches and their details",
    icon: <Building2 size={24} />,
  },
  {
    id: "members",
    title: "Members",
    description: "View and manage church members",
    icon: <Users size={24} />,
  },
  {
    id: "vows",
    title: "Vows",
    description: "Manage member vows and commitments",
    icon: <FileCheck size={24} />,
  },
  {
    id: "trainings",
    title: "Trainings",
    description: "Manage training programs and materials",
    icon: <GraduationCap size={24} />,
  },
  {
    id: "financialReports",
    title: "Financial Reports",
    description: "View financial statements and reports",
    icon: <LineChart size={24} />,
  },
  {
    id: "remittance",
    title: "Remittance Summary",
    description: "Track and manage remittances",
    icon: <Receipt size={24} />,
  },
  {
    id: "attendanceInsights",
    title: "Attendance Insights",
    description: "Analyze attendance patterns and trends",
    icon: <BarChart4 size={24} />,
  },
  {
    id: "units",
    title: "Unit Management",
    description: "Manage church units and departments",
    icon: <Grid3X3 size={24} />,
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure system settings and preferences",
    icon: <Settings size={24} />,
  },
];

/**
 * Individual Feature Card component
 * - Displays a card with icon, title, description
 * - Shows either a navigation button or "Coming Soon" button based on availability
 */
const FeatureCard: React.FC<{ feature: FeatureCardType; onOpenModal: (feature: FeatureCardType) => void }> = ({
  feature,
  onOpenModal,
}) => {
  const isAvailable = isFeatureAvailable(feature.id);
  const path = featureRoutes[feature.id];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            {feature.icon}
          </div>
          <CardTitle className="text-base">{feature.title}</CardTitle>
        </div>
        <CardDescription className="pt-1">{feature.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        {isAvailable && path ? (
          <Link to={path} className="w-full">
            <Button className="w-full">Open</Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenModal(feature)}
          >
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

/**
 * Main FeatureCardsGrid component
 * - Displays a responsive grid of feature cards
 * - Handles the Coming Soon modal state
 */
const FeatureCardsGrid: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureCardType | null>(null);

  // Handle opening the Coming Soon modal
  const handleOpenModal = (feature: FeatureCardType) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  // Handle closing the Coming Soon modal
  const handleCloseModal = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedFeature(null);
    }
  };

  return (
    <>
      {/* Responsive grid layout for feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureCards.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Coming Soon Modal */}
      {selectedFeature && (
        <ComingSoonModal
          open={modalOpen}
          onOpenChange={handleCloseModal}
          title={`${selectedFeature.title} - Coming Soon`}
          description={`We're currently working on the ${selectedFeature.title.toLowerCase()} feature. It will be available in a future update.`}
          icon={selectedFeature.icon}
        />
      )}
    </>
  );
};

export default FeatureCardsGrid; 