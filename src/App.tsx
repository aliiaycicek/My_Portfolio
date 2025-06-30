import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { educationService, experienceService, projectService, skillService } from './services/api';
import type { EducationDTO, ExperienceDTO, ProjectDTO, SkillDTO } from './types';

const NAV_LINKS = [
  { href: '#about', label: 'Hakkımda' },
  { href: '#skills', label: 'Yetenekler' },
  { href: '#educations', label: 'Eğitim' },
  { href: '#experiences', label: 'Deneyim' },
  { href: '#technologies', label: 'Teknolojiler' },
  { href: '#projects', label: 'Projeler' },
  { href: '#contact', label: 'İletişim' },
];

const PROFILE_IMAGE = "https://i.postimg.cc/DyT2fCDQ/Whats-App-Image-2025-06-26-at-22-48-39-1.jpg";
const HERO_ILLUSTRATION = PROFILE_IMAGE;

function App() {
  const [educations, setEducations] = useState<EducationDTO[]>([]);
  const [experiences, setExperiences] = useState<ExperienceDTO[]>([]);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [skills, setSkills] = useState<SkillDTO[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const [activeLink, setActiveLink] = useState('#about');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'educations', 'experiences', 'technologies', 'projects', 'contact'];
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollY) {
          setActiveLink(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-extrabold tracking-tight text-black">Ali Ayçiçek</div>
          <nav className="hidden md:flex space-x-10 text-lg font-semibold">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1 transition hover:text-black ${activeLink === link.href ? 'text-black font-extrabold' : 'text-gray-500'}`}
              >
                {link.label}
                {activeLink === link.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black rounded"></span>
                )}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-black/10 shadow-lg animate-fade-in-down">
            <ul className="flex flex-col items-center py-4 space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-4 py-2 text-lg transition hover:text-black ${activeLink === link.href ? 'text-black font-extrabold' : 'text-gray-500'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Hero / Hakkımda */}
      <section id="about" className="max-w-7xl mx-auto py-24 px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Sol blok: Sosyal ikonlar */}
        <div className="flex flex-col items-center md:items-start gap-8 w-full md:w-1/5 mb-8 md:mb-0">
          <a href="https://linkedin.com/in/aliaycicek" target="_blank" rel="noopener noreferrer" className="mb-2"><FaLinkedin size={36} className="text-black hover:text-blue-700 transition" /></a>
          <a href="https://github.com/aliaycicek" target="_blank" rel="noopener noreferrer" className="mb-2"><FaGithub size={36} className="text-black hover:text-gray-700 transition" /></a>
          <a href="mailto:aliaycicek_7010@hotmail.com" className="mb-2"><FaEnvelope size={36} className="text-black hover:text-blue-700 transition" /></a>
          <a href="https://wa.me/905439205870" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={36} className="text-black hover:text-green-600 transition" /></a>
        </div>
        {/* Orta blok: Başlık ve özet */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="text-xl text-gray-500 mb-2">Merhaba Ben</div>
          <h1 className="text-6xl font-extrabold mb-2 text-black leading-tight">Ali Ayçiçek</h1>
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Mobil & React Native Geliştirici</h2>
          <p className="text-gray-600 text-xl max-w-2xl mb-6">
            Modern web teknolojileri ile yaratıcı ve kullanıcı dostu web uygulamaları geliştiriyorum. Ayrıca mobil uygulama alanında çeşitli projeler geliştiriyorum.
          </p>
        </div>
        {/* Sağ blok: Profil görseli veya illüstrasyon */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img src={PROFILE_IMAGE} alt="Profil fotoğrafı" className="w-80 h-80 object-cover rounded-full border-4 border-black shadow-lg" />
        </div>
      </section>

      {/* Yetenekler */}
      <section id="skills" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-16 text-black text-center">Yeteneklerim</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {skills.map(skill => {
            let icon = skill.iconUrl;
            if (!icon) {
              if (skill.name.toLowerCase() === 'swift') {
                icon = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg';
              } else if (skill.name.toLowerCase() === 'react') {
                icon = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
              } else if (skill.name.toLowerCase() === 'flutter') {
                icon = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg';
              }
            }
            return (
              <div
                key={skill.id}
                className="flex flex-col items-center justify-center border-2 border-black rounded-2xl p-10 bg-white hover:bg-black hover:text-white transition cursor-pointer shadow-sm min-h-[180px] min-w-[150px]"
              >
                {icon && (
                  <img
                    src={icon}
                    alt={skill.name}
                    className="w-16 h-16 mb-4 object-contain"
                    loading="lazy"
                  />
                )}
                <div className="text-xl font-bold text-center">{skill.name}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Eğitim */}
      <section id="educations" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-16 text-black text-center">Eğitim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {educations.map(edu => (
            <div key={edu.id} className="bg-white border-2 border-black rounded-2xl p-10 shadow-sm flex flex-col gap-2">
              <div className="text-2xl font-bold text-black">{edu.school}</div>
              <div className="text-lg text-gray-700">{edu.department}</div>
              <div className="text-gray-500 text-base">{edu.program}</div>
              <div className="text-gray-400 text-sm mt-1">
                {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Devam Ediyor'}
              </div>
              <div className="text-gray-700 mt-2 text-base">{edu.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deneyim */}
      <section id="experiences" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-16 text-black text-center">Deneyim</h2>
        <div className="relative flex flex-col md:flex-row md:space-x-0">
          {/* Timeline çizgisi */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-black/10 z-0" style={{transform: 'translateX(-50%)'}}></div>
          <div className="flex flex-col gap-16 w-full">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative flex md:items-center w-full md:w-1/2 md:self-start md:ml-auto group">
                {/* Logo veya görsel */}
                {exp.imageUrl && (
                  <div className="absolute -top-8 left-1/2 md:left-auto md:-left-16 transform -translate-x-1/2 md:translate-x-0 z-10">
                    <img src={exp.imageUrl} alt={exp.company} className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                  </div>
                )}
                <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-sm w-full md:w-[520px] ml-auto relative z-10">
                  <div className="text-2xl font-bold text-black mb-2">{exp.position} – {exp.company}</div>
                  <div className="text-gray-700 text-base mb-2">{exp.description}</div>
                  <hr className="my-4 border-black/10" />
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-2">
                    <span className="flex items-center gap-1"><span role="img" aria-label="takvim">📅</span> {new Date(exp.startDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : 'Devam Ediyor'}</span>
                    {exp.location && <span className="flex items-center gap-1"><span role="img" aria-label="konum">📍</span> {exp.location}</span>}
                    {exp.workType && <span className="flex items-center gap-1"><span role="img" aria-label="çalışma">💼</span> {exp.workType}</span>}
                  </div>
                  {exp.websiteUrl && (
                    <a href={exp.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-black rounded-lg font-semibold text-black hover:bg-black hover:text-white transition text-sm mt-2">
                      <span>Website</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H19.5V12M19.5 6L10.5 15L4.5 9" /></svg>
                    </a>
                  )}
                </div>
                {/* Timeline noktası */}
                <div className="hidden md:block absolute left-1/2 top-8 w-6 h-6 bg-white border-4 border-black rounded-full z-20" style={{transform: 'translateX(-50%)'}}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teknolojiler */}
      <section id="technologies" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-16 text-black text-center">Teknolojiler</h2>
        <div className="bg-white border-2 border-black rounded-2xl p-10 shadow-sm flex flex-col gap-2 max-w-3xl mx-auto">
          <div className="mb-2 text-lg"><b>Diller:</b> Swift, Dart, Kotlin, Java, Python, JavaScript, TypeScript, C, SQL</div>
          <div className="mb-2 text-lg"><b>Teknolojiler & Framework'ler:</b></div>
          <div className="ml-4 text-base">Mobil: SwiftUI, UIKit, Flutter, Android Jetpack</div>
          <div className="ml-4 text-base">Web & Backend: React, Node.js, Express.js, Firebase, Supabase</div>
          <div className="ml-4 text-base">Yapay Zeka: TensorFlow, PyTorch, Scikit-learn, OpenCV, NLTK, Pandas</div>
          <div className="ml-4 text-base">Veritabanı: PostgreSQL, MongoDB</div>
          <div className="ml-4 text-base">Araçlar & Diğer: Git, Docker, Figma, REST API, UML</div>
        </div>
      </section>

      {/* Projeler */}
      <section id="projects" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-16 text-black text-center">Projeler</h2>
        <div className="flex flex-col gap-12">
          {projects.map(project => (
            <div key={project.id} className="flex flex-col lg:flex-row items-center bg-white border-2 border-black rounded-2xl shadow-sm overflow-hidden max-w-4xl mx-auto">
              {/* Sol: Proje görseli (daha büyük, overlay ikonlar) */}
              <div className="relative w-full lg:w-2/3 flex justify-center items-center bg-gray-50" style={{minHeight: '260px'}}>
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-1/4 h-40 object-cover rounded-none lg:rounded-l-2xl"
                  />
                )}
                {/* Overlay ikonlar */}
                <div className="absolute inset-0 flex items-center justify-center gap-6">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-white/90 hover:bg-black hover:text-white transition rounded-full p-3 shadow-lg border border-black flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" /></svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-white/90 hover:bg-black hover:text-white transition rounded-full p-3 shadow-lg border border-black flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H19.5V12M19.5 6L10.5 15L4.5 9" /></svg>
                    </a>
                  )}
                </div>
              </div>
              {/* Sağ: İçerik */}
              <div className="flex-1 p-8 flex flex-col justify-center items-start gap-4 min-w-[220px]">
                <div className="text-2xl font-extrabold text-black mb-1">{project.name}</div>
                <div className="text-gray-700 text-base mb-2">{project.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 border border-black/10 rounded-xl px-3 py-1 text-sm font-semibold text-black">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* İletişim */}
      <section id="contact" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-12 text-black text-center">İletişim</h2>
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <a href="mailto:aliaycicek_7010@hotmail.com" className="text-black hover:text-blue-700 transition"><FaEnvelope size={36} /></a>
            <a href="https://github.com/aliaycicek" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition"><FaGithub size={36} /></a>
            <a href="https://linkedin.com/in/aliaycicek" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-700 transition"><FaLinkedin size={36} /></a>
            <a href="https://wa.me/905439205870" target="_blank" rel="noopener noreferrer" className="text-black hover:text-green-600 transition"><FaWhatsapp size={36} /></a>
          </div>
          <div className="text-lg text-gray-700 mt-4">Bana ulaşmak için yukarıdaki sosyal medya hesaplarımı kullanabilirsiniz.</div>
        </div>
      </section>
    </div>
  );
}

export default App;
