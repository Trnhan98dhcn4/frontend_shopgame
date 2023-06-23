import ListDiskGameUtils from '../../../utils/ListDiskGame.utils'
import ArrayObjectArray from '../../../utils/arrayobjectarray'
import { useCallback } from 'react'

interface ListDiskGame {
    dataList: {}[]
}

const ListDiskGame = (props: ListDiskGame) => {
    const { dataList } = props

    const result = ArrayObjectArray(dataList)
    const rows = useCallback(() => {
        return ListDiskGameUtils(result)
    }, [result])
    return (
        <div className="h-10 bg-red-600 flex flex-col">
            <h2 className="text-2xl text-white px-3 ">Sản phẩm của Shop đề xuất</h2>
            <div className="p-4 w-[85rem]">{rows()}</div>
        </div>
    )
}

export default ListDiskGame
