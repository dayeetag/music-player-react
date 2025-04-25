import { useEffect, useState, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function SongPlayer({ currentSong, playlists, setPlaylists, activePlaylist, setActivePlaylist }) {

    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("")
    const [selectedPlaylistOption, setSelectedPlaylistOption] = useState("");

    const audioRef = useRef(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [currentSong])

    useEffect(() => {
        if (newPlaylistName !== "")
            setSelectedPlaylistOption("")
    }, [newPlaylistName])

    const handleSave = () => {
        if (newPlaylistName !== "") {
            setPlaylists(prevData =>
                [...prevData, { name: newPlaylistName, songs: [{ id: uuidv4(), songInfo: currentSong }] }]
            )
        }
        else if (selectedPlaylistOption !== "") {
            setPlaylists(prevData => {
                const updatedPlaylists = prevData.map(playlist =>
                    playlist.name === selectedPlaylistOption
                        ? {
                            ...playlist,
                            songs: [...playlist.songs, { id: uuidv4(), songInfo: currentSong }]
                        }
                        : playlist
                );
                if (activePlaylist.name === selectedPlaylistOption) {
                    const updatedActive = updatedPlaylists.find(pl => pl.name === activePlaylist.name);
                    if (updatedActive) setActivePlaylist(updatedActive);
                }

                return updatedPlaylists;
            })

        }
        setNewPlaylistName("")
        setSelectedPlaylistOption("")
        setShowModal(false);
    };

    return (
        <div className="flex-1">
            {
                currentSong === "" ?
                    <div className="w-full h-full flex flex-col justify-around items-center">
                        <p>Select a song to play!</p>
                    </div>
                    :
                    <div className="w-full h-full flex flex-col justify-around items-center px-32 py-16">
                        <img src={currentSong.albumart ? currentSong.albumart : ""} className="w-1/4 rounded-lg" />
                        <p className="font-bold text-2xl">{currentSong.title ? currentSong.title : ""}</p>
                        <p className="font-semibold text-lg">{currentSong.artist ? currentSong.artist : ""}</p>
                        <p className="text-md">{currentSong.desc ? currentSong.desc : ""}</p>
                        <audio ref={audioRef} controls autoPlay className="w-3/5">
                            <source src={currentSong.src ? currentSong.src : null} type="audio/mp3" />
                        </audio>
                        <button
                            className="bg-pink-950 px-4 py-2 rounded-lg text-lg cursor-pointer"
                            onClick={() => setShowModal(true)}>
                            Add to Playlist
                        </button>
                        {showModal && (
                            <dialog className="modal modal-open">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg mb-4">Create playlist</h3>
                                    <div className="mb-4">
                                        <input type="text" placeholder="Enter playlist name" className="input input-bordered w-full bg-white text-black placeholder:text-black"
                                            onChange={(e) => setNewPlaylistName(e.target.value)}
                                        />
                                    </div>

                                    {playlists.length > 0 && (
                                        <>
                                            <h3 className="font-bold text-lg text-center">OR</h3>
                                            <h3 className="font-bold text-lg mb-4">Add to playlist</h3>
                                            <div className="mb-4">
                                                <select
                                                    className="select select-bordered w-full bg-white text-black"
                                                    value={selectedPlaylistOption}
                                                    onChange={(e) => setSelectedPlaylistOption(e.target.value)}
                                                    disabled={newPlaylistName !== ""}
                                                >
                                                    <option disabled value="">Pick one</option>
                                                    {
                                                        playlists.map(pl => {
                                                            return (
                                                                <option value={pl.name}>{pl.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    <div className="modal-action">
                                        <button className="btn btn-success" onClick={handleSave}>
                                            Save
                                        </button>
                                        <button className="btn" onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </dialog>
                        )}
                    </div>


            }
        </div>
    )
}