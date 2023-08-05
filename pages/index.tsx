
import { useEffect, useState } from 'react';
import Toggle from '../components/Modal/toggle'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resetState } from '@/redux/reducers';
import { useDispatch } from 'react-redux';
import FormCard from '@/components/FormCard.';
export default function Home() {
    const { user, error, isLoading, } = useUser();
    const dispatch = useDispatch();
    const router = useRouter();
    const [logged, setLogged] = useState(0);
    const [forms, setForms] = useState([]);


    useEffect(() => {
        async function fetchResponse() {
            try {
                let res = await fetch("https://crafty-cyan.vercel.app/api/getFormsByUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: user.sub })
                });
                if(!res.ok){
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                let result = await res.json();
                setForms(result)
                console.log(result,forms)

                console.log('New response array saved successfully.', result);
            } catch (error) {
                console.error('Error saving new question array:', error);
            }

        }
        fetchResponse();
    }, [user?.sub])

    useEffect(() => {
        if (user) {
            setLogged(1);
        }

        else {
            setLogged(0);
        }
    }, [user])

    const handleLinkClick = async () => {

        try {
            dispatch(resetState());
            router.push('/form');
        } catch (error) {
            console.error('Error while setting localStorage:', error);
        }
        // router.push('/form');
    };
    console.log(logged)
    return (
        <div className='w-full min-h-screen w-full p-10' >
            
            {

                user && <div>
                    < FormCard onClick={handleLinkClick} name={'Create New Form'}  />
                   






                </div>
                



            }
              <div className="divider"></div> 
            <div className='font-bold text-3xl border-b-4 border-black pb-1 mb-5 w-fit ' >Your Forms : </div>
            <div className=' mt-10 flex justify-center grid xl:grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 '>
            {
                forms && forms?.map((data)=>{
                    return(
                        <FormCard href={'/responses/'+data._id} name={data.name} />
                    )
                })
                
            }
            {
                !forms?<div>
                        No Forms
                </div>
                :
                null
            }


            </div>
            

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