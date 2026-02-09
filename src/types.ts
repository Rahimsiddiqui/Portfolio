export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  technologies: string[];
}

export interface WorkStep {
  title: string;
  description: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
}

export interface Result {
  label: string;
  value: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Technology {
  name: string;
  icon: string;
}
