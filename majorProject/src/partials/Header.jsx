import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({data}) => {
  return (
    <div style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }}
    className='w-full h-[50vh] text-white px-5 flex flex-col justify-end pb-20'
    
    >
        <div className='w-[40%]'>
             <h1 className='text-4xl font-semibold'>{data.title || data.original_title || data.name || data.original_name}</h1>
            <h3>Original Language: {data.original_language}</h3>
            <p className='text-zinc-400'>
            <i className="ri-megaphone-fill text-yellow-500 text-lg"></i> {data.release_date || "N/A"} 
            <i className="ri-video-on-fill text-yellow-500 text-lg ml-3"></i> {data.media_type.toUpperCase() || "N/A"}
            </p>
            <p className='pt-5 flex flex-col'>
            {data.overview.slice(0,200)}.... <Link to={`${data.media_type}/details/${data.id}`} className='text-blue-200'>More</Link>
          <Link
            to={`${data.media_type}/details/${data.id}/trailer`}
            className='p-2 bg-yellow-500 w-fit rounded-md mt-3'>
            <i className="ri-play-circle-fill"></i> Watch Trailer
            </Link>
            </p >
        </div>
        
    </div>
  )
}

export default Header