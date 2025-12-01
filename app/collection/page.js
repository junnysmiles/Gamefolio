import CollectionTable from '@/components/CollectionTable.js'

export const metadata = {
    title: "Gamefolio - Collection"
}


export default function Collection() {
    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>Gamefolio - Your Collection</h1>
            <CollectionTable />
        </>
    )
}