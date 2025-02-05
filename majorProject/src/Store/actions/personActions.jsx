export {removeperson} from '../reducers/personSlice'
import axios from '../../utils/axios'
import { loadperson } from '../reducers/personSlice'

export const asyncloadperson = (id) => async (dispatch, getstate) => { 
    try {
        const detail = await axios.get(`/person/${id}`)
        const externalid = await axios.get(`/person/${id}/external_ids`)
        const combinedcredit = await axios.get(`/person/${id}/combined_credits`)
        const moviecredit = await axios.get(`/person/${id}/movie_credits`)
        const tvcredit = await axios.get(`/person/${id}/tv_credits`)


        let theultimatedata = {
            detail: detail.data,
            externalid: externalid.data,
            combinedcredit: combinedcredit.data,
            moviecredit: moviecredit.data,
            tvcredit: tvcredit.data,
            
        }
        
        dispatch(loadperson(theultimatedata));
    }
    catch (error) {
        console.error(error)
    }
}
