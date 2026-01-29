import React from 'react';
import { motion } from 'framer-motion';
import { Project, ANIMATION_EASE } from '../types';

const designers: Project[] = [
  {
    id: '01',
    client: 'Do Young',
    description: 'Designer',
    year: 'Master',
    tags: ['CUT', 'PERM'],
    imageUrl: 'https://i.imgur.com/93tvJvK.jpeg',
    size: 'large',
    hoverText: "고객의 분위기와 라이프스타일에 맞춘 디자인을 추구합니다. 편안한 소통으로 오래 기억에 남는 스타일을 만들어드릴게요.",
    certifications: [
      "마샬아카데미 교육 이수",
      "웰라 컬러-Diploma 이수",
      "로레알 컬러-Diploma 이수",
      "미용사 국가 자격증 취득"
    ]
  },
];

const DesignerItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: ANIMATION_EASE }}
      className={`relative group mb-0 md:mb-40 ${project.size === 'large' ? 'col-span-1 md:col-span-2' : 'col-span-1'
        }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Text Side - Animated on Hover */}
        <div className="md:col-span-4 flex flex-col justify-end pb-4 order-2 md:order-1">
          <div className="overflow-hidden">
            <h3 className="text-3xl md:text-5xl font-semibold mb-2 text-white group-hover:text-brand-purple transition-colors duration-500">
              {project.client}
            </h3>
          </div>
          <p className="text-lg text-gray-400 mb-6 group-hover:text-white transition-colors duration-500">{project.description}</p>
          {/* Removed Tags and Year block here */}
        </div>

        {/* Image Side - Interactive */}
        <div className="md:col-span-8 overflow-hidden rounded-sm order-1 md:order-2">
          <motion.div
            className="w-full aspect-[3/4] md:aspect-[16/10] relative overflow-hidden bg-zinc-900"
          >
            <motion.img
              src={project.imageUrl}
              alt={project.client}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7, ease: ANIMATION_EASE }}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />

            {/* Conditional Hover Overlay */}
            {(project.hoverText || project.certifications) ? (
              // Custom Text Effect for Bio & Certifications
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                {/* Dark gradient at bottom to ensure text readability without covering the face */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-100 pointer-events-none" />

                {/* Text Container with Slide Up Effect */}
                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out max-w-lg">

                  {/* Bio Text */}
                  {project.hoverText && (
                    <p className="text-[#E2D5F5] text-sm md:text-lg font-light leading-relaxed font-suit tracking-wide drop-shadow-lg [text-shadow:0_0_20px_rgba(160,32,240,0.15)] mb-6">
                      {project.hoverText}
                    </p>
                  )}

                  {/* Certifications List */}
                  {project.certifications && (
                    <div className="border-t border-white/20 pt-4 md:pt-5">
                      <ul className="grid grid-cols-1 gap-1.5 md:gap-2">
                        {project.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300 text-[11px] md:text-sm font-light tracking-wider">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-brand-purple rounded-full shrink-0 shadow-[0_0_8px_#A020F0]" />
                            <span className="opacity-90">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              // Default Button Effect for others
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                  <span className="text-white text-xs tracking-[0.2em] uppercase">View Profile</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  return (
    /* 1. px-8 -> px-4 (모바일 여백 통일), py-24 md:py-32 -> py-16 md:py-20 (섹션 간격 최적화) */
    <section id="designer" className="flex flex-col justify-center px-4 md:px-16 py-0 max-w-[1800px] mx-auto border-t border-white/10">

      <div className="mt-12 mb-8 md:mt-20 md:mb-16 flex flex-col md:flex-row justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">Our Designers</h2>
        <p className="text-sm text-gray-500 mt-4 md:mt-0 max-w-md text-right">
          Meet the artists defining your identity. <br />
          Each designer brings a unique perspective to the craft.
        </p>
      </div>

      {/* 디자이너 리스트: 모바일 mb-0으로 밀착 */}
      <div className="flex flex-col mb-0">
        {designers.map((p) => (
          <DesignerItem key={p.id} project={p} />
        ))}
      </div>

      {/* 하단 실선: 모바일에서 mt-4로 바짝 올림 (PC는 mt-24 유지) */}
      <div className="border-b border-white/10 w-full mt-4 md:mt-24 mb-0" />
    </section>
  );
};

export default Portfolio;