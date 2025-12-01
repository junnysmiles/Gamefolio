import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import BackButton from '@/components/BackButton'

export default function NotFound({id})
{
    return (
        <>
            <div>
                <BackButton href="/collection" />
            </div>
            <Stack sx={{ width: '100%' }} spacing={2}>    
                <Alert severity="error">Game ID {id} not found! Please go back.</Alert>
            </Stack>
        </>
    )
}