import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notfound from './Notfound'

const Trailer = () => {

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const category = pathname.includes("movie") ? "movie" : "tv"

  const ytvideo = useSelector((state) => state[category].info.videos)
  

  return  (
    <div className='bg-[rgba(0,0,0,0.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center'>
      
     
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] text-white ri-close-fill text-3xl top-[5%]"
      ></Link>

      {ytvideo ? <ReactPlayer
        controls
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`} /> :
        <Notfound />
      }
      
     
      
    </div>
  )
}

export default Trailer