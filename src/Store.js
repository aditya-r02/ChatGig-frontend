import { configureStore } from '@reduxjs/toolkit'
import userDetails from './Slices/UserSlice'

export default configureStore({
  reducer: {
    userDetails: userDetails
  }
})