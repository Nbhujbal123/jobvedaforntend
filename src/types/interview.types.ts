export type InterviewMode = 'online' | 'in-person' | 'phone';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface Interview {
  id: string;
  applicationId: string;
  jobId: { id: string; title: string } | string;
  candidateId: { id: string; firstName: string; lastName: string; email: string } | string;
  companyId: { id: string; name: string; logoUrl?: string } | string;
  scheduledAt: string;
  mode: InterviewMode;
  location?: string;
  meetingLink?: string;
  notes?: string;
  status: InterviewStatus;
  createdAt: string;
}
