import axios from 'axios'
import collections from '../configurations/collections'

//synchronous action creator
const fetchPostsSuccess = (user) => ({
    type: 'FETCH_USER_DATA',
    payload: { user }
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchPosts = () => {
    return async (dispatch) => {
        try {
            let posts = await axios.post(collections.server_base + "/get-user-details", { token: window.localStorage.getItem("token") })
            dispatch(fetchPostsSuccess(posts.data)) //store first five posts
        }
        catch (e) {
            console.log(e)
        }
    }
}