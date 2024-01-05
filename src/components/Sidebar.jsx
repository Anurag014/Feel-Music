/* eslint-disable react/prop-types */
import { SlMenu } from "react-icons/sl";
import { MdHomeFilled, MdOutlineLibraryMusic } from "react-icons/md";
import { IoCompassOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { createElement } from "react";

const SidebarItem = ({ icon, to, label }) => {
    return (
        <Link to={to}>
            <div className="flex sm:flex-col md:flex-row justify-evenly items-center sm:space-x-0 md:space-x-8hover:bg-red-500 p-2 transition-all duration-300 rounded-md">
                {icon && createElement(icon, { size: 25 })}
                <span className="hidden sm:flex">{label}</span>
            </div>
        </Link>
    );
};

const Sidebar = () => {
    return (
        <aside className='w-1/6 border-r-[0.5px] border-gray-700 text-white h-screen flex-col gap-8 sticky top-0 left-0 overflow-y-scroll no-scrollbar'>
            <div className="flex items-center justify-evenly sm:flex-col md:flex-row p-6">
                <SlMenu size={20} />
                <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="Youtube Music Logo" className="mt-2 hidden sm:flex" />
            </div>

            <div className="p-4 gap-4 flex flex-col">
                <SidebarItem icon={MdHomeFilled} to='/' label='Home' />
                <SidebarItem icon={IoCompassOutline} to='/explore' label='Explore' />
                <SidebarItem icon={MdOutlineLibraryMusic} to='/library' label='Library' />
            </div>
        </aside>
    );
};

export default Sidebar;
