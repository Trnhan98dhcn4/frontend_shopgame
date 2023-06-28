import { IUsersModel } from '../model'
import { apiGet, apiPost, apiPut } from './api.axios'

const URL = 'user'

export const getAllUser = async () => {
    return apiGet<IUsersModel[]>(URL)
}

export const getDetailUser = async (id: string) => {
    const _url = URL + '/' + id
    return apiGet<IUsersModel>(_url)
}

export const postLogin = async (body: IUsersModel) => {
    const _url = URL + '/login'
    return apiPost<IUsersModel>(_url, body)
}

export const postRegister = async (body: IUsersModel) => {
    const _url = URL + '/register'
    return apiPost<IUsersModel>(_url, body)
}

export const putUserUpdate = async ({ id, body }: { id: string; body: IUsersModel }) => {
    const _url = URL + '/' + id
    return apiPut<IUsersModel>(_url, body)
}

export const postShopUser = async (body: IUsersModel) => {
    return apiPost<IUsersModel>(URL, body)
}
