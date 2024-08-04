import React from 'react';
import { useTimelineItems } from '@/hooks/useTimelineItems';
import { FadeUp } from '../animation';
import { CustomLink } from '../common/CustomLink';
import { formatTimeDifference } from '@/lib';
const Timeline: React.FC = () => {
  const timelineItems = useTimelineItems();

  return (
    <div className="relative px-10">
      <ul className="relative border-l border-gray-700">
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
            <li key={index} className="relative mb-10 pl-6">
              <div className="absolute left-[-20px] flex h-10 w-10 items-center justify-center rounded-full border border-gray-900 bg-gray-700">
                {item.icon}
              </div>

              <div className="ml-6">
                <FadeUp>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </FadeUp>
                <FadeUp>
                  <CustomLink href={item.website} target="_blank">
                    {item.company}
                  </CustomLink>
                  <span className="mb-4 text-base font-normal text-gray-400">{` - ${item.type}`}</span>
                </FadeUp>
                <FadeUp>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                    {`${startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${formattedEndDate}`}
                    {` · ${dateDifference}`}
                  </time>
                </FadeUp>
                <FadeUp>
                  <p className="mb-4 text-base font-normal text-gray-400">{item.location}</p>
                </FadeUp>
                <FadeUp>
                  <p className="mb-4 text-base font-normal text-gray-400">{item.description}</p>
                </FadeUp>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Timeline;
