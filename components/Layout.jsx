import { Footer, Navbar,Sidebar } from "."
import { userInfo } from "../utils/userInfo"
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import Link from 'next/link';

const Layout = ({ children }) => {
    const user = userInfo();
    const [toggleSidebar, setToggleSidebar] = useState(false); 
    return (
        <>  
        <div className='flex flex-col bg-gray-50 md:flex-row  h-screen transition-height duration-75 ease-out'>
            <div className='hidden md:flex  h-screen flex-initial'>
                <Sidebar user={user && user}/>
            </div>
            <div className='flex flex-row md:hidden'>
                <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                    <HiMenu
                        fontSize={40} className='cursor-pointer'
                        onClick={() => setToggleSidebar(true)} />
                    <Link href='/' passHref>
                        <img src='/logo.png' alt="shareme" className='w-28' />
                    </Link>
                    <Link href={`userProfile/${user?._id}`} passHref>
                        <img src={user?.image} alt={user?.userName} className=" rounded-full w-9 h-9"/>
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle        
                                fontSize={30}
                                className='cursor-pointer'
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>
                        <Sidebar closeToggle={setToggleSidebar} user={user && user} />
                    </div>
                )}
            </div>
            <div className='flex-1'>
        <header className='bg-gray-50 px-2 md:px-5'>
            <Navbar user={user}/>
        </header>
            <main className='pb-2 flex-1 h-screen overflow-y-scroll'>{children}</main>
            </div>
            </div>
        </>
    )
}

export default Layout