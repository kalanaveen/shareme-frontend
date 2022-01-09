import Link from "next/link";
import {Feed} from '../components';


const Pins = () => {
    return (
        <div className='px-2 md:px-5'>
            <div className='h-full'>
                 <Link href='/' passHref><Feed/></Link>
            </div>
        </div>
    )
}

export default Pins;
