import { formatDistance } from 'date-fns';

export function formatTimeDifference(startDate: Date, endDate: Date): string {
  return formatDistance(startDate, endDate);
}

export function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(dateString));
}

export function formatDate(date: string | Date): string {
  let dateString: string;

  if (date instanceof Date) {
    dateString = date.toISOString();
  } else if (typeof date === 'string') {
    dateString = date;
  } else {
    throw new Error('Invalid date format');
  }

  if (!dateString.includes('T')) {
    dateString = `${dateString}T00:00:00`;
  }

  const currentDate = new Date().getTime();
  const targetDate = new Date(dateString).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(dateString).toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (daysAgo < 1) {
    return 'Today';
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}
