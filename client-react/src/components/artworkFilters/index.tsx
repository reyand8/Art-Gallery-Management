import React, {useState} from 'react';
import { Button, Paper, styled, TextField } from '@mui/material';

import { IFilters } from '../../interfaces/IFilters.interface';
import {orderOptions, typeOptions} from '../utils/options/options';
import { SortField } from '../utils/sort';
import theme from '../../assets/theme';


const TextFieldBox = styled('form')(({ theme }) => ({}));

interface IArtworkFormProps {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}

const ArtworkFilters: React.FC<IArtworkFormProps> = ({setFilters}) => {
    const [filterArtist, setFilterArtist] =
        useState('');
    const [filterType, setFilterType] =
        useState<'' | 'painting' | 'sculpture'>('');
    const [sortOrder, setSortOrder] =
        useState<'' |'ASC' | 'DESC'>('ASC');

    const handleNameChange = (e: any): void => {
        setFilterArtist(e.target.value)
    };

    const handleTypeChange = (e: any): void  => {
        setFilterType(e.target.value as '' | 'painting' | 'sculpture')
    }

    const handleSortOrderChange = (e: any): void => {
        setSortOrder(e.target.value as '' | 'ASC' | 'DESC');
    };

    const onSubmitClick = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const updatedFilters: IFilters = {};
        if (filterArtist.trim() !== '') {
            updatedFilters.artist = filterArtist;
        }
        if (filterType !== '') {
            updatedFilters.type = filterType;
        }
        if (sortOrder === '') {
            updatedFilters.price = "ASC";
        } else {
            updatedFilters.price = sortOrder;
        }
        setFilters(updatedFilters);
    }

    return (
        <Paper sx={{my: 9, background: theme.palette.background.paper}}>
            <TextFieldBox sx={{padding: '24px', display: 'flex',
                gap: '24px', flexWrap: 'wrap'}} onSubmit={onSubmitClick}>
                <TextField
                    type="text"
                    sx={{
                        '& .MuiInputBase-input': {
                            color: theme.palette.text.secondary,
                        },
                    }}
                    label="Filter by Artist"
                    value={filterArtist}
                    onChange={handleNameChange}
                />
                <SortField label={'Type'} options={typeOptions} value={filterType} handleTypeChange={handleTypeChange}/>
                <SortField label={'Order'} options={orderOptions}  value={sortOrder} handleTypeChange={handleSortOrderChange}/>
                <Button color="primary" type="submit">Filter</Button>
            </TextFieldBox>
        </Paper>
    )
};

export default ArtworkFilters;
