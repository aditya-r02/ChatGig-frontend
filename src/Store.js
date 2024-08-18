import { configureStore } from '@reduxjs/toolkit'
import userDetails from './Slices/UserSlice'
import loadingSlice from './Slices/LoadingSlice'

export default configureStore({
  reducer: {
    userDetails: userDetails,
    loading: loadingSlice,
  }
})