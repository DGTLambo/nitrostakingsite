import {presaleAbi} from './abis/presale';
import {tokenAbi} from './abis/token'

export const TOKEN_CONTRACT = "token"
export const PRESALE_CONTRACT = "presale"

export const contracts = {
    1: {
        [TOKEN_CONTRACT]: {
            address: null,
            abi: tokenAbi
        },
        [PRESALE_CONTRACT]: {
            address: null,
            abi: presaleAbi,
        },
    },
    3: {
        [TOKEN_CONTRACT]: {
            address: "0xcd75105ab9cfd3e056d8ccf9ab083575fce8add0",
            abi: tokenAbi
        },
        [PRESALE_CONTRACT]: {
            address: null,
            abi: presaleAbi,
        },
    }
}
