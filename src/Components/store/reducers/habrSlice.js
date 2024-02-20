import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../../Pages/Habr/Data";

export const habrSlicer = createSlice({
    name: "habr",
    initialState: {
        value: [data]
    },
    reducers: {
        filterSquares: state => {


        }
    }
})

export const { filterSquares } = habrSlicer.actions

export default habrSlicer.reducer