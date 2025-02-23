import React, { useState } from 'react';
import {
    Box, Button, Dialog, DialogActions,
    DialogContent, styled, TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { createArtworkThunk, updateArtworkThunk } from '../../features/artwork/artworkThunks/artworkThunks';
import { IArtworkErrors, isValidArtwork, validateArtwork } from '../utils/validation/artworkValidation';
import AvailabilityCheckbox from '../utils/checkbox/checkbox';
import { IArtwork } from '../../interfaces/IArtwork.interface';
import { typeOptions } from '../utils/options/options';
import { AppDispatch } from '../../features/store';
import { SortField } from '../utils/sort';
import theme from '../../assets/theme';


interface IArtworkFormProps {
    artwork?: IArtwork;
    onClose: () => void;
}

const FormTextField = styled(TextField)(({ theme }) => ({
    '& input': {
        color: theme.palette.text.secondary,
    }
}));

/**
 * ArtworkForm component handles creating and editing artwork entries.
 *
 * @param {IArtworkFormProps} props - The props for the component, including artwork data and close callback.
 */
const ArtworkForm: React.FC<IArtworkFormProps> = ({ artwork, onClose }) => {
    const dispatch: AppDispatch = useDispatch();

    const [errors, setErrors] = useState({
        title: '',
        artist: '',
        price: ''
    });

    const [data, setData] = useState<IArtwork>({
        id: artwork?.id || "",
        title: artwork?.title || "",
        artist: artwork?.artist || "",
        price: artwork?.price || 0,
        type: artwork?.type || "painting",
        availability: artwork?.availability ?? true,
        createdAt: artwork?.createdAt ?? new Date(),
        updatedAt: artwork?.updatedAt ?? new Date(),
    });

    /**
     * Handles input change for text fields, updates the respective state.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from input field.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (name === 'price') {
            setData((prev: IArtwork) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setData((prev: IArtwork) => ({ ...prev, [name]: value }));
        }
        validate();
    };

    const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((prev: IArtwork) => ({ ...prev, availability: event.target.checked }));
    };

    const handleTypeChange = (event: any): void => {
        setData((prev: IArtwork) => ({ ...prev, type: event.target.value }));
    };

    /**
     * Handles saving the artwork form data, either by creating or updating artwork.
     * Validates the form before dispatching the appropriate action.
     */
    const handleSave = (): void => {
        if (!validate()) return;
        if (artwork?.id) {
            dispatch(updateArtworkThunk({ id: artwork.id, updatedData: data }));
        } else {
            const { id, createdAt, updatedAt, ...dataToCreate } = data;
            dispatch(createArtworkThunk(dataToCreate));
        }
        onClose();
    };

    /**
     * Validates the form data and sets error states.
     * @returns {boolean} - Whether the form data is valid.
     */
    const validate = (): boolean => {
        const newErrors: IArtworkErrors = validateArtwork(data);
        setErrors(newErrors);
        return isValidArtwork(newErrors);
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', my: '20px', mx: '50px'}}>
                    <FormTextField
                        label="Title"
                        name="title"
                        fullWidth
                        sx={{
                            '& input': {
                                color: theme.palette.text.secondary,
                            },
                        }}
                        value={data.title}
                        error={!!errors.title}
                        helperText={errors.title}
                        onChange={handleChange}
                    />
                    <FormTextField
                        label="Artist"
                        name="artist"
                        fullWidth
                        value={data.artist}
                        error={!!errors.artist}
                        helperText={errors.artist}
                        onChange={handleChange}
                    />
                    <FormTextField
                        label="Price"
                        type="number"
                        name="price"
                        fullWidth
                        value={data.price}
                        error={!!errors.price}
                        helperText={errors.price}
                        onChange={handleChange}
                    />

                    <SortField
                        value={data.type}
                        handleTypeChange={handleTypeChange}
                        options={typeOptions}
                        label="Type"
                    />
                    <AvailabilityCheckbox
                        checked={data.availability}
                        onChange={handleAvailabilityChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button disabled={Object.values(errors).some(error => error)}
                        onClick={handleSave}>Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ArtworkForm;
