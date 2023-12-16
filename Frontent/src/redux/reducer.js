const user = (state = {user:{},theme:"dark",then:()=>{}}, action) => {

    switch (action.type) {
        case 'FETCH_USER_DATA':
            return { ...state, user: action.payload.user } 
        default:
            return state
    }
}

export default user