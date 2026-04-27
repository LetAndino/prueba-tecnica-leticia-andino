export const paginate = <T>(items: T[], page: number, limit: number): T[] => {
    const startIndex = (page - 1) * limit;
    return items.slice(startIndex, startIndex + limit);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
    return Math.ceil(totalItems / itemsPerPage);
};

export const sortItems = <T>(items: T[], key: keyof T, order: 'asc' | 'desc'): T[] => {
    return [...items].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
};