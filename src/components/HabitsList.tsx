import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { api } from '../lib/axios';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import dayjs from 'dayjs';

import type { FC } from 'react';
import type { HabitsInfo } from './HabitModal';

interface HabitsListProps {
  date: Date;
  handleCompletedPercentage: (percentage: number) => void;
  habitsInfo: HabitsInfo;
  onCompletedChanged: (habitsInfo: HabitsInfo, completedHabits: string[]) => void;
}

export const HabitsList: FC<HabitsListProps> = ({
  date,
  handleCompletedPercentage,
  habitsInfo,
  onCompletedChanged
}) => {
  const handleToggleHabit = (habitId: string): void => {
    api.patch(`habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted = habitsInfo?.completedHabits?.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted)
      completedHabits = habitsInfo?.completedHabits.filter((id) => id !== habitId);
    else completedHabits = [...habitsInfo.completedHabits, habitId];

    const updatedCompletedPercentage = calculateCompletedPercentage(
      habitsInfo?.possibleHabits.length,
      completedHabits.length
    );

    handleCompletedPercentage(updatedCompletedPercentage);
    onCompletedChanged(habitsInfo, completedHabits);
  };

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className={'mt-6 flex flex-col gap-3'}>
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          checked={habitsInfo?.completedHabits?.includes(habit.id)}
          className={'flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'}
          disabled={isDateInPast}
          onCheckedChange={(): void => handleToggleHabit(habit.id)}
        >
          <div
            className={
              'h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'
            }
          >
            <Checkbox.Indicator>
              <Check className={'text-white'} size={20} />
            </Checkbox.Indicator>
          </div>

          <span
            className={
              'font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
            }
          >
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
};
