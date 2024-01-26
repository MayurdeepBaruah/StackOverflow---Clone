const authReducer = (state= {data: null}, action) => {                // state is equal to data, actions are the methods used  
    switch (action.type) {
        case "AUTH":
            localStorage.setItem("Profile", JSON.stringify({ ...action?.data })) // storing data in local storage, stringfy means coverting json data coming from backed to string
            return {...state, data: action?.data}
        case "LOGOUT":
            localStorage.clear();
            return { ...state, data: null }
        default:
            return state;
    }    
}

export default authReducer
