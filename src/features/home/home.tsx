import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { getAllDiskGameThunk, getAllNintendoThunk } from '../../reducer/thunk.api'
import { setAllNintendo } from '../../reducer/nintendo.reducer'
import { IDiskGameModel, INintendoModel } from '../../model'
import { setAllDiskGame } from '../../reducer/diskgame.reducer'
import { PathConstant } from '../../constant/path.constant'
import { Link } from 'react-router-dom'

const Home = () => {
    const nintendo = useAppSelector((state: RootState) => state.nintendo.dataNintendo)
    const diskGame = useAppSelector((state: RootState) => state.diskGame.dataDiskGame)
    const loading = useAppSelector((state: RootState) => state.nintendo.loading)
    const error = useAppSelector((state: RootState) => state.nintendo.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const CallApi = async () => {
            const promises = [dispatch(getAllNintendoThunk()), dispatch(getAllDiskGameThunk())]
            try {
                await Promise.all(promises)
                    .then(([data1, data2]) => {
                        dispatch(setAllNintendo(data1.payload as INintendoModel[]))
                        dispatch(setAllDiskGame(data2.payload as IDiskGameModel[]))
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } catch (error) {}
        }
        CallApi()
    }, [dispatch])

    if (loading) {
        return <div>Loaidng...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }
    return (
        <div className="px-4 py-3">
            <div className="h-[20rem] border border-gray-200 shadow-sm bg-white">
                <div className="px-4 py-3 flex flex-col">
                    <h2 className="bg-red-600 p-1 font-bold text-white text-2xl">Máy chơi game Nintendo</h2>
                </div>
                <div className="flex flex-row">
                    <Link to={PathConstant.nintendo.list + '/' + nintendo[0]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={nintendo[0]?.img1} alt="nintendo-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{nintendo[0]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{nintendo[0]?.price} VND</p>
                        </div>
                    </Link>
                    <Link to={PathConstant.nintendo.list + '/' + nintendo[1]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={nintendo[1]?.img1} alt="nintendo-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{nintendo[1]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{nintendo[1]?.price} VND</p>
                        </div>
                    </Link>
                    <Link to={PathConstant.nintendo.list + '/' + nintendo[2]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={nintendo[2]?.img1} alt="nintendo-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{nintendo[2]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{nintendo[2]?.price} VND</p>
                        </div>
                    </Link>
                    <Link to={PathConstant.nintendo.list + '/' + nintendo[3]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={nintendo[3]?.img1} alt="nintendo-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{nintendo[3]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{nintendo[3]?.price} VND</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="h-[20rem] border border-gray-200 shadow-sm bg-white mt-[3rem]">
                <div className="px-4 py-3 flex flex-col">
                    <h2 className="bg-red-600 p-1 font-bold text-white text-2xl">Đĩa Game Nintendo Switch</h2>
                </div>
                <div className="flex flex-row">
                    <Link to={PathConstant.diskGame.list + '/' + diskGame[0]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={diskGame[0]?.img1} alt="diskGame-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{diskGame[0]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{diskGame[0]?.price} VND</p>
                        </div>
                    </Link>
                    <Link to={PathConstant.diskGame.list + '/' + diskGame[1]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={diskGame[1]?.img1} alt="diskGame-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{diskGame[1]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{diskGame[1]?.price} VND</p>
                        </div>
                    </Link>
                    <Link to={PathConstant.diskGame.list + '/' + diskGame[2]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={diskGame[2]?.img1} alt="diskGame-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{diskGame[2]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{diskGame[2]?.price} VND</p>
                        </div>
                    </Link>
                    <Link to={PathConstant.diskGame.list + '/' + diskGame[3]?._id + '/detail'}>
                        <div className="w-[15rem] flex flex-col mr-[5rem]">
                            <img src={diskGame[3]?.img1} alt="diskGame-img1" className="h-[10rem] w-[15rem] py-2" />
                            <p className="px-2 line-clamp-2">{diskGame[3]?.title}</p>
                            <p className="px-2 py-2 font-bold text-red-600">{diskGame[3]?.price} VND</p>
                        </div>
                    </Link>
                </div>
                <div className="h-[15rem] py-3 px-3 bg-black mt-6 flex flex-row">
                    <div className="w-1/2 text-white flex-col">
                        <div className="flex gap-2 items-center mb-[1.5rem]">
                            <img
                                className="w-[1rem] h-[1rem]"
                                alt="icon-user"
                                src="data:image/png;base64,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"
                            />
                            <p>Họ Tên: Châu Trọng Nhân</p>
                        </div>

                        <div className="flex gap-2 items-center py-2 mb-[1.5rem]">
                            <img
                                className="w-[1rem] h-[1rem]"
                                alt="icon-user"
                                src="data:image/png;base64,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"
                            />
                            <p>Ngày Sinh: 09/10/1998</p>
                        </div>
                        <div className="flex gap-2 items-center py-2 mb-[1.5rem]">
                            <img
                                className="w-[1rem] h-[1rem]"
                                alt="icon-user"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjctBZJ_srYzWeiei-oNWrWUQ5RnTbF54bNA&usqp=CAU"
                            />
                            <p>Giới Tính: Nam</p>
                        </div>
                        <div className="flex gap-2 items-center py-2 mb-[1.5rem]">
                            <img
                                className="w-[1rem] h-[1rem]"
                                alt="icon-user"
                                src="https://static.vecteezy.com/system/resources/previews/005/043/127/original/a-phone-icon-in-a-round-circle-free-vector.jpg"
                            />
                            <p>SDT: 0387667397</p>
                        </div>
                    </div>
                    <div className="w-1/2 text-white">
                        <div className="flex gap-2 items-center py-2 mb-[1.5rem]">
                            <img
                                className="w-[1rem] h-[1rem]"
                                alt="icon-user"
                                src="data:image/png;base64,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"
                            />
                            <p>Địa Chỉ: 58/15 đường số 5, Phường Linh Trung, TP Thủ Đức, TP Hồ Chí Minh</p>
                        </div>
                        <div className="flex gap-2 items-center py-2 mb-[1.5rem]">
                            <p>
                                Giới Thiệu : tôi học chuyên ngành điện tử máy tình, Tôi muốn chuyển sang ngành IT, muốn
                                xin vào thực tập lập trình Front-end đây là project của tôi mong được làm việc cùng với
                                mọi người
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
