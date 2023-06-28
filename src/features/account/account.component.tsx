import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { useForm } from 'react-hook-form'
import { IUsersModel } from '../../model'
import { getDetailUserThunk, putUserUpdateThunk } from '../../reducer/thunk.api'
import { useNavigate } from 'react-router-dom'
import { PathConstant } from '../../constant/path.constant'

const AccountComponent = () => {
    const userDetail = useAppSelector((state: RootState) => state.user.detailUser)
    const loading = useAppSelector((state: RootState) => state.user.loading)
    const error = useAppSelector((state: RootState) => state.user.error)
    const [isUpdate, setIsUpdate] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm<IUsersModel>({
        defaultValues: {
            user: '',
            address: '',
            avatar: '',
            name: '',
            password: '',
            pricePrev: '',
            historyUser: [{ img1: '', price: '', SL: '', title: '' }]
        }
    })
    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getDetailUserThunk(userDetail._id))
        }
        CallApi()
        setValue('user', userDetail.user)
        setValue('address', userDetail.address)
        setValue('avatar', userDetail.avatar)
        setValue('name', userDetail.name)
        setValue('password', userDetail.password)
        setValue('pricePrev', userDetail.pricePrev)
        setValue('historyUser', userDetail.historyUser)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    const handleUpdateAccount = async (event: IUsersModel) => {
        await dispatch(putUserUpdateThunk({ id: userDetail._id, body: event }))
        await dispatch(getDetailUserThunk(userDetail._id))
        setIsUpdate(false)
        navigate(PathConstant.user.account)
    }
    if (loading) {
        return <div>Loading</div>
    }
    if (error) {
        return <div> error: {error}</div>
    }

    return (
        <div className="flex flex-row h-[40rem]">
            <div className="w-1/2 border border-gray-400 p-3 m-3 rounded-sm">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Tên Account:</th>
                            {isUpdate ? (
                                <td>
                                    <input
                                        {...register('name')}
                                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-full
                                        focus:outline-none"
                                        placeholder="Nhập Tên Mới Cho Account"
                                        form="keyFormId"
                                    />
                                </td>
                            ) : (
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    {userDetail.name}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Địa chỉ:</th>
                            {isUpdate ? (
                                <td>
                                    <input
                                        {...register('address')}
                                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-full
                                        focus:outline-none"
                                        placeholder="Nhập Địa chỉ..."
                                        form="keyFormId"
                                    />
                                </td>
                            ) : (
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    {userDetail.address ? userDetail.address : 'Chưa cập nhập địa chỉ'}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Tiền :</th>
                            {isUpdate ? (
                                <td>
                                    <input
                                        type="number"
                                        {...register('pricePrev')}
                                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-full
                                        focus:outline-none"
                                        placeholder="Nhập Tiền vào"
                                        form="keyFormId"
                                    />
                                </td>
                            ) : (
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    {userDetail.pricePrev
                                        ? Number(userDetail.pricePrev).toLocaleString() + ' VND'
                                        : '0 VND'}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Thây đổi mật khẩu:</th>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">**********</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {!isUpdate ? (
                        <button
                            className="bg-green-400 px-3 py-2 rounded-md font-semibold
                    hover:bg-green-500 active:bg-green-600"
                            onClick={() => setIsUpdate(true)}
                        >
                            Cập Nhập Lại
                        </button>
                    ) : (
                        <div className="gap-2 flex flex-row">
                            <form onSubmit={handleSubmit(handleUpdateAccount)} id="keyFormId">
                                <button
                                    className="bg-green-400 px-3 py-2 rounded-md font-semibold
                                hover:bg-green-500 active:bg-green-600"
                                    type="submit"
                                >
                                    Xác Nhận
                                </button>
                            </form>
                            <button
                                className="bg-red-400 px-3 py-2 rounded-md font-semibold
                    hover:bg-red-500 active:bg-red-600"
                                onClick={() => setIsUpdate(false)}
                            >
                                Thoát
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/2 border border-gray-400 p-3 m-3 rounded-sm">
                <div className="min-w-full bg-white border border-gray-200 flex flex-col">
                    <p className="border-b border-gray-300 py-2 px-6">Lịch sử mua hành:</p>
                    {userDetail.historyUser.length === 0 ? (
                        <div className="py-2 px-6 flex w-full justify-center">
                            <p>Bạn Chưa Mua gì hết</p>
                        </div>
                    ) : (
                        <div className="felx flex-col overflow-auto h-[34rem]">
                            {userDetail.historyUser.map((item, index) => (
                                <div className="px-6 py-2 gap-2 flex flex-row" key={index}>
                                    <div className="flex">
                                        <img src={item.img1} alt={item.title} className="h-[5rem] w-[7rem]" />
                                    </div>
                                    <div className="flex-1 py-2">
                                        <p className="font-medium line-clamp-2 text-sm py-1">{item.title}</p>
                                        <div className="flex flex-row gap-2 items-center justify-between">
                                            <div className="flex flex-row gap-2">
                                                <p>Giá: </p>
                                                <p className="font-bold text-red-500">{item.price} VND</p>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <p>Số lượng: </p>
                                                <p className="font-bold">{item.SL}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AccountComponent
