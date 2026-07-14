import { Project, BlogPost, Skill, Experience, Formation, Testimonial, Service, Contact, ApiResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// Projects
export const projectsAPI = {
  getAll: () => apiCall<Project[]>('/projects'),
  getBySlug: (slug: string) => apiCall<Project>(`/projects/${slug}`),
}

// Skills
export const skillsAPI = {
  getAll: () => apiCall<Record<string, Skill[]>>('/skills'),
  byCategory: (category: string) => apiCall<Skill[]>(`/skills/${category}`),
}

// Blog
export const blogAPI = {
  getAll: () => apiCall<{ data: BlogPost[] }>('/blog'),
  getBySlug: (slug: string) => apiCall<BlogPost>(`/blog/${slug}`),
  byCategory: (category: string) => apiCall<{ data: BlogPost[] }>(`/blog/category/${category}`),
}

// Experiences
export const experienceAPI = {
  getAll: () => apiCall<Experience[]>('/experiences'),
}

// Formations
export const formationAPI = {
  getAll: () => apiCall<Formation[]>('/formations'),
}

// Testimonials
export const testimonialsAPI = {
  getAll: () => apiCall<Testimonial[]>('/testimonials'),
}

// Services
export const servicesAPI = {
  getAll: () => apiCall<Service[]>('/services'),
}

// Contact
export const contactAPI = {
  send: (data: Contact) => apiCall<ApiResponse<{ message: string }>>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}
