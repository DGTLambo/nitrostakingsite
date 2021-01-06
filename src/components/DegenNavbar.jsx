import React, { useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {IconButton, Typography} from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import MusicPlayer from "./MusicPlayer";
import {config} from "../config";
import {classBag} from "../Utils";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  navBarWrapper:{
    position: "relative",
    zIndex: "100",
  },
  banner:{
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1)
  },
  Navbar: {
    fontSize: '2em',
    backgroundColor: 'transparent',
    color:"white",
    fontFamily: 'AstroSpace',
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  NavbarBrand: {
    fontSize: '1.2em',
    marginLeft: theme.spacing(5),
  },
  nav:{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1,2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0],
    [theme.breakpoints.down("md")]:{
      display:"none",
    }
  },
  logo: {
    height: "50px",
    width: "auto",
    marginRight: theme.spacing(2)
  },
  links: {
    color: theme.palette.primary.contrastText,
    margin: `0 ${theme.spacing(2)}px`,
    "&:hover":{
      color: theme.palette.primary.contrastText
    },
    "&[disabled]": {
      color: "gray",
      textDecoration: "none"
    },
    [theme.breakpoints.down("md")]:{
      fontSize: "1.1em",
      padding: theme.spacing(1)
    }
  },
  toggleMenu: {
    display: "none",
    [theme.breakpoints.down("md")]:{
      display: "inline-block"
    }
  }
}))

export default function DegenNavbar(props) {
  const classes = useStyles();
  const [musicDrawerOpen, setMusicDrawerOpen] = useState(false);
  const [navOpened, setNavOpened] = useState(false);

  const handleMusicClick = () => {
    setMusicDrawerOpen(true);
  };

  const handleMusicClose = () => {
    setMusicDrawerOpen(false);
  }

  const openNav = () => {
    setNavOpened(true);
  }

  const closeNav = () => {
    setNavOpened(false);
  }

  return (
      <Box className={classes.navBarWrapper}>
        {props.children && (
            <Box className={classes.banner}>
              {props.children}
            </Box>
        )}
        <Navbar className={classes.Navbar} expand="lg" variant="dark">
          <Link to="/" className={classBag(classes.links, classes.NavbarBrand)}>
              {config.appName}
          </Link>
          {navOpened?(
              <IconButton className={classes.toggleMenu} onClick={closeNav}>
                <CloseIcon/>
              </IconButton>
          ):(
              <IconButton className={classes.toggleMenu} onClick={openNav}>
                <MenuIcon/>
              </IconButton>
          )}
          <Drawer anchor={"top"} open={navOpened} onClick={closeNav}>
            <Box textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <Link to="/" className={classes.links}>
                Home
              </Link>
              <Link to="/nitro" className={classes.links}>
                NITRO
              </Link>
              <a href={config.swapUrl} target={"_blank"} className={classes.links}>
                SWAP
              </a>
              <Link to="/about" className={classes.links}>
                ABOUT
              </Link>
              <IconButton aria-controls={"music-menu"} onClick={handleMusicClick} className={classes.links}>
                <MusicNoteIcon/>
              </IconButton>
            </Box>
          </Drawer>
          <Box className={classes.nav}>
            <Link to="/" className={classes.links}>
              Home
            </Link>
            <Link to="/nitro" className={classes.links}>
              NITRO
            </Link>
            <a href={config.swapUrl} target={"_blank"} className={classes.links}>
              SWAP
            </a>
            <Link to="/about" className={classes.links}>
              ABOUT
            </Link>
            <IconButton aria-controls={"music-menu"} onClick={handleMusicClick} className={classes.links}>
              <MusicNoteIcon/>
            </IconButton>
            <Drawer anchor={"right"} open={musicDrawerOpen} onClose={handleMusicClose}>
              <Box p={3}>
                <Typography component={"h2"} variant={"h4"}>Lambo beats</Typography>
                <MusicPlayer/>
              </Box>
            </Drawer>
          </Box>
        </Navbar>
      </Box>
  )
}
