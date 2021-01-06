/* React Imports */
import React, {useCallback, useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useAlerts} from "./AlertProvider";

/* CSS Styles */
const useStyles = makeStyles((theme) => ({
    wrapper: {
        flex: "1 0 auto",
        width: '100%',
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 10,
    },
    contentWrapper: {
        margin: `${theme.spacing(5)}px auto`,
        maxWidth: '600px',
        padding: theme.spacing(3),
        color: 'white',
        backgroundColor: '#191919',
        position: "relative",
        zIndex: "20",
    },
    price: {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
    buy: {
        display: "flex",
    },
}))

function PresalePage() {
    /*const classes = useStyles()
    const {alertError} = useAlerts();
    const [preSaleActive, setPreSaleActive] = useState(false);
    const [devBuyPrice, setDevBuyPrice] = useState("0");
    const [devLimitEth, setDevLimitEth] = useState("0");
    const [publicBuyPrice, setPublicBuyPrice] = useState("0");
    const [publicLimitEth, setPublicLimitEth] = useState("0");
    const [wlBuyPrice, setWlPrice] = useState("0");
    const [wlLimitEth, setWlLimitEth] = useState("0");
    const [isDev, setIsDev] = useState(false);
    const [isWhitelisted, setIsWhitelisted] = useState(false);
    const [amount, setAmount] = useState("");
    const [invested, setInvestedAmount] = useState(0);
    const [contractBalance, setContractBalance] = useState(0);
    const [isPublicSale, setIsPublicSale] = useState(false)
    const {provider, getProvider, getOptions, walletAddress, getGasPrice} = {};
    const presaleContract = {abi: null, address: null}
    const loadPrices = useCallback(async () => {
        try{
            const {web3} = await getProvider();
            const contract = new web3.eth.Contract(presaleContract.abi, presaleContract.address);
            const options = getOptions();
            contract.methods.INVESTMENT_LIMIT_DEVELOPER().call({...options})
                .then((limit) => setDevLimitEth(web3.utils.fromWei(`${limit}`, 'ether')))
                .catch((e) =>{console.log(e)})
            contract.methods.INVESTMENT_LIMIT_PRESALE().call({...options})
                .then((limit) => setWlLimitEth(web3.utils.fromWei(`${limit}`, 'ether')))
                .catch((e) =>{console.log(e)})
            contract.methods.INVESTMENT_RATIO_DEVELOPER().call({...options})
                .then((ratio) => setDevBuyPrice(ratio/100))
                .catch(() =>{})
            contract.methods.INVESTMENT_RATIO_PRESALE().call({...options})
                .then((ratio) => setWlPrice(ratio/100))
                .catch(() =>{})
            contract.methods.INVESTMENT_LIMIT_PUBLIC().call({...options})
                .then((limit) => setPublicLimitEth(web3.utils.fromWei(`${limit}`, 'ether')))
                .catch((e) =>{console.log(e)})
            contract.methods.allowPublicInvestment().call({...options})
                .then((isPublic) => setIsPublicSale(isPublic))
                .catch(() =>{})
            contract.methods.INVESTMENT_RATIO_PUBLIC().call({...options})
                .then((ratio) => setPublicBuyPrice(ratio/100))
                .catch(() =>{})
            web3.eth.getBalance(presaleContract.address).then((balance) => {
                setContractBalance(web3.utils.fromWei(balance, 'ether'))
            })
        } catch (error){
            console.log(error);
        }
    }, [provider]);

    const loadWalletInfo = useCallback(async () => {
        try {
            const {web3, address} = await getProvider();
            const contract = new web3.eth.Contract(presaleContract.abi, presaleContract.address);
            const options = getOptions();
            contract.methods.isPresaleActive().call({...options})
                .then(setPreSaleActive)
                .catch(() => {})
            contract.methods.isDevAddress(address).call({...options})
                .then(setIsDev)
                .catch((e) =>{console.log("dev address")})
            contract.methods.isWhitelisted(address).call({...options})
                .then(setIsWhitelisted)
                .catch((e) =>{console.log("is wl")})
            contract.methods.getInvestedAmount(address).call({...options})
                .then((investment) => setInvestedAmount(web3.utils.fromWei(`${investment}`, 'ether')))
                .catch((e) =>{console.log("invested amount")});
        } catch (error){
            console.log(error);
        }
    }, [provider])

    useEffect(()=> {
        loadPrices();
        loadWalletInfo();
    }, [walletAddress])

    const canBuy = () => preSaleActive && (isDev || isWhitelisted || isPublicSale) && getMaxAmount() > 0;

    const getMaxAmount = () => {
        if(isWhitelisted){
            return wlLimitEth - invested;
        } else if (isDev){
            return devLimitEth - invested;
        }
        return publicLimitEth - invested;
    };

    const buy = () => {
        if (!isValidAmount()){
            alertError("You can't buy that amount");
            return;
        }
        getProvider().then(async (provider) => {
            const {web3, address} = provider;
            const gasPrice = await getGasPrice();
            web3.eth.sendTransaction({
                from: address,
                to: presaleContract.address,
                gasPrice: gasPrice,
                value: web3.utils.toWei(sanitizeAmount(),"ether")
            })
                .then(()=>{
                    loadWalletInfo();
                })
                .catch(() => {
                alertError("Transaction cancelled")
            });
        })
    }

    const sanitizeAmount = () => {
        const decimals = 10000;
        const rounded = Math.floor(amount * decimals)/decimals
        return `${rounded}`;
    }

    const isValidAmount = () => {
        if (amount){
            return amount >= 0 && amount <= getMaxAmount();
        }
        return false;
    }

    const getOutputAmount = () => {
        if (isDev){
            return amount/devBuyPrice;
        } else if (isWhitelisted){
            return amount/wlBuyPrice;
        }
        return amount/publicBuyPrice;
    }

    return (
        <div className={classes.wrapper}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Nitro | Lambo Degenerates</title>
            </Helmet>
            <Box>
                <Box
                    px={3}
                    className={classes.contentWrapper}
                    borderRadius={'borderRadius'}
                >
                    <Typography component={'h1'} variant={'h2'} align={'center'}>
                        Pre-Sale
                    </Typography>
                    <Box px={2}>
                        <Box textAlign={"center"} my={2}>
                            <Typography variant={'h6'} component={'p'}>
                                {preSaleActive?"Whitelist presale ends December 12 @ 3PM EST":"Presale starts on the 11 December @ 3 PM"}
                            </Typography>
                            <Typography variant={'h6'} component={'p'}>
                                {isPublicSale?"Public presale ends when we are sold out!":"Public presale starts on the 12 December @ 3 PM"}
                            </Typography>
                            <Typography>{contractBalance}ETH filled out of 142 ETH hardcap</Typography>
                        </Box>
                        <Box border={1} borderRadius={"borderRadius"} p={2}>
                            <Box textAlign={"center"}>
                                <Typography variant={'h5'} component={'p'}>
                                    Your wallet
                                </Typography>
                            </Box>
                            <Typography variant={'body1'} component={'p'}>
                                Address: {walletAddress}
                            </Typography>
                            <Typography variant={'body1'} component={'p'}>
                                Current amount invested: {invested || 0} ETH
                            </Typography>
                            <Typography variant={'body1'} component={'p'}>
                                Amount left to invest: {getMaxAmount()} ETH
                            </Typography>
                        </Box>
                        <Box py={2}>
                            <Box textAlign={"center"}>
                                <Typography variant={'h5'} component={'p'}>
                                    Prices
                                </Typography>
                            </Box>
                            <Typography variant={'body1'} component={"p"}>
                                <b>Public price {(!isDev && !isWhitelisted) && ("(you)")}:</b> {publicBuyPrice}ETH/$LAMBO, max {publicLimitEth} ETH
                            </Typography>
                            <Typography variant={'body1'} component={"p"}>
                                <b>Whitelist price {isWhitelisted && ("(you)")}:</b> {wlBuyPrice} ETH/$LAMBO, max {wlLimitEth} ETH
                            </Typography>
                            <Typography variant={'body1'} component={"p"}>
                                <b>Dev price {isDev && ("(you)")}:</b> {devBuyPrice}ETH/$LAMBO, max {devLimitEth} ETH
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.buy}>
                        <TextField
                            label="Amount in ETH"
                            variant="outlined"
                            value={amount}
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setAmount(getMaxAmount())}>MAX</InputAdornment>
                            }}
                            onChange={event => setAmount(`${event.target.value}`)}
                            error={`${amount}`.length > 0 && !isValidAmount()}
                        />
                        <Button
                            variant="contained"
                            color={"primary"}
                            size={'large'}
                            style={{
                                marginLeft: 8,
                            }}
                            onClick={()=>buy()}
                        >
                            Buy
                        </Button>
                    </Box>
                    <Box>Output: {getOutputAmount()}LAMBO</Box>
                </Box>
            </Box>
        </div>
    )*/
    return <>hello</>;
}

export default PresalePage
