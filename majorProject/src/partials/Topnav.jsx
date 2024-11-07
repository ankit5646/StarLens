import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.webp'

const Topnav = () => {

    const [query, setquery]=useState("");
    const [searches, setsearches] = useState([]);
     
    const GetSearches = async()=>{
      try{
        const { data } = await axios.get(`search/multi?query=${query}`);
        setsearches(data.results);
      }
      catch(error){
        console.log("Error:" , error);
      }

    };

    useEffect(()=>{
      GetSearches();
    },[query])
  return (
    
    <div className='z-[1000] h-[6vh] w-[80%] relative flex justify-start items-center ml-[10%]'>
        <i className="text-zinc-400 text-3xl ri-search-line"></i>

        <input onChange={ (e) => setquery(e.target.value) } 
          value={query}
          className='w-full text-zinc-200 mx-10 px-5 py-2 text-xl outline-none bg-transparent' 
          type="text" 
          placeholder='Search anything' />

        {query.length > 0 && <i onClick={()=> setquery("")} className="text-zinc-400 text-3xl ri-close-fill"></i>}

        

        <div className='absolute w-[80%] max-h-[50vh] bg-zinc-200 left-20 top-[90%] overflow-auto'>

           {searches.map((s,index) => 
            (<Link to={`/${s.media_type}/details/${s.id}`} key={index} className='hover:text-black hover:bg-zinc-300 duration-100 font-semibold text-zinc-600 w-[100%] p-10 py-3 flex justify-start items-center border-b-2 border-zinc-100'>
              <img className='w-[7vw] h-[15vh] rounded mr-10 object-cover'
               src={
                s.backdrop_path || s.profile_path ?
                `https://image.tmdb.org/t/p/original/${ s.profile_path || s.poster_path || s.backdrop_path}`
                : noimage
                } alt="" />
              <span>{s.title || s.original_title || s.name || s.original_name} </span>
            </Link> )

          )} 

           
        
        </div>

    </div>
   
    

  )
}

export default Topnav;