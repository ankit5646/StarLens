import  { useEffect, useState } from 'react'
import Topnav from '../partials/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../partials/Dropdown'
import axios from '../utils/axios'
import Cards from '../partials/Cards'
import Loader from '../partials/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'


const Popular = () => {

  const navigate = useNavigate()
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

    document.title = "StarLens | Popular";
    


  const GetPopular = async () => {
    try {
        const { data } = await axios.get(`${category}/popular?page=${page}`);
        console.log(data.results)

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
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
    
  if (popular.length === 0) {
    GetPopular();
  } else { 
    setpage(1);
    setpopular([]);
    GetPopular();
  }
};
  

  useEffect(() => {
    refreshHandler();
  },[category])

    
  return popular ? (
      <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[3%]'>
       
        <h1 className='w-[22%] text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i> {" "}
            Popular
        </h1>
        
        <Topnav />

        <Dropdown
          title="Category"
          options={['tv','movie']}
          fun={(e) => setcategory(e.target.value)}
        />


      </div>
      
      <InfiniteScroll
        next={GetPopular}
        hasMore={hasMore}
        loader= {<h1 className='text-2xl text-zinc-400 pt-[3%]'>
                      Loading...
                </h1>}
        dataLength={popular.length}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>



      </div>
  ) : <Loader/>
    
    
}

export default Popular