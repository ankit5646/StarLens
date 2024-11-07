import React from 'react'
import noimage from '/noimage.webp'
import { Link } from 'react-router-dom'


const HorizontalCards = ({data}) => {
  return (

      <div className='w-full h-[40%] flex overflow-x-auto text-white gap-3 items-center justify-start pl-10 mb-5'>

        {data.length > 0 ?data.map((item, index)=>
          <Link to={`/${item.media_type}/details/${item.id}`} key={index} className='min-w-[13vw] h-[90%] bg-zinc-900 overflow-auto mb-2' >
            <img 
              className='w-full h-[50%] object-cover' 
              src={ item.backdrop_path || item.profile_path || item.poster_path  ?
              `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path || item.poster_path || noimage}` 
              : noimage
              } 
              alt="" 
            />

            <div className='pt-3 pl-2'>
            <h1 className='text-xl font-medium pb-1'>{item.title || item.original_title || item.name || item.original_name}</h1>
            <p className='text-zinc-300 text-md'>{item.overview.slice(0,50)}.... <span className='text-zinc-400'>More</span></p>
            </div>

          </Link>
        ): <h1>Nothing to show...</h1>}
      </div>
    
  )
}

export default HorizontalCards