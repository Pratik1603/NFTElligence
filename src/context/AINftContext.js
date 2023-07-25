import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../abis/NFT.json"

import config from "../config.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contractAbi = abi.abi;

export const AINFTContext = React.createContext();

export const AINFTProvider = ({ children }) => {
    const network = "testnet";
    const DappName = "AI NFT MINTER";
  

    const notifye = () => toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyi = () => toast.info("Please connect your wallet", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const [currentUser, setCurrentUser] = useState("");
    const [provider, setProvider] = useState(null);
    const [contractAddress,setContractAddress]=useState();
   
    const getTokenId = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(provider)

            const network = await provider.getNetwork()

            const nft = new ethers.Contract(config[network.chainId].nft.address, contractAbi, provider);
           
            const signer = provider.getSigner();

            const transaction = await nft.connect(signer).getTokenIds();

            return transaction;
        }
        catch (e) {
            console.log(e);
            notifye(e);
        }
    }

    const formMetaData = async (tokenIndex) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(provider)

            const network = await provider.getNetwork()

            const nft = new ethers.Contract(config[network.chainId].nft.address, contractAbi, provider);
            setContractAddress(config[network.chainId].nft.address);
          
            const signer = provider.getSigner();
            const tokenURI = await nft.connect(signer).tokenURI(tokenIndex);
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            return metadata;
        }
        catch (e) {
            notifye();
        }
    }
    const mint = async (tokenURI) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(provider)

            const network = await provider.getNetwork()

            const nft = new ethers.Contract(config[network.chainId].nft.address, contractAbi, provider);
            const signer = provider.getSigner();
            setContractAddress(config[network.chainId].nft.address);
            const transaction = await nft.connect(signer).mint(tokenURI, { value: ethers.utils.parseUnits("0.1", "ether") });


            const tx = await transaction.wait();
            const data = [];
            const totalSupply = await nft.connect(signer).totalSupply();
            const ownerOfToken = await nft.connect(signer).ownerOf(totalSupply);
            const transactionHash = tx.transactionHash;
            const etherscanUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;

            data.push(config[network.chainId].nft.address);
            data.push(totalSupply.toString());
            data.push(ownerOfToken);
            data.push(etherscanUrl);



            return data;
        }
        catch (e) {
            console.log(e);
            notifye();
        }
    }

    const checkifWalletConnected = async () => {
        try {
            if (!window.ethereum) {
              
                return "Install Metamask";
            }
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            }
            else {
                notifyi();
                return "No Account";
            }

        }
        catch (e) {
            return "not Connected";
        }
    };

    const connectWallet = async () => {

        try {
            if (!window.ethereum) {
                return "Install Metamask";
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });


            setCurrentUser(accounts[0]);

        }
        catch (e) {
            return "Something Went wrong";
        }

    };

    useEffect(() => {
        checkifWalletConnected();
    }, []);
    return (
        <AINFTContext.Provider
            value={{
                connectWallet,
                DappName,
                currentUser,
                mint,
                getTokenId,
                formMetaData,
                contractAddress,
                
            }}
        >
            {children}
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
               
                <ToastContainer />

        </AINFTContext.Provider>
    );
}
