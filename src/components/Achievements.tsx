"use client";

import { useTextContent } from "@/lib/TextContentContext";

export default function Achievements() {
  const { textContent } = useTextContent();

  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream scroll-mt-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-brand-cream/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
            Key Achievements
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-brand-cream">
            {textContent.achievementsTitle}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Achievements grid - centered with max 2 columns for better readability */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl w-full">
            {textContent.achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-brand-cream/5 to-brand-gold/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-500 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                {/* Content wrapper */}
                <div className="relative z-10">
                  {/* Icon and Metric Row */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Icon - only if specified */}
                    {achievement.icon && (
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {achievement.icon}
                      </div>
                    )}

                    {/* Metric */}
                    <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-gold leading-none">
                      {achievement.metric}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-brand-cream/90 text-base sm:text-lg leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Decorative accent */}
                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-brand-gold/50 to-transparent rounded-full"></div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
