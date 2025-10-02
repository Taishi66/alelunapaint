"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, contentApi } from '@/lib/api';

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
    highlight: string;
}

interface SkillCategory {
    category: string;
    icon: string;
    skills: { name: string; level: number }[];
}

interface Achievement {
    metric: string;
    description: string;
}

interface TextContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutMainText: string;
    aboutSecondaryText: string;
    aboutQuote: string;
    experienceTitle: string;
    experienceSubtitle: string;
    experiences: ExperienceItem[];
    skillsTitle: string;
    skillsSubtitle: string;
    skillsDescription: string;
    skillCategories: SkillCategory[];
    certifications: string[];
    tools: string[];
    skillsQuote: string;
    achievementsTitle: string;
    achievements: Achievement[];
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
}

export default function BackOffice() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [textContent, setTextContent] = useState<TextContent>({
        heroTitle: "Ready to create",
        heroSubtitle: "something extraordinary?",
        heroDescription: "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
        aboutTitle: "Turning vision into reality",
        aboutDescription: "Experienced product leader with a passion for luxury retail and fashion technology.",
        aboutMainText: "I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.",
        aboutSecondaryText: "My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I've built my career on one fundamental belief: premium products deserve premium experiences.",
        aboutQuote: "Excellence isn't a destination—it's a mindset that transforms every touchpoint into an opportunity for delight.",
        experienceTitle: "A decade of",
        experienceSubtitle: "transformation",
        experiences: [
            {
                role: "Senior Product Owner",
                company: "Maison Lumière",
                period: "2018 - Present",
                location: "Paris, France",
                achievements: [
                    "Spearheaded digital transformation resulting in €25M+ revenue increase",
                    "Led cross-functional teams of 15+ across 3 countries",
                    "Launched omnichannel platform serving 2M+ customers globally",
                    "Achieved 40% increase in online conversion rates"
                ],
                highlight: "Transformed traditional luxury retail into digital-first experiences"
            }
        ],
        skillsTitle: "Mastery through",
        skillsSubtitle: "experience",
        skillsDescription: "A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.",
        skillCategories: [
            {
                category: "Product Leadership",
                icon: "🎯",
                skills: [
                    { name: "Product Strategy", level: 95 },
                    { name: "Roadmap Planning", level: 90 }
                ]
            }
        ],
        certifications: [
            "Certified Scrum Product Owner (CSPO)",
            "Google Analytics Certified"
        ],
        tools: ["Jira", "Figma", "Shopify Plus", "Salesforce"],
        skillsQuote: "Skills are built through challenges, refined through experience, and perfected through passion.",
        achievementsTitle: "Achievements",
        achievements: [
            { metric: "+40%", description: "Increase in Online Sales" },
            { metric: "+25%", description: "Customer Retention in 1 Year" }
        ],
        contactTitle: "Ready to create",
        contactSubtitle: "something extraordinary?",
        contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you."
    });
    const [activeTab, setActiveTab] = useState('hero');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (!authApi.isLoggedIn()) {
                router.push('/nadia');
                return;
            }

            try {
                // Verify token with backend
                const userResponse = await authApi.getCurrentUser();
                if (!userResponse.success) {
                    router.push('/nadia');
                    return;
                }

                setIsAuthenticated(true);

                // Load content from API
                const contentResponse = await contentApi.getContent();
                if (contentResponse.success && contentResponse.data) {
                    setTextContent(contentResponse.data);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/nadia');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            router.push('/nadia');
        }
    };

    const handleTextChange = (field: keyof TextContent, value: string) => {
        setTextContent(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            const response = await contentApi.updateContent(textContent);

            if (response.success) {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000);
            } else {
                setSaveStatus('error');
                setTimeout(() => setSaveStatus('idle'), 2000);
            }
        } catch (error) {
            console.error('Save error:', error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }
    };

    const updateExperience = (index: number, field: keyof ExperienceItem, value: string | string[]) => {
        const newExperiences = [...textContent.experiences];
        if (field === 'achievements') {
            newExperiences[index][field] = value as string[];
        } else {
            newExperiences[index][field] = value as string;
        }
        setTextContent(prev => ({ ...prev, experiences: newExperiences }));
    };

    const addExperience = () => {
        const newExperience: ExperienceItem = {
            role: "New Role",
            company: "Company Name",
            period: "2023 - Present",
            location: "Location",
            achievements: ["Achievement 1", "Achievement 2"],
            highlight: "Main highlight"
        };
        setTextContent(prev => ({ ...prev, experiences: [...prev.experiences, newExperience] }));
    };

    const removeExperience = (index: number) => {
        setTextContent(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };


    const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
        const newAchievements = [...textContent.achievements];
        newAchievements[index][field] = value;
        setTextContent(prev => ({ ...prev, achievements: newAchievements }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'hero':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Hero Title</label>
                            <input
                                type="text"
                                value={textContent.heroTitle}
                                onChange={(e) => handleTextChange('heroTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Hero Subtitle</label>
                            <input
                                type="text"
                                value={textContent.heroSubtitle}
                                onChange={(e) => handleTextChange('heroSubtitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Hero Description</label>
                            <textarea
                                value={textContent.heroDescription}
                                onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">About Title</label>
                            <input
                                type="text"
                                value={textContent.aboutTitle}
                                onChange={(e) => handleTextChange('aboutTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">About Description</label>
                            <textarea
                                value={textContent.aboutDescription}
                                onChange={(e) => handleTextChange('aboutDescription', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Main Text</label>
                            <textarea
                                value={textContent.aboutMainText}
                                onChange={(e) => handleTextChange('aboutMainText', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Secondary Text</label>
                            <textarea
                                value={textContent.aboutSecondaryText}
                                onChange={(e) => handleTextChange('aboutSecondaryText', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Quote</label>
                            <textarea
                                value={textContent.aboutQuote}
                                onChange={(e) => handleTextChange('aboutQuote', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-deep mb-2">Experience Title</label>
                                <input
                                    type="text"
                                    value={textContent.experienceTitle}
                                    onChange={(e) => handleTextChange('experienceTitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-deep mb-2">Experience Subtitle</label>
                                <input
                                    type="text"
                                    value={textContent.experienceSubtitle}
                                    onChange={(e) => handleTextChange('experienceSubtitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-deep">Experience Items</h3>
                                <button
                                    onClick={addExperience}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors"
                                >
                                    Add Experience
                                </button>
                            </div>
                            <div className="space-y-6">
                                {textContent.experiences.map((exp, index) => (
                                    <div key={index} className="bg-brand-cream/30 p-6 rounded-xl border border-brand-deep/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-brand-deep">Experience {index + 1}</h4>
                                            <button
                                                onClick={() => removeExperience(index)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep mb-1">Role</label>
                                                <input
                                                    type="text"
                                                    value={exp.role}
                                                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep mb-1">Company</label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep mb-1">Period</label>
                                                <input
                                                    type="text"
                                                    value={exp.period}
                                                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep mb-1">Location</label>
                                                <input
                                                    type="text"
                                                    value={exp.location}
                                                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-deep mb-1">Highlight</label>
                                            <textarea
                                                value={exp.highlight}
                                                onChange={(e) => updateExperience(index, 'highlight', e.target.value)}
                                                rows={2}
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-deep mb-1">Achievements (one per line)</label>
                                            <textarea
                                                value={exp.achievements.join('\n')}
                                                onChange={(e) => updateExperience(index, 'achievements', e.target.value.split('\n').filter(line => line.trim()))}
                                                rows={4}
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-deep mb-2">Skills Title</label>
                                <input
                                    type="text"
                                    value={textContent.skillsTitle}
                                    onChange={(e) => handleTextChange('skillsTitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-deep mb-2">Skills Subtitle</label>
                                <input
                                    type="text"
                                    value={textContent.skillsSubtitle}
                                    onChange={(e) => handleTextChange('skillsSubtitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Skills Description</label>
                            <textarea
                                value={textContent.skillsDescription}
                                onChange={(e) => handleTextChange('skillsDescription', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Skill Categories - Display Only Warning */}
                        <div className="border-t pt-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                                <p className="text-sm text-yellow-800">
                                    <strong>Note:</strong> Skill categories (Product Leadership, Retail Excellence, etc.) are currently hardcoded in the frontend.
                                    To modify them, you need to edit the TextContentContext.tsx file.
                                </p>
                            </div>
                            <h3 className="font-serif text-lg text-brand-deep mb-4">Current Skill Categories</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {textContent.skillCategories.map((category, index) => (
                                    <div key={index} className="bg-brand-cream/30 p-4 rounded-xl border border-brand-deep/10">
                                        <div className="flex items-center mb-2">
                                            <span className="text-2xl mr-2">{category.icon}</span>
                                            <h4 className="font-medium text-brand-deep">{category.category}</h4>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            {category.skills.map((skill, skillIndex) => (
                                                <div key={skillIndex} className="flex justify-between">
                                                    <span>{skill.name}</span>
                                                    <span className="text-brand-gold font-medium">{skill.level}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Skills Quote</label>
                            <textarea
                                value={textContent.skillsQuote}
                                onChange={(e) => handleTextChange('skillsQuote', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-deep mb-2">Certifications (one per line)</label>
                                <textarea
                                    value={textContent.certifications.join('\n')}
                                    onChange={(e) => handleTextChange('certifications', e.target.value.split('\n').filter(line => line.trim()))}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-deep mb-2">Tools (one per line)</label>
                                <textarea
                                    value={textContent.tools.join('\n')}
                                    onChange={(e) => handleTextChange('tools', e.target.value.split('\n').filter(line => line.trim()))}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'achievements':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Achievements Title</label>
                            <input
                                type="text"
                                value={textContent.achievementsTitle}
                                onChange={(e) => handleTextChange('achievementsTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="border-t pt-6">
                            <h3 className="font-serif text-lg text-brand-deep mb-4">Achievement Items</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {textContent.achievements.map((achievement, index) => (
                                    <div key={index} className="bg-brand-cream/30 p-4 rounded-xl border border-brand-deep/10">
                                        <h4 className="font-medium text-brand-deep mb-3">Achievement {index + 1}</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep mb-1">Metric</label>
                                                <input
                                                    type="text"
                                                    value={achievement.metric}
                                                    onChange={(e) => updateAchievement(index, 'metric', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep mb-1">Description</label>
                                                <input
                                                    type="text"
                                                    value={achievement.description}
                                                    onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Contact Title</label>
                            <input
                                type="text"
                                value={textContent.contactTitle}
                                onChange={(e) => handleTextChange('contactTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Contact Subtitle</label>
                            <input
                                type="text"
                                value={textContent.contactSubtitle}
                                onChange={(e) => handleTextChange('contactSubtitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Contact Description</label>
                            <textarea
                                value={textContent.contactDescription}
                                onChange={(e) => handleTextChange('contactDescription', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-deep flex items-center justify-center">
                <div className="text-brand-cream">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Header */}
            <header className="bg-brand-deep text-brand-cream shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="font-serif text-2xl">Back Office</h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Save Status */}
                <div className="mb-6">
                    {saveStatus === 'saving' && (
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </div>
                    )}
                    {saveStatus === 'saved' && (
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Saved successfully!
                        </div>
                    )}
                    {saveStatus === 'error' && (
                        <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Error saving changes
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="font-serif text-xl text-brand-deep mb-6">Sections</h2>
                            <nav className="space-y-2">
                                {[
                                    { id: 'hero', label: 'Hero Section' },
                                    { id: 'about', label: 'About Section' },
                                    { id: 'experience', label: 'Experience Section' },
                                    { id: 'skills', label: 'Skills Section' },
                                    { id: 'achievements', label: 'Achievements Section' },
                                    { id: 'contact', label: 'Contact Section' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
                                            activeTab === tab.id
                                                ? 'bg-brand-gold text-brand-deep font-medium'
                                                : 'text-brand-deep/70 hover:bg-brand-cream/50'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-serif text-2xl text-brand-deep capitalize">
                                    {activeTab} Section
                                </h2>
                                <button
                                    onClick={handleSave}
                                    disabled={saveStatus === 'saving'}
                                    className="px-6 py-3 bg-brand-deep text-brand-cream rounded-lg hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
