import { Collapse, IconButton, Alert } from '@mui/material';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';


export default function Busqueda({categorias}) {
    const { messages } = usePage().props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (messages.success) {
            setOpen(true);
        }
    }, [messages.success]);


    return (
        <Collapse in={open}>
        {messages.success && (
            <Alert
                severity='success'
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                            messages.success = false;
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {messages.success}
            </Alert>

        )}
        {messages.error && (
            <Alert
                severity='error'
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false); // Cambia el estado de open cuando se hace clic
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {messages.error}
            </Alert>

        )}
    </Collapse>
    );
}
