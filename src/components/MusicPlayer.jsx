import {IconButton, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import React from "react";
import {useMusic} from "./MusicProvider";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
    },
    songCard: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,
        transition: "transform 0.1s",
        "&:hover":{
            transform: "scale(1.03)",
        }
    },
    activeSong: {
        boxShadow: theme.shadows[2],
        transform: "scale(0.97)",
    }
}))

export default function MusicPlayer(props){
    const classes = useStyles();
    const {play, playing, next, prev, pause, songs, currentSong, changeSong} = useMusic();

    return (
        <Box py={2}>
            <Typography className={classes.title} textAlign={"center"}>{currentSong.title}</Typography>
            <Box display={"flex"} justifyContent={"center"}>
                <IconButton onClick={prev}>
                    <SkipPreviousIcon/>
                </IconButton>
                {playing?
                    <IconButton onClick={pause}>
                        <PauseIcon/>
                    </IconButton>
                    :
                    <IconButton onClick={play}>
                        <PlayArrowIcon/>
                    </IconButton>
                }
                <IconButton onClick={next}>
                    <SkipNextIcon/>
                </IconButton>
            </Box>
            <Box>
                {songs.map(song=>(
                    <Box className={classes.songCard+(song === currentSong?" "+classes.activeSong:"")}
                        onClick={()=>changeSong(song)}
                    >
                        <Typography>{song.title} by {song.author}</Typography>
                    </Box>

                ))}
            </Box>
            <Typography>Check out our <a target={"_black"} href={"https://soundcloud.com/user-280928737-279286333"}>Soundcloud</a></Typography>

        </Box>
    );
}
