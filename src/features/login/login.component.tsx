import bcrypt from 'bcryptjs'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { PathConstant } from '../../constant/path.constant'
import { IUsersModel } from '../../model'
import { postUserLoginThunk } from '../../reducer/thunk.api'
import { setLogin } from '../../reducer/user.reducer'
import { useState } from 'react'

interface IUser {
    payload: {
        user: string
        password: string
    }
}

const LoginComponent = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [showUserError, setShowUserError] = useState(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<IUsersModel>({
        defaultValues: {
            address: '',
            name: '',
            password: '',
            pricePrev: '',
            user: '',
            avatar: '',
            historyUser: [{ img1: '', price: '', SL: '', title: '' }]
        }
    })
    const handleLoginSubmit = async (event: IUsersModel) => {
        const user = (await dispatch(postUserLoginThunk(event))) as IUser

        if (user.payload?.user) {
            const isValid = await bcrypt.compare(event.password, user.payload.password)

            if (isValid) {
                dispatch(setLogin())
                navigate(PathConstant.home)
            } else {
                setError('password', {
                    type: 'manual',
                    message: 'Nhập sai Mật Khẩu'
                })
                setShowUserError(true)
            }
        } else {
            setError('user', {
                type: 'manual',
                message: 'Nhập sai Tài Khoản'
            })
            setShowUserError(true)
        }
    }
    return (
        <div className="flex h-screen w-[80rem] justify-center items-center ">
            <div className="flex h-[25rem] w-[30rem] border border-gray-400 flex-col rounded-xl shadow-lg">
                <div className="flex justify-center h-2 w-full">
                    <h1 className=" py-2 font-medium text-2xl relative text-gray-500">
                        Đăng Nhập
                        <div className="absolute bg-gray-500 h-[2px] w-[5rem] bottom-0 left-1/2 transform -translate-x-1/2 top-[3rem]"></div>
                    </h1>
                </div>
                <div className="px-3 py-4 flex mt-[3rem] w-[30rem]">
                    <form onSubmit={handleSubmit(handleLoginSubmit)}>
                        <div className="flex py-4 flex-col ">
                            <input
                                type="text"
                                {...register('user', {
                                    required: {
                                        value: true,
                                        message: 'Bạn chưa nhập Tài Khoản'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Tên người dùng phải chứa ít nhất 6 chữ cái'
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: 'Tên người dùng phải ít hơn 12 chữ cái'
                                    }
                                })}
                                className={`bg-gray-300 h-[3rem] w-[28.5rem]
                                px-4 rounded-sm text-black active:bg-white focus:bg-white text-lg focus:outline-none focus:ring-2 ${
                                    errors.user ? 'ring-red-500' : 'ring-green-500'
                                }`}
                                placeholder="Nhập tài khoản"
                                autoComplete="off"
                            />
                            <p className="text-red-500 mt-2 text-sm">{errors.user?.message}</p>
                        </div>
                        <div className="flex py-4 flex-col">
                            <input
                                type="password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Bạn chưa nhập mật khẩu'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu phải ít nhất 6 chữ cái'
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: 'Mật khẩu phải ít hơn 12 chữ cái'
                                    }
                                })}
                                className={`bg-gray-300 h-[3rem] w-[28.5rem]
                                px-4 rounded-sm text-black active:bg-white focus:bg-white text-lg focus:outline-none focus:ring-2 ${
                                    errors.password ? 'ring-red-500' : 'ring-green-500'
                                }`}
                                placeholder="Nhập mật khẩu "
                                autoComplete="off"
                            />
                            <p className="text-red-500 mt-2 text-sm">{errors.password?.message}</p>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <button
                                className="bg-red-500 px-3 py-3 rounded-md text-white shadow-md shadow-red-400"
                                type="submit"
                            >
                                Đăng Nhập
                            </button>
                            <Link to={PathConstant.user.register}>
                                <p className="mt-2">Đăng ký tài Khoản</p>
                            </Link>
                        </div>
                    </form>
                </div>
                {showUserError && (
                    <p className="px-3 text-red-600">Tài Khoản hoặc Mật khẩu của bản không đúng, bạn hay xem lại</p>
                )}
            </div>
        </div>
    )
}

export default LoginComponent
