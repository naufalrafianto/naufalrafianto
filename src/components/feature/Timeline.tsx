import React from 'react';
import { useTimelineItems } from '@/hooks/useTimelineItems';
import { Reveal } from '../animation/Reveal';
import { CustomLink } from '../common/CustomLink';
import { formatTimeDifference } from '@/lib/date';
import { cn } from '@/lib/cn';

const Timeline: React.FC = () => {
  const timelineItems = useTimelineItems();

  return (
    <div className="relative">
      <ul className="ml-6 space-y-10 border-l border-gray-700">
        {timelineItems.map((item, index) => {
          const [startDateStr, endDateStr] = item.date.split('/');
          const startDate = new Date(startDateStr);
          const endDate = endDateStr === 'present' ? new Date() : new Date(endDateStr);
          const dateDifference = formatTimeDifference(startDate, endDate);

          const formattedEndDate =
            endDateStr === 'present'
              ? 'Present'
              : endDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                });

          return (
            <li key={index} className="relative pl-10">
              <div className="absolute left-[-20px] top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-800">
                {item.logo ? (
                  <img className="h-10 w-10 rounded-full object-cover" src={item.logo} alt={item.company} />
                ) : (
                  <span className="text-white">{item.icon}</span>
                )}
              </div>

              <div className="pt-1.5">
                <Reveal>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </Reveal>
                <Reveal>
                  <CustomLink href={item.website} target="_blank" className="text-base">
                    {item.company}
                  </CustomLink>
                  <span className={cn(item.company && 'ml-2', 'text-base font-normal text-gray-400')}>{item.type}</span>
                </Reveal>
                <Reveal>
                  <time className="my-1 block text-sm font-normal leading-none text-gray-500">
                    {`${startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${formattedEndDate}`}
                    <span className="ml-2">{`· ${dateDifference}`}</span>
                  </time>
                </Reveal>
                <Reveal>
                  <p className="mt-1 text-base font-normal text-gray-400">{item.location}</p>
                </Reveal>
                <Reveal>
                  <p className="mt-2 text-base font-normal text-gray-400">{item.description}</p>
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
