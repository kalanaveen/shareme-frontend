import { useRef, useEffect } from 'react';
import { Pins } from '../components';
import Link from 'next/link';


const Main = ({user}) => {
    const scrollRef = useRef(null);
 
    useEffect(() => {
        scrollRef.current.scrollTo(0,0);
    });

    return (
         <div>
            <div  ref={scrollRef}>
                 <Link href='/' passHref><Pins user={user && user}/></Link>
            </div>
        </div>
    )
}

export default Main;
