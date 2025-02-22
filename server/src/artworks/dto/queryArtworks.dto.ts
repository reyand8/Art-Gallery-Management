import {IsOptional, IsString, IsIn, MaxLength} from 'class-validator';


export class QueryArtworksDto {
    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    price?: 'ASC' | 'DESC';

    @IsOptional()
    @IsString()
    @MaxLength(50)
    artist?: string;

    @IsOptional()
    @IsString()
    @IsIn(['painting', 'sculpture'])
    type?: 'painting' | 'sculpture';
}
