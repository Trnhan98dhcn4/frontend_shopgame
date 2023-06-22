import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { ISideBarModel } from '../../../model'
import { DASHBOARD_SIDEBAR_BOTTOM_LINK, SHOP_SIDEBAR_LINK } from '../../../constant/sidebar.constant'

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm test-base'

const SideBarComponent = () => {
    return (
        <div className="bg-neutral-900 p-3 w-60  flex flex-col text-white">
            <div className=" flex items-center gap-2 px-1 py-3 cursor-pointer">
                <img
                    src="https://file.hstatic.net/1000231532/file/logo_nshop_game_hobby_up_web-min_fb5a0e06cf474df693526f68831e2eca.png"
                    alt="nshop"
                    width={120}
                    height={100}
                />
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {SHOP_SIDEBAR_LINK.map((item: ISideBarModel) => (
                    <SideBarLink key={item.key} items={item} />
                ))}
            </div>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINK.map((item: ISideBarModel) => (
                    <SideBarLink key={item.key} items={item} />
                ))}
                <div className={classNames('text-red-500 cursor-pointer', linkClasses)}>
                    <span className="text-xl ">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/483/483343.png"
                            alt="icon"
                            width={24}
                            height={24}
                        />
                    </span>
                    <div>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default SideBarComponent

function SideBarLink(item: { items: ISideBarModel }) {
    const { pathname } = useLocation()
    return (
        <Link
            to={item.items.path}
            className={classNames(pathname === item.items.path ? 'text-neutral-100' : 'text-neutral-400', linkClasses)}
        >
            <img src={item.items.icon} alt="icon" width={24} height={24} />
            <div>{item.items.label}</div>
        </Link>
    )
}
