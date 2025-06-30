import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
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

const PROFILE_IMAGE = "https://randomuser.me/api/portraits/men/32.jpg"; // Kendi görselini ekleyebilirsin
const HERO_ILLUSTRATION = "https://assets-global.website-files.com/5e9aa66fd3886c1ecf5c92e6/63e3e2e2e2e2e2e2e2e2e2e2_hero-illustration.svg"; // Sağda gösterilecek illüstrasyon

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

  // Aktif linki belirlemek için scroll event'i
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold tracking-tight">Ali Ayçiçek</div>
          <nav className="hidden md:flex space-x-8 text-base font-medium">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1 transition hover:text-black ${activeLink === link.href ? 'text-black font-bold' : 'text-gray-700'}`}
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
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in-down">
            <ul className="flex flex-col items-center py-4 space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-4 py-2 text-lg transition hover:text-black ${activeLink === link.href ? 'text-black font-bold' : 'text-gray-700'}`}
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
      <section id="about" className="max-w-7xl mx-auto py-20 px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Sol blok: Sosyal ikonlar */}
        <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/5 mb-8 md:mb-0">
          <a href="https://linkedin.com/in/aliaycicek" target="_blank" rel="noopener noreferrer" className="mb-2"><FaLinkedin size={32} className="text-black hover:text-blue-700 transition" /></a>
          <a href="https://github.com/aliaycicek" target="_blank" rel="noopener noreferrer" className="mb-2"><FaGithub size={32} className="text-black hover:text-gray-700 transition" /></a>
          <a href="mailto:aliaycicek_7010@hotmail.com" className="mb-2"><FaEnvelope size={32} className="text-black hover:text-blue-700 transition" /></a>
          <a href="https://wa.me/905439205870" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={32} className="text-black hover:text-green-600 transition" /></a>
        </div>
        {/* Orta blok: Başlık ve özet */}
        <div className="flex-1 text-center md:text-left">
          <div className="text-lg text-gray-600 mb-2">Merhaba Ben</div>
          <h1 className="text-5xl font-extrabold mb-2 text-black">Ali Ayçiçek</h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mobil & React Native Geliştirici</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto md:mx-0">
            Modern web teknolojileri ile yaratıcı ve kullanıcı dostu web uygulamaları geliştiriyorum. Ayrıca mobil uygulama alanında çeşitli projeler geliştiriyorum.
          </p>
        </div>
        {/* Sağ blok: Profil görseli veya illüstrasyon */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img src={HERO_ILLUSTRATION} alt="Profil illüstrasyon" className="w-72 h-72 object-contain" />
        </div>
      </section>

      {/* Yetenekler */}
      <section id="skills" className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-black text-center">Yeteneklerim</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map(skill => (
            <div
              key={skill.id}
              className="flex flex-col items-center justify-center border border-black rounded-xl p-8 bg-white hover:bg-gray-100 transition cursor-pointer shadow-sm"
            >
              {skill.iconUrl && (
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className="w-14 h-14 mb-4 object-contain"
                  loading="lazy"
                />
              )}
              <div className="text-lg font-semibold text-black text-center">{skill.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Eğitim */}
      <section id="educations" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Eğitim</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="font-semibold text-gray-900 text-lg">Işık Üniversitesi</div>
            <div className="text-gray-500 text-sm">Yazılım Mühendisliği Lisans Programı (İngilizce Hazırlık Eğitimi)</div>
            <div className="text-gray-400 text-xs mt-1">Eylül 2020 – Şubat 2022</div>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="font-semibold text-gray-900 text-lg">Beykent Üniversitesi</div>
            <div className="text-gray-500 text-sm">Yazılım Mühendisliği Lisans Programı</div>
            <div className="text-gray-400 text-xs mt-1">Şubat 2022 – Haziran 2025</div>
            <div className="text-gray-700 mt-2 text-sm">İlgili Dersler: Mobil Uygulama Geliştirme, Web Geliştirme, Veritabanı Sistemleri, Algoritmalar ve Veri Yapıları, Doğal Dil İşleme, Nesne Yönelimli Programlama</div>
          </div>
        </div>
      </section>

      {/* Deneyim */}
      <section id="experiences" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Deneyim</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="font-semibold text-gray-900 text-lg">Kurucu Ortak & Yazılım Geliştirici - Kalian Soft</div>
            <div className="text-gray-500 text-sm">TÜBİTAK Marmara Teknopark, Kocaeli | Haziran 2025 – Günümüz</div>
            <div className="text-gray-700 mt-2 text-sm">İki kurucu ortaktan biri olarak TÜBİTAK Marmara Teknopark bünyesinde Kalian Soft teknoloji girişimini kurdum. Finlandiya merkezli bir kuruluş için geliştirilen GreenTech for Transformation projesiyle girişimin ilk uluslararası iş birliğine imza attım. Projenin analiz, tasarım, geliştirme ve test süreçlerini yöneterek 10 Temmuz 2025'te teslim edilmesini hedeflemekteyim. Modern web teknolojileri kullanarak kullanıcı odaklı, ölçeklenebilir ve yüksek performanslı bir web sitesi geliştiriyorum.</div>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="font-semibold text-gray-900 text-lg">Beykent Üniversitesi Mobil Uygulaması</div>
            <div className="text-gray-500 text-sm">Şubat 2024 – Devam Ediyor</div>
            <div className="text-gray-700 mt-2 text-sm">Üniversitemiz için SwiftUI kullanarak iOS mobil uygulaması geliştirdim. Projeyi Android geliştirici ekip arkadaşımla birlikte sıfırdan kurup tüm aşamalarını yönettik. Uygulama ekibi genişletildi; ikinci versiyon geliştiriliyor. Eylül ayında App Store ve Google Play'de yayınlanması hedeflenen proje, aynı zamanda Lisans Öğrencisi Katılımı Araştırma Projesi (LÖAP) kapsamında desteklenmeye hak kazanmıştır.</div>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="font-semibold text-gray-900 text-lg">TÜBİTAK 2209-A Araştırma Projesi</div>
            <div className="text-gray-500 text-sm">Eylül 2023 – Haziran 2024</div>
            <div className="text-gray-700 mt-2 text-sm">TÜBİTAK 2209-A kapsamında desteklenen 'Yapay Zeka Tabanlı İmza Güvenliği ve Doğrulama Modeli' projesinde görev aldım. Yapay zeka ile sahte imza tespit sistemi geliştirme sürecinde, modelin mobil uygulama ve web platformlarına entegrasyonundan sorumluydum. Mobil tarafta kullanıcıların imza yüklemesi ve doğrulama sürecini destekleyen Flutter tabanlı çözümler geliştirdim. Web arayüzü üzerinden imza doğrulama sistemi entegrasyonu için API bağlantılarını ve kullanıcı deneyimi tasarımlarını gerçekleştirdim.</div>
          </div>
        </div>
      </section>

      {/* Teknolojiler */}
      <section id="technologies" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Teknolojiler</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-2"><b>Diller:</b> Swift, Dart, Kotlin, Java, Python, JavaScript, TypeScript, C, SQL</div>
          <div className="mb-2"><b>Teknolojiler & Framework'ler:</b></div>
          <div className="ml-4">Mobil: SwiftUI, UIKit, Flutter, Android Jetpack</div>
          <div className="ml-4">Web & Backend: React, Node.js, Express.js, Firebase, Supabase</div>
          <div className="ml-4">Yapay Zeka: TensorFlow, PyTorch, Scikit-learn, OpenCV, NLTK, Pandas</div>
          <div className="ml-4">Veritabanı: PostgreSQL, MongoDB</div>
          <div className="ml-4">Araçlar & Diğer: Git, Docker, Figma, REST API, UML</div>
        </div>
      </section>

      {/* Projeler */}
      <section id="projects" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Projeler</h2>
        <div className="text-gray-500">Projelerinizi eklemek için API veya admin panelini kullanabilirsiniz.</div>
      </section>

      {/* İletişim */}
      <section id="contact" className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">İletişim</h2>
        <p className="text-gray-700 mb-4">Bana ulaşmak için aşağıdaki sosyal medya hesaplarımı kullanabilirsiniz.</p>
        <div className="flex justify-center space-x-6">
          <a href="mailto:aliaycicek_7010@hotmail.com">
            <FaEnvelope className="w-7 h-7 text-gray-700 hover:text-blue-700 transition" />
          </a>
          <a href="https://github.com/aliaycicek" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-7 h-7 text-gray-700 hover:text-blue-700 transition" />
          </a>
          <a href="https://linkedin.com/in/aliaycicek" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-7 h-7 text-gray-700 hover:text-blue-700 transition" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
