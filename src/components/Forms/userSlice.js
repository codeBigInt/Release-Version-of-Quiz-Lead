import { createSelector, createSlice } from "@reduxjs/toolkit";

//initiallizing the user
const initialState = {
    currentUser: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser( state, action ){
            //RTecioeiving payload action from dispatch
            state.currentUser = action.payload.currentUser
            state.isAuthenticated = action.payload.isAuthenticated
        }
    }
})

export const currentUserSelector = createSelector(
    state => state.user.currentUser,
    currentUser => currentUser
  );
//Export the actions
export const { setUser } = userSlice.actions


export default userSlice.reducer
