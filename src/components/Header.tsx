import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react';

import { NewHabitForm } from './NewHabitForm';
import logoImage from '../assets/logo.svg';
import type { FC } from 'react';

export const Header: FC = () => (
  <div className={'w-full max-w-3xl mx-auto flex items-center justify-between'}>
    <img alt={''} src={logoImage} />

    <Dialog.Root>
      <Dialog.Trigger
        className={
          'border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'
        }
        type={'button'}
      >
        <Plus className={'text-violet-500'} size={20} />
        Novo hábito
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={'w-screen h-screen bg-black/80 fixed inset-0'} />

        <Dialog.Content
          className={
            'absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          }
        >
          <Dialog.Close
            className={
              'absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
            }
          >
            <X arial-label={'Fechar'} size={24} />
          </Dialog.Close>

          <Dialog.Title className={'text-3xl leading-tight font-extrabold'}>
            Criar hábito
          </Dialog.Title>

          <NewHabitForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </div>
);
