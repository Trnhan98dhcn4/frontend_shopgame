import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { getAllDiskGameThunk } from '../../reducer/thunk.api'
import { ListDiskGame } from './list'
import { useEffect } from 'react'

const DiskGame = () => {
    const GetAllDiskGame = useAppSelector((state: RootState) => state.diskGame.dataDiskGame)
    const loading = useAppSelector((state: RootState) => state.diskGame.loading)
    const error = useAppSelector((state: RootState) => state.diskGame.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getAllDiskGameThunk())
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
            <ListDiskGame dataList={GetAllDiskGame} />
        </div>
    )
}

export default DiskGame
