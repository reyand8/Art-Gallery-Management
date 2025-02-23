export interface IArtwork {
    title: string;
    artist: string;
    type: 'painting' | 'sculpture';
    price: number;
    availability?: boolean;
}