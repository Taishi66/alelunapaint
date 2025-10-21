"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Footer() {
    const { textContent } = useTextContent();

    return (
        <footer className="bg-brand-deep text-brand-cream py-12 border-t border-brand-gold/20" role="contentinfo">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-2xl text-brand-gold mb-4">Nadia Luna</h3>
                        <p className="text-brand-cream/80 text-sm leading-relaxed">
                            Product Owner specializing in luxury retail transformation and digital innovation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h4 className="font-medium text-brand-cream mb-4">Quick Links</h4>
                        <nav className="space-y-2">
                            <a href="#about" className="block text-brand-cream/80 hover:text-brand-gold transition-colors text-sm">About</a>
                            <a href="#experience" className="block text-brand-cream/80 hover:text-brand-gold transition-colors text-sm">Experience</a>
                            <a href="#skills" className="block text-brand-cream/80 hover:text-brand-gold transition-colors text-sm">Skills</a>
                            <a href="#contact" className="block text-brand-cream/80 hover:text-brand-gold transition-colors text-sm">Contact</a>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-right">
                        <h4 className="font-medium text-brand-cream mb-4">Get in Touch</h4>
                        <div className="space-y-2 text-sm">
                            <a
                                href={`mailto:${textContent.contactEmail || 'nadia.luna@email.com'}`}
                                className="block text-brand-cream/80 hover:text-brand-gold transition-colors"
                                aria-label="Email Nadia Luna"
                            >
                                {textContent.contactEmail || 'nadia.luna@email.com'}
                            </a>
                            <a
                                href={`tel:${textContent.contactPhone?.replace(/\s/g, '') || '+33123456789'}`}
                                className="block text-brand-cream/80 hover:text-brand-gold transition-colors"
                                aria-label="Call Nadia Luna"
                            >
                                {textContent.contactPhone || '+33 1 23 45 67 89'}
                            </a>
                            <a
                                href={textContent.contactLinkedin || 'https://linkedin.com/in/nadialuna'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-brand-cream/80 hover:text-brand-gold transition-colors"
                                aria-label="Connect with Nadia Luna on LinkedIn"
                            >
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-brand-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-cream/60">
                    <p>&copy; {new Date().getFullYear()} Nadia Luna. All Rights Reserved. Website by lamypro66@gmail.com</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
