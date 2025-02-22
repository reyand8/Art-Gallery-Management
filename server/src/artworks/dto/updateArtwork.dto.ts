import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from 'class-validator';


export class UpdateArtworkDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    artist?: string;

    @IsOptional()
    @IsEnum(['painting', 'sculpture'])
    type?: 'painting' | 'sculpture';

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsBoolean()
    availability?: boolean = true;
}
