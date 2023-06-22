import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INintendoModel } from '../model'
import { getAllNintendoThunk, getDetailNintendoThunk } from './thunk.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface NintendoState {
    dataNintendo: INintendoModel[]
    detailNintendo: INintendoModel
    loading: boolean
    error: null | string
    currentRequestId: undefined | string
}

const initialState: NintendoState = {
    dataNintendo: [],
    detailNintendo: {} as INintendoModel,
    loading: false,
    error: null,
    currentRequestId: undefined
}

const NintendoSlice = createSlice({
    name: 'nintendo',
    initialState,
    reducers: {
        setAllNintendo: (state, action: PayloadAction<INintendoModel[]>) => {
            state.dataNintendo = action.payload
        },
        setDetailNintendo: (state, action: PayloadAction<INintendoModel>) => {
            state.detailNintendo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailNintendoThunk.fulfilled, (state, action) => {
                state.detailNintendo = action.payload
            })
            .addCase(getAllNintendoThunk.fulfilled, (state, action) => {
                state.dataNintendo = action.payload
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

const { reducer, actions } = NintendoSlice

export const { setAllNintendo, setDetailNintendo } = actions

export default reducer
