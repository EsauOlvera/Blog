import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  userLoading: false,
  userName: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    },
  },
})

export const { setUser, setUserLoading, setUserName } = userSlice.actions

export default userSlice.reducer
