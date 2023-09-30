import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const convertDateToUtc = (date: Date | string) => {
  return dayjs.utc(date).format();
};

export const generateNextHour = (hour: number) => {
  return dayjs().utc().add(hour, 'hour').toDate();
};
