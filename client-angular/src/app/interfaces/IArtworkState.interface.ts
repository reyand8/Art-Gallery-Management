import { IArtwork } from './IArtwork.interface';
import { IError } from './IError.interface';

export interface IArtworkState {
    artworks: IArtwork[];
    artwork: IArtwork | null;
    loading: boolean;
    error: IError | null;
}
