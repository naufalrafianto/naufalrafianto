import React from 'react';
import { useTimelineItems } from '@/hooks/useTimelineItems';
import { Reveal } from '../animation/Reveal';
import { CustomLink } from '../common/CustomLink';
import Image from 'next/image';

const Timeline: React.FC = () => {
  const timelineItems = useTimelineItems();

  return (
    <div className="relative max-w-4xl mx-auto">
      <ul className="relative space-y-12">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-transparent"></div>

        {timelineItems.map((item, index) => {
          const [startDateStr, endDateStr] = item.date.split('/');
          const startDate = new Date(startDateStr);
          const endDate = endDateStr === 'present' ? new Date() : new Date(endDateStr);

          return (
            <li key={index} className="relative flex items-start group">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-900 flex items-center justify-center group-hover:border-gray-500 transition-colors duration-200">
                {item.logo ? (
                  <Image
                    height={32}
                    width={32}
                    className="w-8 h-8 rounded-full object-cover"
                    src={item.logo}
                    alt={item.company}
                  />
                ) : (
                  <span className="text-gray-300 text-lg">{item.icon}</span>
                )}
              </div>

              {/* Content */}
              <div className="pb-8 px-4">
                <Reveal>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-2">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <time className="text-sm text-gray-500 font-medium">
                      {`${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${endDateStr === 'present' ? 'Present' : endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        }`}
                    </time>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex items-center mb-2">
                    <CustomLink
                      href={item.website}
                      target="_blank"
                      className="text-gray-300 hover:text-white font-medium transition-colors"
                    >
                      {item.company}
                    </CustomLink>
                    {item.company && item.type && (
                      <span className="text-gray-600">·</span>
                    )}
                  </div>
                </Reveal>

                {item.location && (
                  <Reveal>
                    <p className="text-gray-500 text-sm mb-4">{item.location}</p>
                  </Reveal>
                )}

                <Reveal>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Timeline;
