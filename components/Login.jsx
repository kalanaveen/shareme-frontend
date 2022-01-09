import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import { client } from '../client';
import Image from 'next/image';

const Login = () => {
    const router = useRouter();
    const responseGoogle =(response)=>{
        localStorage.setItem('user',JSON.stringify(response.profileObj));
        const{name, googleId, imageUrl} = response.profileObj;

        const doc = {
            _id:googleId,
            _type:'user',
            userName:name,
            image:imageUrl,
        };
        client.createIfNotExists(doc).then(()=>{
           router.push('/');
        })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video 
                src="/share.mp4"
                type="videos/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'    
                />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
              <div className='p-5'>
                   <Image src="/logowhite.png" alt="shareme" width={130} height={40}/>
              </div>

              <div className='shadow-2xl'>
                  <GoogleLogin
                      clientId = {process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}
                      render={(renderProps)=>(
                          <button
                            type='button'
                            className='flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none bg-mainColor'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          >
                            <FcGoogle className="mr-4" /> Sign in with google
                          </button>
                      )}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy='single_host_origin'
                  />
              </div>
            </div>
        </div>
    )
}

export default Login;
