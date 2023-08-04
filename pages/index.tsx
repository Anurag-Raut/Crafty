
import { useEffect, useState } from 'react';
import Toggle from '../components/Modal/toggle'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resetState } from '@/redux/reducers';
import { useDispatch } from 'react-redux';
export default function Home(){
    const { user, error, isLoading, } = useUser();
    const dispatch = useDispatch();
    const router = useRouter();
    const [logged,setLogged]=useState(0);
    useEffect(()=>{
        if(user){
            setLogged(1);
        }

        else{
            setLogged(0);
        }
    },[user])
    
  const handleLinkClick = async() => {

    try {
        dispatch(resetState());
        router.push('/form');
    } catch (error) {
        console.error('Error while setting localStorage:', error);
    }
    // router.push('/form');
  };
    console.log(logged)
    return(
        <div className='bg-base-100'>
           {
                user && <div>
                    < div onClick={()=>{handleLinkClick()}}>
                    create new Form
                    </div>
                    


                </div>    



           }

<Toggle open={!logged} >
          <h3>
            You are not logged in
          </h3>
          <div className="modal-action">
          <a href="/api/auth/login">Login</a>
            
          </div>
        </Toggle>
           
        </div>
    )
}