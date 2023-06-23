import { INintendoModel } from '../model'
import { jsonToQueryParams } from '../utils/apiquery.utils'
import { apiGet } from './api.axios'

const URL = 'nintendo'

export const getAllNintendo = async () => {
    return apiGet<INintendoModel[]>(URL)
}

export const getDetailNintendo = async (id: string) => {
    const _url = URL + '/' + id
    return apiGet<INintendoModel>(_url)
}

export const getSearchNintendo = async (queryParam?: Object) => {
    let _url
    if (queryParam) {
        _url = URL + '/search?' + jsonToQueryParams(queryParam)
    } else {
        _url = URL + '/search?q='
    }
    return apiGet<INintendoModel[]>(_url)
}
