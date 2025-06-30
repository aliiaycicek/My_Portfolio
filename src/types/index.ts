export interface EducationDTO {
  id: number;
  school: string;
  department: string;
  program?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  courses?: string;
}

export interface ExperienceDTO {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies: string[];
  responsibilities: string[];
}

export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  features: string[];
  imageUrl?: string;
}

export interface SkillDTO {
  id: number;
  name: string;
  category: string;
  proficiencyLevel?: number;
  iconUrl?: string;
} 