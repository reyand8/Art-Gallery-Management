import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IArtwork } from '../interfaces/IArtwork.interface';


@Table({ tableName: 'artworks' })
export class Artwork extends Model<IArtwork> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { len: [1, 99] },
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { len: [1, 50] },
    })
    artist: string;

    @Column({
        type: DataType.ENUM('painting', 'sculpture'),
        allowNull: false,
    })
    type: 'painting' | 'sculpture';

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        validate: { min: 0 },
    })
    price: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    availability: boolean;
}
