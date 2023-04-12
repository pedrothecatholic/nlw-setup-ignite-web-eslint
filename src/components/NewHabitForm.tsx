import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { api } from '../lib/axios';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

export const NewHabitForm: FC = () => {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const createNewHabit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const daysOfWeek = 0;

    if (!title || weekDays.length === daysOfWeek) return;

    await api.post('habits', {
      title,
      weekDays
    });

    setTitle('');
    setWeekDays([]);

    // alert('Hábito criado com sucesso!');
  };

  const handleToggleWeekDay = (weekDay: number): void => {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];

      setWeekDays(weekDaysWithAddedOne);
    }
  };

  return (
    <form className={'w-full flex flex-col mt-6'} onSubmit={createNewHabit}>
      <label className={'font-semibold leading-tight'} htmlFor={'title'}>
        Qual seu comprometimento?
      </label>

      <input
        className={
          'p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
        }
        id={'title'}
        onChange={(event): void => setTitle(event.target.value)}
        placeholder={'ex.: Exercícios, dormir bem, etc...'}
        type={'text'}
        value={title}
      />

      <label className={'font-semibold leading-tight mt-4'} htmlFor={''}>
        Qual a recorrência?
      </label>

      <div className={'mt-3 flex flex-col gap-2'}>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            checked={weekDays.includes(index)}
            className={'flex items-center gap-3 group focus:outline-none'}
            onCheckedChange={(): void => handleToggleWeekDay(index)}
          >
            <div
              className={
                'h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'
              }
            >
              <Checkbox.Indicator>
                <Check className={'text-white'} size={20} />
              </Checkbox.Indicator>
            </div>

            <span className={'text-white leading-tight'}>{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        className={
          'mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
        }
        type={'submit'}
      >
        <Check size={20} weight={'bold'} />
        Confirmar
      </button>
    </form>
  );
};
