/* React Imports */
import React, {useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css'

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
          <Typography align={"center"} component={"h2"} variant={"h2"}>About $LAMBO</Typography>
          <Typography variant={'h6'}>
            $LAMBO is a token with two valuable features:
            <ol>
              <li>Directly gamified volatility to benefit hodlers and swing traders alike</li>
              <li>Indefinite staking for liquidity pool / token stakers</li>
            </ol>
            <p>
              The core of $LAMBO runs off of our NITRO protocol; simply put, a time-weighted average price (TWAP) is calculated for the previous 2 hours. Any sells placed through uniswap have some tokens removed based on how far away that sell order price is from the TWAP (For example, a 5% difference in price means that 5% of the tokens in the sell order are removed). Conversely, any buy orders placed through uniswap have tokens awarded to the buyer based on how far away the buy order price is from the TWAP (For example, a 10% difference in price means that 10% more tokens are given to the buyer).
            </p>
            <p>
              The tokens removed from sell orders are sent to fund the bonus tokens awarded to buyers, and to those staking on the website (called The Shop). This means that as long as people are swing trading $LAMBO, stakers will be making money.
            </p>
            <p>
              The tokens awarded to buyers are locked in the contract for 2 hours. After that time, they can claim them directly from the contract.
            </p>
            <p>
              That's the $LAMBO token, but we also have more exciting things on the roadmap: NFTs, trading leaderboards, and more! We have a wonderful dedicated team of developers that have been working hard on this for weeks and an amazing community of more than 1,000 people between our Discord and Telegram.
            </p>
            <p>
              Our presale will be happening in a few weeks, with the following details:<br/>

              Presale prices: (Max 134.24 ETH. Unsold tokens re-allocated to NITRO)
              <ul>
                <li>Whitelisted: 0.28 ETH/$LAMBO (About $112). (Max: 119.84 ETH)</li>
                <li>Project developers: 0.18 ETH /$LAMBO (About $72). (Max: 14.4 ETH)</li>
              </ul>
              Uniswap Listing: 320 $LAMBO: 134.24 ETH means 0.4195 ETH/$LAMBO ($167 / LAMBO)
            </p>
            Welcome to the track, and keep burning rubber, Lambros!
            <p>Dev email: tafirsmenmaasteln@protonmail.com</p>
            <p>Project email: lambo.farm@protonmail.com</p>
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default About
