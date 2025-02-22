import {
    IsString, IsNumber, IsBoolean,
    IsOptional, IsIn, MaxLength, Min } from 'class-validator';


export class CreateArtworkDto {
    @IsString()
    @MaxLength(99)
    title: string;

    @IsString()
    @MaxLength(50)
    artist: string;

    @IsString()
    @IsIn(['painting', 'sculpture'])
    type: 'painting' | 'sculpture';

    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsBoolean()
    availability?: boolean = true;
}


