"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { contentApi } from "./api";

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

interface Certification {
    name: string;
    issuer?: string;
    date?: string;
    certificateUrl?: string;
    credentialId?: string;
    icon?: string;
}

interface TextContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBadge: string;
    heroImage: string;
    heroStats: { metric: string; label: string }[];
    heroCtaText: string;
    heroScrollText: string;
    headerFont: string;
    loadingScreenFirstName: string;
    loadingScreenLastName: string;
    loadingScreenTagline: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutMainText: string;
    aboutSecondaryText: string;
    aboutQuote: string;
    aboutBadge: string;
    aboutTitleSuffix: string;
    aboutApproachTitle: string;
    aboutApproachItems: { title: string; description: string }[];
    aboutImpactTitle: string;
    aboutImpactMetrics: { metric: string; label: string }[];
    aboutQuoteAuthor: string;
    experienceTitle: string;
    experienceSubtitle: string;
    experiences: ExperienceItem[];
    experienceBadge: string;
    experienceBottomStats: { metric: string; label: string }[];
    skillsTitle: string;
    skillsSubtitle: string;
    skillsDescription: string;
    skillCategories: SkillCategory[];
    certifications: (string | Certification)[];
    tools: string[];
    skillsQuote: string;
    skillsBadge: string;
    skillsCertificationsTitle: string;
    skillsToolsTitle: string;
    skillsQuoteAuthor: string;
    softSkills: SoftSkill[];
    skillsSoftSkillsTitle: string;
    achievementsTitle: string;
    achievements: Achievement[];
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
    contactBadge: string;
    contactFormTitle: string;
    contactFormLabels: {
        name: string;
        email: string;
        company: string;
        message: string;
    };
    contactFormPlaceholders: {
        name: string;
        email: string;
        company: string;
        message: string;
    };
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
    contactBottomInfo: {
        responseTime: { label: string; value: string };
        location: { label: string; value: string };
        languages: { label: string; value: string };
    };
}

interface TextContentContextType {
    textContent: TextContent;
    updateTextContent: (content: Partial<TextContent>) => void;
    refreshContent: () => Promise<void>;
}

