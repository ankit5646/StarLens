import  { useEffect, useState } from 'react'
import Topnav from '../partials/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../partials/Dropdown'
import axios from '../utils/axios'
import Cards from '../partials/Cards'
import Loader from '../partials/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Tvseries = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("airing_today");
    const [tvseries, settvseries] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "StarLens | Tv Series";

    const GetTvseries = async () => {
    try {
      const { data } = await axios.get(`tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvseries((prev) => [...prev, ...data.results]);
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
    
  if (tvseries.length === 0) {
    GetTvseries();
  } else { 
    setpage(1);
    settvseries([]);
    GetTvseries();
  }
};
  

  useEffect(() => {
    refreshHandler();
  },[category])


  return tvseries.length > 0 ?  (
      <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[3%]'>
       
        <h1 className='w-[32%] text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i> {" "}
                  TV Series <small className='text-xs'>{category}</small>
        </h1>
        
        <Topnav />

        <Dropdown
          title={category}
          options={['on_the_air', 'top_rated', 'popular','airing_today']}
          fun={(e) => setcategory(e.target.value)}
        />


      </div>
      
      <InfiniteScroll
        next={GetTvseries}
        hasMore={hasMore}
        loader= {<h1 className='text-2xl text-zinc-400 pt-[3%]'>
                      Loading...
                </h1>}
        dataLength={tvseries.length}
      >
        <Cards data={tvseries} title={"tv"} />
      </InfiniteScroll>



      </div>
  ) : <Loader/>
}

export default Tvseries