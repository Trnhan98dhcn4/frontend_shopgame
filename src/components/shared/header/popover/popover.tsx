import { Popover, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo } from 'react'

import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { getAllCartShopThink } from '../../../../reducer/thunk.api'

const PopoverComponent = ({ children }: any) => {
    const cartShop = useAppSelector((state: RootState) => state.cartShop.dataCardShop)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getAllCartShopThink())
        }
        CallApi()
    }, [dispatch])
    const resultCartShop = useMemo(() => {
        const result = cartShop.map((item) => {
            const price = parseInt(item.price?.replace(/,/g, ''))
            const SL = +item.SL
            return price * SL
        })
        const total = result.reduce((start, value) => start + value, 0)
        return total
    }, [cartShop])
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={classNames(
                            open && 'bg-gray-100',
                            'p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-orange-100 focus:outline-none active:bg-gray-100'
                        )}
                    >
                        {children}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-[20rem]">
                            <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                <div className="border-b border-gray-500">
                                    <strong className="text-gray-700 font-medium ">Card Shop</strong>
                                </div>
                                <div className="mt-2 py-1 text-sm h-[15rem] overflow-auto">
                                    {cartShop.length === 0 ? (
                                        <div className="flex flex-row p-3">
                                            <h1>Bạn Chưa Mua Gì Hết</h1>
                                        </div>
                                    ) : (
                                        cartShop.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-row p-3 border-b border-gray-300 cursor-pointer"
                                            >
                                                <div className="flex mr-2">
                                                    <img src={item.img1} alt="img1" className="w-[5rem] h-[5rem]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="line-clamp-1">{item.title}</p>
                                                    <p className="text-red-600 py-2">{item.price} VND</p>
                                                    <div className="flex flex-row gap-2">
                                                        <p>Số Lượng: </p>
                                                        <p className="font-bold">{item.SL}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {cartShop.length === 0 ? (
                                    ''
                                ) : (
                                    <div className="flex flex-row border-t border-gray-300 h-[2rem] items-center">
                                        <h1 className="p-2 font-bold">Tổng Sản Phẩm:</h1>
                                        <h1 className="p-2 font-bold text-red-600">
                                            {resultCartShop.toLocaleString()} VND
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default PopoverComponent
