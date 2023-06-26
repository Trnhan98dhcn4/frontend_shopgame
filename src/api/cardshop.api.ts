import { ICartShop } from '../model'
import { apiDelete, apiGet, apiPost, apiPut } from './api.axios'

const URL = 'cart'

export const getAllCartShop = async () => {
    return apiGet<ICartShop[]>(URL)
}

export const postCartShop = async (body: ICartShop) => {
    return apiPost<ICartShop>(URL, body)
}

export const putCartShop = async ({ id, body }: { id: String; body: ICartShop }) => {
    const _url = URL + '/' + id
    return apiPut<ICartShop>(_url, body)
}

export const deleteCartShop = async (id: string) => {
    const _url = URL + '/' + id
    return apiDelete<ICartShop>(_url)
}
