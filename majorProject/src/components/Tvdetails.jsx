import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadtv, removetv } from '../Store/actions/tvActions'
import Loader from '../partials/Loader'
import noimage from '/noimage.webp'
import HorizontalCards from '../partials/HorizontalCards'


const Tvdetails = () => {

  const { id } = useParams() // Assuming id is a prop passed down from the parent component
  const { pathname } = useLocation();
  const { info } = useSelector(state => state.tv)
  // console.log(info)
  const navigate = useNavigate();

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(asyncloadtv(id)) // Assuming id is a prop passed down from the parent component
    return () => {
      dispatch(removetv()) // Remove the movie from the Redux store when the component unmounts
    }
  },[id])

  return info ? (
    <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8)),
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      className='w-full h-[130vh] px-[10%] relative'>
      
      <nav className='h-[10vh] w-full text-zinc-100 flex gap-10 items-center text-xl'>
        <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] text-white ri-arrow-left-line">
        
      </Link>

      <a target='_blank' href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
      </a>

      <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
        <i className="ri-earth-fill"></i>
      </a>
      
      <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
       imdb
      </a>
      
      </nav>

      
      {/* Poster and Backdrop and details: */}
      <div className='flex gap-5 text-white'>
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
        
        <div>
          <h1 className='text-4xl font-semibold'>{info.detail.title || info.detail.original_title || info.detail.name || info.detail.original_name} {" "}
            <span className='text-base font-normal text-zinc-300'>
              {info.detail.genres.map((g) => g.name).join(', ')}
            </span>
          </h1>
          <p className='px-3 text-lg font-semibold'>{info.detail.first_air_date ? new Date(info.detail.first_air_date).getFullYear() : 'N/A'}
            <span className='px-5 text-base text-zinc-300'> {info.detail.number_of_episodes} Episodes </span>
            <span className='px-5 text-base text-zinc-300'> {info.detail.number_of_seasons} Seasons </span>
          </p> 


          <h1 className='text-xl font-semibold italic text-zinc-200 my-4'>{info.detail.tagline}</h1>

          <span className='text-2xl'>Overview</span>
          
          <h1 className='text-lg mt-2 mb-10'> {info.detail.overview}</h1>
          
          <Link
            className='p-3 bg-[#6556CD] w-fit rounded-md'
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-circle-fill"></i>
            Watch Trailer
          </Link>
        </div>
      </div>
       
      {/* Availale paltforms: */}
      {info.watchproviders && (
        <div className='flex gap-10 mt-10 flex-col'>

          {info.watchproviders.flatrate && 
            (
            <div className='flex gap-5 text-white items-center'>
              <h1>Watch</h1>
             { info.watchproviders.flatrate.map((w , i) => ( 
               <img
                 key={i}
                 title={w.provider_name}
                className='w-[6vh] object-cover rounded-xl'
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />    
            )
            
            )}
            </div>
            )}
          
          
          {info.watchproviders.buy && 
            (
            <div className='flex gap-5 text-white items-center'>
              <h1>Buy</h1>
             { info.watchproviders.buy.map((w,i) => ( 
               <img
                 key={i}
                 title={w.provider_name}
                className='w-[6vh] object-cover rounded-xl'
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />    
            )
            
            )}
            </div>
            )}
          
          {info.watchproviders.rent && 
            (
            <div className='flex gap-5 text-white items-center'>
              <h1>Rent</h1>
             { info.watchproviders.rent.map((w) => ( 
               <img
                title={w.provider_name}
                className='w-[6vh] object-cover rounded-xl'
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />    
            )
            
            )}
            </div>
            )}
          
        </div>
      )}

      {/* Recommandations and stuff */}
      <hr className='mt-5' />
      <h1 className='text-2xl text-white mt-3'>Recommendations</h1>
      <HorizontalCards data={info.recommendations ? info.recommendations : info.similar} />
       <Outlet/>
      
      
    </div>

    
  ) : <Loader/>
}

export default Tvdetails