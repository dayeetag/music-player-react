import SongList from "../data/SongList"

export default function AllSongs({ currentSong, setCurrentSong }) {

    return (
        <div className="h-full max-h-full bg-zinc-950 overflow-auto scrollbar scrollbar-thumb-pink-950 scrollbar-track-gray-950 ">
            {
                SongList.map(s => {
                    return (
                        <button className={`w-full text-left cursor-pointer  ${currentSong.title === s.title ? 'bg-pink-950' : ''} hover:bg-pink-900 active:bg-pink-950 p-4`} onClick={() => setCurrentSong(s)}> {s.title} </button>
                    )
                })
            }
        </div>
    )
}