import { Box } from "@mui/material"
import BackButton from '@/components/BackButton'
import GameInformation from '@/components/GameInformation'
import NotFound from '@/components/NotFound'

export const metadata = {
    title: "Gamefolio - More Info"
}

export default async function CollectionId({ params }) {

    const resolvedParams = await params
    console.log(resolvedParams.id) //debug help

    const id = resolvedParams.id
    console.log(id) //debug help

    const game_data = await fetch(`http://localhost:3000/api/games/${id}`)
    
    if (!game_data.ok) {
        // If the book doesn't exist, show 404 page
        return (
            <NotFound id={id} />
        )
    }
    
    const game = await game_data.json()

    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>{game.game_name}</h1>
            <Box sx={{typography: "subtitle", fontSize: 24, marginTop: 2}}>ID: {id}</Box>
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

    if (Array.isArray(data.data)) {
        data = data.data;
    }

    return data.slice(0, 10).map((item) => ({
        id: item.id.toString()
    }));
}