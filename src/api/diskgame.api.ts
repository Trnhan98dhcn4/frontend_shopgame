import { IDiskGameModel } from '../model'
import { apiGet } from './api.axios'

const URL = 'disk'

export const getAllDiskGame = async () => {
    return apiGet<IDiskGameModel[]>(URL)
}

export const getDetailDiskGame = async (id: string) => {
    const _url = URL + '/' + id
    return apiGet<IDiskGameModel>(_url)
}
