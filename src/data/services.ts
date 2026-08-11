import {
  Briefcase,
  Building2,
  Compass,
  FileSignature,
  FileText,
  GraduationCap,
  MessagesSquare,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface ServiceDefinition {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  howItWorks: HowItWorksStep[];
  programs?: string[];
  ctaLabel: string;
  ctaTarget: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: 'job-placement',
    icon: Briefcase,
    title: 'Job Placement',
    description:
      'Connect with relevant job opportunities based on your skills, experience and career goals.',
    features: ['Job matching', 'Job search assistance', 'Application support', 'Placement guidance'],
    benefits: [
      'Access to verified job openings',
      'Faster, more relevant job matches',
      'Support throughout the application process',
    ],
    howItWorks: [
      { title: 'Create your profile', description: 'Tell us about your skills, experience, and career goals.' },
      { title: 'Get matched', description: 'We surface openings that fit your profile.' },
      { title: 'Apply with support', description: 'Get guidance through the application process.' },
      { title: 'Track progress', description: 'Follow your application status from your dashboard.' },
    ],
    ctaLabel: 'Find Jobs',
    ctaTarget: ROUTES.JOBS,
  },
  {
    slug: 'permanent-staffing',
    icon: UserCheck,
    title: 'Permanent Staffing',
    description:
      'Helping businesses identify and hire qualified professionals for long-term positions.',
    features: ['Candidate sourcing', 'Candidate screening', 'Interview coordination', 'Hiring support'],
    benefits: [
      'Reduced time-to-hire',
      'Pre-screened, qualified candidates',
      'Support through offer and onboarding',
    ],
    howItWorks: [
      { title: 'Share requirements', description: 'Tell us about the role and the profile you need.' },
      { title: 'Source & screen', description: 'We identify and evaluate qualified candidates.' },
      { title: 'Coordinate interviews', description: 'We manage scheduling and feedback loops.' },
      { title: 'Hire with support', description: 'We support you through offer and onboarding.' },
    ],
    ctaLabel: 'Hire Talent',
    ctaTarget: ROUTES.REGISTER,
  },
  {
    slug: 'contract-staffing',
    icon: FileSignature,
    title: 'Contract Staffing',
    description:
      'Flexible workforce solutions for organizations looking for skilled professionals for project-based or temporary requirements.',
    features: ['Contract hiring', 'Candidate screening', 'Workforce support', 'Project-based recruitment'],
    benefits: [
      'Flexible, scalable workforce',
      'Faster access to project-ready talent',
      'Reduced hiring overhead for short-term needs',
    ],
    howItWorks: [
      { title: 'Define the requirement', description: 'Share your project or contract duration and scope.' },
      { title: 'Shortlist candidates', description: 'We identify professionals suited to the engagement.' },
      { title: 'Onboard quickly', description: 'Candidates are onboarded for your project timeline.' },
      { title: 'Ongoing support', description: 'We stay available for the length of the engagement.' },
    ],
    ctaLabel: 'Contact Us',
    ctaTarget: ROUTES.CONTACT,
  },
  {
    slug: 'corporate-recruitment',
    icon: Building2,
    title: 'Corporate Recruitment',
    description: 'End-to-end recruitment support for organizations looking to build strong teams.',
    features: ['Talent sourcing', 'Candidate screening', 'Interview coordination', 'Hiring assistance'],
    benefits: [
      'End-to-end hiring support',
      'Consistent candidate quality',
      "Recruitment aligned to your team's needs",
    ],
    howItWorks: [
      { title: 'Understand your goals', description: 'We learn about your team structure and hiring needs.' },
      { title: 'Source at scale', description: 'We build a pipeline of qualified candidates.' },
      { title: 'Coordinate interviews', description: 'We manage scheduling, feedback, and follow-up.' },
      { title: 'Support the hire', description: 'We assist through offer and onboarding.' },
    ],
    ctaLabel: 'Hire Talent',
    ctaTarget: ROUTES.REGISTER,
  },
  {
    slug: 'career-counselling',
    icon: Compass,
    title: 'Career Counselling',
    description: 'Professional guidance to help candidates make better career decisions.',
    features: ['Career direction', 'Skill assessment', 'Career planning', 'Job search guidance'],
    benefits: [
      'Clarity on career direction',
      'Personalized, one-on-one guidance',
      'Practical, actionable next steps',
    ],
    howItWorks: [
      { title: 'Share your background', description: 'Tell us about your experience and career goals.' },
      { title: 'Discuss options', description: 'We review your strengths and possible directions.' },
      { title: 'Get a plan', description: 'Leave with a clear, personalized career plan.' },
    ],
    ctaLabel: 'Get Guidance',
    ctaTarget: ROUTES.CONTACT,
  },
  {
    slug: 'resume-assistance',
    icon: FileText,
    title: 'Resume Assistance',
    description: 'Create a professional resume that clearly presents your skills and experience.',
    features: ['Resume review', 'Resume improvement', 'ATS-friendly guidance', 'Profile optimization'],
    benefits: [
      'A clearer, more professional resume',
      'Better alignment with ATS systems',
      'Improved chances of getting shortlisted',
    ],
    howItWorks: [
      { title: 'Share your resume', description: 'Send us your current resume or profile details.' },
      { title: 'Get expert review', description: 'We review structure, content, and clarity.' },
      { title: 'Receive an improved resume', description: 'Walk away with a polished, professional resume.' },
    ],
    ctaLabel: 'Contact Us',
    ctaTarget: ROUTES.CONTACT,
  },
  {
    slug: 'interview-preparation',
    icon: MessagesSquare,
    title: 'Interview Preparation',
    description: 'Prepare confidently for technical and HR interviews.',
    features: ['Interview guidance', 'Technical preparation', 'HR interview preparation', 'Mock interview support'],
    benefits: [
      'Increased interview confidence',
      'Better handling of technical and HR rounds',
      'Real feedback before the real interview',
    ],
    howItWorks: [
      { title: 'Share the role', description: 'Tell us what role and interview stage you’re preparing for.' },
      { title: 'Practice with mock interviews', description: 'Go through realistic technical and HR mock rounds.' },
      { title: 'Get feedback', description: 'Receive practical feedback to improve before the real thing.' },
    ],
    ctaLabel: 'Get Started',
    ctaTarget: ROUTES.CONTACT,
  },
  {
    slug: 'training',
    icon: GraduationCap,
    title: 'Training & Skill Development',
    description: 'Practical training programs designed to improve technical and professional skills.',
    features: ['Hands-on curriculum', 'Experienced instructors', 'Practical projects', 'Career-focused content'],
    benefits: [
      'Job-ready, practical skills',
      'Guidance from experienced instructors',
      'Skills aligned with real hiring demand',
    ],
    howItWorks: [
      { title: 'Choose a program', description: 'Pick a training program that matches your goals.' },
      { title: 'Learn by doing', description: 'Work through structured, practical sessions.' },
      { title: 'Build job-ready skills', description: 'Graduate with skills that support your job search.' },
    ],
    programs: [
      'Java Full Stack',
      'Python',
      'React',
      'Data Analytics',
      'AI & Machine Learning',
      'Digital Marketing',
      'Communication Skills',
    ],
    ctaLabel: 'Explore Training',
    ctaTarget: ROUTES.TRAINING,
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, count = 3): ServiceDefinition[] {
  const currentIndex = SERVICES.findIndex((service) => service.slug === slug);
  if (currentIndex === -1) return SERVICES.slice(0, count);

  const related: ServiceDefinition[] = [];
  for (let offset = 1; related.length < count && offset < SERVICES.length; offset += 1) {
    related.push(SERVICES[(currentIndex + offset) % SERVICES.length]);
  }
  return related;
}
