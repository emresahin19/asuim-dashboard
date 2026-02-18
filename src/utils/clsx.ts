
export const clsx = (...classes: (string | number | boolean | undefined)[]): string => {
    return classes
        .filter(Boolean)
        .map(c => typeof c === 'string' || typeof c === 'number' ? c : '')
        .join(' ')
        .trim();
}