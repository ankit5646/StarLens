import  { useEffect, useState } from 'react'
import Topnav from '../partials/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../partials/Dropdown'
import axios from '../utils/axios'
import Cards from '../partials/Cards'
import Loader from '../partials/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'


const Movies = () => {

    const navigate = useNavigate()
    const [time, settime] = useState("now_playing");
    const [movies, setmovies] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "StarLens | Movies";

      const GetMovies = async () => {
    try {
      const { data } = await axios.get(`movie/${time}?page=${page}`);

      if (data.results.length > 0) {
        setmovies((prev) => [...prev, ...data.results]);
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
    
  if (movies.length === 0) {
    GetMovies();
  } else { 
    setpage(1);
    setmovies([]);
    GetMovies();
  }
};
  

  useEffect(() => {
    refreshHandler();
  },[time])


  return movies.length > 0 ?  (
      <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[3%]'>
       
        <h1 className='w-[22%] text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i> {" "}
                  Movies <small className='text-xs'>{time}</small>
        </h1>
        
        <Topnav />

        <Dropdown
          title="Period"
          options={['now_playing', 'popular', 'top_rated', 'upcoming']}
          fun={(e) => settime(e.target.value)}
        />


      </div>
      
      <InfiniteScroll
        next={GetMovies}
        hasMore={hasMore}
        loader= {<h1 className='text-2xl text-zinc-400 pt-[3%]'>
                      Loading...
                </h1>}
        dataLength={movies.length}
      >
        <Cards data={movies} title={"movie"} />
      </InfiniteScroll>



      </div>
  ) : <Loader/>
}

export default Movies