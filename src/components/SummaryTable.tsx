import { HabitDay } from './HabitDay';
import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { FC } from 'react';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();

const daysOfWeekIndex = 0;
const firstDayInWeek = 1;
const daysInWeek = 7;
const daysPerMonth = 18;

const minimumSummaryDatesSize = daysPerMonth * daysInWeek;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export const SummaryTable: FC = () => {
  const [summary, setSummary] = useState<Summary>([]);

  const getFirstDayOfWeek = (date: Date): Date => {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    const msInDay = 86400000;
    const diffInMs =
      (day === daysOfWeekIndex ? daysInWeek - firstDayInWeek : day - firstDayInWeek) * msInDay;
    const diffFromStartOfWeek = dateObj.getTime() - diffInMs;

    return new Date(diffFromStartOfWeek);
  };

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className={'w-full flex'}>
      <div className={'grid grid-rows-7 grid-flow-row gap-3'}>
        {weekDays.map((weekDay) => {
          const firstDayOfWeek = getFirstDayOfWeek(summaryDates[0]);
          const dayInSummary = dayjs(firstDayOfWeek).add(weekDays.indexOf(weekDay), 'day');

          return (
            <div
              key={`${dayInSummary.format('YYYY-MM-DD')}-${weekDay}`}
              className={
                'text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'
              }
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className={'grid grid-rows-7 grid-flow-col gap-3'}>
        {summary.length > daysOfWeekIndex &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => dayjs(date).isSame(day.date, 'day'));

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                defaultAmount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

        {amountOfDaysToFill > daysOfWeekIndex &&
          Array.from({ length: amountOfDaysToFill }).map(() => (
            <div
              key={Math.random()}
              className={
                'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
              }
            />
          ))}
      </div>
    </div>
  );
};
