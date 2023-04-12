import dayjs from 'dayjs';

export const generateDatesFromYearBeginning = (): Date[] => {
  const firstDayOfTheYear = dayjs().startOf('year');
  const today = new Date();

  const dateComparison = Array.from(
    { length: firstDayOfTheYear.diff(today, 'days') },
    (key, index) => firstDayOfTheYear.clone().add(index, 'day').toDate()
  );

  return dateComparison;
};
