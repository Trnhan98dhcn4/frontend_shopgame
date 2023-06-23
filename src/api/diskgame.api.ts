import { IDiskGameModel } from '../model'
import { jsonToQueryParams } from '../utils/apiquery.utils'
import { apiGet } from './api.axios'

const URL = 'disk'

export const getAllDiskGame = async () => {
    return apiGet<IDiskGameModel[]>(URL)
}

export const getDetailDiskGame = async (id: string) => {
    const _url = URL + '/' + id
    return apiGet<IDiskGameModel>(_url)
}

export const getSearchDiskGame = async (queryParam?: Object) => {
    let _url
    if (queryParam) {
        _url = URL + '/search?' + jsonToQueryParams(queryParam)
    } else {
        _url = URL + '/search?q='
    }
    return apiGet<IDiskGameModel[]>(_url)
}
