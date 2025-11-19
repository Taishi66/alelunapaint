"use client";

import { motion } from 'framer-motion';
import { useTextContent } from '@/lib/TextContentContext';

export default function LoadingScreen() {
    const { textContent } = useTextContent();
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.4, 0.0, 0.2, 1]
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/20"
        >
            {/* Solid background layer to ensure complete coverage */}
            <div className="absolute inset-0 bg-brand-cream/95"></div>
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.08 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-deep rounded-full blur-3xl"
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Elegant NADIA LUNA with unified shining effect */}
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                    >
                        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-2">
                            <motion.span
                                initial={{ backgroundPosition: '-500%' }}
                                animate={{ backgroundPosition: '500%' }}
                                transition={{
                                    duration: 3.0,
                                    delay: 1.3,
                                    ease: 'linear',
                                    repeat: 0
                                }}
                                className="inline-block"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, #C7A17A, #F4E4BC, #C7A17A, transparent)',
                                    backgroundSize: '80%',
                                    backgroundRepeat: 'no-repeat',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: '#0B132B'
                                }}
                            >
                                {textContent.loadingScreenFirstName || "NADIA"}
                            </motion.span>
                        </h1>
                    </motion.div>
                </div>

                <div className="overflow-hidden mt-2">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
                    >
                        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic tracking-wider">
                            <motion.span
                                initial={{ backgroundPosition: '-500%' }}
                                animate={{ backgroundPosition: '500%' }}
                                transition={{
                                    duration: 3.0,
                                    delay: 1.3,
                                    ease: 'linear',
                                    repeat: 0
                                }}
                                className="inline-block"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, #0B132B, #2A3B5C, #0B132B, transparent)',
                                    backgroundSize: '80%',
                                    backgroundRepeat: 'no-repeat',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: '#C7A17A'
                                }}
                            >
                                {textContent.loadingScreenLastName || "LUNA"}
                            </motion.span>
                        </h2>
                    </motion.div>
                </div>

                {/* Elegant tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="mt-8 md:mt-12"
                >
                    <p className="text-brand-deep/70 text-sm md:text-base tracking-[0.3em] uppercase font-medium">
                        {textContent.loadingScreenTagline || "Product Owner • Luxury Retail"}
                    </p>
                </motion.div>

                {/* Loading bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="mt-12 md:mt-16 flex justify-center"
                >
                    <div className="w-32 md:w-48 h-1 bg-brand-deep/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{
                                duration: 2.0,
                                delay: 1.5,
                                ease: "easeInOut"
                            }}
                            className="h-full bg-gradient-to-r from-brand-gold to-brand-deep rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Elegant dots animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="mt-6 flex justify-center gap-2"
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0] }}
                            transition={{
                                duration: 1.5,
                                delay: 1.7 + index * 0.2,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                            className="w-2 h-2 rounded-full bg-brand-gold"
                        />
                    ))}
                </motion.div>
            </div>

            {/* Decorative corner elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-brand-gold/40"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-brand-gold/40"
            />
        </motion.div>
    );
}
