import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.webp'

const Cards = ({ data, title }) => {
  // console.log(data)
  return (
      <div className='w-full mt-[3%] px-[5%] bg-[#1F1E24]  flex flex-wrap  justify-around '>
          {data.map((c, i) => (
              <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mr-[3%] mb-[3%]' key={i}>
                  
                <img
                    className='shadow-[8px_17px_38px_2px_rgba(0,0,0.5)]  h-[40vh] object-cover rounded-xl'
                    src={c.backdrop_path || c.profile_path || c.poster_path ?
                    `https://image.tmdb.org/t/p/original/${c.profile_path || c.poster_path || c.backdrop_path || noimage}` 
                    : noimage
                    }
                      alt=""
                  />
                  
                  <h1 className='text-2xl text-zinc-400 pt-[3%]'>
                      {c.title || c.original_title || c.name || c.original_name}
                </h1>

              {c.vote_average ?
                <div className='absolute bottom-[27%] left-[-13%] bg-yellow-600 text-xl font-semibold text-white w-[6vh] h-[6vh] flex items-center justify-center rounded-full'>
                    {(c.vote_average * 10).toFixed()}%
                </div> : " "
              }
            
              </Link>
          ))}
      </div>

  )
}

export default Cards