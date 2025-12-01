import { Box } from "@mui/material"
import BackButton from '@/components/BackButton'
import GameInformation from '@/components/GameInformation'
import NotFound from '@/components/NotFound'

export const metadata = {
    title: "Gamefolio - More Info"
}


export default async function CollectionId({ params }) {

    const gameId = params.id; 

    const game_data = await fetch(`http://localhost:3000/api/games/${params.id}`)
    
    if (!game_data.ok) {
        // If the book doesn't exist, show 404 page
        return (
            <NotFound id={params.id} />
        )
    }
    
    const game = await game_data.json()

    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>{game.game_name}</h1>
            <Box sx={{typography: "subtitle", fontSize: 24, marginTop: 2}}>ID: {params.id}</Box>
            <div className='pt-2'>
                <BackButton href="/collection" />
            </div>
            <div>
                <GameInformation game={game} />
            </div>
        </>
    )
}

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3000/api/games');
    let data = await res.json();

    // Check if the API response is an object with a 'data' key (common API wrapper)
    // If so, use the array inside the 'data' key.
    if (data && typeof data === 'object' && Array.isArray(data.data)) {
        data = data.data;
    } else if (!Array.isArray(data)) {
        // If it's still not an array, log an error and treat it as empty.
        console.error("API /api/games did not return a valid array of games.");
        data = []; 
    }

    // Safely map only up to 10 items, or fewer if less than 10
    return data.slice(0, 10).map((item) => ({
        // MUST use the 'id' key to match the [id] folder name
        id: item.display_id.toString() 
    }));
}