import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import Tvseries from './components/Tvseries'
import People from './components/People'
import Moviedetails from './components/Moviedetails'
import Tvdetails from './components/Tvdetails'
import Persondetails from './components/Persondetails'
import Trailer from './partials/Trailer'
import Notfound from './partials/Notfound'


const App = () => {
  return (
    <div className='bg-[#1F1E24] w-full h-screen flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/details/:id' element={<Moviedetails />} >
          <Route path='/movie/details/:id/trailer' element={<Trailer />}  >
          </Route>
        </Route>
        <Route path='/tvseries' element={<Tvseries />} />
        <Route path='/tv/details/:id' element={<Tvdetails />}>
          <Route path='/tv/details/:id/trailer' element={<Trailer />}  >
          </Route>
        </Route>
        <Route path='/people' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />
        <Route path='*' element={<Notfound />} />
        
      </Routes>
    </div>
  )
}

export default App