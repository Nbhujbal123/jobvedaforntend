import {
  Briefcase,
  Building2,
  UserCheck,
  FileSignature,
  FileText,
  MessagesSquare,
  Compass,
  GraduationCap,
  ShieldCheck,
  Users,
  Handshake,
  UserPlus,
  FileUp,
  ClipboardCheck,
  Mic,
  Award,
  Laptop2,
  HeartPulse,
  Landmark,
  LineChart,
  Factory,
  Headset,
  TrendingUp,
  Wrench,
  Megaphone,
  type LucideIcon,
} from 'lucide-react';
import type { Job, JobCategory } from '@/types/job.types';
import type { Course } from '@/types/course.types';
import type { Testimonial, HiringPartner } from '@/types/testimonial.types';
import type { BlogPreview } from '@/types/blog.types';

/**
 * All arrays on this page are placeholder/demo content pending the
 * Node + MongoDB backend — swap for live API data via React Query later.
 */

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: Briefcase,
    title: 'Job Placement',
    description: 'End-to-end placement support connecting you with roles that fit your skills.',
  },
  {
    icon: Building2,
    title: 'Corporate Hiring',
    description: 'Bulk and specialized hiring solutions tailored to your business needs.',
  },
  {
    icon: UserCheck,
    title: 'Permanent Staffing',
    description: 'Long-term talent placements matched for culture and capability fit.',
  },
  {
    icon: FileSignature,
    title: 'Contract Staffing',
    description: 'Flexible workforce solutions for short-term and project-based needs.',
  },
  {
    icon: FileText,
    title: 'Resume Building',
    description: 'Professional resume reviews that help you stand out to recruiters.',
  },
  {
    icon: MessagesSquare,
    title: 'Interview Preparation',
    description: 'Mock interviews and coaching to help you walk in with confidence.',
  },
  {
    icon: Compass,
    title: 'Career Counselling',
    description: 'One-on-one guidance to help you plan the right career path.',
  },
  {
    icon: GraduationCap,
    title: 'Training Programs',
    description: 'Industry-relevant upskilling programs to boost your employability.',
  },
];

export interface WhyChooseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    icon: ShieldCheck,
    title: 'Verified Employers',
    description: 'Every hiring partner is vetted before jobs go live on Jobveda.',
  },
  {
    icon: Users,
    title: 'Experienced Recruiters',
    description: 'A team that understands both candidate goals and employer needs.',
  },
  {
    icon: Compass,
    title: 'Career Guidance',
    description: 'Personalized advice to help you make confident career decisions.',
  },
  {
    icon: MessagesSquare,
    title: 'Interview Support',
    description: 'Preparation and feedback that improves your interview outcomes.',
  },
  {
    icon: GraduationCap,
    title: 'Professional Training',
    description: 'Skill-building programs designed around real hiring demand.',
  },
  {
    icon: Handshake,
    title: 'Placement Assistance',
    description: 'Support that continues until you are successfully placed.',
  },
];

export interface HiringProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const HIRING_PROCESS_STEPS: HiringProcessStep[] = [
  { icon: UserPlus, title: 'Register', description: 'Create your free Jobveda account in minutes.' },
  { icon: FileUp, title: 'Upload Resume', description: 'Share your resume so recruiters can find you.' },
  { icon: ClipboardCheck, title: 'Profile Review', description: 'Our team reviews and refines your profile.' },
  { icon: Mic, title: 'Interview', description: 'Get matched and interviewed by hiring partners.' },
  { icon: FileSignature, title: 'Offer', description: 'Receive and evaluate your job offer.' },
  { icon: Award, title: 'Get Hired', description: 'Start your new role with Jobveda support.' },
];

export const JOB_CATEGORIES: (JobCategory & { icon: LucideIcon })[] = [
  { id: 'it', name: 'IT', openRoles: 128, icon: Laptop2 },
  { id: 'healthcare', name: 'Healthcare', openRoles: 64, icon: HeartPulse },
  { id: 'banking', name: 'Banking', openRoles: 41, icon: Landmark },
  { id: 'finance', name: 'Finance', openRoles: 57, icon: LineChart },
  { id: 'manufacturing', name: 'Manufacturing', openRoles: 39, icon: Factory },
  { id: 'bpo', name: 'BPO', openRoles: 82, icon: Headset },
  { id: 'sales', name: 'Sales', openRoles: 73, icon: TrendingUp },
  { id: 'engineering', name: 'Engineering', openRoles: 46, icon: Wrench },
  { id: 'hr', name: 'HR', openRoles: 28, icon: Users },
  { id: 'marketing', name: 'Marketing', openRoles: 35, icon: Megaphone },
];

