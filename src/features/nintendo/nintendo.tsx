import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { getAllNintendoThunk } from '../../reducer/thunk.api'
import { ListNintendoComponent } from './list'

const Nintendo = () => {
    const nintendoAll = useAppSelector((state: RootState) => state.nintendo.dataNintendo)
    const loading = useAppSelector((state: RootState) => state.nintendo.loading)
    const error = useAppSelector((state: RootState) => state.nintendo.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getAllNintendoThunk())
        }
        CallApi()
    }, [dispatch])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }

    return (
        <div className="px-4 py-3">
            <ListNintendoComponent dataList={nintendoAll} />
        </div>
    )
}

export default Nintendo
