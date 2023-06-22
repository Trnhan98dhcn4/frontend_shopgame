import InitAxios from '../utils/http'

const http = InitAxios()

export const apiGet = async <T>(url: string) => {
    try {
        const response = await http.get<T>(url)
        if (!response) {
            throw new Error('Request not Page Error!!!')
        }
        const data: T = response.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const apiPost = async <T>(url: string, body: Object) => {
    try {
        const response = await http.post<T>(url, body)
        if (!response) {
            throw new Error('Request not Page Error!!!')
        }
        const data: T = response.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const apiPut = async <T>(url: string, body: any) => {
    try {
        const response = await http.put<T>(url, body)
        if (!response) {
            throw new Error('Request not Page Error!!!')
        }
        const data: T = response.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const apiDelete = async <T>(url: string) => {
    try {
        const response = await http.delete<T>(url)
        if (response.status !== 200) {
            throw new Error('Request failed')
        }
        const deleteData: T = response.data
        return deleteData
    } catch (error: any) {
        throw new Error(error)
    }
}
