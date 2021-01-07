/* React Imports */
import React, {useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css'
import {config} from "../../config";

/* CSS Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginTop: '0vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow:"1",
  },
  description: {
    zIndex: 100,
    color: '#FFF',
    maxWidth: "800px",
    padding: theme.spacing(5),
    "& img": {
      margin: `${theme.spacing(1)}px 0`,
      width: "100%",
      height: "auto",
    }
  },
}))

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About | Lambo Degenerates</title>
      </Helmet>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flex={"1 1 auto"}>
        <Box className={classes.description}>
          <Typography align={"center"} component={"h2"} variant={"h2"}>About {config.appName}</Typography>
          <Typography>
            Nitro Staking has two mechanisms to bring value to holders and traders:<br/>
            <ol>
              <li>
                Anyone holding more than 1 NIST gains eth automatically sent to
                their wallet over time
              </li>
              <li>The ethereum yield is generated my trading volume, so to
                incentivize trades the Nitro Protocol will give bonuses to
                buyers and tax sellers at low, affordable rates (0-5% and 0-10%,
                respectively)</li>
            </ol>

            Buyers receive their bonuses instantly, facilitating a healthy volume
            profile on the charts over time - thereby increasing the APY for our
            dedicated holders. <br/>

            Dev email: tafirsmenmaasteln@protonmail.com
            Project email: lambo.farm@protonmail.com
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default About
