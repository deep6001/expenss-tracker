import React from 'react'
import {signInWithPopup} from 'firebase/auth'
import { auth,provider } from '../config/firebase'
import { useNavigate } from 'react-router-dom'



function Auth() {

    const navigate = useNavigate();
   const signInwithGoogle = async () => {
       const result = await signInWithPopup(auth,provider);
       console.log(result);
       const userInfo={
        uid:result.user.uid,
        name:result.user.displayName,
        email:result.user.email,
        picture:result.user.photoURL,
        isAuth:true
       }
       navigate('/expenss');
       localStorage.setItem('userInfo',JSON.stringify(userInfo));
       

   } 
  return (
    <div className='w-full h-full flex justify-center items-center bg-white flex-col gap-4 '>
      <h1 className='w-full text-center text-3xl font-semibold '>Sign in with Google</h1>
      <button className='p-2  border rounded-md  bg-blue-500 text-white' onClick={signInwithGoogle}>Sign In</button>
    </div>
  )
}

export default Auth
