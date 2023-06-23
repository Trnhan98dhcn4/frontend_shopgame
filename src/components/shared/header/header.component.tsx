import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { IDiskGameModel, INintendoModel } from '../../../model'
import { getSearchDiskGameThunk, getSearchNintendoThunk } from '../../../reducer/thunk.api'
import { PopoverComponent } from './popover'
import { setSearchNintendo } from '../../../reducer/nintendo.reducer'
import { setSearchDiskGame } from '../../../reducer/diskgame.reducer'

const HeaderComponent = () => {
    const searchDiskGame = useAppSelector((state: RootState) => state.diskGame.searchDiskGame)
    const searchNintendo = useAppSelector((state: RootState) => state.nintendo.searchNintendo)

    const dispatch = useAppDispatch()

    const [showResult, setShowResult] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const { register, setValue, handleSubmit } = useForm<IDiskGameModel & INintendoModel>({
        defaultValues: {
            q: ''
        }
    })

    const links = [
        { href: '/account-settings', label: 'Account settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' },
        { href: '/sign-out', label: 'Sign out' }
    ]
    useEffect(() => {
        const CallApi = async () => {
            const promises = [dispatch(getSearchDiskGameThunk()), dispatch(getSearchNintendoThunk())]
            await Promise.all(promises)
                .then(([data1, data2]) => {
                    dispatch(setSearchDiskGame(data1.payload as IDiskGameModel[]))
                    dispatch(setSearchNintendo(data2.payload as INintendoModel[]))
                })
                .catch((error) => console.error(error))
        }
        CallApi()
    }, [dispatch])
    const onSubmitSearchInput = async (event: IDiskGameModel & INintendoModel) => {
        dispatch(getSearchNintendoThunk(event))
        dispatch(getSearchDiskGameThunk(event))
    }

    const showResultSearch = (searchNintendo.length > 0 || searchDiskGame.length > 0) && inputValue.trim() !== ''
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        setValue('q', value)
        handleSubmit(onSubmitSearchInput)(e)
    }
    console.log(searchDiskGame)
    console.log(searchNintendo)
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
                                        <div key={index} className="flex flex-row ">
                                            <div className="flex">
                                                <img src={item.img1} alt={item.title} className="w-[5rem] h-[5rem]" />
                                            </div>
                                            <div className="flex-1">
                                                <p>{item.title}</p>
                                                <p>{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="border-b border-gray-500">
                                <strong className="text-gray-700 font-medium ">Đĩa Game</strong>
                            </div>
                            <div className="mt-2 py-1 text-sm">
                                {inputValue &&
                                    searchDiskGame.map((item, index) => (
                                        <div key={index} className="flex flex-row ">
                                            <div className="flex">
                                                <img src={item.img1} alt={item.title} className="w-[5rem] h-[5rem]" />
                                            </div>
                                            <div className="flex-1">
                                                <p>{item.title}</p>
                                                <p>{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>

            <div className="flex items-center gap-2 mr-2">
                <PopoverComponent>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                        alt="icon-shop"
                        width={24}
                        height={24}
                    />
                </PopoverComponent>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button>
                            <img
                                src="https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-6/338738635_1464840364286563_6118385458477066950_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZkdBfKnz4AYAX-zyRPd&_nc_ht=scontent.fsgn5-1.fna&oh=00_AfBtffYSQG-c66TMs6Ah_lCTAzvq1ZII9oPUq9jxPRQLZg&oe=649882D6"
                                alt="Avatar"
                                className="h-10 w-10 rounded-full"
                            />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 bg-white px-2 border border-gray-400 rounded-sm">
                            {links.map((link) => (
                                /* Use the `active` state to conditionally style the active item. */
                                <Menu.Item key={link.href} as={Fragment}>
                                    {({ active }) => (
                                        <a
                                            href={link.href}
                                            className={classNames(
                                                active && 'bg-gray-100',
                                                'p-1.5 rounded-sm flex items-center text-gray-700 hover:text-orange-100 focus:outline-none active:bg-gray-100'
                                            )}
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </div>
                </Menu>
            </div>
        </div>
    )
}

export default HeaderComponent
