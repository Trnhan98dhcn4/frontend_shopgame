import { IUserModel } from '../model'
import { apiGet, apiPost } from './api.axios'

const URL = 'user'

export const getAllUser = async () => {
    return apiGet<IUserModel[]>(URL)
}

export const getDetailUser = async (id: string) => {
    const _url = URL + '/' + id
    return apiGet<IUserModel>(_url)
}

export const postLogin = async (body: IUserModel) => {
    const _url = URL + '/login'
    return apiPost<IUserModel>(_url, body)
}

export const postRegister = async (body: IUserModel) => {
    const _url = URL + '/register'
    return apiPost<IUserModel>(_url, body)
}
