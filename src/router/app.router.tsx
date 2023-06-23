import { Routes, Route } from 'react-router-dom'
import * as Pages from '../features'
import * as Component from '../components'
import { PathConstant } from '../constant/path.constant'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Component.LayoutComponent />}>
                <Route index element={<Pages.Home />} />
                <Route path={PathConstant.nintendo.list} element={<Pages.Nintendo />} />
                <Route path={PathConstant.nintendo.detail} element={<Pages.DetailsNintendoComponent />} />
                <Route path={PathConstant.diskGame.list} element={<Pages.DiskGame />} />
                <Route path={PathConstant.diskGame.detail} element={<Pages.DetailDiskGame />} />
            </Route>
            <Route path="*" element={<h1>Page Error 404</h1>} />
        </Routes>
    )
}

export default AppRouter
