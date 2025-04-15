/**
 * Available user roles in the system
 */
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'BRANCH_ADMIN' | 'MEMBER';

/**
 * Determine the appropriate dashboard route based on user role
 * 
 * @param role The user's role in the system
 * @returns The dashboard route path appropriate for the user's role
 * 
 * Role details:
 * - SUPER_ADMIN: Global control with access to full data
 * - ADMIN: State-wide data and insights
 * - BRANCH_ADMIN: Church-level control and reports 
 * - MEMBER: Personal information, vows, and training
 */
export function getDashboardRouteForRole(role: UserRole | string): string {
  switch (role) {
    case 'SUPER_ADMIN': return '/super-admin/dashboard'
    case 'ADMIN': return '/admin/dashboard'
    case 'BRANCH_ADMIN': return '/branch/dashboard'
    case 'MEMBER': return '/member/home'
    default: return '/'
  }
}

/**
 * Check if a role is valid
 * @param role Role to validate
 * @returns boolean indicating if the role is valid
 */
export function isValidRole(role: string): role is UserRole {
  return ['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN', 'MEMBER'].includes(role);
}

/**
 * Get the display name for a role
 * @param role The role to get display name for
 * @returns A user-friendly display name for the role
 */
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'SUPER_ADMIN': return 'Super Admin'
    case 'ADMIN': return 'Admin'
    case 'BRANCH_ADMIN': return 'Branch Admin'
    case 'MEMBER': return 'Member'
    default: return role
  }
} 