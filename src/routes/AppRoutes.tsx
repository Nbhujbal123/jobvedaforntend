import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ROUTES } from '@/constants/routes';

import { MainLayout } from '@/layouts/MainLayout';
import { CandidateLayout } from '@/layouts/CandidateLayout';
import { EmployerLayout } from '@/layouts/EmployerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

const HomePage = lazy(() => import('@/pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const JobsPage = lazy(() => import('@/pages/jobs/JobsPage').then((m) => ({ default: m.JobsPage })));
const JobDetailsPage = lazy(() =>
  import('@/pages/jobs/JobDetailsPage').then((m) => ({ default: m.JobDetailsPage })),
);
const CompaniesPage = lazy(() =>
  import('@/pages/companies/CompaniesPage').then((m) => ({ default: m.CompaniesPage })),
);
const CompanyDetailsPage = lazy(() =>
  import('@/pages/companies/CompanyDetailsPage').then((m) => ({ default: m.CompanyDetailsPage })),
);
const ServicesPage = lazy(() =>
  import('@/pages/services/ServicesPage').then((m) => ({ default: m.ServicesPage })),
);
const ServiceDetailPage = lazy(() =>
  import('@/pages/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
);
const TrainingPage = lazy(() =>
  import('@/pages/training/TrainingPage').then((m) => ({ default: m.TrainingPage })),
);
const CourseDetailsPage = lazy(() =>
  import('@/pages/training/CourseDetailsPage').then((m) => ({ default: m.CourseDetailsPage })),
);
const AboutPage = lazy(() => import('@/pages/about/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import('@/pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const BlogsPage = lazy(() => import('@/pages/blogs/BlogsPage').then((m) => ({ default: m.BlogsPage })));
const BlogDetailsPage = lazy(() =>
  import('@/pages/blogs/BlogDetailsPage').then((m) => ({ default: m.BlogDetailsPage })),
);
const GalleryPage = lazy(() =>
  import('@/pages/gallery/GalleryPage').then((m) => ({ default: m.GalleryPage })),
);
const TestimonialsPage = lazy(() =>
  import('@/pages/testimonials/TestimonialsPage').then((m) => ({ default: m.TestimonialsPage })),
);

const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const ForgotPasswordPage = lazy(() =>
  import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
);

const CandidateDashboardPage = lazy(() =>
  import('@/pages/candidate/CandidateDashboardPage').then((m) => ({ default: m.CandidateDashboardPage })),
);
const CandidateProfilePage = lazy(() =>
  import('@/pages/candidate/CandidateProfilePage').then((m) => ({ default: m.CandidateProfilePage })),
);
const CandidateResumePage = lazy(() =>
  import('@/pages/candidate/CandidateResumePage').then((m) => ({ default: m.CandidateResumePage })),
);
const CandidateAppliedJobsPage = lazy(() =>
  import('@/pages/candidate/CandidateAppliedJobsPage').then((m) => ({
    default: m.CandidateAppliedJobsPage,
  })),
);
const CandidateSavedJobsPage = lazy(() =>
  import('@/pages/candidate/CandidateSavedJobsPage').then((m) => ({ default: m.CandidateSavedJobsPage })),
);
const CandidateInterviewsPage = lazy(() =>
  import('@/pages/candidate/CandidateInterviewsPage').then((m) => ({
    default: m.CandidateInterviewsPage,
  })),
);

const EmployerDashboardPage = lazy(() =>
  import('@/pages/employer/EmployerDashboardPage').then((m) => ({ default: m.EmployerDashboardPage })),
);
const EmployerProfilePage = lazy(() =>
  import('@/pages/employer/EmployerProfilePage').then((m) => ({ default: m.EmployerProfilePage })),
);
const EmployerPostJobPage = lazy(() =>
  import('@/pages/employer/EmployerPostJobPage').then((m) => ({ default: m.EmployerPostJobPage })),
);
const EmployerJobsPage = lazy(() =>
  import('@/pages/employer/EmployerJobsPage').then((m) => ({ default: m.EmployerJobsPage })),
);
const EmployerApplicantsPage = lazy(() =>
  import('@/pages/employer/EmployerApplicantsPage').then((m) => ({ default: m.EmployerApplicantsPage })),
);
const EmployerInterviewsPage = lazy(() =>
  import('@/pages/employer/EmployerInterviewsPage').then((m) => ({ default: m.EmployerInterviewsPage })),
);

const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })),
);
const AdminUsersPage = lazy(() =>
  import('@/pages/admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })),
);
const AdminJobsPage = lazy(() =>
  import('@/pages/admin/AdminJobsPage').then((m) => ({ default: m.AdminJobsPage })),
);
const AdminCompaniesPage = lazy(() =>
  import('@/pages/admin/AdminCompaniesPage').then((m) => ({ default: m.AdminCompaniesPage })),
);
const AdminApplicationsPage = lazy(() =>
  import('@/pages/admin/AdminApplicationsPage').then((m) => ({ default: m.AdminApplicationsPage })),
);
const AdminCoursesPage = lazy(() =>
  import('@/pages/admin/AdminCoursesPage').then((m) => ({ default: m.AdminCoursesPage })),
);
const AdminBlogsPage = lazy(() =>
  import('@/pages/admin/AdminBlogsPage').then((m) => ({ default: m.AdminBlogsPage })),
);
const AdminTestimonialsPage = lazy(() =>
  import('@/pages/admin/AdminTestimonialsPage').then((m) => ({ default: m.AdminTestimonialsPage })),
);
const AdminMessagesPage = lazy(() =>
  import('@/pages/admin/AdminMessagesPage').then((m) => ({ default: m.AdminMessagesPage })),
);
const AdminSettingsPage = lazy(() =>
  import('@/pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })),
);

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner className="min-h-screen" size={32} />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.JOBS} element={<JobsPage />} />
          <Route path={ROUTES.JOB_DETAILS} element={<JobDetailsPage />} />
          <Route path={ROUTES.COMPANIES} element={<CompaniesPage />} />
          <Route path={ROUTES.COMPANY_DETAILS} element={<CompanyDetailsPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.SERVICE_DETAILS} element={<ServiceDetailPage />} />
          <Route path={ROUTES.TRAINING} element={<TrainingPage />} />
          <Route path={ROUTES.COURSE_DETAILS} element={<CourseDetailsPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.BLOGS} element={<BlogsPage />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetailsPage />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
          <Route path={ROUTES.TESTIMONIALS} element={<TestimonialsPage />} />

          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
          <Route element={<CandidateLayout />}>
            <Route path={ROUTES.CANDIDATE_DASHBOARD} element={<CandidateDashboardPage />} />
            <Route path={ROUTES.CANDIDATE_PROFILE} element={<CandidateProfilePage />} />
            <Route path={ROUTES.CANDIDATE_RESUME} element={<CandidateResumePage />} />
            <Route path={ROUTES.CANDIDATE_APPLIED_JOBS} element={<CandidateAppliedJobsPage />} />
            <Route path={ROUTES.CANDIDATE_SAVED_JOBS} element={<CandidateSavedJobsPage />} />
            <Route path={ROUTES.CANDIDATE_INTERVIEWS} element={<CandidateInterviewsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
          <Route element={<EmployerLayout />}>
            <Route path={ROUTES.EMPLOYER_DASHBOARD} element={<EmployerDashboardPage />} />
            <Route path={ROUTES.EMPLOYER_PROFILE} element={<EmployerProfilePage />} />
            <Route path={ROUTES.EMPLOYER_POST_JOB} element={<EmployerPostJobPage />} />
            <Route path={ROUTES.EMPLOYER_JOBS} element={<EmployerJobsPage />} />
            <Route path={ROUTES.EMPLOYER_APPLICANTS} element={<EmployerApplicantsPage />} />
            <Route path={ROUTES.EMPLOYER_INTERVIEWS} element={<EmployerInterviewsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
            <Route path={ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
            <Route path={ROUTES.ADMIN_JOBS} element={<AdminJobsPage />} />
            <Route path={ROUTES.ADMIN_COMPANIES} element={<AdminCompaniesPage />} />
            <Route path={ROUTES.ADMIN_APPLICATIONS} element={<AdminApplicationsPage />} />
            <Route path={ROUTES.ADMIN_COURSES} element={<AdminCoursesPage />} />
            <Route path={ROUTES.ADMIN_BLOGS} element={<AdminBlogsPage />} />
            <Route path={ROUTES.ADMIN_TESTIMONIALS} element={<AdminTestimonialsPage />} />
            <Route path={ROUTES.ADMIN_MESSAGES} element={<AdminMessagesPage />} />
            <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
