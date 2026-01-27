
export const clsx = (...classes: (string | boolean | undefined)[]): string => {
    return classes
        .filter(Boolean)
        .map(c => typeof c === 'string' ? c : '')
        .join(' ')
        .trim();
}