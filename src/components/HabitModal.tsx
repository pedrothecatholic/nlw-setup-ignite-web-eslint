import * as Popover from '@radix-ui/react-popover';
import { api } from '../lib/axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { FC } from 'react';

import { HabitsList } from './HabitsList';
import { ProgressBar } from './ProgressBar';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

interface HabitModalProps {
  date: Date;
  handleCompletedPercentage: (percentage: number) => void;
  completedPercentage: number;
}

export interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export const HabitModal: FC<HabitModalProps> = ({
  date,
  handleCompletedPercentage,
  completedPercentage
}) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const dateAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString()
        }
      })
      .then((response) => {
        setHabitsInfo(response?.data);
        const updatedCompletedPercentage = calculateCompletedPercentage(
          response?.data?.possibleHabits?.length,
          response?.data?.completedHabits?.length
        );

        handleCompletedPercentage(updatedCompletedPercentage);
      });
  }, [date, handleCompletedPercentage]);

  const handleCompletedChanged = (
    habitsInformation: HabitsInfo,
    completedHabits: string[]
  ): void => {
    setHabitsInfo({
      completedHabits,
      possibleHabits: habitsInformation?.possibleHabits
    });
  };

  if (!habitsInfo) return <div />;

  return (
    <Popover.Content
      className={
        'min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
      }
    >
      <span className={'font-semibold text-zinc-400 first-letter:capitalize'}>{dayOfWeek}</span>
      <span className={'mt-1 font-extrabold loading-tight text-3xl'}>{dateAndMonth}</span>
      <ProgressBar progress={completedPercentage} />

      <HabitsList
        date={date}
        habitsInfo={habitsInfo}
        handleCompletedPercentage={handleCompletedPercentage}
        onCompletedChanged={handleCompletedChanged}
      />

      <Popover.Arrow className={'fill-zinc-900'} height={8} width={16} />
    </Popover.Content>
  );
};
