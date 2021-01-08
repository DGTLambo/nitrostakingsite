import React, {createContext, useContext, useState} from 'react';
import LamboDegens from "../songs/Lambo_Degens.mp3";
import LamboToken2 from "../songs/Lambo_Token_2.0_1.mp3";
import LamboStash from "../songs/My_lambo_Stash.mp3";
import LamboOng from "../songs/Lambo_ong.mp3";
import LamboToken from "../songs/Lambo_Token.mp3";
import LambOg from "../songs/Lamb_OG.mp3";

const newSong = (title, src, author = "") => {
    return {
        title,
        src,
        author
    }
}

const songs = [
    newSong("Lambo Degens", LamboDegens, "WhiteLambo"),
    newSong("Lambo Token 2", LamboToken2, "Degen"),
    newSong("Lambo Stash", LamboStash, "Lonnie"),
    newSong("lambo Ong", LamboOng, "Shadyrifles"),
    newSong("Lambo OG", LambOg, "Volkano"),
    newSong("Lambo Token", LamboToken, "Degen")
]

const MusicContext = createContext({});

export default function MusicProvider(props){
    let [currentAudio, setCurrentAudio] = useState(null);
    let [songIndex, setSongIndex] = useState(0);
    let [playing, setPlaying] = useState(false);

    const next = () => {
        const nextSongIndex = (songIndex+1)%songs.length;
        setSongIndex(nextSongIndex);
        changeSong(songs[nextSongIndex])
    }

    const prev = () => {
        const nextSongIndex = (songIndex-1)%songs.length;
        changeSong(songs[nextSongIndex])
    }

    const changeSong = (song) => {
        setSongIndex(songs.findIndex(s => s===song));
        currentAudio && currentAudio.pause()
        const nextSong = new Audio(song.src);
        setCurrentAudio(nextSong);
        nextSong.play().then(()=>setPlaying(true));
    }

    const play = () => {
        let audio = currentAudio;
        if(audio == null){
            audio = new Audio(songs[0].src)
            setCurrentAudio(audio);
        }
        audio.play().then(()=>setPlaying(true));
    }

    const pause = () => {
        currentAudio.pause();
        setPlaying(false);
    }

    return (
        <MusicContext.Provider value={{
            next,
            play,
            pause,
            prev,
            playing,
            songs,
            currentSong: songs[songIndex],
            changeSong
        }}>
            {props.children}
        </MusicContext.Provider>
        );
}

export const useMusic = () => {
    return useContext(MusicContext);
}
