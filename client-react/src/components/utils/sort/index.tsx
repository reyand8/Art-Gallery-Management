import React from 'react';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import theme from '../../../assets/theme';
import { IOptions } from '../options/options';


interface ISortFieldProps {
    value: string;
    handleTypeChange: (event: SelectChangeEvent<string>) => void;
    options: { value: string, label: string }[];
    label: string;
}

export const SortField: React.FC<ISortFieldProps> =
    ({ value, handleTypeChange, options, label }) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={handleTypeChange}
                    sx={{
                        '& .MuiSelect-select': {
                            color: theme.palette.text.secondary,
                        },
                    }}>
                    {options.map((option: IOptions) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light,
                                    color:  theme.palette.text.primary,
                                },
                            }}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
