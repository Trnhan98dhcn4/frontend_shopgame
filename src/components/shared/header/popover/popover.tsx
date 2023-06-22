import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import classNames from 'classnames'

const PopoverComponent = ({ children }: any) => {
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
                        <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                            <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                <div className="border-b border-gray-500">
                                    <strong className="text-gray-700 font-medium ">Shop</strong>
                                </div>
                                <div className="mt-2 py-1 text-sm">This is the Shop</div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default PopoverComponent
