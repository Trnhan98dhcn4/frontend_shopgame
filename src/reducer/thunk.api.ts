import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllNintendo, getDetailNintendo, getSearchNintendo } from '../api/nintendo.api'
import { getAllDiskGame, getDetailDiskGame, getSearchDiskGame } from '../api/diskgame.api'
import { deleteAllCartShop, deleteCartShop, getAllCartShop, postCartShop, putCartShop } from '../api/cardshop.api'
import { getAllUser, getDetailUser, postLogin, postRegister, postShopUser, putUserUpdate } from '../api/api.users'

// thunk api nintendo
export const getAllNintendoThunk = createAsyncThunk('data/getAllNintendo', getAllNintendo)
export const getDetailNintendoThunk = createAsyncThunk('data/getDetailNintendoThunk', getDetailNintendo)
export const getSearchNintendoThunk = createAsyncThunk('data/getSearchNintendoThunk', getSearchNintendo)

//thunk api diskGame
export const getAllDiskGameThunk = createAsyncThunk('data/getAllDiskGameThunk', getAllDiskGame)
export const getDetailDiskGameThunk = createAsyncThunk('data/getDetailDiskGameThunk', getDetailDiskGame)
export const getSearchDiskGameThunk = createAsyncThunk('data/getSearchDiskGameThunk', getSearchDiskGame)

//thunk api cart
export const getAllCartShopThink = createAsyncThunk('data/getAllCartShop', getAllCartShop)
export const postCartShopThunk = createAsyncThunk('data/postCartShopThunk', postCartShop)
export const putCartShopThunk = createAsyncThunk('data/putCartShopThunk', putCartShop)
export const deleteCartShopThunk = createAsyncThunk('data/deleteCartShopThunk', deleteCartShop)
export const deleteAllCartShopThunk = createAsyncThunk('data/deleteAllCartShopThunk', deleteAllCartShop)

//thunk api user
export const getAllUserThunk = createAsyncThunk('data/getAllUserThunk', getAllUser)
export const getDetailUserThunk = createAsyncThunk('data/getDetailUserThunk', getDetailUser)
export const postUserLoginThunk = createAsyncThunk('data/postUserLoginThunk', postLogin)
export const postUserRegisterThunk = createAsyncThunk('data/postUserRegisterThunk', postRegister)
export const putUserUpdateThunk = createAsyncThunk('data/putUserUpdateThunk', putUserUpdate)
export const postShopUserThunk = createAsyncThunk('data/postShopUserThunk', postShopUser)
