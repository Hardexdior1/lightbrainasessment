interface FormatDateOptions {
    month: 'short';
    day: 'numeric';
    year: 'numeric';
}

export const formatDate = (dateString: string): string => {
    const date: Date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    const options: FormatDateOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
};