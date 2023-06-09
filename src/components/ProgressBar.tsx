import type { FC } from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => (
  <div className={'h-3 rounded-xl bg-zinc-700 w-full mt-4'}>
    <div
      aria-label={'Progresso de hábitos completados nesse dia'}
      aria-valuenow={progress}
      className={'h-3 rounded-xl bg-violet-600 transition-all'}
      role={'progressbar'}
      style={{
        width: `${progress}%`
      }}
    />
  </div>
);
