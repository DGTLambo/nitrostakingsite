import React, { useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import {round} from "../../Utils";
import {useAlerts} from "../AlertProvider";
import Section from "../Section";
import Button from "@material-ui/core/Button";
import {useWeb3React} from "@web3-react/core";
import {injected} from "../../connectors";
import {config} from "../../config";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    zIndex: 10,
  },
  contentWrapper: {
    maxWidth: '600px',
    padding: theme.spacing(3),
    color: 'white',
    zIndex: "10",
    [theme.breakpoints.down("md")]:{
      margin: theme.spacing(0, "auto"),
      textAlign:"center"
    }
  },
  nitroInfo: {
    [theme.breakpoints.up("md")]:{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
    }
  },
  prices: {
    border: "4px solid "+theme.palette.secondary.main,
    borderRadius: 30,
    padding: theme.spacing(2, 1),
    display: "grid",
    gridTemplateColumns: "50% 50%",
    alignItems: "center"
  },
  priceHeader: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1,0),
    justifySelf: "end",
    display: "flex",
    alignItems: "center"
  },
  nitro: {
    padding: theme.spacing(3, 0),
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper
  },
  gauge: {
    border: "4px solid "+theme.palette.secondary.main,
    borderRadius: 30,
    padding: theme.spacing(1)
  },
  gaugeFill: {
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: 20,
    boxShadow: theme.shadows[0]
  },
  paddedSection: {
    padding: theme.spacing(4)
  }
}))

function NitroPage() {
  const classes = useStyles()
  const {active, activate, account} = useWeb3React()
  const {alertSuccess, alertError} = useAlerts();
  const [bonus, setBonus] = useState(0);
  const [penalty, setPenalty] = useState(0)
  const [twap, setTwap] = useState(0);
  const [realPrice, setRealPrice] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [deltaTwapUpdate, setDeltaTwapUpdate] = useState(0);
  const [lastTwapUpdate, setLastTwapUpdate] = useState(0);
  const [timeLeftBeforeTwapUpdate, setTimeLeftBeforeTwapUpdate] = useState("");


  useEffect(()=>{
    if (active){
      //loadNitroInfo()
    }
  },[active])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeftBeforeTwapUpdate(getTimeLeftBeforeTwapUpdate());

    },1000)
    return ()=>{
      clearInterval(intervalId);
    }
  }, [deltaTwapUpdate, lastTwapUpdate]);

  useEffect(()=>{
    if (active){
      const intervalId = setInterval(() => {
        //loadNitroInfo();
      },500)
      return ()=>{
        clearInterval(intervalId);
      }
    }
  }, [active])

