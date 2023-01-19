import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { SiVivaldi } from "react-icons/si";
import { MdDashboard, MdPages, MdPermMedia } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { FaDoorOpen } from "react-icons/fa";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const Navigate = useNavigate();

    const Menus = [
        {
            id: 1,
            title: "Dashboard",
            icon: <MdDashboard />
        },
        {
            id: 2,
            title: "Pages",
            icon: <MdPages />
        },
        {
            id: 3,
            title: "Media",
            spacing: true,
            icon: <MdPermMedia />
        },
        {
            id: 4,
            title: "Projects",
            subMenu: true,
            icon: <AiFillProject />,
            subMenusItem: [
                { title: "subMenu 1" },
                { title: "subMenu 2" },
                { title: "subMenu 3" }
            ]
        },
        {
            id: 5,
            title: "Inbox",
            icon: <RiInboxUnarchiveFill />
        }
    ]
    const LogOut = () => {
        localStorage.removeItem("Token");
        Navigate("/");
    };

    return (
        <>
            <div className="flex">
                <div
                    className={`bg-purple-600 h-screen p-5 pt-8 
                        ${open ? "w-72" : "w-20"} duration-300 relative`}>

                    <BsArrowLeftShort
                        className={`bg-white text-purple-600 text-3xl rounded-full absolute -right-3 top-9 border-2 border-black cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

                    <div className="inline-flex">
                        <SiVivaldi className={`bg-white rounded-full text-4xl cursor-pointer block float-left mr-2 duration-500 ${!open && "rotate-180"}`} />
                        <h1 className={`text-white origin-left font-medium text-2xl ${!open && "scale-0"} duration-300`}>Vivek</h1>
                    </div>

                    <div>
                        <ul className='pt-2'>
                            {Menus.map((item, index) => {
                                return (
                                    <>
                                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-50 hover:text-black hover:font-semibold rounded-md mt-2 ${item.spacing ? "mt-9" : "mt-2"}`}>
                                            <span className='text-2xl block float-left'>{item.icon}</span>
                                            <span className={`text-base font-medium flex-1 ${!open && "scale-0"} duration-300`}>
                                                {item.title}
                                            </span>
                                            {item.subMenu && open && (
                                                <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={() => setSubMenuOpen(!subMenuOpen)} />
                                            )}
                                        </li>

                                        {item.subMenu && subMenuOpen && open && (
                                            <ul>
                                                {item.subMenusItem.map((Subitem, index) => {
                                                    return (
                                                        <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-50 rounded-md hover:text-black hover:font-semibold">
                                                            {Subitem.title}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}



                                    </>
                                )
                            })}
                            <li className={`absolute bottom-10  text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-50 ${open ? "w-[85%]" : "w-[50%]"} hover:text-black hover:font-semibold rounded-md mt-2 `} onClick={LogOut}>
                                <span className='text-2xl block float-left' ><FaDoorOpen /></span>
                                <span className={`text-base font-medium flex-1 ${!open && "scale-0"} duration-300`}>LogOut</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar