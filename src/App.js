import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Navigation from './components/Navigation';
import { Home } from './components/home';
import { YourNFT } from './components/yourNFT';
import { MintNFT } from './components/MintNFT';

import Footer from './components/footer';


function App() {

  

  
  return (
    <div className='bg-gradient-to-br from-[#24022b] from-20% to-[#2d2597] '>
      <Navigation />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<MintNFT />} />
          <Route path="/yourNFT" element={<YourNFT />} />
        </Routes>
      
      <Footer/>
      

     
      
    </div>
  );
}

export default App;
