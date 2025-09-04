import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

const profileSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload
        }
    }
})

export const { setUser } = profileSlice.actions
export default profileSlice.reducer