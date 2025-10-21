"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, contentApi } from "@/lib/api";
import { useTextContent } from "@/lib/TextContentContext";
import EmojiPicker from "@/components/EmojiPicker";

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
    icon?: string;
}

interface SoftSkill {
    skill: string;
    icon: string;
}

interface StatItem {
    metric: string;
    label: string;
}

interface ApproachItem {
    title: string;
    description: string;
}

interface ContactFormLabels {
    name: string;
    email: string;
    company: string;
    message: string;
}

interface ContactBottomInfo {
    responseTime: { label: string; value: string };
    location: { label: string; value: string };
    languages: { label: string; value: string };
}

interface TextContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBadge: string;
    heroImage: string;
    heroStats: StatItem[];
    heroCtaText: string;
    heroScrollText: string;
    headerFont: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutMainText: string;
    aboutSecondaryText: string;
    aboutQuote: string;
    aboutBadge: string;
    aboutTitleSuffix: string;
    aboutApproachTitle: string;
    aboutApproachItems: ApproachItem[];
    aboutImpactTitle: string;
    aboutImpactMetrics: StatItem[];
    aboutQuoteAuthor: string;
    experienceTitle: string;
    experienceSubtitle: string;
    experienceBadge: string;
    experienceBottomStats: StatItem[];
    experiences: ExperienceItem[];
    skillsTitle: string;
    skillsSubtitle: string;
    skillsDescription: string;
    skillsBadge: string;
    skillsCertificationsTitle: string;
    skillsToolsTitle: string;
    skillsQuoteAuthor: string;
    skillCategories: SkillCategory[];
    certifications: string[];
    tools: string[];
    skillsQuote: string;
    softSkills: SoftSkill[];
    skillsSoftSkillsTitle: string;
    achievementsTitle: string;
    achievements: Achievement[];
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
    contactBadge: string;
    contactFormTitle: string;
    contactFormLabels: ContactFormLabels;
    contactFormPlaceholders: ContactFormLabels;
    contactSubmitButton: string;
    contactSuccessMessage: string;
    contactErrorMessage: string;
    contactInfoTitle: string;
    contactEmail: string;
    contactLinkedin: string;
    contactPhone: string;
    contactAvailabilityTitle: string;
    contactAvailabilityStatus: string;
    contactAvailabilityDescription: string;
    contactAvailabilityItems: string[];
    contactDownloadText: string;
    contactCvPath: string;
    contactBottomInfo: ContactBottomInfo;
    loadingScreenFirstName: string;
    loadingScreenLastName: string;
    loadingScreenTagline: string;
}

