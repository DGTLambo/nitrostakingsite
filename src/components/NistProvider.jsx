import React, {createContext, useContext, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useAlerts} from "./AlertProvider";
import {injected} from "../connectors";
import {contracts, TOKEN_CONTRACT} from "../contracts";

const NistContext = createContext();

export default function NistProvider(props){
    const { error, chainId, active, activate, account, library } = useWeb3React();
    const [ failedActivate, setFailedActivate ] = useState(true);
    const {alertWarning} = useAlerts()

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
        if (active){
            const contract = contracts[chainId][TOKEN_CONTRACT];
            return library.eth.Contract(contract.abi, contract.address)
        }
        return false;
    }

    const getPresaleContract = () => {
        if (active){
            const contract = contracts[chainId][TOKEN_CONTRACT];
            return library.eth.Contract(contract.abi, contract.address);
        }
    }

    return (
        <NistContext.Provider value={{getNistContract, getPresaleContract}}>
            {props.children}
        </NistContext.Provider>
    )
}

export const useNist = () => {
    return useContext(NistContext);
}
