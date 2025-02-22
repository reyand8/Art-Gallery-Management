import React from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

import theme from '../../../assets/theme';


interface IAvailabilityCheckboxProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvailabilityCheckbox: React.FC<IAvailabilityCheckboxProps> = ({ checked, onChange }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    name="checked"
                    color="primary"
                />
            }
            label={
                <Typography sx={{color: theme.palette.text.secondary}}>
                    {checked ? 'Available' : 'Not Available'}
                </Typography>
            }
        />
    );
};

export default AvailabilityCheckbox;
