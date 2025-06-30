import axios from 'axios';
import type { EducationDTO, ExperienceDTO, ProjectDTO, SkillDTO } from '../types/index';

const API_URL = 'http://localhost:5283/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const educationService = {
  getAll: () => api.get<EducationDTO[]>('/educations'),
  getById: (id: number) => api.get<EducationDTO>(`/educations/${id}`),
  create: (data: Omit<EducationDTO, 'id'>) => api.post<EducationDTO>('/educations', data),
  update: (id: number, data: Omit<EducationDTO, 'id'>) => api.put<EducationDTO>(`/educations/${id}`, data),
  delete: (id: number) => api.delete(`/educations/${id}`),
};

export const experienceService = {
  getAll: () => api.get<ExperienceDTO[]>('/experiences'),
  getById: (id: number) => api.get<ExperienceDTO>(`/experiences/${id}`),
  create: (data: Omit<ExperienceDTO, 'id'>) => api.post<ExperienceDTO>('/experiences', data),
  update: (id: number, data: Omit<ExperienceDTO, 'id'>) => api.put<ExperienceDTO>(`/experiences/${id}`, data),
  delete: (id: number) => api.delete(`/experiences/${id}`),
};

export const projectService = {
  getAll: () => api.get<ProjectDTO[]>('/projects'),
  getById: (id: number) => api.get<ProjectDTO>(`/projects/${id}`),
  create: (data: Omit<ProjectDTO, 'id'>) => api.post<ProjectDTO>('/projects', data),
  update: (id: number, data: Omit<ProjectDTO, 'id'>) => api.put<ProjectDTO>(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

export const skillService = {
  getAll: () => api.get<SkillDTO[]>('/skills'),
  getById: (id: number) => api.get<SkillDTO>(`/skills/${id}`),
  create: (data: Omit<SkillDTO, 'id'>) => api.post<SkillDTO>('/skills', data),
  update: (id: number, data: Omit<SkillDTO, 'id'>) => api.put<SkillDTO>(`/skills/${id}`, data),
  delete: (id: number) => api.delete(`/skills/${id}`),
}; 