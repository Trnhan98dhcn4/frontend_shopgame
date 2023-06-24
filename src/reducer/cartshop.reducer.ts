import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'
import { ICartShop } from '../model'
import { getAllCartShopThink, postCartShopThunk } from './thunk.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface IDiskGameSate {
    dataCardShop: ICartShop[]
    numberType: number
    loading: boolean
    error: null | string
    currentRequestId: undefined | string
}

const initialState: IDiskGameSate = {
    dataCardShop: [],
    numberType: 1,
    loading: false,
    error: null,
    currentRequestId: undefined
}

const cardShopSlice = createSlice({
    name: 'CardShop',
    initialState,
    reducers: {
        setAllCardShop: (state, action: PayloadAction<ICartShop[]>) => {
            state.dataCardShop = action.payload
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.numberType = action.payload
        },
        setUp: (state) => {
            state.numberType += 1
        },
        setDown: (state) => {
            state.numberType -= 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postCartShopThunk.fulfilled, (state, action) => {
                state.dataCardShop.push(action.payload)
            })
            .addCase(getAllCartShopThink.fulfilled, (state, action) => {
                state.dataCardShop = action.payload
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

const { reducer, actions } = cardShopSlice

export const { setAllCardShop, setUp, setDown, setCount } = actions
export default reducer
