import { Card, CardContent } from "@mui/material";
import { format } from 'date-fns';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import Box from '@mui/material/Box';
import RatingBar from '@/components/RatingBar'

export default function GameInformation({ game })
{
    const info = ["Game Name", "Last Played", "Hours Played", "Number of Achievements", "Achievements Completed", "Percentage Completed", "Finished?", "Rating", "Review"]


    function formattedDate() {
        const newDate = game.last_played ? format(new Date(game.last_played), "MMMM d, yyyy @ h:mmaaa") : '—'

        return newDate
    }

    const gameInfo = [game.game_name, formattedDate(), game.hours_played, game.number_of_achievements, game.achievements_completed, game.percentage_completed, game.finished_game, game.rating, game.review]

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    {info.map((value, i) => (
                        <div key={i} className="grid grid-cols-6">
                            <p className={`underline decoration-indigo-500 decoration-3 font-bold ${i !== info.length - 1 ? 'mb-3' : ''}`}>{value}:</p>
                            <div className="col-span-5">
                                {i === 4 ? (
                                    <>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            <CircularProgress sx={{color: indigo[300]}} variant="determinate" value={game.percentage_completed} />
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
                                                sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                                                >
                                                {game.percentage_completed}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ) : i === 5 ? (
                                    game.isFinished ? (
                                        <>
                                            <CheckIcon className="text-green-600" />
                                        </>
                                        ) : (
                                        <>
                                            <CloseIcon className="text-red-600" />
                                        </>
                                    )
                                ) : i === 6 ? (
                                    <>
                                        <RatingBar initialRating={game.rating} isReadOnly={true} />
                                    </>
                                ) : (
                                    gameInfo[i] ?? '—'
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}