import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories:[]
}

export const categorySlice = createSlice({
    name:'category',
    initialState:initialState,
    reducers:{
        setCategories(state,value){
            state.categories = value.payload
        }
    }
})

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;