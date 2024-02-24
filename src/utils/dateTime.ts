import { format } from 'date-fns';

export const formatTime = (date) => {
  const currentTime = new Date(date); 
  const formattedTime = format(currentTime, 'hh:mmaaa');
  return formattedTime
};
