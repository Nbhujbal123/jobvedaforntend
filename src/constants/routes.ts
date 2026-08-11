export const ROUTES = {
  // Public
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAILS: '/jobs/:id',
  COMPANIES: '/companies',
  COMPANY_DETAILS: '/companies/:id',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:slug',
  TRAINING: '/training',
  COURSE_DETAILS: '/training/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOGS: '/blogs',
  BLOG_DETAILS: '/blogs/:id',
  GALLERY: '/gallery',
  TESTIMONIALS: '/testimonials',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Candidate
  CANDIDATE_DASHBOARD: '/candidate/dashboard',
  CANDIDATE_PROFILE: '/candidate/profile',
  CANDIDATE_RESUME: '/candidate/resume',
  CANDIDATE_APPLIED_JOBS: '/candidate/applied-jobs',
  CANDIDATE_SAVED_JOBS: '/candidate/saved-jobs',
  CANDIDATE_INTERVIEWS: '/candidate/interviews',

  // Employer
  EMPLOYER_DASHBOARD: '/employer/dashboard',
  EMPLOYER_PROFILE: '/employer/profile',
  EMPLOYER_POST_JOB: '/employer/post-job',
  EMPLOYER_JOBS: '/employer/jobs',
  EMPLOYER_APPLICANTS: '/employer/applicants',
  EMPLOYER_INTERVIEWS: '/employer/interviews',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_COMPANIES: '/admin/companies',
  ADMIN_APPLICATIONS: '/admin/applications',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_BLOGS: '/admin/blogs',
  ADMIN_TESTIMONIALS: '/admin/testimonials',
  ADMIN_MESSAGES: '/admin/messages',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export function getDashboardPath(role: 'candidate' | 'employer' | 'admin'): string {
  switch (role) {
    case 'employer':
      return ROUTES.EMPLOYER_DASHBOARD;
    case 'admin':
      return ROUTES.ADMIN_DASHBOARD;
    case 'candidate':
    default:
      return ROUTES.CANDIDATE_DASHBOARD;
  }
}

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Jobs', path: ROUTES.JOBS },
  { label: 'Training', path: ROUTES.TRAINING },
  { label: 'Services', path: ROUTES.SERVICES },
  { label: 'Companies', path: ROUTES.COMPANIES },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Contact', path: ROUTES.CONTACT },
] as const;
