import React, { useEffect, useState } from 'react'
import SideNav from '../partials/SideNav'
import axios from '../utils/axios'
import Header from '../partials/Header'
import HorizontalCards from '../partials/HorizontalCards'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'
import Loader from '../partials/Loader'




const Home = () => {
  document.title = "StarLens | Homepage"

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState('all')


  
  const GetHeaderWallpaper = async()=>{
    try{
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
      setwallpaper(randomdata);
    }
    catch(error){
      console.log("Error:" , error);
    }
  }



  const GetTrending = async()=>{
    try{
      const { data } = await axios.get(`trending/${category}/day?language=en-US`); 
      settrending(data.results);
      
      
    }
    catch(error){
      console.log("Error:" , error);
    }
  }

  // console.log(trending);

  useEffect(()=>{
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  },[category])


  return  wallpaper && trending ?  ( 
    <>
      <SideNav/>
        <div className='mainScreem w-[83%] h-screen overflow-auto overflow-x-hidden'>
          <Topnav/>
          <Header data={wallpaper}/>

          <div className='flex items-center justify-between ml-10 mt-10'>
          <h1 className='text-3xl font-semibold text-zinc-500 mb-3'>Trending</h1>
          <Dropdown 
            title="Filter" 
            options={['tv','movie','all']} 
            fun={(e) => setcategory(e.target.value)}
          />
          </div>

            <HorizontalCards data ={trending}/>
          </div>
      
    </>
  ) : <Loader/>
}

export default Home