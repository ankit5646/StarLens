import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { asyncloadperson, removeperson } from '../Store/actions/personActions'
import Loader from '../partials/Loader'
import noimage from '/noimage.webp'
import HorizontalCards from '../partials/HorizontalCards'
import Dropdown from '../partials/Dropdown'

const Persondetails = () => {

  const { id } = useParams() // Assuming id is a prop passed down from the parent component
  const { info } = useSelector(state => state.person)
  // console.log(info)
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie")

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(asyncloadperson(id)) // Assuming id is a prop passed down from the parent component
    return () => {
      dispatch(removeperson()) // Remove the movie from the Redux store when the component unmounts
    }
  }, [id])
    
  return info ?  (
    <div className='px-[7%] w-screen text-zinc-400 bg-[#1f1e24] h-[250vh]'>

      {/* part 1 NAVIGATION */}

      <nav className='h-[10vh] w-full text-zinc-100 flex gap-10 items-center text-xl'>
        <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] text-white ri-arrow-left-line">
        
      </Link>

      
      </nav>

      
      <div className='w-full flex'>

        {/* Part 2 left poster and details */}
        <div className='w-[20%]'>
          <img
          className='
              shadow-[8px_17px_38px_2px_rgba(0,0,0.5)]  
              h-[40vh] object-cover rounded-xl'
              src={info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path ?
                    `https://image.tmdb.org/t/p/original/${info.detail.profile_path || info.detail.poster_path || info.detail.backdrop_path || noimage}` 
                    : noimage
                    }
                      alt=""
          />

          <hr className='my-[10%] ' />

          <div className='text-2xl text-white flex gap-5'>

            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className="ri-earth-fill"></i>
            </a>

            <a target='_blank' href={`https://www.instagram.com//${info.externalid.instagram_id}`}>
              <i className="ri-instagram-fill"></i>
            </a>

            <a target='_blank' href={`https://x.com/${info.externalid.twitter_id}`}>
              <i className="ri-twitter-fill"></i>
            </a>

            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className="ri-facebook-fill"></i>
            </a>
    

          </div>

          <h1 className='text-2xl font-semibold my-5'>Personal Info</h1>

          <h1 className='text-lg font-semibold'>Know for</h1>
          <h1 className=''>{info.detail.known_for_department}</h1>

          <h1 className='text-lg font-semibold mt-3'>Birth date</h1>
          <h1 className=''>{info.detail.birthday}</h1>

          <h1 className='text-lg font-semibold mt-3'>Death date</h1>
          <h1 className=''>{info.detail.death_date ? info.detail.death_date : "Still Alve"}</h1>

          <h1 className='text-lg font-semibold mt-3'>Place of birth</h1>
          <h1 className=''>{info.detail.place_of_birth})</h1>
        

        </div>

        {/* part 3 right  */}
        <div className='w-[80%] mx-5'>
          <h1 className='text-5xl font-semibold my-5'>{ info.detail.name }</h1>

          <h1 className='text-2xl font-semibold my-2'>Biography</h1>
          <p className='mt-5'>{ info.detail.biography}</p>
          <h1 className=''>{info.detail.known_for_department}</h1>

          <h1 className='mt-5 text-2xl font-semibold my-2'>Worked in </h1>
          <HorizontalCards data={info.combinedcredit.cast} />

          <div className='w-full flex justify-between'>
            <h1 className='mt-5 text-xl font-semibold my-2'>
              Acting
            </h1>

            <Dropdown title={"Category"} options={["tv", "movie"]} fun={(e) => setcategory(e.target.value)}   />

          </div>

          <div className='list-disc w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.7)] mt-5 border-2 border-zinc-700'>
            
           

            {info[category + "credit"].cast.map((c, i) => (

              <li key={i} className='hover:text-white hover:bg-zinc-800  duration-300 cursor-pointer mt-5'>
                <Link
                  to={`/${category}/details/${c.id}`}
                  className=''>
                <span className='text-md font-semibold'>{c.title || c.original_title || c.name || c.original_name}</span>
                <span className='block pl-10'>{c.character}</span>
                </Link>
              </li>
                
              ))}

              

          </div>

        </div>


      </div>
      
    </div>
  ) : <Loader />
}

export default Persondetails




