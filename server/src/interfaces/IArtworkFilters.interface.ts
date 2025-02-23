export interface IArtworkFilters {
    where: {
        artist?: string;
        type?: string;
    };
    order?: [['price', string]];
}