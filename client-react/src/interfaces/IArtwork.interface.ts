export interface IArtwork {
    id: string;
    title: string;
    artist: string;
    type: 'painting' | 'sculpture';
    price: number;
    availability: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateArtwork {
    title: string;
    artist: string;
    type: 'painting' | 'sculpture';
    price: number;
    availability?: boolean;
}

export interface IUpdateArtwork {
    title: string;
    artist: string;
    type: 'painting' | 'sculpture';
    price: number;
    availability?: boolean;
}