/*  const loadNitroInfo = () =>{
    getProvider().then(({web3}) => {
      const contract = new web3.eth.Contract(tokenContract.abi, tokenContract.address);
      contract.methods.calculateCurrentNitroRate(true).call()
          .then(buyNitroRate => setBonus(web3.utils.fromWei(buyNitroRate,'ether')))
          .catch(() => {});
      contract.methods.calculateCurrentNitroRate(false).call()
          .then(sellNitroRate => setPenalty(web3.utils.fromWei(sellNitroRate,'ether')))
          .catch(() => {});
      contract.methods.getLastLongTwap().call()
          .then(twap => setTwap(web3.utils.fromWei(twap, 'ether')))
          .catch((e) => {
            console.log(e);
            alertError("Couldn't load current TWAP")
          });
      contract.methods.getLastShortTwap().call()
          .then(twap => setRealPrice(web3.utils.fromWei(twap, 'ether')))
          .catch((e) => {
            console.log(e);
            alertError("Couldn't load current TWAP")
          });
      web3.eth.getBlockNumber().then(setCurrentBlock);
      contract.methods.minDeltaTwapLong().call()
          .then(setDeltaTwapUpdate);
      contract.methods.blockTimestampLastLong().call()
          .then(setLastTwapUpdate);
    }).catch((error) => {
      console.log(error)
    })
  }*/

  const getTimeLeftBeforeTwapUpdate = () => {
    const timeLeft = (Number(lastTwapUpdate)+Number(deltaTwapUpdate)) - Date.now()/1000;
    if (timeLeft > 0) {
      const parts = {
        days: Math.floor(timeLeft / ( 60 * 60 * 24)),
        hours: Math.floor((timeLeft / (60 * 60)) % 24),
        minutes: Math.floor((timeLeft / 60) % 60),
        seconds: Math.floor((timeLeft) % 60),
      };
      return "in "+Object.keys(parts).map(part => parts[part] > 0?parts[part]+part[0]:"").join(" ")
    } else {
      return "now";
    }
  }

  const getETHPerLambo = () => {
    return 1/realPrice;
  }

  const buyPrice = () =>{
    return 1/(realPrice*(1+Number(bonus)));
  }

  const sellPrice = () =>{
    const ethLambo = getETHPerLambo();
    return ethLambo*(1-Number(penalty));
  }

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nitro | Lambo Degenerates</title>
      </Helmet>
      <Section>
        {!active && (
            <Box textAlign={"center"} pb={3}>
              <Typography variant={"h6"} gutterBottom={true}>Connect your wallet to have access to the dashboard</Typography>
              <Button color={"primary"} variant={"contained"} onClick={() => activate(injected)}>Connect my wallet</Button>
            </Box>
        )}
        {active && (
            <Box textAlign={"center"} pb={3}>
              <Typography variant={"h6"}>Connected account: {account}</Typography>
            </Box>
        )}
        <Box className={classes.nitroInfo}>
          <Box className={classes.contentWrapper}>
            <Typography component={'h1'} variant={'h2'} align={'center'}>
              Nitro
            </Typography>
            <Box p={2}>
              <Typography variant={'body'} component={"p"}>
                Monitor the buy price and sell price with ease. The prices on the right factor in the bonus when buying and the penalty when selling.
              </Typography>
              <Typography variant={'p'} component={"p"}>

              </Typography>
              <Typography variant={'body'} component={"p"}>
                Itching to get an edge in the game? Learn more nerdy details on our <a href={"https://lambodegens.medium.com/lambo-boosting-the-trust-and-value-in-the-defi-world-6fc8c369f7bc"} target={"_blank"}>Medium account</a>.
              </Typography>
            </Box>
          </Box>
          <Box flex={"1 1 auto"} className={classes.prices}>
            <Box className={classes.priceHeader}>
              <Typography variant={'h5'}>TWAP</Typography>
            </Box>
            <Box>
              <Typography>{round(1/twap,3)} ETH/LAMBO</Typography>
              <Typography>Update {timeLeftBeforeTwapUpdate}</Typography>
            </Box>
            <Box className={classes.priceHeader}>
              <Typography variant={'h5'}>Buy price</Typography>
            </Box>
            <Box>
              <Typography> {round(buyPrice(), 3)} ETH/LAMBO</Typography>
            </Box>
            <Box className={classes.priceHeader}>
              <Typography variant={'h5'}>Sell price</Typography>
            </Box>
            <Box>
              <Typography>{round(sellPrice(), 3)} ETH/LAMBO</Typography>
            </Box>
          </Box>
        </Box>
      </Section>
      <Section className={classes.nitro}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
          <Typography variant={"h5"}>Sell</Typography>
          <Box>
            <Typography variant={"h5"}>Current nitro: {round(bonus,4)*100}%</Typography>
            <Typography>Slippage: X%</Typography>
          </Box>
          <Typography variant={"h5"}>Buy</Typography>
        </Box>
        <Box className={classes.gauge}>
          <Box className={classes.gaugeFill} width={`${round(bonus,4)*2000}%`}>

          </Box>
        </Box>
      </Section>
      <Section className={classes.paddedSection}>
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"}>
          <Typography component={'h2'} variant={'h3'} align={'center'}>
            Staking rewards
          </Typography>
          <Box textAlign={"center"}>
            <Typography component={'p'} variant={'h6'} align={'center'} gutterBottom={true}>
              Pending rewards: 0{config.ticker}
            </Typography>
            <Button color={"primary"} variant={"contained"}>
              Claim
            </Button>
          </Box>
        </Box>
      </Section>
    </div>
  )
}

export default NitroPage
