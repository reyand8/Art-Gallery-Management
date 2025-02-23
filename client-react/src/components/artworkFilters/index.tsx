import React, {useEffect, useState} from 'react';
import { Button, Paper, styled, TextField } from '@mui/material';

import { IFilters } from '../../interfaces/IFilters.interface';
import {orderOptions, typeOptions} from '../utils/options/options';
import { SortField } from '../utils/sort';
import theme from '../../assets/theme';
import {SelectChangeEvent} from "@mui/material/Select";


const TextFieldBox = styled('form')(({ theme }) => ({}));

interface IArtworkFormProps {
    filters: IFilters;
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}

/**
 * ArtworkFilters Component
 *
 * A form for filtering artwork by artist, type, and sorting by price order.
 * Updates the parent component's filter state and stores the filters in localStorage.
 */
const ArtworkFilters: React.FC<IArtworkFormProps> = ({filters, setFilters}) => {
    const [filterArtist, setFilterArtist] =
        useState('');
    const [filterType, setFilterType] =
        useState<'' | 'painting' | 'sculpture'>('');
    const [sortOrder, setSortOrder] =
        useState<'' |'ASC' | 'DESC'>('ASC');

    /**
     * Sets the form values based on the received filters prop.
     */
    useEffect((): void => {
        setFilterArtist(filters.artist || '');
        setFilterType(filters.type || '');
        setSortOrder(filters.price || 'ASC');
    }, [filters]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterArtist(e.target.value);
    };

    const handleTypeChange = (e: SelectChangeEvent): void => {
        setFilterType(e.target.value as '' | 'painting' | 'sculpture');
    };

    const handleSortOrderChange = (e: SelectChangeEvent): void => {
        setSortOrder(e.target.value as '' | 'ASC' | 'DESC');
    };

    const handleResetFilters = (): void => {
        setFilterArtist('');
        setFilterType('');
        setSortOrder('ASC');
        setFilters({});
        localStorage.removeItem('artworkFilters');
    };

    /**
     * Handles the form submission to update filters and save them to localStorage.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submit event.
     */
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
        localStorage.setItem('artworkFilters', JSON.stringify(updatedFilters));
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
                <Button color="secondary" onClick={handleResetFilters}>Reset</Button>
                <Button color="primary" type="submit">Filter</Button>
            </TextFieldBox>
        </Paper>
    )
};

export default ArtworkFilters;
