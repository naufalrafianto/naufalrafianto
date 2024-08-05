import { timelineItems } from '@/constant/timeline';
import { formatTimeDifference } from '@/lib/date';

export function useTimelineItems() {
  const formatTimelineItems = timelineItems.map((item) => {
    const [startDateStr, endDateStr] = item.date.split('/');
    const startDate = new Date(startDateStr);
    const endDate = endDateStr === 'present' ? new Date() : new Date(endDateStr);
    const dateDifference = formatTimeDifference(startDate, endDate);
    return {
      ...item,
      startDate,
      endDate,
      dateDifference,
    };
  });

  return formatTimelineItems;
}
