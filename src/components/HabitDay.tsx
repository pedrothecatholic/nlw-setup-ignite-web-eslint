import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import { HabitModal } from './HabitModal';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import { useState } from 'react';
import type { FC } from 'react';

const MIN_PERCENTAGE = 0;
const TWENTY_PERCENTAGE = 20;
const FORTY_PERCENTAGE = 40;
const SIXTY_PERCENTAGE = 60;
const EIGHTY_PERCENTAGE = 80;

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  defaultAmount?: number;
}

export const HabitDay: FC<HabitDayProps> = ({ defaultCompleted = 0, defaultAmount = 0, date }) => {
  const defaultCompletedPercentage = calculateCompletedPercentage(defaultAmount, defaultCompleted);

  const [completedPercentage, setCompletedPercentage] = useState(defaultCompletedPercentage);

  const handleCompletedPercentage = (percentage: number): void => {
    setCompletedPercentage(percentage);
  };

  let colorClass = '';

  if (completedPercentage >= EIGHTY_PERCENTAGE) colorClass = 'bg-violet-500 border-violet-400';
  else if (completedPercentage >= SIXTY_PERCENTAGE && completedPercentage < EIGHTY_PERCENTAGE)
    colorClass = 'bg-violet-600 border-violet-500';
  else if (completedPercentage >= FORTY_PERCENTAGE && completedPercentage < SIXTY_PERCENTAGE)
    colorClass = 'bg-violet-700 border-violet-500';
  else if (completedPercentage >= TWENTY_PERCENTAGE && completedPercentage < FORTY_PERCENTAGE)
    colorClass = 'bg-violet-800 border-violet-600';
  else if (completedPercentage > MIN_PERCENTAGE && completedPercentage < TWENTY_PERCENTAGE)
    colorClass = 'bg-violet-900 border-violet-700';
  else if (completedPercentage === MIN_PERCENTAGE) colorClass = 'bg-zinc-900 border-zinc-800';

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background',
          colorClass
        )}
      />

      <Popover.Portal>
        <HabitModal
          completedPercentage={completedPercentage}
          date={date}
          handleCompletedPercentage={handleCompletedPercentage}
        />
      </Popover.Portal>
    </Popover.Root>
  );
};
