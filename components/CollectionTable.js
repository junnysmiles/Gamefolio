import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { indigo } from '@mui/material/colors';
import { format } from 'date-fns';
import { List, ListItem, ListItemText } from '@mui/material';
import RatingBar from '@/components/RatingBar'
// import { deleteGame } from '../actions'

export default async function CollectionTable({ isWishlist = false }) {
    const game_data = await fetch("http://localhost:3000/api/games")
    const games = await game_data.json()

    const table_rows = ["ID", "Game Name", "Last Played", "Hours Played", "Percentage Completed", "Rating"]

    return (
        <>
            {!isWishlist ? (
                <TableContainer 
                    component={Paper}
                    sx={{
                            backgroundColor: indigo[100],
                            marginTop: 3
                        }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='font-bold'>
                                {table_rows.map((row) => (
                                    <TableCell sx={{fontWeight: 'bold'}} key={row}>{row}</TableCell>
                                ))}
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>More</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>Edit</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.data.map((game) => (
                                <TableRow
                                    key={game.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{game.id}</TableCell>
                                    <TableCell>{game.game_name}</TableCell>
                                    <TableCell>{game.last_played ? format(new Date(game.last_played), "MMMM d, yyyy @ h:mmaaa") : '—'}</TableCell>
                                    <TableCell>{game.hours_played}</TableCell>
                                    <TableCell>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            <CircularProgress sx={{color: indigo[300]}} variant="determinate" value={game.percentage_completed} enableTrackSlot/>
                                            <Box
                                                sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                }}
                                            >
                                                <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{ color: 'text.secondary' }}
                                                >
                                                {game.percentage_completed}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <RatingBar initialRating={game.rating} isReadOnly={true} />
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/collection/${game.id}`}>
                                                <IconButton edge="end" aria-label="edit">
                                                    <ReadMoreIcon />
                                                </IconButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/admin/edit/${game._id}`}>
                                            <IconButton edge="end" aria-label="edit">
                                                    <EditIcon />
                                            </IconButton> 
                                        </Link>                                     
                                    </TableCell>
                                    <TableCell>
                                        {/* <form action={deleteGame.bind(null, game._id)}> */}
                                            <IconButton type="submit" edge="end" aria-label="edit">
                                                    <DeleteIcon />
                                            </IconButton>
                                        {/* </form> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                    <List
                    sx={{
                        backgroundColor: indigo[100], 
                        color: 'black',
                        marginTop: 3
                    }}>
                        {games.data.map((game, i) => (
                            <div key={game._id}>
                                <ListItem
                                    key={game._id}
                                    secondaryAction={
                                        <Link href={`/collection/${game._id}`}>
                                            <IconButton edge="end" aria-label="edit">
                                                <ReadMoreIcon />
                                            </IconButton>
                                        </Link>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Box display="flex" gap={4} width="100%">
                                                <Box width="10%" sx={{fontWeight: 'bold'}}>{game._id}</Box>
                                                <Box width="45%">{game.game_name}</Box>
                                                <Box width="45%">{game.hours_played}</Box>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {i !== games.length - 1 && <Divider component="li" />}
                            </div>
                        ))}
                </List>
            )}
        </>
    )
}