export const FEATURED_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    companyName: 'Nimbus Technologies',
    location: 'Pune, India',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salaryMin: 8,
    salaryMax: 12,
    category: 'IT',
    description: 'Build and maintain customer-facing React applications.',
    responsibilities: ['Develop responsive UI features in React and TypeScript', 'Collaborate with designers and backend engineers'],
    requirements: ['3+ years of frontend development experience', 'Strong understanding of React and REST APIs'],
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    postedAt: '2026-08-02',
  },
  {
    id: 'job-2',
    title: 'Business Development Executive',
    companyName: 'Sterling Finserve',
    location: 'Mumbai, India',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salaryMin: 4,
    salaryMax: 6,
    category: 'Sales',
    description: 'Drive new client acquisition for financial products.',
    responsibilities: ['Generate and qualify new sales leads', 'Meet monthly acquisition targets'],
    requirements: ['0-2 years in sales or business development', 'Strong communication skills'],
    skills: ['Sales', 'Client Relations', 'Negotiation'],
    postedAt: '2026-08-04',
  },
  {
    id: 'job-3',
    title: 'HR Executive',
    companyName: 'Vertex Manufacturing',
    location: 'Ahmedabad, India',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salaryMin: 3.5,
    salaryMax: 5,
    category: 'HR',
    description: 'Manage recruitment and employee relations for plant staff.',
    responsibilities: ['Coordinate end-to-end recruitment for plant roles', 'Support employee onboarding and engagement'],
    requirements: ['1-3 years of HR generalist experience', 'Familiarity with labour compliance basics'],
    skills: ['Recruitment', 'HR Operations', 'Onboarding'],
    postedAt: '2026-08-05',
  },
  {
    id: 'job-4',
    title: 'Customer Support Associate',
    companyName: 'Orbit BPO Services',
    location: 'Remote',
    jobType: 'full-time',
    experienceLevel: 'fresher',
    salaryMin: 2.5,
    salaryMax: 3.5,
    category: 'BPO',
    description: 'Handle inbound customer queries across voice and chat.',
    responsibilities: ['Resolve customer queries via voice and chat channels', 'Maintain quality and resolution-time targets'],
    requirements: ['Excellent verbal and written English', 'Comfortable working in rotational shifts'],
    skills: ['Customer Support', 'Communication', 'CRM Tools'],
    postedAt: '2026-08-06',
  },
  {
    id: 'job-5',
    title: 'Staff Nurse',
    companyName: 'Wellspring Healthcare',
    location: 'Bengaluru, India',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salaryMin: 4.5,
    salaryMax: 6,
    category: 'Healthcare',
    description: 'Provide patient care within a multi-specialty hospital unit.',
    responsibilities: ['Deliver bedside patient care and monitoring', 'Coordinate with physicians on treatment plans'],
    requirements: ['Registered Nursing license', '2+ years of hospital ward experience'],
    skills: ['Patient Care', 'Clinical Documentation'],
    postedAt: '2026-08-06',
  },
  {
    id: 'job-6',
    title: 'Digital Marketing Executive',
    companyName: 'Brightpath Media',
    location: 'Pune, India',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salaryMin: 3,
    salaryMax: 4.5,
    category: 'Marketing',
    description: 'Plan and run performance campaigns across digital channels.',
    responsibilities: ['Plan and execute paid social and search campaigns', 'Report on campaign performance metrics'],
    requirements: ['1-2 years of digital marketing experience', 'Familiarity with Meta and Google Ads'],
    skills: ['Digital Marketing', 'SEO', 'Google Ads'],
    postedAt: '2026-08-07',
  },
];

export const TRAINING_PROGRAMS: Course[] = [
  { id: 'course-1', title: 'Java Full Stack Development', category: 'IT', duration: '4 Months', mode: 'Hybrid' },
  { id: 'course-2', title: 'Python Programming', category: 'IT', duration: '2 Months', mode: 'Online' },
  { id: 'course-3', title: 'AI & Machine Learning', category: 'IT', duration: '3 Months', mode: 'Hybrid' },
  { id: 'course-4', title: 'Data Analytics', category: 'IT', duration: '3 Months', mode: 'Online' },
  { id: 'course-5', title: 'Medical Coding', category: 'Healthcare', duration: '2 Months', mode: 'Offline' },
  { id: 'course-6', title: 'Medical Billing', category: 'Healthcare', duration: '2 Months', mode: 'Offline' },
  { id: 'course-7', title: 'Digital Marketing', category: 'Marketing', duration: '6 Weeks', mode: 'Online' },
  { id: 'course-8', title: 'Communication Skills', category: 'Soft Skills', duration: '4 Weeks', mode: 'Hybrid' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'Jobveda guided me through every step, from resume review to interview prep. I landed a role within three weeks.',
    name: 'Ananya Sharma',
    role: 'Frontend Developer, Nimbus Technologies',
  },
  {
    id: 'testimonial-2',
    quote:
      'As a hiring manager, the quality of candidates Jobveda shortlisted saved us weeks of screening time.',
    name: 'Rahul Mehta',
    role: 'HR Head, Sterling Finserve',
  },
  {
    id: 'testimonial-3',
    quote: 'The training program gave me practical, job-ready skills I use every day in my current role.',
    name: 'Priya Nair',
    role: 'Data Analyst, Vertex Manufacturing',
  },
];

export const HIRING_PARTNERS: HiringPartner[] = [
  { id: 'partner-1', name: 'Nimbus Technologies' },
  { id: 'partner-2', name: 'Sterling Finserve' },
  { id: 'partner-3', name: 'Vertex Manufacturing' },
  { id: 'partner-4', name: 'Orbit BPO Services' },
  { id: 'partner-5', name: 'Wellspring Healthcare' },
  { id: 'partner-6', name: 'Brightpath Media' },
];

export const LATEST_BLOGS: BlogPreview[] = [
  {
    id: 'blog-1',
    title: '5 Resume Mistakes That Cost You Interviews',
    excerpt: 'Small formatting and content errors that quietly filter you out of shortlists.',
    category: 'Career Tips',
    date: 'Jul 28, 2026',
    readTime: '4 min read',
  },
  {
    id: 'blog-2',
    title: 'How Employers Are Hiring Differently in 2026',
    excerpt: 'A look at the skills and signals employers are prioritizing this year.',
    category: 'Hiring Trends',
    date: 'Jul 20, 2026',
    readTime: '6 min read',
  },
  {
    id: 'blog-3',
    title: 'From Training to Job Offer: A Candidate Journey',
    excerpt: 'How structured upskilling programs translate into real placements.',
    category: 'Success Stories',
    date: 'Jul 12, 2026',
    readTime: '5 min read',
  },
];
