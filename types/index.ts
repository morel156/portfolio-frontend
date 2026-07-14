export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact?: string;
  technologies: string[];
  demo_url?: string;
  github_url?: string;
  featured_image?: string;
  images?: string[];
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'devops';
  proficiency: number; // 0-100
  order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  featured_image?: string;
  reading_time: number;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Formation {
  id: number;
  title: string;
  institution: string;
  field_of_study?: string;
  year: number;
  description?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  content: string;
  rating: number; // 1-5
  author_avatar?: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}
