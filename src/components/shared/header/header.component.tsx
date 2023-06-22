import { Fragment } from 'react'
import { PopoverComponent } from './popover'
import { Menu } from '@headlessui/react'
import classNames from 'classnames'

const HeaderComponent = () => {
    const links = [
        { href: '/account-settings', label: 'Account settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' },
        { href: '/sign-out', label: 'Sign out' }
    ]
    return (
        <div className="bg-white h-16 px-4  flex justify-between items-center border-b border-gray-300">
            <div className="relative">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
                    alt="icon-search"
                    width={20}
                    height={20}
                    className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
                />
                <input
                    type="text"
                    placeholder="Search ..."
                    className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 px-4"
                />
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
