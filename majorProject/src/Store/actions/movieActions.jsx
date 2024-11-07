export {removemovie} from '../reducers/movieSlice'
import axios from '../../utils/axios'
import { loadmovie } from '../reducers/movieSlice'

export const asyncloadmovie = (id) => async (dispatch, getstate) => { 
    try {
        const detail = await axios.get(`/movie/${id}`)
        const externalid = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`)


        let theultimatedata = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(item => item.type === 'Trailer'),
            watchproviders: watchproviders.data.results.IN,
        }
        
        dispatch(loadmovie(theultimatedata));
    }
    catch (error) {
        console.error(error)
    }
}