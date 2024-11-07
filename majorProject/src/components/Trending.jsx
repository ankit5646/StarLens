import React, { useEffect, useState } from 'react'
import Topnav from '../partials/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../partials/Dropdown'
import axios from '../utils/axios'
import Cards from '../partials/Cards'
import Loader from '../partials/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
  const navigate = useNavigate()

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  document.title = "StarLens | Trending";

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}?page=${page}`);

      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage(page + 1);
        
      } else {
        sethasMore(false);
      }
      
    }
    catch (error) {
      console.log("Error:", error);
    }
  };

  

  const refreshHandler = aysnc => {
    
  if (trending.length === 0) {
    GetTrending();
  } else { 
    setpage(1);
    settrending([]);
    GetTrending();
  }
};
  

  useEffect(() => {
    refreshHandler();
  },[category , duration])


  return trending.length > 0 ? (
    <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[3%]'>
       
        <h1 className='w-[22%] text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i> {" "}
            Trending
        </h1>
        
        <Topnav />

        <Dropdown
          title="Category"
          options={['tv','movie','all']}
          fun={(e) => setcategory(e.target.value)}
        />

        <Dropdown
          title="Duration"
          options={['week', 'day']}
          fun={(e) => setduration(e.target.value)}
        />


      </div>
      
      <InfiniteScroll
        next={GetTrending}
        hasMore={hasMore}
        loader= {<h1 className='text-2xl text-zinc-400 pt-[3%]'>
                      Loading...
                </h1>}
        dataLength={trending.length}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>



      </div>
  ) : <Loader/>
}

export default Trending