import { SxProps } from '@mui/system';

export const customInputStyles:SxProps = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: '#51A1FF',
        },
        '&:hover fieldset': {
        borderColor: '#51A1FF',
        },
        '&.Mui-focused fieldset': {
        borderColor: '#51A1FF',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#51A1FF',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#51A1FF', 
    },
    '& .MuiOutlinedInput-input': {
        color: '#51A1FF', 
    },
};
