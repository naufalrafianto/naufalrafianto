import { formatDistance } from 'date-fns';

export function formatTimeDifference(startDate: Date, endDate: Date): string {
  return formatDistance(startDate, endDate);
}

export function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(dateString));
}
