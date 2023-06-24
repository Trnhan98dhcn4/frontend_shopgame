import { ICartShop } from '../model'
import { apiGet, apiPost } from './api.axios'

const URL = 'cart'

export const getAllCartShop = async () => {
    return apiGet<ICartShop[]>(URL)
}

export const postCartShop = async (body: ICartShop) => {
    return apiPost<ICartShop>(URL, body)
}
