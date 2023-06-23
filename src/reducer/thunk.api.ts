import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllNintendo, getDetailNintendo, getSearchNintendo } from '../api/nintendo.api'
import { getAllDiskGame, getDetailDiskGame, getSearchDiskGame } from '../api/diskgame.api'

// thunk api nintendo
export const getAllNintendoThunk = createAsyncThunk('data/getAllNintendo', getAllNintendo)
export const getDetailNintendoThunk = createAsyncThunk('data/getDetailNintendoThunk', getDetailNintendo)
export const getSearchNintendoThunk = createAsyncThunk('data/getSearchNintendoThunk', getSearchNintendo)

//thunk api diskGame
export const getAllDiskGameThunk = createAsyncThunk('data/getAllDiskGameThunk', getAllDiskGame)
export const getDetailDiskGameThunk = createAsyncThunk('data/getDetailDiskGameThunk', getDetailDiskGame)
export const getSearchDiskGameThunk = createAsyncThunk('data/getSearchDiskGameThunk', getSearchDiskGame)
