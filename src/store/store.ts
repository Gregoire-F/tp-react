import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const AppStore = configureStore({
    reducer: {
        
    }
})

export type RootState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()