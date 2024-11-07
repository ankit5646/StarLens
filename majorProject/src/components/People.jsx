import { useEffect, useState } from 'react'
import Topnav from '../partials/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../partials/Dropdown'
import axios from '../utils/axios'
import Cards from '../partials/Cards'
import Loader from '../partials/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const People = () => {


    const navigate = useNavigate();
    const [people, setpeople] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "StarLens | People";



      const GetPeople = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=${page}`);

      if (data.results.length > 0) {
        setpeople((prev) => [...prev, ...data.results]);
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
    
  if (people.length === 0) {
    GetPeople();
  } else { 
    setpage(1);
    setpeople([]);
    GetPeople();
  }
};
  

  useEffect(() => {
    refreshHandler();
  },[])

    
   return people.length > 0 ?  (
      <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[3%]'>
       
        <h1 className='w-[22%] text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i> {" "}
                  People
        </h1>
        
        <Topnav />

      </div>
      
      <InfiniteScroll
        next={GetPeople}
        hasMore={hasMore}
        loader= {<h1 className='text-2xl text-zinc-400 pt-[3%]'>
                      Loading...
                </h1>}
        dataLength={people.length}
      >
         <Cards data={people} title={ "person"} />
      </InfiniteScroll>



      </div>
  ) : <Loader/>
}

export default People