import ListNintendoArrayUtils from '../../../utils/ListNintendo.utils'
import ArrayObjectArray from '../../../utils/arrayobjectarray'
import { useCallback } from 'react'

interface ListNintendo {
    dataList: {}[]
}

const ListNintendoComponent = (props: ListNintendo) => {
    const { dataList } = props

    const result = ArrayObjectArray(dataList)
    const rows = useCallback(() => {
        return ListNintendoArrayUtils(result)
    }, [result])

    return (
        <div className="h-10 bg-red-600 flex flex-col">
            <h2 className="text-2xl text-white px-3 ">Sản phẩm của Shop đề xuất</h2>
            <div className="p-4">{rows()}</div>
        </div>
    )
}

export default ListNintendoComponent
