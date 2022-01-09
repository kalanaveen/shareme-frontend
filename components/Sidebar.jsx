import Link from 'next/link';
import { RiHomeFill } from 'react-icons/ri';
import { categories } from '../utils/data';
import { GoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';

const Sidebar = ({ user, closeToggle }) => {
    const router = useRouter();
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    };

    const logout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return (
        <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 scrollbar-hide'>
            <div className='flex flex-col'>
                <div className='flex items-center px-5 gap-2 my-6 pt-1 w-190'>
                    <Link href='/' onClick={handleCloseSidebar} passHref>
                        <img src='/logo.png' alt='logo' className='w-full' />
                    </Link>
                </div>

                <div className='flex flex-col gap-8'>
                    {user && (
                        <div className="flex mb-3 p-2 items-center rounded-lg mx-3">
                            <GoogleLogout
                                clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}
                                render={(renderProps) => (
                                    <button
                                        type="button"
                                        className=" bg-red-50 p-2 rounded-full cursor-pointer outline-none shadow-md w-full"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <div className='flex justify-center items-center'>
                                            <AiOutlineLogout color="red" fontSize={21} />
                                            <p className='text-red-700 font-medium font-mono text-sm'>Logout</p>
                                        </div>
                                    </button>
                                )}
                                onLogoutSuccess={logout}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                    )}
                    {!user && (
                        <div className='flex mb-3 p-2 items-center rounded-lg mx-3'>
                            <button
                                type="button"
                                className=" bg-red-50 p-2 rounded-full cursor-pointer outline-none shadow-md w-full"
                                onClick={() => router.push('/login')}
                            >
                                <div className='flex justify-center items-center'>
                                    <AiOutlineLogout color="red" fontSize={21} />
                                    <p className='text-red-700 font-medium font-mono text-sm'>Login ShareMe</p>
                                </div>
                            </button>
                        </div>
                    )}
                    <Link href='/'
                        onClick={handleCloseSidebar} passHref>
                        <div className='isActiveStyle mt-4'><RiHomeFill /> Home</div>
                    </Link>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <Link passHref href={`/category/${category.name}`}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            <div className='isNotActiveStyle'>
                                <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt={category.name}/>
                                {category.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
