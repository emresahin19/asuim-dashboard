import spinners from './data/spinners.json' with {type: 'json'};

export type SpinnerName = keyof typeof spinners

export const spinnerMap = spinners