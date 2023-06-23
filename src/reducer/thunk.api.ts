import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllNintendo, getDetailNintendo } from '../api/nintendo.api'
import { getAllDiskGame, getDetailDiskGame } from '../api/diskgame.api'

// thunk api nintendo
export const getAllNintendoThunk = createAsyncThunk('data/getAllNintendo', getAllNintendo)
export const getDetailNintendoThunk = createAsyncThunk('data/getDetailNintendoThunk', getDetailNintendo)

//thunk api diskGame

export const getAllDiskGameThunk = createAsyncThunk('data/getAllDiskGameThunk', getAllDiskGame)
export const getDetailDiskGameThunk = createAsyncThunk('data/getDetailDiskGameThunk', getDetailDiskGame)
