import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'
import { IDiskGameModel } from '../model'
import { getAllDiskGameThunk, getDetailDiskGameThunk } from './thunk.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface IDiskGameSate {
    dataDiskGame: IDiskGameModel[]
    detailDiskGame: IDiskGameModel
    loading: boolean
    error: null | string
    currentRequestId: undefined | string
}

const initialState: IDiskGameSate = {
    dataDiskGame: [],
    detailDiskGame: {} as IDiskGameModel,
    loading: false,
    error: null,
    currentRequestId: undefined
}

const distGameSlice = createSlice({
    name: 'DiskGame',
    initialState,
    reducers: {
        setAllDiskGame: (state, action: PayloadAction<IDiskGameModel[]>) => {
            state.dataDiskGame = action.payload
        },
        setDetailDiskGame: (state, action: PayloadAction<IDiskGameModel>) => {
            state.detailDiskGame = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDiskGameThunk.fulfilled, (state, action) => {
                state.dataDiskGame = action.payload
            })
            .addCase(getDetailDiskGameThunk.fulfilled, (state, action) => {
                state.detailDiskGame = action.payload
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

const { reducer } = distGameSlice

export default reducer
