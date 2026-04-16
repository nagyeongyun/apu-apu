import {format, parseISO } from 'date-fns';

export const formatDateTime = (dateString: string) => {
  return format(parseISO(dateString), 'yyyy-MM-dd HH:mm');
};