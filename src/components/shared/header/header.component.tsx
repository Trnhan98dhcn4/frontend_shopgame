import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { PathConstant } from '../../../constant/path.constant'
import { IDiskGameModel, INintendoModel, IUsersModel } from '../../../model'
import { setCount } from '../../../reducer/cartshop.reducer'
import { setSearchDiskGame } from '../../../reducer/diskgame.reducer'
import { setSearchNintendo } from '../../../reducer/nintendo.reducer'
import { getDetailUserThunk, getSearchDiskGameThunk, getSearchNintendoThunk } from '../../../reducer/thunk.api'
import { PopoverComponent } from './popover'
import { setLogout, setUserDetail } from '../../../reducer/user.reducer'

const HeaderComponent = () => {
    const searchDiskGame = useAppSelector((state: RootState) => state.diskGame.searchDiskGame)
    const searchNintendo = useAppSelector((state: RootState) => state.nintendo.searchNintendo)
    const cartShop = useAppSelector((state: RootState) => state.cartShop.dataCardShop)
    const isAuth = useAppSelector((state: RootState) => state.user.isAuth)
    const userDetail = useAppSelector((state: RootState) => state.user.detailUser)

    const dispatch = useAppDispatch()

    const [showResult, setShowResult] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const { register, setValue, handleSubmit } = useForm<IDiskGameModel & INintendoModel>({
        defaultValues: {
            q: ''
        }
    })

    const links = [
        { href: PathConstant.user.account, label: 'Account settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' },
        { href: PathConstant.home, label: 'Sign out' }
    ]
    useEffect(() => {
        const CallApi = async () => {
            const promises = [
                dispatch(getSearchDiskGameThunk()),
                dispatch(getSearchNintendoThunk()),
                dispatch(getDetailUserThunk(userDetail?._id))
            ]
            await Promise.all(promises)
                .then(([data1, data2, data3]) => {
                    dispatch(setSearchDiskGame(data1.payload as IDiskGameModel[]))
                    dispatch(setSearchNintendo(data2.payload as INintendoModel[]))
                    dispatch(setUserDetail(data3.payload as IUsersModel))
                })
                .catch((error) => console.error(error))
        }
        CallApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    const onSubmitSearchInput = async (event: IDiskGameModel & INintendoModel) => {
        dispatch(getSearchNintendoThunk(event))
        dispatch(getSearchDiskGameThunk(event))
        dispatch(setCount(1))
    }

    const showResultSearch = (searchNintendo.length > 0 || searchDiskGame.length > 0) && inputValue.trim() !== ''
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        setValue('q', value)
        handleSubmit(onSubmitSearchInput)(e)
    }

    const handleSignOut = () => {
        dispatch(setLogout())
    }

    return (
        <div className="bg-white h-16 px-4  flex justify-between items-center border-b border-gray-300">
            <div className="relative">
                <form>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
                        alt="icon-search"
                        width={20}
                        height={20}
                        className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
                    />
                    <input
                        type="search"
                        placeholder="Search ..."
                        {...register('q')}
                        autoComplete="off"
                        onChange={handleInputChange}
                        onFocus={() => setShowResult(true)}
                        className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 px-4"
                    />
                </form>
                <Transition
                    show={showResult && showResultSearch}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute right-0 z-10 mt-2.5 w-[24rem]">
                        <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5 h-[20rem] overflow-auto">
                            <div className="border-b border-gray-500">
                                <strong className="text-gray-700 font-medium ">Máy Game</strong>
                            </div>
                            <div className="mt-2 py-1 text-sm">
                                {inputValue &&
                                    searchNintendo.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={PathConstant.nintendo.list + '/' + item._id + '/detail'}
                                            onClick={() => {
                                                setShowResult(false)
                                                setValue('q', '')
                                            }}
                                        >
                                            <div className="flex flex-row p-3 border-b border-gray-300 cursor-pointer">
                                                <div className="flex">
                                                    <img
                                                        src={item.img1}
                                                        alt={item.title}
                                                        className="w-[5rem] h-[5rem]"
                                                    />
                                                </div>
                                                <div className="flex-1 px-2">
                                                    <p>{item.title}</p>
                                                    <p className="text-red-600 py-2">{item.price} VND</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                            <div className="border-b border-gray-500">
                                <strong className="text-gray-700 font-medium ">Đĩa Game</strong>
                            </div>
                            <div className="mt-2 py-1 text-sm">
                                {inputValue &&
                                    searchDiskGame.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={PathConstant.diskGame.list + '/' + item._id + '/detail'}
                                            onClick={() => {
                                                setShowResult(false)
                                                setValue('q', '')
                                            }}
                                        >
                                            <div className="flex flex-row p-3 border-b border-gray-300 cursor-pointer">
                                                <div className="flex">
                                                    <img
                                                        src={item.img1}
                                                        alt={item.title}
                                                        className="w-[5rem] h-[5rem]"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p>{item.title}</p>
                                                    <p className="text-red-600 py-2">{item.price} VND</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>

            <div className="flex items-center gap-2 mr-2 relative">
                {isAuth ? (
                    <div className="flex flex-row justify-center items-center gap-2">
                        <img
                            src="https://cdn.onlinewebfonts.com/svg/img_241150.png"
                            alt="price-icon"
                            className="h-[1.5rem] w-[1.5rem]"
                        />
                        <p className="font-bold text-yellow-400">{Number(userDetail.pricePrev).toLocaleString()} VND</p>
                    </div>
                ) : (
                    <p>0 VND</p>
                )}
                <PopoverComponent>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                        alt="icon-shop"
                        width={24}
                        height={24}
                    />
                    {cartShop.length === 0 ? (
                        ''
                    ) : (
                        <div className="absolute -top-1/2 right-0 h-[1.5rem] w-[1rem] bg-red-600 rounded-md text-white">
                            {cartShop.length}
                        </div>
                    )}
                </PopoverComponent>
                {isAuth ? (
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button>
                                <img src={userDetail?.avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 bg-white px-2 border border-gray-400 rounded-sm">
                                {links.map((link) => (
                                    /* Use the `active` state to conditionally style the active item. */
                                    <Menu.Item key={link.href} as={Fragment}>
                                        {({ active }) => (
                                            <Link
                                                to={link.href}
                                                className={classNames(
                                                    active && 'bg-gray-100',
                                                    'p-1.5 rounded-sm flex items-center text-gray-700 hover:text-orange-100 focus:outline-none active:bg-gray-100'
                                                )}
                                                onClick={link.label === 'Sign out' ? handleSignOut : undefined}
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </div>
                    </Menu>
                ) : (
                    <Link
                        to={PathConstant.user.login}
                        className="px-2 py-2 bg-green-400 rounded-md shadow-sm shadow-green-200 hover:bg-green-500 active:bg-green-700
                    font-mono font-bold"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default HeaderComponent
