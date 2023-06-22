import { Outlet } from 'react-router-dom'
import { SideBarComponent } from './sidebar'
import { HeaderComponent } from './header'

const LayoutComponent = () => {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen">
            <SideBarComponent />
            <div className="flex-1">
                <HeaderComponent />
                <div>{<Outlet />}</div>
            </div>
        </div>
    )
}

export default LayoutComponent
