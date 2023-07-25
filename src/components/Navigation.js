import { ethers } from 'ethers';
import React from 'react';
import { useContext,useEffect } from 'react';
import { AINFTContext } from '../context/AINftContext';
import img from "../assets/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
const Navigation = () => {
    const {currentUser,connectWallet}=useContext(AINFTContext);
    
    const [state,setState]=React.useState(false);
   

    const navigation=[
        {title:"Home",path:"/"},
        {title:"Mint NFT",path:"/mint"},
        {title:"Your NFT",path:"/yourNFT"},
        
    ];
    
    useEffect(() => {
        async function listenMMAccount() {
          window.ethereum.on("accountsChanged", async function() {
            connectWallet();
          });
        }
        listenMMAccount();
      }, []);
   
    return(
        
        <nav className={`bg-gradient-to-r  from-[#000325] from-70%  to-[#060142] to-80%  md:text-sm  text-white ${state?"shadow-lg rounded-xl mx-2  mt-2 md:shadow-none md:border:none md:mx-2 md:mt-0":""}`}>
            <div className="gap-x-16 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                 <div className="flex items-center justify-between py-4 md:block">
                     <div className="md:hidden">
                         <button className="menu-btn  w-10 h-10 text-white hover:text-gray-800 cursor-pointer" onClick={()=>setState(!state)
                         }>
                            <MenuIcon/>
                         </button>
                     </div>
                 </div>
                <div className={`flex-1 gap-x-8 items-center mt-8 md:mt-0 md:flex ${state?"block" :"hidden"}`}>
                <div className='w-24 h-24' >
                                <img src={img} className=" h-[95%] w-[100%]  " />
                </div>
                <ul className="justify-center items-center space-y-6 md:flex md:space-x-24 text-lg md:space-y-0">
               
                 {navigation.map((item,idx)=>{
                     return(
                         <li key={idx} className="text-white hover:text-[#4b37b4] hover:font-bold">
                             <a style={{textDecoration:"none"}} href={item.path} className="block">{item.title}</a>
                         </li>
                     );
                 })}
                 </ul>
                 
                 <div className="flex-1 my-4 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 mb-4">
                   
                    {currentUser?(
                        <p  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium  border-2 cursor-pointer bg-gradient-to-br from-[#24022b] from-20% to-[#2d2597]  activate:bg-gray-900 rounded-full md:inline-flex">{currentUser.slice(0,25)}..</p>
                    ):(<button onClick={()=>connectWallet()} className="cursor-pointer flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gradient-to-br from-[#24022b] from-20% to-[#2d2597]   activate:bg-gray-900 rounded-full md:inline-flex">
                        Connect Wallet
                    </button>)}
                 </div>
             </div>
             </div>
        </nav>
    )
}

export default Navigation;