export default function BackOffice() {
    const { refreshContent } = useTextContent();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [textContent, setTextContent] = useState<TextContent>({
        heroTitle: "Ready to create",
        heroSubtitle: "something extraordinary?",
        heroDescription:
            "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
        heroBadge: "",
        heroImage: "/nadia.jpg",
        heroStats: [],
        heroCtaText: "",
        heroScrollText: "",
        headerFont: "playfair",
        aboutTitle: "Turning vision into reality",
        aboutDescription:
            "Experienced product leader with a passion for luxury retail and fashion technology.",
        aboutMainText:
            "I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.",
        aboutSecondaryText:
            "My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I've built my career on one fundamental belief: premium products deserve premium experiences.",
        aboutQuote:
            "Excellence isn't a destination—it's a mindset that transforms every touchpoint into an opportunity for delight.",
        aboutBadge: "",
        aboutTitleSuffix: "",
        aboutApproachTitle: "",
        aboutApproachItems: [],
        aboutImpactTitle: "",
        aboutImpactMetrics: [],
        aboutQuoteAuthor: "",
        experienceTitle: "A decade of",
        experienceSubtitle: "transformation",
        experienceBadge: "",
        experienceBottomStats: [],
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
                    "Achieved 40% increase in online conversion rates",
                ],
                highlight:
                    "Transformed traditional luxury retail into digital-first experiences",
            },
        ],
        skillsTitle: "Mastery through",
        skillsSubtitle: "experience",
        skillsDescription:
            "A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.",
        skillsBadge: "",
        skillsCertificationsTitle: "",
        skillsToolsTitle: "",
        skillsQuoteAuthor: "",
        skillCategories: [
            {
                category: "Product Leadership",
                icon: "🎯",
                skills: [
                    { name: "Product Strategy", level: 95 },
                    { name: "Roadmap Planning", level: 90 },
                ],
            },
        ],
        certifications: [
            "Certified Scrum Product Owner (CSPO)",
            "Google Analytics Certified",
        ],
        tools: ["Jira", "Figma", "Shopify Plus", "Salesforce"],
        skillsQuote:
            "Skills are built through challenges, refined through experience, and perfected through passion.",
        softSkills: [
            { skill: 'Executive Stakeholder Management', icon: '🤝' },
            { skill: 'Cross-Cultural Communication', icon: '🌍' },
            { skill: 'Luxury Customer Psychology', icon: '✨' },
            { skill: 'Change Management', icon: '🔄' }
        ],
        skillsSoftSkillsTitle: "Leadership & Soft Skills",
        achievementsTitle: "Achievements",
        achievements: [
            { metric: "+40%", description: "Increase in Online Sales", icon: "📈" },
            { metric: "+25%", description: "Customer Retention in 1 Year", icon: "🎯" },
        ],
        contactTitle: "Ready to create",
        contactSubtitle: "something extraordinary?",
        contactDescription:
            "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you.",
        contactBadge: "",
        contactFormTitle: "",
        contactFormLabels: { name: "", email: "", company: "", message: "" },
        contactFormPlaceholders: { name: "", email: "", company: "", message: "" },
        contactSubmitButton: "",
        contactSuccessMessage: "",
        contactErrorMessage: "",
        contactInfoTitle: "",
        contactEmail: "",
        contactLinkedin: "",
        contactPhone: "",
        contactAvailabilityTitle: "",
        contactAvailabilityStatus: "",
        contactAvailabilityDescription: "",
        contactAvailabilityItems: [],
        contactDownloadText: "",
        contactCvPath: "/cv.pdf",
        contactBottomInfo: {
            responseTime: { label: "", value: "" },
            location: { label: "", value: "" },
            languages: { label: "", value: "" },
        },
        loadingScreenFirstName: "NADIA",
        loadingScreenLastName: "LUNA",
        loadingScreenTagline: "Product Owner • Luxury Retail",
    });
    const [activeTab, setActiveTab] = useState("hero");
    const [saveStatus, setSaveStatus] = useState<
        "idle" | "saving" | "saved" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [uploadingCv, setUploadingCv] = useState(false);
    const [cvUploadStatus, setCvUploadStatus] = useState<string>("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUploadStatus, setImageUploadStatus] = useState<string>("");
    const [showPreview, setShowPreview] = useState(false); // For mobile toggle
    const router = useRouter();

    // Function to load content from API
    const loadContent = useCallback(async () => {
        try {
            const contentResponse = await contentApi.getContent();
            if (contentResponse.success && contentResponse.data) {
                setTextContent(contentResponse.data as unknown as TextContent);
            }
        } catch (error) {
            console.error("Failed to load content:", error);
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            if (!authApi.isLoggedIn()) {
                router.push("/nadia");
                return;
            }

            try {
                // Verify token with backend
                const userResponse = await authApi.getCurrentUser();
                if (!userResponse.success) {
                    router.push("/nadia");
                    return;
                }

                setIsAuthenticated(true);

                // Load content from API
                await loadContent();
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/nadia");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, loadContent]);

    const handleLogout = async () => {
        try {
            await authApi.logout();
            // Refresh content so homepage shows latest changes
            await refreshContent();
        } finally {
            // Redirect to homepage
            router.push("/");
        }
    };

    const handleTextChange = (
        field: keyof TextContent,
        value: string | string[] | SoftSkill[] | Achievement[],
    ) => {
        setTextContent((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        setSaveStatus("saving");
        setErrorMessage("");
        try {
            const response = await contentApi.updateContent(
                textContent as unknown as Record<string, unknown>,
            );

            if (response.success) {
                setSaveStatus("saved");
                // Reload content from database to ensure we're showing what was actually saved
                await loadContent();
                // Also refresh the TextContentContext so front office shows updated content
                await refreshContent();
                setTimeout(() => setSaveStatus("idle"), 3000);
            } else {
                setSaveStatus("error");
                setErrorMessage(response.message || "Failed to save changes");
                console.error("Save failed:", response);
                setTimeout(() => setSaveStatus("idle"), 5000);
            }
        } catch (error) {
            console.error("Save error:", error);

            // Check if it's an authentication error
            if (error instanceof Error && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
                await authApi.logout();
                router.push('/nadia');
                return;
            }

            setSaveStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Network error occurred",
            );
            setTimeout(() => setSaveStatus("idle"), 5000);
        }
    };

    const updateExperience = (
        index: number,
        field: keyof ExperienceItem,
        value: string | string[],
    ) => {
        const newExperiences = [...textContent.experiences];
        if (field === "achievements") {
            newExperiences[index][field] = value as string[];
        } else {
            newExperiences[index][field] = value as string;
        }
        setTextContent((prev) => ({ ...prev, experiences: newExperiences }));
    };

    const addExperience = () => {
        const newExperience: ExperienceItem = {
            role: "New Role",
            company: "Company Name",
            period: "2023 - Present",
            location: "Location",
            achievements: ["Achievement 1", "Achievement 2"],
            highlight: "Main highlight",
        };
        setTextContent((prev) => ({
            ...prev,
            experiences: [...prev.experiences, newExperience],
        }));
    };

    const removeExperience = (index: number) => {
        setTextContent((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index),
        }));
    };

    const updateAchievement = (
        index: number,
        field: keyof Achievement,
        value: string,
    ) => {
        const newAchievements = [...textContent.achievements];
        newAchievements[index][field] = value;
        setTextContent((prev) => ({ ...prev, achievements: newAchievements }));
    };

    const addAchievement = () => {
        const newAchievement: Achievement = {
            metric: "+0%",
            description: "New Achievement",
        };
        setTextContent((prev) => ({
            ...prev,
            achievements: [...prev.achievements, newAchievement],
        }));
    };

    const removeAchievement = (index: number) => {
        setTextContent((prev) => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index),
        }));
    };

    // Helper functions for StatItem arrays (heroStats, aboutImpactMetrics, experienceBottomStats)
    const updateStatItem = (
        field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
        index: number,
        key: keyof StatItem,
        value: string,
    ) => {
        const newStats = [...textContent[field]];
        newStats[index][key] = value;
        setTextContent((prev) => ({ ...prev, [field]: newStats }));
    };

    const addStatItem = (
        field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
    ) => {
        const newStat: StatItem = { metric: "", label: "" };
        setTextContent((prev) => ({ ...prev, [field]: [...prev[field], newStat] }));
    };

    const removeStatItem = (
        field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
        index: number,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    // Helper functions for ApproachItem array
    const updateApproachItem = (
        index: number,
        key: keyof ApproachItem,
        value: string,
    ) => {
        const newItems = [...textContent.aboutApproachItems];
        newItems[index][key] = value;
        setTextContent((prev) => ({ ...prev, aboutApproachItems: newItems }));
    };

    const addApproachItem = () => {
        const newItem: ApproachItem = { title: "", description: "" };
        setTextContent((prev) => ({
            ...prev,
            aboutApproachItems: [...prev.aboutApproachItems, newItem],
        }));
    };

    const removeApproachItem = (index: number) => {
        setTextContent((prev) => ({
            ...prev,
            aboutApproachItems: prev.aboutApproachItems.filter((_, i) => i !== index),
        }));
    };

    // Helper functions for SkillCategory management
    const updateSkillCategory = (
        index: number,
        key: keyof SkillCategory,
        value: string | { name: string; level: number }[],
    ) => {
        const newCategories = [...textContent.skillCategories];
        if (key === "skills") {
            newCategories[index][key] = value as { name: string; level: number }[];
        } else {
            newCategories[index][key] = value as string;
        }
        setTextContent((prev) => ({ ...prev, skillCategories: newCategories }));
    };

    const addSkillCategory = () => {
        const newCategory: SkillCategory = {
            category: "New Category",
            icon: "⭐",
            skills: [{ name: "New Skill", level: 50 }],
        };
        setTextContent((prev) => ({
            ...prev,
            skillCategories: [...prev.skillCategories, newCategory],
        }));
    };

    const removeSkillCategory = (index: number) => {
        setTextContent((prev) => ({
            ...prev,
            skillCategories: prev.skillCategories.filter((_, i) => i !== index),
        }));
    };

    const updateSkill = (
        categoryIndex: number,
        skillIndex: number,
        key: "name" | "level",
        value: string | number,
    ) => {
        const newCategories = [...textContent.skillCategories];
        if (key === "level") {
            newCategories[categoryIndex].skills[skillIndex][key] = Number(value);
        } else {
            newCategories[categoryIndex].skills[skillIndex][key] = value as string;
        }
        setTextContent((prev) => ({ ...prev, skillCategories: newCategories }));
    };

    const addSkill = (categoryIndex: number) => {
        const newCategories = [...textContent.skillCategories];
        newCategories[categoryIndex].skills.push({ name: "New Skill", level: 50 });
        setTextContent((prev) => ({ ...prev, skillCategories: newCategories }));
    };

    const removeSkill = (categoryIndex: number, skillIndex: number) => {
        const newCategories = [...textContent.skillCategories];
        newCategories[categoryIndex].skills = newCategories[
            categoryIndex
        ].skills.filter((_, i) => i !== skillIndex);
        setTextContent((prev) => ({ ...prev, skillCategories: newCategories }));
    };

    // Helper functions for ContactFormLabels
    const updateContactFormLabels = (
        key: keyof ContactFormLabels,
        value: string,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            contactFormLabels: { ...prev.contactFormLabels, [key]: value },
        }));
    };

    const updateContactFormPlaceholders = (
        key: keyof ContactFormLabels,
        value: string,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            contactFormPlaceholders: {
                ...prev.contactFormPlaceholders,
                [key]: value,
            },
        }));
    };

    // Helper functions for ContactBottomInfo
    const updateContactBottomInfo = (
        section: keyof ContactBottomInfo,
        key: "label" | "value",
        value: string,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            contactBottomInfo: {
                ...prev.contactBottomInfo,
                [section]: { ...prev.contactBottomInfo[section], [key]: value },
            },
        }));
    };

    // Image Upload handler (for hero section)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setImageUploadStatus('Only JPG, PNG, or WebP images are allowed');
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            setImageUploadStatus('File size must be less than 4MB');
            return;
        }

        setUploadingImage(true);
        setImageUploadStatus('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'image');

            const token = localStorage.getItem('accessToken');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.status === 401) {
                await authApi.logout();
                router.push('/nadia');
                return;
            }

            if (result.success) {
                // Add timestamp to force browser to reload the image
                const cacheBustingPath = `${result.data.path}?t=${Date.now()}`;
                setTextContent(prev => ({
                    ...prev,
                    heroImage: cacheBustingPath
                }));
                setImageUploadStatus('Image uploaded successfully!');
            } else {
                setImageUploadStatus(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setImageUploadStatus('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    // CV Upload handler
    const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setCvUploadStatus('Only PDF files are allowed');
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            setCvUploadStatus('File size must be less than 4MB');
            return;
        }

        setUploadingCv(true);
        setCvUploadStatus('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'cv');

            const token = localStorage.getItem('accessToken');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.status === 401) {
                // Token expired or invalid - logout and redirect
                await authApi.logout();
                router.push('/nadia');
                return;
            }

            if (result.success) {
                setTextContent(prev => ({
                    ...prev,
                    contactCvPath: result.data.path
                }));
                setCvUploadStatus('CV uploaded successfully!');
            } else {
                setCvUploadStatus(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setCvUploadStatus('Failed to upload CV');
        } finally {
            setUploadingCv(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "hero":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 p-4 sm:p-5 md:p-6 rounded-2xl border border-brand-gold/30">
                            <label className="block text-xs sm:text-sm font-semibold text-brand-gold mb-3">
                                Header Font (NADIA LUNA)
                            </label>
                            <div className="relative">
                                <select
                                    value={textContent.headerFont || 'playfair'}
                                    onChange={(e) =>
                                        handleTextChange("headerFont", e.target.value)
                                    }
                                    className="w-full px-4 py-3.5 text-sm md:text-base bg-brand-deep/40 backdrop-blur-sm border-2 border-brand-gold/40 text-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-300 cursor-pointer hover:border-brand-gold/60 appearance-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C7A17A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 0.75rem center',
                                        backgroundSize: '1.5em 1.5em',
                                    }}
                                >
                                    <option value="playfair">Playfair Display — Bold & Dramatic</option>
                                    <option value="cormorant">Cormorant Garamond — Refined & Elegant</option>
                                    <option value="bodoni">Bodoni Moda — Ultra-Luxury</option>
                                </select>
                            </div>
                            <p className="text-xs text-brand-cream/70 mt-3 italic">
                                Choose the luxury font for the header navigation &quot;NADIA LUNA&quot;
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Badge
                            </label>
                            <input
                                type="text"
                                value={textContent.heroBadge}
                                onChange={(e) => handleTextChange("heroBadge", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Title
                            </label>
                            <input
                                type="text"
                                value={textContent.heroTitle}
                                onChange={(e) => handleTextChange("heroTitle", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Subtitle
                            </label>
                            <input
                                type="text"
                                value={textContent.heroSubtitle}
                                onChange={(e) =>
                                    handleTextChange("heroSubtitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Description
                            </label>
                            <textarea
                                value={textContent.heroDescription}
                                onChange={(e) =>
                                    handleTextChange("heroDescription", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Image
                            </label>
                            <div className="space-y-4">
                                {/* Image Preview */}
                                {textContent.heroImage && (
                                    <div className="relative w-full max-w-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            key={textContent.heroImage}
                                            src={textContent.heroImage}
                                            alt="Hero preview"
                                            className="w-full h-auto rounded-xl border-2 border-brand-gold/30 shadow-lg"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/nadia.jpg';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* File Upload */}
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleImageUpload}
                                        disabled={uploadingImage}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-cream disabled:opacity-50"
                                    />
                                    {uploadingImage && (
                                        <p className="text-sm text-brand-gold">Uploading image...</p>
                                    )}
                                    {imageUploadStatus && (
                                        <p className={`text-sm ${imageUploadStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                            {imageUploadStatus}
                                        </p>
                                    )}
                                    <p className="text-xs text-brand-cream/60">
                                        Upload an image (JPG, PNG, WebP) - max 4MB. The image will be saved and used for the hero section.
                                    </p>
                                </div>

                                {/* Manual URL Input (optional) */}
                                <div className="border-t border-white/20 pt-4">
                                    <label className="block text-xs font-medium text-brand-cream/70 mb-2">
                                        Or enter image URL manually
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.heroImage}
                                        onChange={(e) =>
                                            handleTextChange("heroImage", e.target.value)
                                        }
                                        placeholder="/nadia.jpg or https://example.com/image.jpg"
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero CTA Text
                            </label>
                            <input
                                type="text"
                                value={textContent.heroCtaText}
                                onChange={(e) =>
                                    handleTextChange("heroCtaText", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Scroll Text
                            </label>
                            <input
                                type="text"
                                value={textContent.heroScrollText}
                                onChange={(e) =>
                                    handleTextChange("heroScrollText", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Hero Stats
                                </h3>
                                <button
                                    onClick={() => addStatItem("heroStats")}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Stat
                                </button>
                            </div>
                            <div className="space-y-4">
                                {textContent.heroStats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Stat {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeStatItem("heroStats", index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Metric
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.metric}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "heroStats",
                                                            index,
                                                            "metric",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.label}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "heroStats",
                                                            index,
                                                            "label",
                                                            e.target.value,
                                                        )
                                                    }
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
            case "about":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                About Badge
                            </label>
                            <input
                                type="text"
                                value={textContent.aboutBadge}
                                onChange={(e) => handleTextChange("aboutBadge", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    About Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.aboutTitle}
                                    onChange={(e) =>
                                        handleTextChange("aboutTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    About Title Suffix
                                </label>
                                <input
                                    type="text"
                                    value={textContent.aboutTitleSuffix}
                                    onChange={(e) =>
                                        handleTextChange("aboutTitleSuffix", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Main Text
                            </label>
                            <textarea
                                value={textContent.aboutMainText}
                                onChange={(e) =>
                                    handleTextChange("aboutMainText", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Secondary Text
                            </label>
                            <textarea
                                value={textContent.aboutSecondaryText}
                                onChange={(e) =>
                                    handleTextChange("aboutSecondaryText", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Approach Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.aboutApproachTitle}
                                    onChange={(e) =>
                                        handleTextChange("aboutApproachTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4 mt-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Approach Items
                                </h3>
                                <button
                                    onClick={addApproachItem}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Item
                                </button>
                            </div>
                            <div className="space-y-4">
                                {textContent.aboutApproachItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Item {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeApproachItem(index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateApproachItem(index, "title", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        updateApproachItem(
                                                            index,
                                                            "description",
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={2}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Impact Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.aboutImpactTitle}
                                    onChange={(e) =>
                                        handleTextChange("aboutImpactTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4 mt-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Impact Metrics
                                </h3>
                                <button
                                    onClick={() => addStatItem("aboutImpactMetrics")}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Metric
                                </button>
                            </div>
                            <div className="space-y-4">
                                {textContent.aboutImpactMetrics.map((metric, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Metric {index + 1}
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    removeStatItem("aboutImpactMetrics", index)
                                                }
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Metric
                                                </label>
                                                <input
                                                    type="text"
                                                    value={metric.metric}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "aboutImpactMetrics",
                                                            index,
                                                            "metric",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={metric.label}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "aboutImpactMetrics",
                                                            index,
                                                            "label",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Quote
                                </label>
                                <textarea
                                    value={textContent.aboutQuote}
                                    onChange={(e) =>
                                        handleTextChange("aboutQuote", e.target.value)
                                    }
                                    rows={3}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Quote Author
                                </label>
                                <input
                                    type="text"
                                    value={textContent.aboutQuoteAuthor}
                                    onChange={(e) =>
                                        handleTextChange("aboutQuoteAuthor", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                );
            case "experience":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Experience Badge
                            </label>
                            <input
                                type="text"
                                value={textContent.experienceBadge}
                                onChange={(e) =>
                                    handleTextChange("experienceBadge", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Experience Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.experienceTitle}
                                    onChange={(e) =>
                                        handleTextChange("experienceTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Experience Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={textContent.experienceSubtitle}
                                    onChange={(e) =>
                                        handleTextChange("experienceSubtitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Bottom Stats
                                </h3>
                                <button
                                    onClick={() => addStatItem("experienceBottomStats")}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Stat
                                </button>
                            </div>
                            <div className="space-y-4">
                                {textContent.experienceBottomStats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Stat {index + 1}
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    removeStatItem("experienceBottomStats", index)
                                                }
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Metric
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.metric}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "experienceBottomStats",
                                                            index,
                                                            "metric",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.label}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "experienceBottomStats",
                                                            index,
                                                            "label",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Experience Items
                                </h3>
                                <button
                                    onClick={addExperience}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Experience
                                </button>
                            </div>
                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                {textContent.experiences.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="bg-brand-cream/30 p-6 rounded-xl border border-brand-deep/10"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-brand-cream">
                                                Experience {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeExperience(index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Role
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.role}
                                                    onChange={(e) =>
                                                        updateExperience(index, "role", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) =>
                                                        updateExperience(index, "company", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Period
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.period}
                                                    onChange={(e) =>
                                                        updateExperience(index, "period", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.location}
                                                    onChange={(e) =>
                                                        updateExperience(index, "location", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                Highlight
                                            </label>
                                            <textarea
                                                value={exp.highlight}
                                                onChange={(e) =>
                                                    updateExperience(index, "highlight", e.target.value)
                                                }
                                                rows={2}
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                Achievements (one per line)
                                            </label>
                                            <textarea
                                                value={exp.achievements.join("\n")}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        index,
                                                        "achievements",
                                                        e.target.value
                                                            .split("\n")
                                                            .filter((line) => line.trim()),
                                                    )
                                                }
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
            case "skills":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Skills Badge
                            </label>
                            <input
                                type="text"
                                value={textContent.skillsBadge}
                                onChange={(e) =>
                                    handleTextChange("skillsBadge", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Skills Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsTitle}
                                    onChange={(e) =>
                                        handleTextChange("skillsTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Skills Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsSubtitle}
                                    onChange={(e) =>
                                        handleTextChange("skillsSubtitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Skills Description
                            </label>
                            <textarea
                                value={textContent.skillsDescription}
                                onChange={(e) =>
                                    handleTextChange("skillsDescription", e.target.value)
                                }
                                rows={3}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Skill Categories */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Skill Categories
                                </h3>
                                <button
                                    onClick={addSkillCategory}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Category
                                </button>
                            </div>
                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                {textContent.skillCategories.map((category, categoryIndex) => (
                                    <div
                                        key={categoryIndex}
                                        className="bg-brand-cream/30 p-6 rounded-xl border border-brand-deep/10"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-brand-cream">
                                                Category {categoryIndex + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeSkillCategory(categoryIndex)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove Category"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Category Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={category.category}
                                                    onChange={(e) =>
                                                        updateSkillCategory(
                                                            categoryIndex,
                                                            "category",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Icon (emoji)
                                                </label>
                                                <EmojiPicker
                                                    value={category.icon}
                                                    onChange={(emoji) =>
                                                        updateSkillCategory(
                                                            categoryIndex,
                                                            "icon",
                                                            emoji,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="border-t border-brand-deep/10 pt-4 mt-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-medium text-brand-cream text-sm">
                                                    Skills in this Category
                                                </h5>
                                                <button
                                                    onClick={() => addSkill(categoryIndex)}
                                                    className="px-3 py-1 bg-brand-gold/80 text-brand-deep text-sm rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                                >
                                                    Add Skill
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {category.skills.map((skill, skillIndex) => (
                                                    <div
                                                        key={skillIndex}
                                                        className="bg-white/10 p-3 rounded-lg"
                                                    >
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-medium text-brand-cream/80">
                                                                Skill {skillIndex + 1}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    removeSkill(categoryIndex, skillIndex)
                                                                }
                                                                className="text-red-500 hover:text-red-700 text-sm"
                                                                title="Remove Skill"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="block text-xs text-brand-cream/70 mb-1">
                                                                    Skill Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={skill.name}
                                                                    onChange={(e) =>
                                                                        updateSkill(
                                                                            categoryIndex,
                                                                            skillIndex,
                                                                            "name",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className="w-full px-2 py-1 bg-white border border-brand-deep/20 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-brand-cream/70 mb-1">
                                                                    Level (%)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={skill.level}
                                                                    onChange={(e) =>
                                                                        updateSkill(
                                                                            categoryIndex,
                                                                            skillIndex,
                                                                            "level",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className="w-full px-2 py-1 bg-white border border-brand-deep/20 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Skills Quote
                                </label>
                                <textarea
                                    value={textContent.skillsQuote}
                                    onChange={(e) =>
                                        handleTextChange("skillsQuote", e.target.value)
                                    }
                                    rows={2}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Quote Author
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsQuoteAuthor}
                                    onChange={(e) =>
                                        handleTextChange("skillsQuoteAuthor", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        {/* Soft Skills Section */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    💎 Soft Skills & Leadership Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsSoftSkillsTitle}
                                    onChange={(e) =>
                                        handleTextChange("skillsSoftSkillsTitle", e.target.value)
                                    }
                                    placeholder="Leadership & Soft Skills"
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Soft Skills Items
                                </h3>
                                <button
                                    onClick={() => {
                                        const updated = [...textContent.softSkills, { skill: '', icon: '🤝' }];
                                        handleTextChange("softSkills", updated);
                                    }}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Soft Skill
                                </button>
                            </div>
                            <div className="space-y-4">
                                {textContent.softSkills.map((softSkill, index) => (
                                    <div key={index} className="bg-brand-cream/30 p-4 rounded-xl">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-deep">Soft Skill {index + 1}</h4>
                                            <button
                                                onClick={() => {
                                                    const updated = textContent.softSkills.filter((_, i) => i !== index);
                                                    handleTextChange("softSkills", updated);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep/80 mb-1">
                                                    Skill Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={softSkill.skill}
                                                    onChange={(e) => {
                                                        const updated = [...textContent.softSkills];
                                                        updated[index].skill = e.target.value;
                                                        handleTextChange("softSkills", updated);
                                                    }}
                                                    placeholder="e.g., Executive Stakeholder Management, Leadership"
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep/80 mb-1">
                                                    Icon (emoji)
                                                </label>
                                                <EmojiPicker
                                                    value={softSkill.icon}
                                                    onChange={(emoji) => {
                                                        const updated = [...textContent.softSkills];
                                                        updated[index].icon = emoji;
                                                        handleTextChange("softSkills", updated);
                                                    }}
                                                    placeholder="🤝"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Certifications Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsCertificationsTitle}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "skillsCertificationsTitle",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Tools Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsToolsTitle}
                                    onChange={(e) =>
                                        handleTextChange("skillsToolsTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Certifications (one per line)
                                </label>
                                <textarea
                                    value={textContent.certifications.join("\n")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "certifications",
                                            e.target.value.split("\n").filter((line) => line.trim()),
                                        )
                                    }
                                    rows={6}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Tools (one per line)
                                </label>
                                <textarea
                                    value={textContent.tools.join("\n")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "tools",
                                            e.target.value.split("\n").filter((line) => line.trim()),
                                        )
                                    }
                                    rows={6}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );
            case "achievements":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Achievements Title
                            </label>
                            <input
                                type="text"
                                value={textContent.achievementsTitle}
                                onChange={(e) =>
                                    handleTextChange("achievementsTitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Achievement Items
                                </h3>
                                <button
                                    onClick={addAchievement}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Achievement
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {textContent.achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Achievement {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeAchievement(index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                        Metric
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={achievement.metric}
                                                        onChange={(e) =>
                                                            updateAchievement(index, "metric", e.target.value)
                                                        }
                                                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                        Icon (emoji)
                                                    </label>
                                                    <EmojiPicker
                                                        value={achievement.icon || ''}
                                                        onChange={(emoji) =>
                                                            updateAchievement(index, "icon", emoji)
                                                        }
                                                        placeholder="📈"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={achievement.description}
                                                    onChange={(e) =>
                                                        updateAchievement(
                                                            index,
                                                            "description",
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={3}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "contact":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Badge
                            </label>
                            <input
                                type="text"
                                value={textContent.contactBadge}
                                onChange={(e) =>
                                    handleTextChange("contactBadge", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Title
                            </label>
                            <input
                                type="text"
                                value={textContent.contactTitle}
                                onChange={(e) =>
                                    handleTextChange("contactTitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Subtitle
                            </label>
                            <input
                                type="text"
                                value={textContent.contactSubtitle}
                                onChange={(e) =>
                                    handleTextChange("contactSubtitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Description
                            </label>
                            <textarea
                                value={textContent.contactDescription}
                                onChange={(e) =>
                                    handleTextChange("contactDescription", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Contact Form
                            </h3>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Form Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.contactFormTitle}
                                    onChange={(e) =>
                                        handleTextChange("contactFormTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="mt-4 bg-brand-cream/30 p-4 rounded-xl">
                                <h4 className="font-medium text-brand-cream mb-3">
                                    Form Labels
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Name Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.name}
                                            onChange={(e) =>
                                                updateContactFormLabels("name", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Email Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.email}
                                            onChange={(e) =>
                                                updateContactFormLabels("email", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Company Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.company}
                                            onChange={(e) =>
                                                updateContactFormLabels("company", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Message Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.message}
                                            onChange={(e) =>
                                                updateContactFormLabels("message", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-brand-cream/30 p-4 rounded-xl">
                                <h4 className="font-medium text-brand-cream mb-3">
                                    Form Placeholders
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Name Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.name}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("name", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Email Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.email}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("email", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Company Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.company}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("company", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Message Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.message}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("message", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Submit Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactSubmitButton}
                                        onChange={(e) =>
                                            handleTextChange("contactSubmitButton", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Success Message
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactSuccessMessage}
                                        onChange={(e) =>
                                            handleTextChange("contactSuccessMessage", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Error Message
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactErrorMessage}
                                        onChange={(e) =>
                                            handleTextChange("contactErrorMessage", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Contact Information
                            </h3>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Info Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.contactInfoTitle}
                                    onChange={(e) =>
                                        handleTextChange("contactInfoTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactEmail}
                                        onChange={(e) =>
                                            handleTextChange("contactEmail", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        LinkedIn
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactLinkedin}
                                        onChange={(e) =>
                                            handleTextChange("contactLinkedin", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactPhone}
                                        onChange={(e) =>
                                            handleTextChange("contactPhone", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Download Resume Text
                                </label>
                                <input
                                    type="text"
                                    value={textContent.contactDownloadText}
                                    onChange={(e) =>
                                        handleTextChange("contactDownloadText", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    CV/Portfolio File
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleCvUpload}
                                        disabled={uploadingCv}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-cream"
                                    />
                                    {cvUploadStatus && (
                                        <p className={`text-sm ${cvUploadStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                            {cvUploadStatus}
                                        </p>
                                    )}
                                    <p className="text-xs text-brand-cream/60">
                                        Current CV: {textContent.contactCvPath || '/cv.pdf'}
                                    </p>
                                    <p className="text-xs text-brand-cream/60">
                                        Upload a PDF file (max 4MB). The file will be saved as cv.pdf.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Availability
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Availability Title
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactAvailabilityTitle}
                                        onChange={(e) =>
                                            handleTextChange(
                                                "contactAvailabilityTitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Availability Status
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.contactAvailabilityStatus}
                                        onChange={(e) =>
                                            handleTextChange(
                                                "contactAvailabilityStatus",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Availability Description
                                </label>
                                <textarea
                                    value={textContent.contactAvailabilityDescription}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "contactAvailabilityDescription",
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Availability Items (one per line)
                                </label>
                                <textarea
                                    value={textContent.contactAvailabilityItems.join("\n")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "contactAvailabilityItems",
                                            e.target.value.split("\n").filter((line) => line.trim()),
                                        )
                                    }
                                    rows={4}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Bottom Info
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-brand-cream/30 p-4 rounded-xl">
                                    <h4 className="font-medium text-brand-cream mb-3">
                                        Response Time
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.responseTime.label}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "responseTime",
                                                        "label",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.responseTime.value}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "responseTime",
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-brand-cream/30 p-4 rounded-xl">
                                    <h4 className="font-medium text-brand-cream mb-3">
                                        Location
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.location.label}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "location",
                                                        "label",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.location.value}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "location",
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-brand-cream/30 p-4 rounded-xl">
                                    <h4 className="font-medium text-brand-cream mb-3">
                                        Languages
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.languages.label}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "languages",
                                                        "label",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.languages.value}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "languages",
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "loading":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                First Name <span className="text-brand-gold">*</span>
                            </label>
                            <input
                                type="text"
                                value={textContent.loadingScreenFirstName}
                                onChange={(e) => handleTextChange("loadingScreenFirstName", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                placeholder="NADIA"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Last Name <span className="text-brand-gold">*</span>
                            </label>
                            <input
                                type="text"
                                value={textContent.loadingScreenLastName}
                                onChange={(e) => handleTextChange("loadingScreenLastName", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                placeholder="LUNA"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={textContent.loadingScreenTagline}
                                onChange={(e) => handleTextChange("loadingScreenTagline", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                placeholder="Product Owner • Luxury Retail"
                            />
                            <p className="text-xs text-brand-cream/60 mt-2">
                                This appears below your name in the loading screen
                            </p>
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
        <div className="min-h-screen bg-brand-deep">
            {/* Save Status - Fixed at top */}
            {saveStatus !== "idle" && (
                <div className="fixed top-4 right-4 z-50 animate-fade-in">
                    {saveStatus === "saving" && (
                        <div className="flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg shadow-lg">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Saving...
                        </div>
                    )}
                    {saveStatus === "saved" && (
                        <div className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg shadow-lg">
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Saved successfully!
                        </div>
                    )}
                    {saveStatus === "error" && (
                        <div className="flex flex-col px-6 py-3 bg-red-100 text-red-700 rounded-lg shadow-lg max-w-md">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="font-medium">Error saving changes</span>
                            </div>
                            {errorMessage && (
                                <p className="mt-1 ml-8 text-sm">{errorMessage}</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="w-full px-2 sm:px-4 md:px-6 py-2 md:py-4 pb-24 md:pb-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    {/* Enhanced Sidebar - Desktop Only */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="sticky top-4 bg-gradient-to-br from-brand-deep to-brand-deep/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-gold/20 p-4">
                            {/* Header */}
                            <div className="mb-6 pb-4 border-b border-brand-gold/20">
                                <h2 className="text-brand-gold font-serif text-xl mb-1">Content Editor</h2>
                                <p className="text-brand-cream/60 text-xs">Manage your portfolio</p>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2 mb-6">
                                {[
                                    { id: "hero", label: "Hero Section", icon: "🏠", desc: "Main banner" },
                                    { id: "about", label: "About", icon: "👤", desc: "Your story" },
                                    { id: "experience", label: "Experience", icon: "💼", desc: "Career path" },
                                    { id: "skills", label: "Skills", icon: "⚡", desc: "Expertise" },
                                    { id: "achievements", label: "Achievements", icon: "🏆", desc: "Milestones" },
                                    { id: "contact", label: "Contact", icon: "📧", desc: "Get in touch" },
                                    { id: "loading", label: "Loading Screen", icon: "✨", desc: "Opening animation" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full p-3 rounded-xl transition-all duration-300 flex items-start gap-3 group backdrop-blur-sm border ${activeTab === tab.id
                                            ? "bg-brand-gold/90 shadow-lg scale-[1.02] border-brand-gold"
                                            : "bg-brand-gold/10 border-brand-gold/20 hover:bg-brand-gold/20 hover:border-brand-gold/40"
                                            }`}
                                        title={tab.label}
                                    >
                                        <span className="text-2xl flex-shrink-0">{tab.icon}</span>
                                        <div className="flex-1 text-left">
                                            <div className={`font-medium text-sm ${activeTab === tab.id ? 'text-brand-deep' : 'text-brand-cream'}`}>
                                                {tab.label}
                                            </div>
                                            <div className={`text-xs ${activeTab === tab.id ? 'text-brand-deep/70' : 'text-brand-cream/50'}`}>
                                                {tab.desc}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <div className="pt-4 border-t border-brand-gold/20">
                                <button
                                    onClick={handleLogout}
                                    className="w-full p-3 bg-red-500/20 backdrop-blur-sm text-brand-cream rounded-xl hover:bg-red-500 hover:text-white transition-all duration-500 shadow-[0_4px_14px_0_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 flex items-center gap-3 group border border-red-500/30 hover:border-red-500"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-sm">Logout</div>
                                        <div className="text-xs text-brand-cream/50 group-hover:text-white/70">Exit dashboard</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Split View: Editor + Preview */}
                    <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-4">
                        {/* Mobile Toggle Buttons */}
                        <div className="md:hidden flex gap-2 mb-2">
                            <button
                                onClick={() => setShowPreview(false)}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${!showPreview
                                    ? 'bg-brand-gold text-brand-deep shadow-lg'
                                    : 'bg-white/10 text-brand-cream border border-white/20'
                                    }`}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => setShowPreview(true)}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${showPreview
                                    ? 'bg-brand-gold text-brand-deep shadow-lg'
                                    : 'bg-white/10 text-brand-cream border border-white/20'
                                    }`}
                            >
                                👁️ Preview
                            </button>
                        </div>

                        {/* Editor Panel */}
                        <div className={`${showPreview ? 'hidden md:block' : 'block'} w-full md:w-[45%] flex-shrink-0`}>
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-3 sm:p-4 md:p-6 md:sticky md:top-4 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-custom pb-32 md:pb-6">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h2 className="font-serif text-lg md:text-xl text-brand-cream capitalize">
                                        Edit {activeTab}
                                    </h2>
                                    <button
                                        onClick={handleSave}
                                        disabled={saveStatus === "saving"}
                                        className="hidden md:block px-4 py-2 bg-brand-gold text-brand-deep rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 font-medium text-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                    >
                                        {saveStatus === "saving" ? "Saving..." : "Save"}
                                    </button>
                                </div>

                                {renderTabContent()}
                            </div>
                        </div>

                        {/* Live Preview Panel */}
                        <div className={`${!showPreview ? 'hidden md:block' : 'block'} flex-1`}>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-3 sm:p-4 md:p-6 md:sticky md:top-4 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-custom pb-32 md:pb-6">
                                <div className="mb-4">
                                    <h3 className="font-serif text-lg text-brand-cream">Live Preview</h3>
                                </div>
                                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                    {/* Header Preview - Only shown for Hero section */}
                                    {activeTab === "hero" && (
                                        <div className="sticky top-0 z-50 backdrop-blur-3xl border-b border-white/20 bg-white/80" style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
                                            <div className="px-6 py-6 md:py-8 flex justify-between items-center">
                                                <div
                                                    className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold transition-colors duration-500 tracking-wider sm:tracking-wider md:tracking-widest ${textContent.headerFont === 'cormorant' ? 'font-[family-name:var(--font-cormorant)]' :
                                                        textContent.headerFont === 'bodoni' ? 'font-[family-name:var(--font-bodoni)]' :
                                                            'font-serif'
                                                        } text-brand-deep`}
                                                >
                                                    NADIA LUNA
                                                </div>
                                                <div className="hidden md:flex items-center gap-2">
                                                    {['about', 'experience', 'skills', 'achievements', 'contact'].map((item) => (
                                                        <div key={item} className="px-3 py-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-deep"></div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Mobile Menu Button */}
                                                <button className="md:hidden p-2 rounded-lg text-brand-deep">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Preview content will be rendered here based on activeTab */}
                                    <div className="transform scale-90 origin-top-left w-[111%]">
                                        {activeTab === "hero" && (
                                            <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10 pt-20 pb-16">
                                                {/* Background decorative elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="container mx-auto px-6 relative z-10">
                                                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                                                        {/* Left column - Content */}
                                                        <div>
                                                            {/* Badge */}
                                                            <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                                <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                                {textContent.heroBadge || 'Product Owner • Luxury Retail Expert'}
                                                            </div>

                                                            {/* Main headline */}
                                                            <h1 className="font-serif text-4xl lg:text-5xl leading-tight text-brand-deep mb-4">
                                                                {textContent.heroTitle}
                                                                <span className="block text-brand-gold italic mt-2">{textContent.heroSubtitle}</span>
                                                            </h1>

                                                            {/* Subtitle */}
                                                            <p className="text-base lg:text-lg text-brand-deep/80 mb-8 leading-relaxed max-w-full">
                                                                {textContent.heroDescription}
                                                            </p>

                                                            {/* Stats */}
                                                            <div className="grid grid-cols-3 gap-6 lg:gap-8 mb-12">
                                                                {(textContent.heroStats && textContent.heroStats.length > 0 ? textContent.heroStats : [
                                                                    { metric: '10+', label: 'Years Experience' },
                                                                    { metric: '€50M+', label: 'Revenue Impact' },
                                                                    { metric: '25+', label: 'Products Launched' }
                                                                ]).map((stat, index) => (
                                                                    <div key={index} className="text-center">
                                                                        <div className="text-3xl lg:text-4xl font-bold text-brand-gold mb-2">{stat.metric}</div>
                                                                        <div className="text-xs sm:text-sm text-brand-deep uppercase tracking-wider font-medium">{stat.label}</div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* CTA Button */}
                                                            <div className="flex justify-start">
                                                                <button className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-deep text-brand-cream font-medium rounded-full transition-all duration-500 shadow-[0_4px_14px_0_rgba(11,19,43,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 text-sm sm:text-base relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/90 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                                                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-gold">{textContent.heroCtaText || "Let's Craft Excellence Together"}</span>
                                                                    <svg className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Right column - Image */}
                                                        <div className="relative flex justify-center lg:justify-start order-first lg:order-last mt-8 lg:mt-0">
                                                            <div className="relative w-full max-w-xs sm:max-w-sm">
                                                                {/* Decorative elements behind image */}
                                                                <div className="absolute -top-4 -right-4 w-full h-full bg-brand-gold/20 rounded-2xl transform rotate-3"></div>
                                                                <div className="absolute -bottom-4 -left-4 w-full h-full bg-brand-deep/10 rounded-2xl transform -rotate-2"></div>

                                                                {/* Main image */}
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    key={textContent.heroImage}
                                                                    src={textContent.heroImage || "/nadia.jpg"}
                                                                    alt="Hero"
                                                                    className="relative z-10 w-full rounded-2xl shadow-2xl object-cover aspect-[3/4]"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src = '/nadia.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Scroll indicator */}
                                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex">
                                                    <div className="flex flex-col items-center text-brand-deep/60">
                                                        <span className="text-xs uppercase tracking-wide mb-2">{textContent.heroScrollText || 'Scroll'}</span>
                                                        <div className="w-6 h-10 border-2 border-brand-deep/20 rounded-full flex justify-center">
                                                            <div className="w-1 h-3 bg-brand-deep/40 rounded-full mt-2 animate-bounce"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "about" && (
                                            <div className="bg-brand-deep text-brand-cream p-8 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-0 left-1/4 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-brand-cream/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-12">
                                                        <div className="inline-flex items-center px-3 py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-4 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                            {textContent.aboutBadge || 'About Me'}
                                                        </div>
                                                        <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
                                                            {textContent.aboutTitle}
                                                            <span className="block text-brand-gold italic mt-1">{textContent.aboutTitleSuffix || 'reality'}</span>
                                                        </h2>
                                                        <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
                                                        {/* Left column - Main content */}
                                                        <div className="space-y-6">
                                                            <div className="space-y-4">
                                                                <p className="text-sm md:text-base leading-relaxed text-brand-cream/90">{textContent.aboutMainText}</p>
                                                                <p className="text-xs md:text-sm leading-relaxed text-brand-cream/80">{textContent.aboutSecondaryText}</p>
                                                            </div>

                                                            {/* Key principles */}
                                                            <div className="space-y-4">
                                                                <h3 className="text-lg font-serif text-brand-gold mb-4">{textContent.aboutApproachTitle || 'My Approach'}</h3>
                                                                <div className="space-y-4">
                                                                    {(textContent.aboutApproachItems && textContent.aboutApproachItems.length > 0 ? textContent.aboutApproachItems : [
                                                                        { title: 'Customer-First Philosophy', description: 'Every decision starts with understanding the customer\'s deepest needs and desires' },
                                                                        { title: 'Data-Driven Innovation', description: 'Combining intuition with analytics to create breakthrough solutions' },
                                                                        { title: 'Cross-Functional Leadership', description: 'Building bridges between teams to deliver cohesive, impactful products' }
                                                                    ]).map((item, index) => (
                                                                        <div key={index} className="bg-brand-cream/5 rounded-xl p-4 border-l-4 border-brand-gold">
                                                                            <h4 className="font-semibold text-brand-cream mb-2 text-sm">{item.title}</h4>
                                                                            <p className="text-brand-cream/70 text-xs leading-relaxed">{item.description}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right column - Stats & highlights */}
                                                        <div className="space-y-6">
                                                            {/* Impact metrics */}
                                                            <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-gold/20">
                                                                <h3 className="text-lg font-serif text-brand-gold mb-4">{textContent.aboutImpactTitle || 'Impact at a Glance'}</h3>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    {(textContent.aboutImpactMetrics && textContent.aboutImpactMetrics.length > 0 ? textContent.aboutImpactMetrics : [
                                                                        { metric: '€50M+', label: 'Revenue Generated' },
                                                                        { metric: '40%', label: 'Avg Growth Rate' },
                                                                        { metric: '25+', label: 'Products Launched' },
                                                                        { metric: '15+', label: 'Teams Led' }
                                                                    ]).map((item, index) => (
                                                                        <div key={index} className="text-center bg-brand-gold/10 rounded-xl p-4">
                                                                            <div className="text-2xl font-bold text-brand-gold mb-2">{item.metric}</div>
                                                                            <div className="text-xs text-brand-cream uppercase tracking-wide">{item.label}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Quote */}
                                                            {textContent.aboutQuote && (
                                                                <div className="relative bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 border border-brand-gold/20">
                                                                    <blockquote className="text-sm italic text-brand-cream/90 text-center">
                                                                        &quot;{textContent.aboutQuote}&quot;
                                                                    </blockquote>
                                                                    <div className="text-center mt-3">
                                                                        <cite className="text-brand-gold font-medium text-xs">{textContent.aboutQuoteAuthor || '— Nadia Luna'}</cite>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "experience" && (
                                            <div className="bg-brand-cream p-8 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-1/4 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-12">
                                                        <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                            {textContent.experienceBadge || 'Career Journey'}
                                                        </div>
                                                        <h2 className="font-serif text-4xl leading-tight text-brand-deep mb-6">
                                                            {textContent.experienceTitle}
                                                            <span className="block text-brand-gold italic">{textContent.experienceSubtitle}</span>
                                                        </h2>
                                                        <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
                                                    </div>

                                                    {/* Timeline */}
                                                    <div className="max-w-4xl mx-auto">
                                                        <div className="relative">
                                                            {/* Vertical line - centered */}
                                                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-deep/20 to-brand-gold transform -translate-x-1/2"></div>

                                                            <div className="space-y-12">
                                                                {textContent.experiences.map((exp, index) => (
                                                                    <div key={index} className="relative flex items-center">
                                                                        {/* Timeline dot - centered */}
                                                                        <div className="absolute left-1/2 w-4 h-4 bg-brand-gold rounded-full border-4 border-brand-cream shadow-lg z-10 transform -translate-x-1/2"></div>

                                                                        {/* Content card - alternating sides */}
                                                                        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'ml-auto pl-8'} bg-white rounded-2xl shadow-xl p-6 border border-brand-gold/10`}>
                                                                            <div className="mb-4">
                                                                                <h3 className="font-serif text-2xl text-brand-deep mb-2">{exp.role}</h3>
                                                                                <div className="text-brand-gold font-medium mb-2">
                                                                                    <div className="text-lg">{exp.company}</div>
                                                                                    <div className="text-sm mt-1">{exp.location}</div>
                                                                                </div>
                                                                                <div className="mt-2">
                                                                                    <span className="inline-block bg-brand-deep/5 px-3 py-1 rounded-full text-brand-deep font-medium text-xs">{exp.period}</span>
                                                                                </div>
                                                                            </div>

                                                                            {/* Highlight */}
                                                                            <div className="bg-brand-gold/10 rounded-xl p-3 mb-4 border-l-4 border-brand-gold">
                                                                                <p className="text-brand-deep font-medium italic text-sm">{exp.highlight}</p>
                                                                            </div>

                                                                            {/* Achievements */}
                                                                            <div className="space-y-2">
                                                                                {exp.achievements.map((achievement, i) => (
                                                                                    <div key={i} className="flex items-start space-x-3">
                                                                                        <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                                                                                        <p className="text-brand-deep/80 text-sm leading-relaxed">{achievement}</p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom stats */}
                                                    <div className="text-center mt-12">
                                                        <div className="inline-flex items-center space-x-4 bg-brand-deep/5 rounded-2xl p-6">
                                                            {(textContent.experienceBottomStats && textContent.experienceBottomStats.length > 0 ? textContent.experienceBottomStats : [
                                                                { metric: '10+', label: 'Years' },
                                                                { metric: '€50M+', label: 'Impact' },
                                                                { metric: '25+', label: 'Products' }
                                                            ]).map((stat, index) => (
                                                                <div key={index} className="flex items-center">
                                                                    {index > 0 && <div className="w-px h-12 bg-brand-gold/30 mr-4"></div>}
                                                                    <div className="text-brand-deep">
                                                                        <div className="text-xl font-bold">{stat.metric}</div>
                                                                        <div className="text-xs uppercase tracking-wide">{stat.label}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "skills" && (
                                            <div className="bg-brand-deep text-brand-cream p-8 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-10 left-1/3 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-brand-cream/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-8">
                                                        {textContent.skillsBadge && (
                                                            <div className="inline-flex items-center px-3 py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-3 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                                {textContent.skillsBadge}
                                                            </div>
                                                        )}
                                                        <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-3">
                                                            {textContent.skillsTitle}
                                                            <span className="block text-brand-gold italic text-xl md:text-3xl">{textContent.skillsSubtitle}</span>
                                                        </h2>
                                                        <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-4"></div>
                                                        <p className="text-sm text-brand-cream/80 max-w-2xl mx-auto">
                                                            {textContent.skillsDescription}
                                                        </p>
                                                    </div>

                                                    {/* Skills grid */}
                                                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                                                        {textContent.skillCategories.map((category, index) => (
                                                            <div key={index} className="bg-brand-cream/5 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/20 hover:bg-brand-cream/10 transition-all duration-300">
                                                                <div className="flex items-center mb-3">
                                                                    <div className="text-xl mr-2">{category.icon}</div>
                                                                    <h3 className="font-serif text-base text-brand-gold">{category.category}</h3>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    {category.skills.map((skill, skillIndex) => (
                                                                        <div key={skillIndex} className="space-y-1">
                                                                            <div className="flex justify-between items-center">
                                                                                <span className="text-brand-cream font-medium text-xs">{skill.name}</span>
                                                                                <span className="text-brand-gold text-xs font-bold">{skill.level}%</span>
                                                                            </div>
                                                                            <div className="h-1.5 bg-brand-deep/30 rounded-full overflow-hidden">
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

                                                    {/* Soft Skills Section */}
                                                    {textContent.softSkills && textContent.softSkills.length > 0 && (
                                                        <div className="max-w-4xl mx-auto mb-8">
                                                            <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-gold/30">
                                                                <h3 className="font-serif text-xl text-brand-gold mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                                                                    <span className="text-2xl">💎</span>
                                                                    <span>Leadership & Soft Skills</span>
                                                                </h3>
                                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                                    {textContent.softSkills.map((item, index) => (
                                                                        <div key={index} className="text-center group">
                                                                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                                                            <p className="text-xs text-brand-cream font-medium leading-snug">{item.skill}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Certifications & Tools */}
                                                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                                                        {/* Certifications */}
                                                        <div className="bg-brand-cream/5 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/20">
                                                            <h3 className="font-serif text-base text-brand-gold mb-3 flex items-center">
                                                                {textContent.skillsCertificationsTitle || '🏆 Certifications'}
                                                            </h3>
                                                            <div className="space-y-2">
                                                                {textContent.certifications.slice(0, 4).map((cert, index) => (
                                                                    <div key={index} className="flex items-center space-x-2">
                                                                        <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                                                                        <span className="text-xs">{cert}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Tools & Technologies */}
                                                        <div className="bg-brand-cream/5 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/20">
                                                            <h3 className="font-serif text-base text-brand-gold mb-3 flex items-center">
                                                                {textContent.skillsToolsTitle || '🛠️ Tools & Platforms'}
                                                            </h3>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {textContent.tools.slice(0, 6).map((tool, index) => (
                                                                    <div key={index} className="bg-brand-gold/10 rounded-lg px-2 py-1.5 text-center text-xs font-medium">
                                                                        {tool}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom quote */}
                                                    <div className="text-center mt-6">
                                                        <blockquote className="text-sm italic text-brand-cream/90 max-w-2xl mx-auto">
                                                            &quot;{textContent.skillsQuote}&quot;
                                                        </blockquote>
                                                        <cite className="text-brand-gold font-medium mt-2 block text-xs">{textContent.skillsQuoteAuthor || '— Nadia Luna'}</cite>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "achievements" && (
                                            <div className="bg-brand-deep text-brand-cream p-4 sm:p-6 md:p-8 min-h-[500px]">
                                                {/* Section header */}
                                                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                                                    <div className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-3 sm:mb-4 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                        Key Achievements
                                                    </div>
                                                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">{textContent.achievementsTitle}</h2>
                                                    <div className="w-12 sm:w-16 h-1 bg-brand-gold mx-auto"></div>
                                                </div>

                                                {/* Achievements grid - responsive */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
                                                    {textContent.achievements.map((achievement, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="group relative bg-gradient-to-br from-brand-cream/5 to-brand-gold/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300"
                                                        >
                                                            {/* Icon */}
                                                            {achievement.icon && (
                                                                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
                                                                    {achievement.icon}
                                                                </div>
                                                            )}

                                                            {/* Metric */}
                                                            <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-gold mb-2 sm:mb-3 md:mb-4 leading-none">
                                                                {achievement.metric}
                                                            </div>

                                                            {/* Description */}
                                                            <h3 className="text-sm sm:text-base font-semibold text-brand-cream leading-snug">
                                                                {achievement.description}
                                                            </h3>

                                                            {/* Decorative line */}
                                                            <div className="h-1 w-8 bg-brand-gold/50 rounded-full mt-2 sm:mt-3"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "contact" && (
                                            <div className="bg-brand-cream p-6 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-1/4 left-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-6">
                                                        {textContent.contactBadge && (
                                                            <div className="inline-flex items-center px-2 py-1 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-xs mb-2 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                                {textContent.contactBadge}
                                                            </div>
                                                        )}
                                                        <h2 className="font-serif text-2xl leading-tight text-brand-deep mb-2">
                                                            {textContent.contactTitle}
                                                            <span className="block text-brand-gold italic text-xl">{textContent.contactSubtitle}</span>
                                                        </h2>
                                                        <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-3"></div>
                                                        <p className="text-xs text-brand-deep/80 max-w-xl mx-auto">
                                                            {textContent.contactDescription}
                                                        </p>
                                                    </div>

                                                    {/* Two-column grid */}
                                                    <div className="grid lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
                                                        {/* Contact Form */}
                                                        <div className="bg-white rounded-2xl shadow-xl p-4 border border-brand-gold/10">
                                                            <h3 className="font-serif text-sm text-brand-deep mb-3">{textContent.contactFormTitle || 'Send a Message'}</h3>
                                                            <div className="space-y-2">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-brand-deep mb-1">
                                                                            {textContent.contactFormLabels?.name || 'Full Name'} <span className="text-brand-gold">*</span>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            placeholder={textContent.contactFormPlaceholders?.name || 'Your name'}
                                                                            className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs"
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-brand-deep mb-1">
                                                                            {textContent.contactFormLabels?.email || 'Email'} <span className="text-brand-gold">*</span>
                                                                        </label>
                                                                        <input
                                                                            type="email"
                                                                            placeholder={textContent.contactFormPlaceholders?.email || 'your@email.com'}
                                                                            className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs"
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-brand-deep mb-1">{textContent.contactFormLabels?.company || 'Company'}</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={textContent.contactFormPlaceholders?.company || 'Your company'}
                                                                        className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs"
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-brand-deep mb-1">
                                                                        {textContent.contactFormLabels?.message || 'Message'} <span className="text-brand-gold">*</span>
                                                                    </label>
                                                                    <textarea
                                                                        placeholder={textContent.contactFormPlaceholders?.message || 'Tell me about your project...'}
                                                                        rows={3}
                                                                        className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs resize-none"
                                                                        disabled
                                                                    ></textarea>
                                                                </div>
                                                                <button className="w-full bg-brand-deep text-brand-cream font-medium py-2 px-3 rounded-xl text-xs" disabled>
                                                                    {textContent.contactSubmitButton || 'Send Message'}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Contact Info & CTA */}
                                                        <div className="space-y-3">
                                                            {/* Direct contact */}
                                                            <div className="bg-brand-deep rounded-2xl p-3 border-2 border-brand-gold shadow-lg">
                                                                <h3 className="font-serif text-sm text-brand-cream mb-3">{textContent.contactInfoTitle || 'Get in Touch Directly'}</h3>
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-xs">📧</div>
                                                                        <div>
                                                                            <div className="font-medium text-brand-cream text-xs">Email</div>
                                                                            <div className="text-brand-gold text-xs break-all font-medium">{textContent.contactEmail || 'nadia.luna@email.com'}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-xs">💼</div>
                                                                        <div>
                                                                            <div className="font-medium text-brand-cream text-xs">LinkedIn</div>
                                                                            <div className="text-brand-gold text-xs break-all font-medium">{textContent.contactLinkedin ? textContent.contactLinkedin.replace('https://', '').replace('http://', '') : 'linkedin.com/in/nadialuna'}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-xs">📱</div>
                                                                        <div>
                                                                            <div className="font-medium text-brand-cream text-xs">Phone</div>
                                                                            <div className="text-brand-gold text-xs font-medium">{textContent.contactPhone || '+33 1 23 45 67 89'}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Availability */}
                                                            <div className="bg-brand-gold/10 rounded-2xl p-3 border border-brand-gold/30">
                                                                <h3 className="font-serif text-sm text-brand-deep mb-2">{textContent.contactAvailabilityTitle || 'Current Availability'}</h3>
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                                    <span className="text-brand-deep font-medium text-xs">{textContent.contactAvailabilityStatus || 'Available for new opportunities'}</span>
                                                                </div>
                                                                <p className="text-brand-deep/80 mb-2 text-xs">
                                                                    {textContent.contactAvailabilityDescription || "I'm currently exploring exciting product leadership roles."}
                                                                </p>
                                                                <div className="space-y-0.5 text-xs text-brand-deep/70">
                                                                    {(textContent.contactAvailabilityItems && textContent.contactAvailabilityItems.length > 0 ? textContent.contactAvailabilityItems : [
                                                                        'Strategic consulting projects',
                                                                        'Full-time product leadership roles',
                                                                        'Speaking engagements & workshops'
                                                                    ]).slice(0, 3).map((item, index) => (
                                                                        <div key={index}>• {item}</div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Download CV */}
                                                            <div className="text-center">
                                                                <button
                                                                    className="group inline-flex items-center justify-center px-4 py-2 bg-brand-deep text-brand-cream font-medium rounded-full text-xs transition-all duration-500 shadow-[0_4px_14px_0_rgba(11,19,43,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/90 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                                                    disabled
                                                                >
                                                                    <span className="text-sm mr-1.5">📄</span>
                                                                    {textContent.contactDownloadText || 'Download Full Portfolio'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom section */}
                                                    <div className="text-center mt-6">
                                                        <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-brand-deep/5 rounded-2xl p-3">
                                                            <div className="text-brand-deep text-center">
                                                                <div className="text-xs font-medium">{textContent.contactBottomInfo?.responseTime?.label || 'Response Time'}</div>
                                                                <div className="text-sm font-bold text-brand-gold">{textContent.contactBottomInfo?.responseTime?.value || '24h'}</div>
                                                            </div>
                                                            <div className="hidden sm:block w-px h-8 bg-brand-gold/30"></div>
                                                            <div className="text-brand-deep text-center">
                                                                <div className="text-xs font-medium">{textContent.contactBottomInfo?.location?.label || 'Based in'}</div>
                                                                <div className="text-sm font-bold text-brand-gold">{textContent.contactBottomInfo?.location?.value || 'Paris'}</div>
                                                            </div>
                                                            <div className="hidden sm:block w-px h-8 bg-brand-gold/30"></div>
                                                            <div className="text-brand-deep text-center">
                                                                <div className="text-xs font-medium">{textContent.contactBottomInfo?.languages?.label || 'Languages'}</div>
                                                                <div className="text-sm font-bold text-brand-gold">{textContent.contactBottomInfo?.languages?.value || 'EN • FR • ESP'}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "loading" && (
                                            <div className="bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10 min-h-screen flex items-center justify-center relative overflow-hidden">
                                                {/* Background decorative elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                {/* Loading screen preview */}
                                                <div className="relative z-10 text-center">
                                                    <div className="overflow-hidden">
                                                        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-2">
                                                            <span className="text-brand-deep">{textContent.loadingScreenFirstName || "NADIA"}</span>
                                                        </h1>
                                                    </div>
                                                    <div className="overflow-hidden mt-2">
                                                        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic tracking-wider">
                                                            <span className="text-brand-gold">{textContent.loadingScreenLastName || "LUNA"}</span>
                                                        </h2>
                                                    </div>
                                                    <div className="mt-8 md:mt-12">
                                                        <p className="text-brand-deep/70 text-sm md:text-base tracking-[0.3em] uppercase font-medium">
                                                            {textContent.loadingScreenTagline || "Product Owner • Luxury Retail"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-deep border-t border-brand-gold/20 shadow-2xl z-40">
                {/* Tab Navigation */}
                <div className="flex justify-around sm:justify-around overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {[
                        { id: "hero", label: "Hero", icon: "🏠" },
                        { id: "about", label: "About", icon: "👤" },
                        { id: "experience", label: "Experience", icon: "💼" },
                        { id: "skills", label: "Skills", icon: "⚡" },
                        { id: "achievements", label: "Achievements", icon: "🏆" },
                        { id: "contact", label: "Contact", icon: "📧" },
                        { id: "loading", label: "Loading", icon: "✨" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setShowPreview(false); // Switch to edit view when changing tabs
                            }}
                            className={`flex-shrink-0 flex flex-col items-center justify-center px-3 py-2 min-w-[60px] transition-all duration-300 snap-center ${activeTab === tab.id
                                ? 'bg-brand-gold/20 border-t-2 border-brand-gold'
                                : 'border-t-2 border-transparent'
                                }`}
                        >
                            <span className="text-lg mb-0.5">{tab.icon}</span>
                            <span className={`text-[10px] font-medium ${activeTab === tab.id ? 'text-brand-gold' : 'text-brand-cream/70'}`}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="flex gap-2 p-2 bg-brand-deep/95 border-t border-brand-gold/10">
                    <button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="flex-1 py-3 px-4 bg-brand-gold text-brand-deep rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 font-medium text-sm flex items-center justify-center gap-2 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                        {saveStatus === "saving" ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                💾 Save Changes
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="py-3 px-4 bg-red-500/20 text-brand-cream rounded-xl hover:bg-red-500 hover:text-white transition-all duration-500 shadow-[0_4px_14px_0_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 font-medium border border-red-500/30 hover:border-red-500 text-sm flex items-center justify-center gap-2"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
