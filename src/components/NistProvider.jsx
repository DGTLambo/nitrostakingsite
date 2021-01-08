import React, {createContext, useContext, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useAlerts} from "./AlertProvider";
import {injected} from "../connectors";
import {contracts, PRESALE_CONTRACT, TOKEN_CONTRACT} from "../contracts";

const NistContext = createContext();

export default function NistProvider(props){
    const { error, chainId, active, activate, library } = useWeb3React();
    const [ failedActivate, setFailedActivate ] = useState(true);
    const {alertWarning, alertError} = useAlerts()

    if (error){
        alertWarning("Couldn't connect your wallet")
    }

    useEffect(() => {
        if (!active){
            injected.isAuthorized().then(isAuthorized => {
                if (isAuthorized) {
                    activate(injected).catch(() => setFailedActivate(true));
                    alertWarning("Couldn't connect your wallet")
                }
            })
        }
    }, [])

    const getNistContract = () => {
        if (!active) {
            alertError("Wallet must be connected.");
            return false;
        }
        if (!contracts[chainId] || !contracts[chainId][TOKEN_CONTRACT].address){
            alertError("Nist contract is not supported on this chain");
            return false;
        }
        const contract = contracts[chainId][TOKEN_CONTRACT];
        return new library.eth.Contract(contract.abi, contract.address)
    }

    const getPresaleContract = () => {
        if (!active) {
            alertError("Wallet must be connected.");
            return false;
        }
        if (!contracts[chainId] || !contracts[chainId][PRESALE_CONTRACT].address){
            alertError("Presale contract is not supported on this chain");
            return false;
        }
        const contract = contracts[chainId][PRESALE_CONTRACT];
        console.log(contract)
        return new library.eth.Contract(contract.abi, contract.address);

    }

    return (
        <NistContext.Provider value={{getNistContract, getPresaleContract, failedActivate}}>
            {props.children}
        </NistContext.Provider>
    )
}

export const useNist = () => {
    return useContext(NistContext);
}
