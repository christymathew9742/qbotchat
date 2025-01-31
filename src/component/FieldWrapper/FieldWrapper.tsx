"use client"; 

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/system';

const FieldWrapperStyled = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    widows:'auto',
    [
        theme.breakpoints.up('sm')]: {
        height: 'auto',
    },
    [
        theme.breakpoints.down('sm')]: {
        height: 'auto',
    },
}));

interface InputWrapperProps extends React.ComponentPropsWithoutRef<typeof Grid> {
    children: React.ReactNode;
}

const FieldWrapper: React.FC<InputWrapperProps> = ({ children, ...props }) => {
    return (
        <FieldWrapperStyled {...props}>
            {children}
        </FieldWrapperStyled>
    );
};

export default FieldWrapper;

