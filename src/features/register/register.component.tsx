import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { PathConstant } from '../../constant/path.constant'
import { IUserModel } from '../../model'
import { postUserRegisterThunk } from '../../reducer/thunk.api'

const RegisterComponent = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUserModel>({
        defaultValues: {
            user: '',
            password: '',
            name: '',
            address: '',
            avatar: '',
            price: ''
        }
    })

    const handleRegisterSubmit = async (event: IUserModel) => {
        await dispatch(postUserRegisterThunk(event))
        navigate(PathConstant.user.login)
    }
    return (
        <div className="flex h-screen w-[80rem] justify-center items-center ">
            <div className="flex h-[25rem] w-[30rem] border border-gray-400 flex-col rounded-xl shadow-lg">
                <div className="flex justify-center h-2 w-full">
                    <h1 className=" py-2 font-medium text-2xl relative text-gray-500">
                        Đăng Ký
                        <div className="absolute bg-gray-500 h-[2px] w-[5rem] bottom-0 left-1/2 transform -translate-x-1/2 top-[3rem]"></div>
                    </h1>
                </div>
                <div className="px-3 py-4 flex mt-[3rem] w-[30rem]">
                    <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                        <div className="flex py-1 flex-col">
                            <input
                                type="text"
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập tên của mình'
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
                                    errors.name ? 'ring-red-500' : 'ring-green-500'
                                }`}
                                placeholder="Nhập tên của bạn"
                                autoComplete="off"
                            />
                            <p className="text-red-500 mt-2 text-sm">{errors.name?.message}</p>
                        </div>
                        <div className="flex py-4 flex-col">
                            <input
                                type="text"
                                {...register('user', {
                                    required: {
                                        value: true,
                                        message: 'Nhap Tai Khoản vào đây'
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
                                        message: 'Vui Lòng Nhập Mật khẩu vào đây'
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
                                className="bg-red-500 px-3 py-3 rounded-md text-white shadow-md shadow-red-400 "
                                type="submit"
                            >
                                Đăng Ký
                            </button>
                            <Link to={PathConstant.user.login}>
                                <p className="mt-2">Quay Lại</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent
