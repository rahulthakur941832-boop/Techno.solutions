export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  image: string;
  badge: string;
  details: string[];
}

export interface StatItem {
  count: number;
  label: string;
  suffix: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  keywords: string[];
  tags?: string[];
}

