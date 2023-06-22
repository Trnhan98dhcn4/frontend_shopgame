import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllNintendo, getDetailNintendo } from '../api/nintendo.api'

export const getAllNintendoThunk = createAsyncThunk('data/getAllNintendo', getAllNintendo)

export const getDetailNintendoThunk = createAsyncThunk('data/getDetailNintendoThunk', getDetailNintendo)
