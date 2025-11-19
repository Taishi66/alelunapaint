"use client";

import { useEffect, useState } from 'react';
import { useTextContent } from '@/lib/TextContentContext';

export default function Nav() {
    const { textContent } = useTextContent();
    const [isOverDark, setIsOverDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [currentSection, setCurrentSection] = useState<string>('Home');

    useEffect(() => {
        const handleScroll = () => {
            // Get all sections
            const heroSection = document.getElementById('hero');
            const aboutSection = document.getElementById('about');
            const experienceSection = document.getElementById('experience');
            const skillsSection = document.getElementById('skills');
            const achievementsSection = document.getElementById('achievements');
            const contactSection = document.getElementById('contact');

            if (!heroSection || !aboutSection || !experienceSection || !skillsSection || !achievementsSection || !contactSection) return;

            const scrollY = window.scrollY + 100; // Header height offset

            // Check if we're in About, Skills, or Achievements sections (dark backgrounds)
            const aboutTop = aboutSection.offsetTop;
            const aboutBottom = aboutTop + aboutSection.offsetHeight;
            const skillsTop = skillsSection.offsetTop;
            const skillsBottom = skillsTop + skillsSection.offsetHeight;
            const achievementsTop = achievementsSection.offsetTop;
            const achievementsBottom = achievementsTop + achievementsSection.offsetHeight;

            const isInAbout = scrollY >= aboutTop && scrollY < aboutBottom;
            const isInSkills = scrollY >= skillsTop && scrollY < skillsBottom;
            const isInAchievements = scrollY >= achievementsTop && scrollY < achievementsBottom;

            setIsOverDark(isInAbout || isInSkills || isInAchievements);

            // Determine current section based on scroll position
            const heroTop = heroSection.offsetTop;
            const heroBottom = heroTop + heroSection.offsetHeight;
            const experienceTop = experienceSection.offsetTop;
            const experienceBottom = experienceTop + experienceSection.offsetHeight;
            const contactTop = contactSection.offsetTop;

            let newCurrentSection = 'Home';

            if (scrollY >= heroTop && scrollY < heroBottom) {
                newCurrentSection = 'Home';
            } else if (scrollY >= aboutTop && scrollY < aboutBottom) {
                newCurrentSection = 'About';
            } else if (scrollY >= experienceTop && scrollY < experienceBottom) {
                newCurrentSection = 'Experience';
            } else if (scrollY >= skillsTop && scrollY < skillsBottom) {
                newCurrentSection = 'Skills';
            } else if (scrollY >= achievementsTop && scrollY < achievementsBottom) {
                newCurrentSection = 'Achievements';
            } else if (scrollY >= contactTop) {
                newCurrentSection = 'Contact';
            }

            setCurrentSection(newCurrentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'contact', label: 'Contact' }
    ];

    const handleNavClick = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-white/20" style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
            <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 flex justify-between items-center">
                {/* Header with dynamic section name */}
                <div className="flex items-center gap-4">
                    <a
                        href="#hero"
                        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold transition-colors duration-500 tracking-wide sm:tracking-wider md:tracking-widest ${textContent.headerFont === 'cormorant' ? 'font-[family-name:var(--font-cormorant)]' :
                            textContent.headerFont === 'bodoni' ? 'font-[family-name:var(--font-bodoni)]' :
                                'font-serif'
                            } ${isOverDark ? 'text-brand-gold' : 'text-brand-deep'}`}
                    >
                        NADIA LUNA
                    </a>

                    {/* Section name that appears on hover or shows current section */}
                    <div
                        className={`hidden md:block overflow-hidden transition-[max-width] duration-300 ease-in-out ${(hoveredSection || currentSection !== 'Home') ? 'max-w-xs' : 'max-w-0'}`}
                        style={{
                            transitionDelay: (hoveredSection || currentSection !== 'Home') ? '0ms' : '0ms'
                        }}
                    >
                        <div className="flex items-center gap-3 whitespace-nowrap">
                            <div
                                className={`w-px h-8 ${isOverDark ? 'bg-brand-gold' : 'bg-brand-deep'}`}
                                style={{
                                    transition: 'background-color 500ms ease-in-out, opacity 300ms ease-in-out',
                                    opacity: (hoveredSection || currentSection !== 'Home') ? 1 : 0
                                }}
                            ></div>
                            <span
                                className={`text-base sm:text-lg md:text-xl font-medium italic ${isOverDark ? 'text-brand-gold' : 'text-brand-deep/70'}`}
                                style={{
                                    transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out, color 500ms ease-in-out',
                                    opacity: (hoveredSection || currentSection !== 'Home') ? 1 : 0,
                                    transform: (hoveredSection || currentSection !== 'Home') ? 'translateX(0)' : 'translateX(-1rem)'
                                }}
                            >
                                {hoveredSection || (currentSection !== 'Home' ? currentSection : '\u00A0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation - Enhanced with labels */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.slice(1).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            onMouseEnter={() => setHoveredSection(item.label)}
                            onMouseLeave={() => setHoveredSection(null)}
                            className="group relative px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-brand-gold/10"
                            aria-label={`Navigate to ${item.label}`}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isOverDark ? 'bg-brand-cream group-hover:bg-brand-gold' : 'bg-brand-deep group-hover:bg-brand-gold'
                                    } group-hover:scale-125`}></div>

                                {/* Label that appears on hover */}
                                <span
                                    className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isOverDark ? 'text-brand-gold' : 'text-brand-deep'
                                        }`}
                                    style={{
                                        maxWidth: hoveredSection === item.label ? '200px' : '0px',
                                        opacity: hoveredSection === item.label ? 1 : 0
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`md:hidden p-2 rounded-lg transition-colors ${isOverDark ? 'text-brand-gold' : 'text-brand-deep'
                        }`}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-white/20 backdrop-blur-3xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <div className="container mx-auto px-4 py-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 hover:bg-brand-gold/10 ${isOverDark ? 'text-brand-cream hover:text-brand-gold' : 'text-brand-deep hover:text-brand-gold'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
