
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
    const [forms,setForms]=useState([]);

    
    useEffect(()=>{
        async function fetchResponse(){
            try {
                let res = await fetch("http://localhost:3000/api/getFormsByUserId", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body:JSON.stringify({userId:user.sub})
                  });
                  let result = await res.json();
                console.log(result)
            
                console.log('New response array saved successfully.',result);
              } catch (error) {
                console.error('Error saving new question array:', error);
              }
          
        }
        fetchResponse();
    },[user?.sub])

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
        <div className='w-screen h-screen' >
            'add new form'
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