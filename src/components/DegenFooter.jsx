import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Box, IconButton} from '@material-ui/core';
import {ReactComponent as TwitterIcon} from "../images/twitter.svg";
import {ReactComponent as DiscordIcon} from "../images/discord.svg";
import {ReactComponent as MediumIcon} from "../images/medium.svg";
import {ReactComponent as TelegramIcon} from "../images/telegram.svg";

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
        <IconButton color={props.theme === "dark"?"secondary":"primary"} openUrl="https://twitter.com/LamboDegens">
            <TwitterIcon className={classes.logo}/>
        </IconButton>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} openUrl="https://discord.com/invite/G7j3QJh">
          <DiscordIcon className={classes.logo}/>
        </IconButton>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} openUrl="https://medium.com/@lambodegens/lambo-boosting-the-trust-and-value-in-the-defi-world-6fc8c369f7bc">
            <MediumIcon className={classes.logo}/>
        </IconButton>
        <IconButton color={props.theme === "dark"?"secondary":"primary"} openUrl="https://t.me/joinchat/SVEU7knIZrImEFy1dFd05Q">
            <TelegramIcon color={"white"} className={classes.logo}/>
        </IconButton>
    </Box>
  )
}
