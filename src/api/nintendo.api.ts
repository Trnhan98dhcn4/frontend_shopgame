import { INintendoModel } from '../model'
import { apiGet } from './api.axios'

const URL = 'nintendo'

export const getAllNintendo = async () => {
    return apiGet<INintendoModel[]>(URL)
}

export const getDetailNintendo = async (id: string) => {
    const _url = URL + '/' + id
    return apiGet<INintendoModel>(_url)
}
