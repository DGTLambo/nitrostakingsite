import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Box, IconButton} from '@material-ui/core';
import {ReactComponent as TwitterIcon} from "../images/twitter.svg";
import {ReactComponent as DiscordIcon} from "../images/discord.svg";
import {ReactComponent as MediumIcon} from "../images/medium.svg";
import {ReactComponent as TelegramIcon} from "../images/telegram.svg";
import Button from "@material-ui/core/Button";
import {config} from "../config";

const useStyles = makeStyles((theme) => ({
    bottomNav: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "no-wrap",
        padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
        position: "relative",
        zIndex:10,
    },
    logo: (props = "dark") => ({
        zIndex:10,
        fill: props.theme === "dark"?theme.palette.primary.main:theme.palette.secondary.main,
        transition: "fill 0.1s",
        "&:hover":{
            fill: props.theme === "dark"?theme.palette.primary.dark:theme.palette.secondary.light,
        },
        width: "32px",
        [theme.breakpoints.up('lg')]:{
            width: "40px",
        }
    })
}))

export default function DegenFooter(props) {
  const classes = useStyles(props)
  return (
    <Box className={classes.bottomNav}>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} href={config.tweeter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon className={classes.logo}/>
        </IconButton>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} href={config.discord} target="_blank" rel="noopener noreferrer">
          <DiscordIcon className={classes.logo}/>
        </IconButton>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} href={config.medium} target="_blank" rel="noopener noreferrer">
            <MediumIcon className={classes.logo}/>
        </IconButton>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} href={config.telegram} target="_blank" rel="noopener noreferrer">
            <TelegramIcon color={"white"} className={classes.logo}/>
        </IconButton>
    </Box>
  )
}
