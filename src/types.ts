export type Page = 
  | 'language-selection'
  | 'onboarding-1' 
  | 'onboarding-2' 
  | 'onboarding-3' 
  | 'role-selection'
  | 'profile-setup'
  | 'parent-dashboard' 
  | 'child-dashboard' 
  | 'focus-timer' 
  | 'learn-modules' 
  | 'mood-check' 
  | 'rewards'
  | 'screening-intro'
  | 'screening-quiz'
  | 'screening-results'
  | 'consultation'
  | 'teacher-dashboard'
  | 'professional-dashboard'
  | 'support-plan'
  | 'routine-builder'
  | 'pmt-modules'
  | 'account-history';

export interface UserRole {
  role: 'parent' | 'child' | 'teacher' | 'professional';
}
