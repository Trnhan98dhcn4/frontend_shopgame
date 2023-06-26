import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'
import { ICartShop } from '../model'
import { deleteCartShopThunk, getAllCartShopThink, postCartShopThunk, putCartShopThunk } from './thunk.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface IDiskGameSate {
    dataCardShop: ICartShop[]
    detailShop: ICartShop
    numberType: number
    loading: boolean
    error: null | string
    currentRequestId: undefined | string
}

const initialState: IDiskGameSate = {
    dataCardShop: [],
    detailShop: {} as ICartShop,
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
        },
        setCountUp: (state, action: PayloadAction<ICartShop>) => {
            const SLCartShop = action.payload
            const selectedItem = state.dataCardShop.find((item) => item._id === SLCartShop._id)
            if (selectedItem) {
                selectedItem.SL = String(Number(selectedItem.SL) + 1)
            }
        },
        setCountDown: (state, action: PayloadAction<ICartShop>) => {
            const SLCartShop = action.payload
            const selectedItem = state.dataCardShop.find((item) => item._id === SLCartShop._id)
            if (selectedItem) {
                selectedItem.SL = String(Number(selectedItem.SL) - 1)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteCartShopThunk.fulfilled, (state, action) => {
                const _CartShop = action.meta.requestId
                const index = state.dataCardShop.findIndex((f) => f._id === _CartShop)
                if (index !== -1) {
                    state.dataCardShop.splice(index, 1)
                }
            })
            .addCase(putCartShopThunk.fulfilled, (state, action) => {
                const _newCartShop = action.payload
                const index = state.dataCardShop.findIndex((f) => f._id === _newCartShop._id)
                state.dataCardShop[index] = _newCartShop
            })
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

export const { setAllCardShop, setUp, setDown, setCount, setCountUp, setCountDown } = actions
export default reducer
