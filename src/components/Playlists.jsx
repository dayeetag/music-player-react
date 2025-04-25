import { useEffect, useState } from "react"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Playlists({ playlists, setPlaylists, activePlaylist, setActivePlaylist, setCurrentSong }) {

    const [playlistName, setPlaylistName] = useState("")
    const [pNameError, setPNameError] = useState(false)
    const [showPlaylistTracks, setShowPlaylistTracks] = useState(false)

    useEffect(() => {
        setShowPlaylistTracks(true)
    }, [activePlaylist])

    function handleCreatePlaylist() {
        if (playlistName !== "") {
            const exists = playlists.some(item => item.name === playlistName);
            if (exists) {
                setPNameError(true)
            }
            else {
                setPNameError(false)
                setPlaylists(prevList => [...prevList, { name: playlistName, songs: [] }])
            }
            setPlaylistName("")
        }
    }

    function handleDeletePlaylist(p) {
        const updatedPlaylist = playlists.filter(pl => pl.name !== p.name)
        setPlaylists(updatedPlaylist)
    }

    function handleDeleteSong(songID, plName) {
        const newPlaylists = playlists.map(pl => {
            if (pl.name !== plName) return pl;

            const updatedSongs = pl.songs.filter(song => song.id !== songID);
            return {
                ...pl,
                songs: updatedSongs
            };
        });
        setPlaylists(newPlaylists)
        const updatedActive = newPlaylists.find(pl => pl.name === activePlaylist.name);
        if (updatedActive) {
            setActivePlaylist(updatedActive);
        }
    }

    return (
        <div className="h-full max-h-full rounded-t-lg bg-zinc-950 overflow-auto scrollbar scrollbar-thumb-pink-950 scrollbar-track-gray-950 ">
            <div className="w-full flex justify-between p-2">
                <input type="text" placeholder="Enter playlist name" value={playlistName} className="p-2 mr-2 bg-white text-black placeholder:text-black rounded-sm flex flex-1" onChange={(e) => setPlaylistName(e.target.value)} />
                <button className="bg-pink-950 px-4 py-2 rounded-sm cursor-pointer" onClick={handleCreatePlaylist}>Create</button>
            </div>
            {
                pNameError &&
                <div className="alert alert-error p-4 mx-4">
                    <span className="font-bold">Playlist name already exists!</span>
                </div>
            }
            {
                playlists.map(p => {
                    return (
                        <>
                            <div className={`w-full ${activePlaylist.name === p.name ? 'bg-pink-900' : ''} hover:bg-pink-900 active:bg-pink-950 flex p-2`}>
                                <div className={`text-left cursor-pointer flex flex-1 p-2`} onClick={() => { setActivePlaylist(p); setShowPlaylistTracks(!showPlaylistTracks) }}>{p.name} </div>
                                <button className="bg-black p-2 rounded-sm cursor-pointer" onClick={() => { handleDeletePlaylist(p) }}>Delete</button>
                            </div>
                            {
                                activePlaylist !== "" && activePlaylist.name === p.name && showPlaylistTracks &&
                                <ul>
                                    {
                                        activePlaylist.songs.map(s => {
                                            return (
                                                <li className="flex justify-between px-8 py-2" key={s.id}>
                                                    <span onClick={()=>setCurrentSong(s.songInfo)} className="cursor-pointer">{s.songInfo.title}</span>
                                                    <RemoveCircleOutlineIcon sx={{ color: "red", cursor: "pointer" }} onClick={() => handleDeleteSong(s.id, p.name)} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            }
                        </>
                    )
                })
            }
        </div>
    )
}