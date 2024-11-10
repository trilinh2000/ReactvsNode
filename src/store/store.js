import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
export const store=configureStore({
    reducer:{
        login:rootReducer,
    }
})