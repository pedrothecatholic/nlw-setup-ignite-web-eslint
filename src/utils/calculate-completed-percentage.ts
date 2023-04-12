/* eslint-disable @typescript-eslint/no-magic-numbers */
export const calculateCompletedPercentage = (amount: number, completed: number): number | null =>
  amount > 0 ? Math.round((completed / amount) * 100) : 0;
