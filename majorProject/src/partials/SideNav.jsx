import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <div className='sideBar w-[18%] h-screen border-r-[1px] border-zinc-400 p-3 ml-5'>

        <div className='flex text-2xl text-white font-bold mt-5'>
        <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
        <h1>StarLens</h1>
        </div>

       <div className='mt-10 mb-5 '>
            <h1 className='text-white text-lg font-semibold'>New Feeds</h1>
                <nav className='flex flex-col text-zinc-400 gap-3 mt-5'>
                    <Link to={'/trending'} className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-fire-fill mr-2"></i>Trending</Link>
                    <Link to={'/popular'} className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-bard-fill mr-2"></i>Popular</Link>
                    <Link to={'/movies'} className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
                    <Link to={'/tvseries'} className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-tv-2-fill mr-2"></i>TV Shows</Link>
                    <Link to={'/people'} className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-team-fill mr-2"></i>People</Link>
                </nav>
       </div>

       <hr />

       <div className='mt-10 mb-5 '>
            <h1 className='text-white text-lg font-semibold'>Website Information</h1>
                <nav className='flex flex-col text-zinc-400 gap-3 mt-5'>
                    <Link className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-information-2-fill mr-2"></i>About Us</Link>
                    <Link className='hover:bg-[#6556CD] hover:text-white duration-150 p-3 rounded-md '><i className="ri-contacts-fill mr-2"></i>Contact Us</Link>
                </nav>
       </div>

        

    </div>
   
  )
}

export default SideNav