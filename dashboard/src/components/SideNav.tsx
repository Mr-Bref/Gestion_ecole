import { UserGroupIcon } from "@heroicons/react/24/outline"
import { CheckCircle2, GraduationCap, LayoutDashboard, LogOutIcon, School, Settings, Shield } from "lucide-react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"

const adminNavitems = [
    {
        link: '/dashboard',
        icon: <LayoutDashboard />,
        name: 'Tableau de bord'
    },
    {
        link: '/dashboard/niveau',
        icon: <School />,
        name: 'Classes',

    },
    {
        link: '/dashboard/admin',
        icon: <Shield />,
        name: 'Administrateurs'
    },
    {
        link: '/dashboard/tuteur',
        icon: <UserGroupIcon />,
        name: 'Tuteurs',
        style: 'size-8'
    },
    {
        link: '/dashboard/eleve',
        icon: <GraduationCap />,
        name: 'Eleves'
    },

    {
        link: '/dashboard/presence',
        icon: <CheckCircle2 />,
        name: 'Presence'
    },

]
const tutorNavItems = [

]

export function AdminSideNavItem() {
    return (<div>
        <ul>
            <li>Tableau de Bord</li>
            <li>Classe</li>
            <li>Administrateurs</li>
            <li>Tuteur</li>
            <li>Eleve</li>
        </ul>
    </div>)

}
export function TuteurSideNavItem() {

}

export function eleveSideNavItem() {

}

export default function SideNav() {
    const activeLocation = useLocation()
    const navItems = adminNavitems
    console.log(activeLocation.pathname)
    let isActive = false

    return (
        <div className="flex">
            <div className="h-screen flex flex-col justify-between text-lg font-normal pl-4 pb-4 w-[280px] max-w-[300px] bg-green-800 text-white">
                <div>
                    <Link to='/' className="pt-4 pb-14 flex gap-2 items-center"><School /><span>My School</span></Link>
                    <ul className="flex flex-col gap-2 pr-4 text-white">
                        {navItems.map((item, index) => {
                            const isActive = 
                            activeLocation.pathname === item.link || 
                            (activeLocation.pathname.startsWith(item.link) && item.link !== '/dashboard');
                            
                            console.log("isActive", isActive, activeLocation.pathname)
                            return (
                                <NavLink to={item.link} key={index} className={isActive ? "flex items-center gap-x-2 px-2 py-1 hover:bg-yellow-400 bg-yellow-400 hover:text-black rounded-sm text-black" :
                                    "flex items-center gap-x-2 px-2 py-1 hover:bg-yellow-400 hover:text-black rounded-sm"}>
                                    <span className={item?.style}>{item.icon}</span> <span>{item.name}</span>
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex gap-3 flex-col">
                    <div className="flex gap-2 items-center"><LogOutIcon /><span>Se deconnecter</span></div>
                    <div className="flex gap-2 items-center"><Settings /> <span>Parametre</span></div>
                </div>
            </div>
            <div className="p-6 bg-secondary w-full sm:max-h-screen overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )

}