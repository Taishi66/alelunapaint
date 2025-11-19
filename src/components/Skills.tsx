"use client";

import { useTextContent } from '@/lib/TextContentContext';

// Helper function to normalize certifications (backward compatibility)
function normalizeCertification(cert: string | { name: string; issuer?: string; date?: string; certificateUrl?: string; credentialId?: string; icon?: string }) {
  if (typeof cert === 'string') {
    // Old format - convert to object (no default icon)
    return {
      name: cert,
      issuer: undefined,
      date: undefined,
      certificateUrl: undefined,
      credentialId: undefined,
      icon: undefined,
    };
  }
  // New format - return as is
  return cert;
}

export default function Skills() {
  const { textContent } = useTextContent();

  // Default soft skills if not defined
  const softSkills = textContent.softSkills || [
    { skill: 'Executive Stakeholder Management', icon: '🤝' },
    { skill: 'Cross-Cultural Communication', icon: '🌍' },
    { skill: 'Luxury Customer Psychology', icon: '✨' },
    { skill: 'Change Management', icon: '🔄' }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream relative overflow-hidden scroll-mt-20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-1/3 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-brand-cream/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
            {textContent.skillsBadge || 'Core Expertise'}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6">
            {textContent.skillsTitle}
            <span className="block text-brand-gold italic mt-1 sm:mt-2">{textContent.skillsSubtitle}</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-cream/80 max-w-3xl mx-auto">
            {textContent.skillsDescription}
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {textContent.skillCategories.map((category, index) => (
            <div key={index} className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-brand-gold/20 hover:bg-brand-cream/10 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl mr-3 md:mr-4">{category.icon}</div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-gold">{category.category}</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-cream font-medium text-sm md:text-base">{skill.name}</span>
                      <span className="text-brand-gold text-sm font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-brand-deep/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-gold to-brand-cream rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills - Critical for Luxury Retail */}
        {softSkills.length > 0 && (
          <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-brand-gold/30">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-gold mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl">💎</span>
                <span>{textContent.skillsSoftSkillsTitle || 'Leadership & Soft Skills'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {softSkills.map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <p className="text-sm md:text-base text-brand-cream font-medium leading-snug">{item.skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications & Tools */}
        <div className="max-w-6xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {/* Certifications - New Enhanced Design */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-gold mb-8 sm:mb-10 text-center flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl">🏆</span>
              <span>{(textContent.skillsCertificationsTitle || 'Certifications').replace('🏆', '').trim()}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {textContent.certifications.map((cert, index) => {
                const normalized = normalizeCertification(cert);
                return (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-brand-cream/5 to-brand-gold/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-500 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden flex flex-col"
                  >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                    {/* Content wrapper */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon - if specified */}
                      {normalized.icon && (
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300 mb-3">
                          {normalized.icon}
                        </div>
                      )}

                      {/* 1. Certification name - fixed height for symmetry */}
                      <h4 className="font-serif text-base sm:text-lg text-brand-cream mb-3 leading-snug min-h-[4.5rem] flex items-start">
                        {normalized.name}
                      </h4>

                      {/* Decorative line separator */}
                      <div className="h-0.5 w-12 bg-gradient-to-r from-brand-gold/50 to-transparent rounded-full mb-4"></div>

                      {/* 2. Issuing organization */}
                      <div className="text-xs sm:text-sm text-brand-cream/70 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold">•</span>
                          <span>{normalized.issuer || 'Professional Certification'}</span>
                        </div>
                        {normalized.date && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-brand-gold">•</span>
                            <span>{normalized.date}</span>
                          </div>
                        )}
                        {normalized.credentialId && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-brand-gold">•</span>
                            <span className="font-mono text-xs">{normalized.credentialId}</span>
                          </div>
                        )}
                      </div>

                      {/* Spacer to push download button to bottom */}
                      <div className="flex-grow"></div>

                      {/* 3. Download link - always at bottom */}
                      {normalized.certificateUrl && (
                        <a
                          href={normalized.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-gold/20 hover:bg-brand-gold/30 rounded-lg text-brand-gold text-sm font-medium transition-all duration-300 hover:scale-105 border border-brand-gold/30 hover:border-brand-gold/50"
                        >
                          <span className="text-base">📥</span>
                          <span>Download Certificate</span>
                        </a>
                      )}
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-brand-gold/20">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-gold mb-6 sm:mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl">🛠️</span>
              <span>{(textContent.skillsToolsTitle || 'Tools & Platforms').replace('🛠️', '').replace('🔧', '').trim()}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {textContent.tools.map((tool, index) => (
                <div key={index} className="bg-brand-gold/10 hover:bg-brand-gold/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center text-sm font-medium transition-all duration-300 hover:scale-105">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="text-center mt-12 sm:mt-16">
          <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-brand-cream/90 max-w-3xl mx-auto px-4">
            &quot;{textContent.skillsQuote}&quot;
          </blockquote>
          <cite className="text-brand-gold font-medium mt-3 sm:mt-4 block text-sm sm:text-base">{textContent.skillsQuoteAuthor || '— Nadia Luna'}</cite>
        </div>
      </div>
    </section>
  );
}
