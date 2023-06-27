import { configureStore } from '@reduxjs/toolkit'
import nintendoReducer from '../reducer/nintendo.reducer'
import diskGameReducer from '../reducer/diskgame.reducer'
import cardShopReducer from '../reducer/cartshop.reducer'
import userReducer from '../reducer/user.reducer'

export const store = configureStore({
    reducer: {
        nintendo: nintendoReducer,
        diskGame: diskGameReducer,
        cartShop: cardShopReducer,
        user: userReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
