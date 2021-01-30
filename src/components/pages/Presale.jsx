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
import Web3 from "web3";

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
    outlined: {
        "& .Mui-focused":{
            color: theme.palette.secondary.main,
            "& .MuiOutlinedInput-notchedOutline":{
                borderColor: theme.palette.secondary.main,

            }
        }
    }
}))

export default function Presale(props){
    const classes = useStyle();
    const { library, active, activate, account, chainId} = useWeb3React();
    const {alertError, alertSuccess} = useAlerts();
    const [amount, setAmount] = useState("0");
    const [lamboBalance, setLamboBalance] = useState("0");
    const [presaleStarted, setPresaleStarted] = useState(false);
    const [isAcceptingEth, setIsAcceptingEth] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [amountApproved, setAmountApproved] = useState(0);
    const [contractBalance, setContractBalance] = useState(0);
    const [investedAmount, setInvestedAmount] = useState(0);
    const {getPresaleContract, getLamboContract} = useNist();

    useEffect(()=> {
        if (active){
            load()
            const intervalId = setInterval(() => {
                load();
            },1000)
            return ()=>{
                clearInterval(intervalId);
            }

        }
    },[active, account, chainId]);

    const load = () => {
        const lamboContract = getLamboContract();
        if (lamboContract){
            lamboContract.methods.balanceOf(account).call()
                .then(setLamboBalance);
            lamboContract.methods.allowance(account, getPresaleContract()._address).call()
                .then(setAmountApproved);
        }
        const presaleContract = getPresaleContract();
        if (presaleContract){
            presaleContract.methods.isPresaleActive().call()
                .then(setPresaleStarted);
            presaleContract.methods.isAcceptingEth().call()
                .then(setIsAcceptingEth);
            presaleContract.methods.getInvestedAmount(account).call()
                .then((amount) => {setInvestedAmount(Web3.utils.fromWei(amount, 'ether'))})
            library.eth.getBalance(presaleContract._address).then((balance) => {
                setContractBalance(Web3.utils.fromWei(balance, 'ether'))
            })
        }
    }

    const getPhase = () => {
        if (isAcceptingEth) return 2;
        if (presaleStarted) return 1;
        return 0;
    }

    const canBuy = () => presaleStarted && getPresaleContract();

    const getMaxAmount = () => {
        if (getPhase() === 1){
            return Web3.utils.fromWei(lamboBalance, 'ether');
        }
        return 0.5-investedAmount;
    }

    const approve = () => {
        const lamboContract = getLamboContract();
        if (lamboContract) {
            lamboContract.methods.approve(getPresaleContract()._address, lamboBalance).send({
                from: account,
            })
            .then(() => {
                alertSuccess("Succesfully approved LAMBO");
                load();
            }).catch((e) => {
                console.log(e)
                alertError("An error happened while approving");
            })
        }
    }

    const buy = async () => {
        if (!isValidAmount()){
            alertError("You can't buy that amount");
            return;
        }
        if (getPhase() === 1) {
            getPresaleContract().methods.investLamboForNist(Web3.utils.toWei(sanitizeAmount(),'ether')).send({
                from: account,
            }).then(() => {
                alertSuccess("Successfully swapped LAMBO for "+config.ticker);
            }).catch(() => {
                alertError("Couldn't swap your LAMBO for "+config.ticker)
            })
        } else if(getPhase()=== 2){
            setWaiting(true);
            library.eth.sendTransaction({
                from: account,
                to: getPresaleContract()._address,
                value: library.utils.toWei(sanitizeAmount(),"ether")
            }).then(()=>{
                setWaiting(false);
                alertSuccess("NIST was bought successfully");
            })
            .catch(() => {
                setWaiting(false);
                alertError("An error happened during the transaction");
            });
        } else {
            alertError("Presale is not active")
        }
    }

    const getOutputAmount = () => {
        if (getPhase() === 1){
            return amount?amount:"0";
        }
        return amount*2;
    }

    const sanitizeAmount = () => {
        return `${round(amount,18)}`;
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
                    <Box className={classBag(classes.phase, getPhase() === 1?classes.activePhase: false)}>
                        <Typography variant={"h4"} component={"h2"}>Phase 1</Typography>
                        <Typography variant={"h6"}>Starts January 30th</Typography>
                        <Typography> 1 LAMBO = 1 {config.ticker}</Typography>
                        <Typography>No limit</Typography>
                        <Typography>No cap</Typography>
                    </Box>
                    <Box className={classBag(classes.phase, getPhase() === 2?classes.activePhase: false)}>
                        <Typography variant={"h4"} component={"h2"}>Phase 2</Typography>
                        <Typography variant={"h6"}>Starts February 2nd</Typography>
                        <Typography> 0.5 ETH = 1 {config.ticker}</Typography>
                        <Typography>{round(investedAmount,2)}/0.5 ETH per wallet</Typography>
                        <Typography>{round(contractBalance,2)}/30 ETH</Typography>
                    </Box>
                </Box>
            </Section>
            <Section>
                <Box className={classes.buy}>
                    <TextField
                        label={getPhase()===1?"Amount in LAMBO":"Amount in ETH"}
                        variant="outlined"
                        value={amount}
                        className={classes.outlined}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end" onClick={() => setAmount(getMaxAmount())}>MAX</InputAdornment>
                        }}
                        onChange={event => setAmount(`${event.target.value}`)}
                        error={`${amount}`.length > 0 && !isValidAmount()}
                        disabled={!canBuy()}
                    />
                    {getPhase() !== 2 && (amountApproved == 0 || amountApproved < amount)?(
                        <Button
                            variant="outlined"
                            color={"secondary"}
                            size={'large'}
                            style={{
                                marginLeft: 8,
                            }}
                            onClick={() => approve()}
                        >
                            Approve
                        </Button>
                    ):(
                        <Button
                            variant="outlined"
                            color={"secondary"}
                            size={'large'}
                            style={{
                                marginLeft: 8,
                            }}
                            onClick={()=>buy()}
                            disabled={!canBuy()}
                        >
                            Buy
                        </Button>
                    )}
                </Box>
                <Box>Output: {getOutputAmount()} {config.ticker}</Box>
            </Section>
        </>
    );
}
