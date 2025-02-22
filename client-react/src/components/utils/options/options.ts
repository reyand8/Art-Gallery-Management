export interface IOptions {
    value: string;
    label: string;
}


export const typeOptions: IOptions[] = [
    { value: '', label: 'Filter by Type' },
    { value: 'painting', label: 'Painting' },
    { value: 'sculpture', label: 'Sculpture' }
];

export const orderOptions: IOptions[] = [
    { value: '', label: 'Filter by order' },
    { value: 'ASC', label: 'Low to High' },
    { value: 'DESC', label: 'High to Low' }
];