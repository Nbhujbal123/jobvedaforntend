export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

export interface HiringPartner {
  id: string;
  name: string;
}

export interface ApiTestimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  rating: number;
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
}
