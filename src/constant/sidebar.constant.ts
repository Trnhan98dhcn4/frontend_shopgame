import { PathConstant } from './path.constant'

export const SHOP_SIDEBAR_LINK = [
    {
        key: 'nintendo',
        label: 'Máy Nintendo Switch',
        path: PathConstant.nintendo.list,
        icon: 'https://theme.hstatic.net/1000231532/1000832749/14/vertical_icon_1.png?v=435'
    },
    {
        key: 'disk',
        label: 'Đĩa game Switch',
        path: '/disk',
        icon: 'https://theme.hstatic.net/1000231532/1000832749/14/vertical_icon_2.png?v=435'
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINK = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/setting',
        icon: 'https://cdn-icons-png.flaticon.com/512/126/126472.png'
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: 'https://img.uxwing.com/wp-content/themes/uxwing/download/business-professional-services/male-services-support-icon.png'
    }
]
