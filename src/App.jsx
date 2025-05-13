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
        <div className='h-screen w-screen flex flex-col overflow-hidden'>
            {/* Header */}
            <div>
                <p className='font-bold text-3xl md:text-4xl p-4 md:p-8 text-center md:text-left'>
                    Music Player 🎵
                </p>
            </div>

            {/* Content Area */}
            <div className='flex flex-col md:flex-row flex-1 overflow-hidden'>
                {/* Sidebar */}
                <div className="w-full md:w-1/4 h-1/3 md:h-full flex flex-col pt-4 bg-black overflow-y-auto">
                    <div className="flex">
                        <button
                            className={`flex-1 ${showAllSongs ? 'bg-zinc-950 rounded-t-md' : 'bg-black'} p-4 font-bold cursor-pointer`}
                            onClick={() => setShowAllSongs(true)}
                        >
                            All Songs
                        </button>
                        <button
                            className={`flex-1 ${showAllSongs ? 'bg-black' : 'bg-zinc-950  rounded-t-md'} p-4 font-bold cursor-pointer`}
                            onClick={() => setShowAllSongs(false)}
                        >
                            Playlists
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {showAllSongs ? (
                            <AllSongs currentSong={currentSong} setCurrentSong={setCurrentSong} />
                        ) : (
                            <Playlists
                                playlists={playlists}
                                setPlaylists={setPlaylists}
                                activePlaylist={activePlaylist}
                                setActivePlaylist={setActivePlaylist}
                                setCurrentSong={setCurrentSong}
                            />
                        )}
                    </div>
                </div>

                {/* Main Player Panel */}
                <div className="flex-1 w-full md:w-3/4 flex flex-col overflow-y-auto">
                    <SongPlayer
                        currentSong={currentSong}
                        playlists={playlists}
                        setPlaylists={setPlaylists}
                        activePlaylist={activePlaylist}
                        setActivePlaylist={setActivePlaylist}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
