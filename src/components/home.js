import { useInView } from 'react-intersection-observer';
import img from "../assets/robot3.png";
import img1 from "../assets/logo.png";
import { ArrowDownward } from '@mui/icons-material';
export const Home=()=>{
    const { ref: myRef, inView: myElementIsVisible } = useInView();

    return(
        <div>
            <div className="h-[90vh] border-b-4 shadow-xl bg-gradient-to-br from-[#000325] from-20% via-[#060142] to-[#24022b] to-70%">
                <div className="h-full ">
                    <div className="flex  md:justify-around h-full   ">
                        <div className=" w-[30%] md:w-[32%]  md:mx-8 ml-2  mt-2 flex flex-col justify-center ">
                           
                            <div className="  mt-[20%] text-white text-center font-bold   text-lg md:text-4xl ">
                                NFTelligence
                            </div>
                            <div className=" mt-[4%] text-center text-[#b3b5b5]  text-xs md:text-sm  ">
                                AI and blockchain merger to create unique and orignal artworks .
    
                            </div>
                            <div  className="text-center text-white h-12 transition ease-in-out cursor-pointer font-bold flex flex-col justify-center text-lg md:text-xl bg-gradient-to-br border-2 from-[#24022b] from-20% to-[#2d2597]  w-full md:w-2/3   px-2 py-2 rounded-xl shadow-2xl  mx-auto mt-[10%] hover:scale-110">
                                <a href="/mint">Let's Start</a>
                                
                            </div>
                        </div>
                        <div className="w-[60%] md:w-[60%]  ">
                            <div className="  w-full h-full ">
                                <div className=" w-full  h-full  md:w-full my-[20%] md:my-0">
                                    <div className="w-full  h-full flex py-8">
                                        <img src={img} className="w-full bg-gradient-to-br  from-[#3b0147] from-20% to-[#2d2597] h-[80%] ml-4 md:w-full md:h-full border-4  border-[#faf6fe] rounded-full " />
                                    </div>
                                </div>
                            </div>
                         
                        </div>
                        <div className="absolute text-center  w-full bottom-0">
                                <div class="animate-bounce  ... text-xl font-bold text-white">
                                    Scroll<br></br>
                                    <ArrowDownward />
                                </div>

                            </div>


                        <div className="absolute w-[35%] md:w-[15%]  md:left-[8%] md:mx-8 mt-20 ">
                          
                            <div >
                                <img src={img1} className="hover:scale-110 transition  ease-in-out h-[95%] w-[100%] mt-[-6%] " />
                            </div>
                        </div>
                    </div>



                </div>

            </div>
            <div id="home_section" ref={myRef} className={` bg-gradient-to-br from-[#000325] from-20% via-[#060142] to-[#24022b] to-70% shadow-2xl mt-16 w-[95%] mx-auto rounded-3xl py-8 ${myElementIsVisible ? "animate-waving-hand" : ""}`}>
                <div className="text-center text-[#ebecf7] font-bold text-3xl">
                    What do we do ?
                </div>
                <div className="text-center py-4 text-[#ececef]  w-4/5 mx-auto">
                NFTelligence app combines cutting-edge AI technology with the innovative concept of NFTs, providing users with a novel and engaging way to create, collect, 
                and interact with digital assets in a decentralized and secure manner.The app allow users to generate unique digital artworks. and can be transferred or imported.
                </div>
            </div>

            <div className="my-16 bg-gradient-to-br from-[#000325] from-20% via-[#060142] to-[#24022b] to-70% mt-16 shadow-2xl py-2 w-[95%] mx-auto rounded-3xl ">
                <div className="text-center text-white font-bold text-3xl mb-4 mt-4">
                    We Promise
                </div>

                <div className=" py-2   h-60 flex justify-around ">

                    <div id="0"  className="shadow-md hover:shadow-2xl hover:scale-105  cursor-pointer transition ease-in-out bg-[#b0cbe1] rounded-2xl w-1/5 ">

                        <div className={`text-white text-center bg-gradient-to-br border-2 from-[#24022b] from-20% to-[#2d2597]  shadow-xl rounded-2xl  h-full text-xs md:text-lg w-full mx-auto flex flex-col justify-center`}>
                            <div className="text-center font-bold text-sm md:text-lg ">AI-Generated </div>
                            The app allows users to create unique digital arts using AI. These AI-generated NFT's stored on a blockchain.
                        </div>
                    </div>
                    <div id="1"  className="shadow-md hover:shadow-2xl hover:scale-105 cursor-pointer transition ease-in-out bg-gradient-to-br border-2 from-[#24022b] from-20% to-[#2d2597]  rounded-2xl w-1/5 ">


                        
                        <div className={`text-white text-center bg-gradient-to-br border-2 from-[#24022b] from-20% to-[#2d2597]  shadow-xl rounded-2xl  h-full text-xs md:text-lg w-full mx-auto flex flex-col justify-center`}>
                            <div className="text-center font-bold text-sm md:text-lg ">Ownership</div>
                            Blockchain provides a decentralized ledger that records ownership and transaction history for each NFT. 
                        </div>
                    </div>
                    <div id="2"  className="text-white hover:scale-105 shadow-md cursor-pointer hover:shadow-2xl transition ease-in-out bg-gradient-to-br border-2 from-[#24022b] from-20% to-[#2d2597]  rounded-2xl w-1/5 ">


                        <div className={`text-center bg-gradient-to-br border-2 from-[#24022b] from-20% to-[#2d2597]  shadow-xl rounded-2xl h-full text-xs md:text-lg w-full mx-auto flex flex-col justify-center`}>
                            <div className="text-center font-bold text-sm md:text-lg ">Secure </div>
                            The app uses smart contracts to manage the creation and transfer of NFTs.NFTs are typically built on blockchain technology.
                        </div>
                    </div>
                </div>
            </div>

        
        </div>
    )
}