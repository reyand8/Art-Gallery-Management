export interface IFilters {
    price?: 'ASC' | 'DESC';
    artist?: string;
    type?: 'painting' | 'sculpture';
}

export interface ISavedFilters {
  artist: string;
  type: "" | "painting" | "sculpture";
  sortOrder: "" | "ASC" | "DESC";
}