const defaultTextContent: TextContent = {
    heroTitle: "Ready to create",
    heroSubtitle: "something extraordinary?",
    heroDescription: "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
    heroImage: "/nadia.jpg",
    headerFont: "playfair",
    loadingScreenFirstName: "NADIA",
    loadingScreenLastName: "LUNA",
    loadingScreenTagline: "Product Owner • Luxury Retail",
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
                "Achieved 40% increase in online conversion rates",
            ],
            highlight: "Transformed traditional luxury retail into digital-first experiences",
        },
        {
            role: "Product Manager",
            company: "RetailTech Innovations",
            period: "2015 - 2018",
            location: "London, UK",
            achievements: [
                "Managed €15M product portfolio across 8 retail brands",
                "Increased customer engagement by 35% through AI-driven personalization",
                "Reduced time-to-market by 50% with agile methodologies",
                "Built and scaled product team from 5 to 20 members",
            ],
            highlight: "Pioneered data-driven product strategies in luxury retail",
        },
        {
            role: "Junior Product Manager",
            company: "Fashion Forward Startup",
            period: "2012 - 2015",
            location: "Milan, Italy",
            achievements: [
                "Co-launched mobile app with 500K+ downloads in first year",
                "Featured in Vogue Business and WWD for innovation",
                "Grew user base by 300% through strategic partnerships",
                "Established product development processes from ground up",
            ],
            highlight: "Laid foundation for product excellence in emerging fashion tech",
        },
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
                { name: "Roadmap Planning", level: 90 },
                { name: "Stakeholder Management", level: 92 },
                { name: "Cross-functional Leadership", level: 88 },
            ],
        },
        {
            category: "Retail Excellence",
            icon: "🏪",
            skills: [
                { name: "Luxury Retail Strategy", level: 95 },
                { name: "Omnichannel Experience", level: 90 },
                { name: "Customer Journey Mapping", level: 85 },
                { name: "Brand Positioning", level: 88 },
            ],
        },
        {
            category: "Digital Innovation",
            icon: "⚡",
            skills: [
                { name: "Digital Transformation", level: 92 },
                { name: "E-commerce Platforms", level: 88 },
                { name: "Data Analytics", level: 85 },
                { name: "AI/ML Applications", level: 80 },
            ],
        },
        {
            category: "Business Impact",
            icon: "📈",
            skills: [
                { name: "Revenue Growth", level: 95 },
                { name: "Market Expansion", level: 88 },
                { name: "Process Optimization", level: 90 },
                { name: "Team Scaling", level: 85 },
            ],
        },
    ],
    certifications: [
        "Certified Scrum Product Owner (CSPO)",
        "Google Analytics Certified",
        "Luxury Brand Management (HEC Paris)",
        "Design Thinking Practitioner",
    ],
    tools: [
        "Jira",
        "Figma",
        "Shopify Plus",
        "Salesforce",
        "Tableau",
        "Miro",
        "Slack",
        "Notion",
    ],
    skillsQuote: "Skills are built through challenges, refined through experience, and perfected through passion.",
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
        { metric: "10+", description: "New Boutiques Opened Worldwide", icon: "🏆" },
        { metric: "+30%", description: "Improvement in Customer Engagement", icon: "💎" },
    ],
    contactTitle: "Ready to create",
    contactSubtitle: "something extraordinary?",
    contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you.",
    heroBadge: "",
    heroStats: [],
    heroCtaText: "",
    heroScrollText: "",
    aboutBadge: "",
    aboutTitleSuffix: "",
    aboutApproachTitle: "",
    aboutApproachItems: [],
    aboutImpactTitle: "",
    aboutImpactMetrics: [],
    aboutQuoteAuthor: "",
    experienceBadge: "",
    experienceBottomStats: [],
    skillsBadge: "",
    skillsCertificationsTitle: "",
    skillsToolsTitle: "",
    skillsQuoteAuthor: "",
    contactBadge: "",
    contactFormTitle: "",
    contactFormLabels: {
        name: "",
        email: "",
        company: "",
        message: ""
    },
    contactFormPlaceholders: {
        name: "",
        email: "",
        company: "",
        message: ""
    },
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
        responseTime: {
            label: "",
            value: ""
        },
        location: {
            label: "",
            value: ""
        },
        languages: {
            label: "",
            value: ""
        }
    }
};

const TextContentContext = createContext<TextContentContextType | undefined>(
    undefined,
);

export function TextContentProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [textContent, setTextContent] =
        useState<TextContent>(defaultTextContent);

    const loadContent = async () => {
        try {
            const response = await contentApi.getContent();
            if (response.success && response.data) {
                setTextContent(response.data as unknown as TextContent);
            }
        } catch (error) {
            console.error("Error loading content:", error);
            // Fall back to default content if API fails
        }
    };

    useEffect(() => {
        // Load content from API on mount
        loadContent();
    }, []);

    const refreshContent = async () => {
        await loadContent();
    };

    const updateTextContent = async (newContent: Partial<TextContent>) => {
        // Optimistically update UI
        setTextContent((prev) => ({ ...prev, ...newContent }));

        // Sync with backend
        try {
            const response = await contentApi.updateContent({
                ...textContent,
                ...newContent,
            } as Record<string, unknown>);
            if (response.success && response.data) {
                setTextContent(response.data as unknown as TextContent);
            }
        } catch (error) {
            console.error("Error updating content:", error);
            // Revert on error
            setTextContent((prev) => prev);
        }
    };

    return (
        <TextContentContext.Provider value={{ textContent, updateTextContent, refreshContent }}>
            {children}
        </TextContentContext.Provider>
    );
}

export function useTextContent() {
    const context = useContext(TextContentContext);
    if (context === undefined) {
        throw new Error("useTextContent must be used within a TextContentProvider");
    }
    return context;
}
