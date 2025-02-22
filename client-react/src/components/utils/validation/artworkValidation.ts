import { IArtwork } from '../../../interfaces/IArtwork.interface';


export interface IArtworkErrors {
    title: string;
    artist: string;
    price: string;
}

export const validateArtwork = (data: IArtwork): IArtworkErrors => {
    const errors: IArtworkErrors = {
        title: '',
        artist: '',
        price: ''
    };

    if (!data.title) {
        errors.title = 'Title cannot be empty';
    } else if (data.title.length > 99) {
        errors.title = 'Title cannot exceed 99 characters';
    }

    if (!data.artist) {
        errors.artist = 'Artist cannot be empty';
    }

    if (data.price <= 0) {
        errors.price = 'Price must be positive';
    } else if (isNaN(data.price)) {
        errors.price = 'Price must be a number';
    }
    return errors;
};

export const isValidArtwork = (errors: IArtworkErrors): boolean => {
    return !Object.values(errors).some(error => error);
};
