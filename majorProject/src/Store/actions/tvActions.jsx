export {removetv} from '../reducers/tvSlice'
import axios from '../../utils/axios'
import { loadtv } from '../reducers/tvSlice'

export const asyncloadtv = (id) => async (dispatch, getstate) => { 
    try {
        const detail = await axios.get(`/tv/${id}`)
        const externalid = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`)


        let theultimatedata = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(item => item.type === 'Trailer'),
            watchproviders: watchproviders.data.results.IN,
        }
        
        dispatch(loadtv(theultimatedata));
    }
    catch (error) {
        console.error(error)
    }
}
