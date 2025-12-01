'use client';

import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

export default function RatingBar({initialRating = 0, isReadOnly = false})
{
    const [rating, setRating] = useState(initialRating)

    const handleChange = (event, newValue) => {
        setRating(newValue);
      };

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
    });

    return (
        <>
            <StyledRating
                name='rating'
                defaultValue={initialRating}
                value={rating}
                onChange={handleChange}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={
                    <FavoriteBorderIcon 
                        fontSize="inherit" 
                        sx={{
                            stroke: 'white',
                            strokeWidth: 1,
                          }}
                    />
                }
                readOnly={isReadOnly}
            />
        </>
    )
}