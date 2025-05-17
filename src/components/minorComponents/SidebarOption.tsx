import { sidebarProps } from '@/utils/interfaces';

import Icon from '@mdi/react';
import Link from 'next/link';


export default function SidebarOption({icon, name, link}: sidebarProps){
    return (
        <Link href={`/admin/${link}`}>
            <div className="flex bg-main-theme-lighter items-center p-4 group hover:bg-main-theme-secondary transition duration-300 cursor-pointer select-none">
                <Icon
                    className='group-hover:text-white transition duration-300'
                    path={icon}
                    size={1.2}
                />
                <div className='pl-5 group-hover:text-white transition duration-300'>
                    { name }
                </div>
            </div>
        </Link>
    )
}