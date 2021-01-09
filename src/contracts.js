import {presaleAbi} from './abis/presale';
import {tokenAbi} from './abis/token'
import {lamboContract} from "./abis/lamboContract";

export const TOKEN_CONTRACT = "token";
export const PRESALE_CONTRACT = "presale";
export const LAMBO_CONTRACT = "lambo";

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
        [LAMBO_CONTRACT]:{
            address: "0xf66Ad2B8d4E143e30D12b8738b86BF9Da201d45F",
            abi: lamboContract
        }
    },
    3: {
        [TOKEN_CONTRACT]: {
            address: "0x0e581F9fc704BA3c9290c6869B8094e8984D8309",
            abi: tokenAbi
        },
        [PRESALE_CONTRACT]: {
            address: "0xF1F34170fC31cDA7659E687E72Fc810fe82970F2",
            abi: presaleAbi,
        },
        [LAMBO_CONTRACT]:{
            address: "0xe93a9537e0fe62a56fac05f74ee336e7b65f20a1",
            abi: lamboContract
        }
    }
}
