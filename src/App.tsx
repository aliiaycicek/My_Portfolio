import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { educationService, experienceService, projectService, skillService } from './services/api';
import type { EducationDTO, ExperienceDTO, ProjectDTO, SkillDTO } from './types';

function App() {
  const [educations, setEducations] = useState<EducationDTO[]>([]);
  const [experiences, setExperiences] = useState<ExperienceDTO[]>([]);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [skills, setSkills] = useState<SkillDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [educationsRes, experiencesRes, projectsRes, skillsRes] = await Promise.all([
          educationService.getAll(),
          experienceService.getAll(),
          projectService.getAll(),
          skillService.getAll(),
        ]);

        setEducations(educationsRes.data);
        setExperiences(experiencesRes.data);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Portfolio</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{skill.category}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="border-l-4 border-blue-500 pl-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{experience.position}</h3>
                <p className="text-gray-600 dark:text-gray-300">{experience.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(experience.startDate).toLocaleDateString()} - 
                  {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{experience.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
