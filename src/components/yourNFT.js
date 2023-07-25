import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AINFTContext } from '../context/AINftContext';
import { useEffect,useContext ,useState} from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
export const YourNFT=()=>{
    const {getTokenId,formMetaData,currentUser,contractAddress} = useContext(AINFTContext);
    const [fdata,setFdata]=useState();
    useEffect(()=>{
        const getTokenIds=async()=>{
            const finalData=[];
           const data=await getTokenId();
        
           if(data){
            for(let i=0;i<data.length;i++){
                const tokenId=data[i].toString();
                const metadata=await formMetaData(tokenId);
                const metadataWithTokenId = {
                    ...metadata,
                    tokenId: tokenId,
                  };
                  finalData.push(metadataWithTokenId);
                
               
           }
           setFdata(finalData);
           }
        

        }
        getTokenIds();
    },[currentUser])

    console.log(fdata);
   

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1  
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
      };

      const copy = async () => {
        await navigator.clipboard.writeText(contractAddress);
        alert('Text copied');
      }
    return(
        <div>
            <div className="text-center my-[4%] font-bold text-2xl text-white">
                Your NFT's
            </div>
           
            {fdata?<div>
            <Carousel  responsive={responsive} showDots={true} >
            {fdata.map((data)=>{
                    return(
                        <div key={data.tokenId} className=" w-[80%] mx-auto mb-16  md:flex gap-5">
               
                        <div className="w-[100%]  h-36 md:h-80 my-8 md:my-0 border-2 rounded-2xl shadow-xl ">
                            <img src={"https://nftstorage.link/ipfs"+data.image.slice(6)} className="w-full h-full" />
                        </div>
                        <div className="w-[100%] border-2 flex bg-gradient-to-br  from-[#24022b] from-20% to-[#2d2597] rounded-2xl  shadow-xl flex-col gap-3 p-[2%] ">
                         
                            <div className="flex w-[80%] bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white mx-auto border-2 rounded-xl shadow-xl  ">
                                <div className="w-[50%] text-sm md:text-lg font-bold  p-[1%] text-center">
                                    NFT Name
                                </div>
                                <div className="w-[50%]  p-[1%] text-center">
                                    
                                    {data.name}
                                </div>
                            </div>
                            <div className="flex w-[80%] bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white mx-auto border-2 rounded-xl shadow-xl  ">
                                <div className="w-[50%]  text-sm md:text-lg  font-bold  p-[1%] text-center">
                                    NFT Description
                                </div>
                                <div className="w-[50%]  p-[1%] text-center">
                                    {data.description}
                                </div>
                            </div>
                            <div className="flex w-[80%] bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white mx-auto border-2 rounded-xl shadow-xl  ">
                                <div className="w-[50%] text-sm md:text-lg  font-bold  p-[1%] text-center">
                                    NFT Owner
                                </div>
                                <div className="w-[50%]  p-[1%] text-center">
                                    {currentUser.slice(0,5)}...{currentUser.slice(-5)}
                                </div>
                            </div>
                            <div className="flex w-[80%] bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white mx-auto border-2 rounded-xl shadow-xl  ">
                                <div className="w-[50%] text-sm md:text-lg  font-bold  p-[1%] text-center">
                                    NFT TokenId   
                                </div>
                                <div className="w-[50%]  p-[1%] text-center">
                                    {data.tokenId}
                                </div>
                            </div>
            
                            <div className="flex w-[80%] bg-gradient-to-br  from-[#ae21ca] from-20% to-[#2d2597]   text-white mx-auto border-2 rounded-xl shadow-xl  ">
                                <div className="w-[50%] text-sm md:text-lg  font-bold  p-[1%] text-center">
                                    NFT Address
                                </div>
                                <div className="w-[50%]  p-[1%] text-center" >
                                    {contractAddress.slice(0,5)}...{contractAddress.slice(-5)} <span onClick={()=>copy()}><ContentCopyIcon/></span>
                                </div>
                            </div>
                        </div>
            
                    </div>
                    )
                })}
        
           
           </Carousel>
            </div>:""};
            
        </div>
    )
}