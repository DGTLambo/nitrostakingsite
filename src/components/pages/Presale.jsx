import React, {useEffect, useState} from 'react';
import Section from "../Section";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {config} from "../../config";
import {classBag, round} from "../../Utils";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useWeb3React} from "@web3-react/core";
import {useNist} from "../NistProvider";
import {injected} from "../../connectors";
import {useAlerts} from "../AlertProvider";
import {contracts, PRESALE_CONTRACT} from "../../contracts";

const useStyle = makeStyles(theme => ({
    phases: {
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
    },
    phase: {
        border: "4px solid gray",
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(1,2),
        padding:theme.spacing(2,3),
        textAlign:"center",
    },
    activePhase: {
        border: "4px solid "+theme.palette.primary.main,
        boxShadow: theme.shadows[0]
    },
    buy: {
        marginTop: theme.spacing(2),
        display: "flex",
    },
}))

export default function Presale(props){
    const classes = useStyle();
    const { library, active, activate, account, chainId} = useWeb3React();
    const {alertError} = useAlerts();
    const [phase, setPhase] = useState(0);
    const [amount, setAmount] = useState("0");
    const [lamboBalance, setLamboBalance] = useState("0");
    const [presaleStarted, setPresaleStarted] = useState(false);
    const {getPresaleContract, getLamboContract} = useNist();

    useEffect(()=> {
        console.log(getPresaleContract());
    },[active, account, chainId]);

    const load = () => {
        const lamboContract = getLamboContract();
        if (lamboContract){
            lamboContract.methods.balanceOf(account).call()
                .then(setLamboBalance);
        }
    }

    const canBuy = () => presaleStarted && getPresaleContract();

    const getMaxAmount = () => {
        if (phase === 1){
            return lamboBalance;
        }
        return "0.5"
    }

    const buy = async () => {
        if (!isValidAmount()){
            alertError("You can't buy that amount");
            return;
        }
        library.eth.sendTransaction({
            from: account,
            to: contracts[chainId][PRESALE_CONTRACT].address,
            value: library.utils.toWei(sanitizeAmount(),"ether")
        })
        .catch(() => {
            alertError("Transaction cancelled")
        });
    }

    const getOutputAmount = () => {
        if (phase === 1){
            return amount?amount:"0";
        }
        return amount*2;
    }

    const sanitizeAmount = () => {
        return `${round(amount)}`;
    }

    const isValidAmount = () => {
        if (amount){
            return amount >= 0 && amount <= getMaxAmount();
        }
        return false;
    }

    return (
        <>
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
            <Section>
                <Box className={classes.phases}>
                    <Typography variant={"h3"} component={"h1"} align={"center"} style={{marginRight:8}}>Presale</Typography>
                    <Box className={classBag(classes.phase, phase === 1?classes.activePhase: false)}>
                        <Typography variant={"h4"} component={"h2"}>Phase 1</Typography>
                        <Typography variant={"h6"}>Starts January 9th</Typography>
                        <Typography> 1 LAMBO = 1 {config.ticker}</Typography>
                        <Typography>No limit</Typography>
                        <Typography>No cap</Typography>
                    </Box>
                    <Box className={classBag(classes.phase, phase === 2?classes.activePhase: false)}>
                        <Typography variant={"h4"} component={"h2"}>Phase 2</Typography>
                        <Typography variant={"h6"}>Starts January 10th</Typography>
                        <Typography> 0.5 ETH = 1 {config.ticker}</Typography>
                        <Typography>0.5 ETH per wallet</Typography>
                        <Typography>30 ETH cap</Typography>
                    </Box>
                </Box>
            </Section>
            <Section>
                <Box className={classes.buy}>
                    <TextField
                        label={phase===1?"Amount in LAMBO":"Amount in ETH"}
                        variant="outlined"
                        value={amount}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end" onClick={() => setAmount(getMaxAmount())}>MAX</InputAdornment>
                        }}
                        onChange={event => setAmount(`${event.target.value}`)}
                        error={`${amount}`.length > 0 && !isValidAmount()}
                        disabled={!canBuy()}
                    />
                    <Button
                        variant="contained"
                        color={"primary"}
                        size={'large'}
                        style={{
                            marginLeft: 8,
                        }}
                        onClick={()=>buy()}
                        disabled={!canBuy()}
                    >
                        Buy
                    </Button>
                </Box>
                <Box>Output: {getOutputAmount()} {config.ticker}</Box>
            </Section>
        </>
    );
}
