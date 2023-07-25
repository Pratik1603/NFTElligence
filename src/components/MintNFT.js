
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { AINFTContext } from '../context/AINftContext';
import { useContext } from "react";
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import axios from 'axios';
import LaunchIcon from '@mui/icons-material/Launch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export const MintNFT = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [metadata,setMetadata]=useState();
    const [url, setURL] = useState(null)
    const [isWaiting, setIsWaiting] = useState(false);
    const { mint ,contractAddress} = useContext(AINFTContext);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [generateImage, setGenerateImage] = useState(false);
    const [imageData, setImageData] = useState();
    const [nftData,setNftData]=useState();

    const notifyg = () => toast.success("Image Generated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyes = () => toast.error("Servor Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifym = () => toast.success("Congo ! NFT Minted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyi = () => toast.info("Please , Wait a while till it is processing", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    
    const notifye = () => toast.error("You have not generated the image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyeg = () => toast.error("Please ,Fill in all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const copy = async () => {
        await navigator.clipboard.writeText(contractAddress);
        alert('Text copied');
      }
    const createImage = async () => {
        try {
            setMessage("Generating Image...")

            const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`
            try{
                const response = await axios({
                    url: URL,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer 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`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        inputs: description, options: { wait_for_model: true },
                    }),
                    responseType: 'arraybuffer',
                })
            
            
           

            const type = response.headers['content-type']
            const data = response.data;
           

            const base64data = Buffer.from(data).toString('base64');
            const img = `data:${type};base64,` + base64data; // <-- This is so we can render it on the page
            setImage(img);
            setImageData(data);
            return data
        }
            catch(e){
                console.log(e);
                notifyes();
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    const generate = async () => {
        if (name === "" || description === "") {
           notifyeg();
            return
        }
        notifyi();

        setIsWaiting(true)

        await createImage();
        setIsWaiting(false);
        notifyg();
        setGenerateImage(true);
    }
    const mintNFT = async (tokenURI) => {
        setMessage("Waiting for Mint...")

        const data = await mint(tokenURI);
        setNftData(data);
    
    }
    const uploadImage = async (imageData) => {
        setMessage("Uploading Image...")

        const nftstorage = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUxOTIzNTViM0RFOEEwQzFkQUIxYUUzQjkyZkZDODE4NDE4NUQ5YWMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDE4ODU2NDAwNywibmFtZSI6IkFJIE5GVCJ9.FzPoc83pdJuDqcoiP_zFzPEknihY6kcClV1qLOAbf-s" })

        const { ipnft } = await nftstorage.store({
            image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
            name: name,
            description: description,
        })

        const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
        setURL(url)
     
        return url
    }

    const mintImage = async (imageData) => {
        if(!generateImage){
            notifye();
            return;
        }
        setIsWaiting(true);
        notifyi();
        const url = await uploadImage(imageData)
        
        await mintNFT(url);
        setIsWaiting(false);
        notifym();
        const response = await fetch(url);
        const metadata = await response.json();

        setMetadata(metadata);
    }
    return (
        <div>
            <div className="w-[50%] mx-auto my-[2%] text-white font-bold text-center text-3xl md:text-4xl">
                Describe Your NFT
            </div>
            <div className="mx-auto w-[80%] h-96 my-[5%] md:flex">
                <div className="w-[100%] md:w-[50%]  flex flex-col justify-center md:h-full h-[60%] mx-auto">
                    <form className="flex md:flex-col md:justify-center gap-10 w-[100%]">
                        <input type="text" placeholder="Create a name..." className="border-2 rounded-xl md:w-[50%] w-[80%] mx-auto p-[5%] text-sm md:text-lg bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597] text-white" onChange={(e) => { setName(e.target.value) }} />
                        <input type="text" placeholder="Create a description..." className="bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]  border-2 rounded-xl md:w-[50%] w-[80%]  mx-auto p-[5%] text-sm md:text-lg text-white" onChange={(e) => setDescription(e.target.value)} />


                    </form>
                    <div className="flex flex-col md:flex-row  ">
                        <button className="border-4 text-white bg-gradient-to-br from-[#000325] from-20% via-[#060142] to-[#24022b] to-70%  rounded-xl w-[60%]  my-[5%] md:w-[40%]  font-bold mx-auto flex flex-col justify-center text-center text-xs md:text-xl">
                            <div className="w-full h-full text-center">
                                {generateImage ?
                                    <div className="w-full h-full flex flex-col justify-center" onClick={()=>window.location.reload()}>
                                        Cancel NFT
                                    </div> : <div onClick={() => generate()} className="w-full  h-full flex flex-col justify-center">
                                        Generate NFT
                                    </div>}

                            </div>
                        </button>
                        <button className={` border-4 text-white bg-gradient-to-br from-[#000325] from-20% via-[#060142] to-[#24022b] to-70%  rounded-xl w-[60%] my-[5%] md:w-[40%] p-[5%]   font-bold mx-auto flex flex-col justify-center  text-sm md:text-2xl`}>
                            <div className=" mx-auto" onClick={() => mintImage(imageData)}>
                                Mint NFT
                            </div>

                        </button>
                    </div>
                </div>

                <div className="border-4 md:w-[50%] w-[80%] bg-gradient-to-br  from-[#9e25a4] from-20% to-[#2d2597]  md:h-full h-[40%] mx-auto md:mx-0 rounded-xl">
                    {!isWaiting && image ? (
                        <img src={image} alt="AI generated image" className="h-full w-full rounded-xl" />
                    ) : isWaiting ? (
                        <div className="w-[60%] mx-auto text-center my-[30%]  ">
                            <Spinner animation="border" size="20" color="white" />
                            <p className="text-xl">{message}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {metadata && nftData ? (
            <>
            <button onClick={()=>window.location.reload()} className="  bg-gradient-to-br  from-[#24022b] from-20% to-[#2d2597] text-white hover:scale-105 rounded-xl border-2 text-center py-[1%] w-32 shadow-xl m-[2%]">
                    Mint NFT Again
            </button>
            <div className=" w-[80%] mx-auto mb-4  md:flex gap-5">
               
               <div className="w-[100%]  h-36 md:h-96 my-8 md:my-0 border-2 rounded-2xl shadow-xl ">
                   <img src={"https://nftstorage.link/ipfs"+metadata.image.slice(6)} className="w-full h-full rounded-2xl" />
               </div>
               <div className="w-[100%] border-2  bg-gradient-to-br  from-[#24022b] from-20% to-[#2d2597] flex rounded-2xl shadow-xl flex-col gap-3 p-[2%] ">
                    <div className="flex justify-center" >
                        <div className=" text-center text-white font-bold text-2xl">
                            NFT MINTED
                        </div>
                        <a href={nftData[3]} target="blank" >
                            <div className="w-10 ml-[100%] hover:scale-105 cursor-pointer text-white h-10 " >
                                <LaunchIcon/>
                            </div>
                        </a>
                        
                        
                    </div>
                   <div className="flex bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white w-[80%] mx-auto border-2 rounded-xl shadow-xl  ">
                       <div className="w-[50%] text-sm md:text-lg font-bold  p-[2%] text-center">
                           NFT Name
                       </div>
                       <div className="w-[50%]  p-[2%] text-center">
                            
                           {metadata.name}
                       </div>
                   </div>
                   <div className="flex bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white w-[80%] mx-auto border-2 rounded-xl shadow-xl  ">
                       <div className="w-[50%] text-sm md:text-lg  font-bold  p-[2%] text-center">
                           NFT Description
                       </div>
                       <div className="w-[50%]  p-[2%] text-center">
                           {metadata.description}
                       </div>
                   </div>
                   <div className="flex bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white w-[80%] mx-auto border-2 rounded-xl shadow-xl  ">
                       <div className="w-[50%] text-sm md:text-lg  font-bold  p-[2%] text-center">
                           NFT Owner
                       </div>
                       <div className="w-[50%]  p-[2%] text-center">
                       {nftData[2].slice(0,5)}...{nftData[2].slice(-5)}
                       </div>
                   </div>
                   <div className="flex bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white w-[80%] mx-auto border-2 rounded-xl shadow-xl  ">
                       <div className="w-[50%] text-sm md:text-lg  font-bold  p-[2%] text-center">
                           NFT TokenId   
                       </div>
                       <div className="w-[50%]  p-[2%] text-center">
                           {nftData[1]}
                       </div>
                   </div>
   
                   <div className="flex bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white w-[80%] mx-auto border-2 rounded-xl shadow-xl  ">
                       <div className="w-[50%] text-sm md:text-lg  font-bold  p-[2%] text-center">
                           NFT Address
                       </div>
                       <div className="w-[50%]  p-[2%] text-center">
                           {nftData[0].slice(0,5)}...{nftData[0].slice(-5)}  <span onClick={()=>copy()}><ContentCopyIcon/></span>
                       </div>
                   </div>
               </div>
   
           </div>
           
           </>
           ):""} 
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
            
        </div>
    )
}