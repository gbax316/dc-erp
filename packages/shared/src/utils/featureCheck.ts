/**
 * Configuration of feature routes in the application
 * - Routes with string values are available features
 * - Routes with null values are features coming soon
 */
export const featureRoutes = {
  churches: '/churches',
  members: '/members',
  vows: '/vows',
  trainings: null,
  financialReports: null,
  remittance: '/remittance',
  attendanceInsights: null,
  units: null,
  settings: '/settings',
} as const;

/**
 * Check if a feature is available in the application
 * @param key Feature identifier from featureRoutes
 * @returns Boolean indicating if the feature has an active route
 */
export function isFeatureAvailable(key: keyof typeof featureRoutes) {
  return !!featureRoutes[key];
} 