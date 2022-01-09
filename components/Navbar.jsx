import Link from 'next/link';
import { useState } from "react"
import { useRouter } from 'next/router';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ user }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    if(!user) return null;
    
        return (
            <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
                <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
                    <IoMdSearch fontSize={21} className='ml-1'
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/search/${searchTerm}`)
                        }} />
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search'
                        value={searchTerm}
                        className='p-2 w-full bg-white outline-none'
                    />
                </div>
                <div className='flex gap-3'>
                  <div className='hidden md:block'>
                      <Link href={`/userProfile/${user?._id}`} passHref>
                        <img src={user.image} alt="profile" className='w-14 h-12 rounded-lg'/>
                    </Link>
                  </div>
                    <div className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
                    <Link href='/createPin' passHref>
                        <IoMdAdd />
                    </Link>
                    </div>
                </div>
            </div>
        )
    }


export default Navbar;
