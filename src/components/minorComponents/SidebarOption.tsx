import { iconProps } from '@/utils/interfaces';

import Icon from '@mdi/react';
import Link from 'next/link';


export default function SidebarOption({ icon, name}: iconProps){
    return (
        <Link href={"/admin/realities"}>
            <div className="flex bg-mainThemeLighter items-center p-4 group hover:bg-mainThemeSecondary transition duration-300 cursor-pointer select-none">
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