import { useState, useEffect } from 'react'
import AllSongs from './components/AllSongs'
import SongPlayer from './components/SongPlayer'
import Playlists from './components/Playlists'


function App() {
    const [showAllSongs, setShowAllSongs] = useState(true)
    const [currentSong, setCurrentSong] = useState("")
    const [playlists, setPlaylists] = useState(() => {
        const pList = JSON.parse(localStorage.getItem('myPlaylists'))
        return pList ? pList : []
    });
    const [activePlaylist, setActivePlaylist] = useState("");

    useEffect(() => {
        localStorage.setItem('myPlaylists', JSON.stringify(playlists));
    }, [playlists]);

    return (

        <div className='h-screen w-screen flex'>
            <div className="w-1/4 h-full flex flex-col pt-4 bg-black">
                <div>
                    <button className={`${showAllSongs ? 'bg-zinc-950' : 'bg-black'} p-4 rounded-t-lg font-bold cursor-pointer`} onClick={() => setShowAllSongs(true)}>All Songs</button>
                    <button className={`${showAllSongs ? 'bg-black' : 'bg-zinc-950'} p-4 rounded-t-lg font-bold cursor-pointer`} onClick={() => setShowAllSongs(false)}>Playlists</button>
                </div>
                {showAllSongs ?
                    <AllSongs currentSong={currentSong} setCurrentSong={setCurrentSong} /> :
                    <Playlists playlists={playlists} setPlaylists={setPlaylists} activePlaylist={activePlaylist} setActivePlaylist={setActivePlaylist} setCurrentSong={setCurrentSong}/>
                }
            </div>

            <div className="w-3/4 h-screen flex flex-col">
                <p className='font-bold text-4xl pt-8 pl-8'>Music Player 🎵</p>
                <SongPlayer currentSong={currentSong} playlists={playlists} setPlaylists={setPlaylists} activePlaylist={activePlaylist} setActivePlaylist={setActivePlaylist}/>
            </div>
        </div>
    )
}

export default App
