import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUsersModel } from '../model'
import {
    getAllUserThunk,
    getDetailUserThunk,
    postShopUserThunk,
    postUserLoginThunk,
    postUserRegisterThunk,
    putUserUpdateThunk
} from './thunk.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface IUserState {
    dataUser: IUsersModel[]
    detailUser: IUsersModel
    loading: boolean
    isAuth: boolean
    error: null | string
    currentRequestId: undefined | string
}

const initialState: IUserState = {
    dataUser: [],
    detailUser: {} as IUsersModel,
    loading: false,
    isAuth: false,
    error: null,
    currentRequestId: undefined
}

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUsersModel[]>) => {
            state.dataUser = action.payload
        },
        setUserDetail: (state, action: PayloadAction<IUsersModel>) => {
            state.detailUser = action.payload
        },
        setLogin: (state) => {
            state.isAuth = true
        },
        setLogout: (state) => {
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(putUserUpdateThunk.fulfilled, (state, action) => {
                const _user = action.payload
                const index = state.dataUser.findIndex((f) => (f._id = _user._id))
                state.dataUser[index] = _user
            })
            .addCase(postShopUserThunk.fulfilled, (state, action) => {
                state.dataUser.push(action.payload)
            })
            .addCase(getDetailUserThunk.fulfilled, (state, action) => {
                state.detailUser = action.payload
            })
            .addCase(getAllUserThunk.fulfilled, (state, action) => {
                state.dataUser = action.payload
            })
            .addCase(postUserLoginThunk.fulfilled, (state, action) => {
                state.detailUser = action.payload
            })
            .addCase(postUserRegisterThunk.fulfilled, (state, action) => {
                state.detailUser = action.payload
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = true
                    state.currentRequestId = action.meta.requestId
                    state.error = null
                }
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    if (state.loading && state.currentRequestId === action.meta.requestId) {
                        state.loading = false
                        state.currentRequestId = undefined
                        state.error = null
                    }
                }
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    if (state.loading && state.currentRequestId === action.meta.requestId) {
                        state.loading = false
                        state.currentRequestId = undefined
                        state.error = 'Error Server Page'
                    }
                }
            )
    }
})

const { reducer, actions } = UserSlice

export const { setUserData, setLogin, setLogout, setUserDetail } = actions

export default reducer
