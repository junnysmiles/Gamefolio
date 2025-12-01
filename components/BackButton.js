import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton({ href })
{
    return (
        <Link href={href}>
            <IconButton sx={{color: "white"}} size="large" aria-label="back">
                <ArrowBackIcon fontSize='large' />
            </IconButton>
        </Link>
    )
}