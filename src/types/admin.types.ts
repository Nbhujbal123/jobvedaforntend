export interface AdminDashboardTotals {
  totalUsers: number;
  totalCandidates: number;
  totalEmployers: number;
  totalCompanies: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalCourses: number;
  publishedBlogs: number;
  contactMessages: number;
}

export interface AdminDashboardCharts {
  applicationsOverTime: { date: string; count: number }[];
  jobsByCategory: { category: string; count: number }[];
  candidatesByLocation: { location: string; count: number }[];
  applicationStatusDistribution: { status: string; count: number }[];
}

export interface AdminDashboardStats {
  totals: AdminDashboardTotals;
  charts: AdminDashboardCharts;
}
