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
            address: "0x0aed50565c5b9A460e139fdE12779DacD4e305Fb",
            abi: tokenAbi
        },
        [PRESALE_CONTRACT]: {
            address: null,
            abi: presaleAbi,
        },
    }
}
