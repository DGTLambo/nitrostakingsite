/* React Imports */
import React, {useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {config} from "../../config";
import Section from "../Section";
import {ReactComponent as ChartBackground} from "../../images/chartbackground.svg";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import {classBag} from "../../Utils";

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: "800px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingBottom: "100px",
  },
  about: {
    backgroundColor: theme.palette.background.paper
  },
  paddedSection: {
    padding: theme.spacing(5),
  },
  aboutGrid: {
    padding: theme.spacing(3,1),
    display: "grid",
    gridTemplateColumns: "25% 75%",
    alignItems: "center"
  },
  gridHeader: {
    justifySelf: "end",
    alignSelf: "stretch",
    borderRight: "4px solid "+theme.palette.secondary.main,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center"
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.up("md")]:{
      flexWrap: "nowrap"
    }
  },
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    flex: "1 1 33%",
  },
  divider: {
    borderTop: "4px dotted "+theme.palette.secondary.main,
    width: "80%",
    margin: "0 auto",
  },
  bigIcon: {
    fontSize: 90,
    margin: theme.spacing(2),
  },
  greenIcon: {
    color: theme.palette.success.main,
  },
  redIcon: {
    color: theme.palette.primary.main
  }
}))

function Homepage() {
  const classes = useStyles()
  return (
<>
  <Helmet>
    <meta charSet="utf-8" />
    <title>Home | {config.appName}</title>
  </Helmet>
  <Section background={<ChartBackground style={{width:"100%"}}/>} className={classes.hero}>
    <Box className={classes.main}>
      <Box>
        <Typography component={'h1'} variant={'h3'} style={{}}>
          Apply Nitro To Your Portfolio
        </Typography>
        <Typography component={'p'} >
          NIST boost your APY by applying Nitro to volatility
        </Typography>
        <Box display="flex" my={2}>
          <Button
              variant="contained"
              color="primary"
              href="https://lambodegens.medium.com/"
              target="_blank"
              style={{marginRight: 16}}
          >
            Medium articles
          </Button>
          <Button
              variant="outlined"
              color="secondary"
              href={config.swapUrl}
              target="_blank"
          >
            Swap
          </Button>
      </Box>
      </Box>
    </Box>
  </Section>
  <Section className={classes.about}>
      <Typography component={"h2"} variant={"h4"} align={"center"}>Key elements of {config.appName}</Typography>
      <Box className={classes.aboutGrid}>
        <Box className={classes.gridHeader}><Typography component={"h3"} variant={"h5"}>Staking</Typography></Box>
        <Box ml={2}>
          <Typography component={"p"} >Hold at least {config.stakingMinRequired}{config.ticker} to receive staking rewards in ETH directly to your wallet</Typography>
        </Box>
        <Box className={classes.gridHeader}><Typography component={"h3"} variant={"h5"}>Nitro</Typography></Box>
        <Box ml={2} py={2}>
          <Typography component={"p"}>Nitro will incentivize volume to generate good APY</Typography>
          <Button component={Link} to="/nitro" variant={"contained"} color={"primary"} size={"small"} style={{marginTop: 16}}>NIST Dashboard</Button>
        </Box>
        <Box className={classes.gridHeader}><Typography component={"h3"} variant={"h5"}>NFTs</Typography></Box>
        <Box ml={2}><Typography component={"p"}>Coming soon</Typography></Box>
      </Box>
  </Section>
  <Section className={classes.paddedSection}>
    <Typography component={"h2"} variant={"h4"} align={"center"}>About staking</Typography>
    <Box className={classes.flex}>
      <Paper className={classes.card}>
        <Typography component={"h3"} variant={"h5"} align={"center"}>Automatic payout</Typography>
        <Typography component={"p"}>
          Hold {config.stakingMinRequired} {config.ticker} minimum (more {config.ticker} means more income) to receive your Ethereuem
          staking rewards directly to your wallet. Your rewards will be accumulated
          until it reaches {config.minEthForAutomaticReward} ETH. If you want to claim them before, you can do so
          in the NIST dashboard.
        </Typography>
      </Paper>
      <Paper className={classes.card}>
        <Typography component={"h3"} variant={"h5"} align={"center"}>Reduced inflation</Typography>
        <Typography component={"p"}>
          As the rewards are distributed using ETH, the NIST token will not have a huge
          inflation as seen with the usual farming tokens.
        </Typography>
      </Paper>
      <Paper className={classes.card}>
        <Typography component={"h3"} variant={"h5"} align={"center"}>Save gas and time</Typography>
        <Typography component={"p"}>
          Automatic payout in ETH means that you have to spend less time and money claiming and swapping.
          It can be seen as passive income directly to your wallet.
        </Typography>
      </Paper>
    </Box>
  </Section>
  <Box className={classes.divider}></Box>
  <Section className={classes.paddedSection}>
    <Typography component={"h2"} variant={"h4"} align={"center"}>About Nitro</Typography>
    <Typography component={"p"} style={{maxWidth: 800, textAlign:"center", margin: "0 auto"}}>
      Nitro aims to increase volatility in the price token, because it encourages the
      trading of the token which in turn increases the APY for the holders while being
      a swing trader's paradise. Nitro bonus goes from 0% to 5% for buyers and 0 to 10% for sellers.
    </Typography>
    <Box className={classes.flex}>
      <Box flex={"1 1 50%"} m={1}>
        <Box display={"flex"} alignItems={"center"}>
          <TrendingUpIcon className={classBag(classes.bigIcon, classes.greenIcon)}/>
          <Typography component={"h3"} variant={"h5"}>Buying</Typography>
        </Box>
        <Typography component={"p"}>
          You receive the Nitro % of your buy order in bonus {config.ticker}.
        </Typography>
        <Typography component={"p"}>
          Example: Nitro is at 3% and you buy 100{config.ticker}, you will receive 103{config.ticker}.
        </Typography>
      </Box>
      <Box flex={"1 1 50%"} m={1}>
        <Box display={"flex"} alignItems={"center"}>
          <TrendingDownIcon className={classBag(classes.bigIcon, classes.redIcon)}/>
          <Typography component={"h3"} variant={"h5"}>Selling</Typography>
        </Box>
        <Typography component={"p"}>
          The tax on your order when you sell is the Seller Nitro % (0-10%). Half of
          the taxed tokens are returned to the Nitro Protocol to fund volatility, and
          the other half are swapped for ETH at a later date to distribute passive
          ethereum income to qualifying holders.
        </Typography>
        <Typography component={"p"}>
          Example: Seller Nitro is at 6% and you sell 100{config.ticker}, you will receive the ETH for 94{config.ticker}.
        </Typography>
      </Box>
    </Box>
  </Section>
</>
  )
}

export default Homepage
